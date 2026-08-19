# MCJ-1635 마이그레이션 중 발견된 범위 밖 이슈 기록

모노레포 마이그레이션(MCJ-1635) 검증 과정에서 발견했지만, **마이그레이션 티켓 범위(구조 이동·설정 전환)를 벗어나 커밋에서 제외한 항목들**의 기록. 각각 별도 티켓으로 처리한다.

## 1. 테스트 셋업 posthog 크래시 — `window.location` 목에 `hash` 누락

**선재 버그** (develop에도 동일하게 존재, 마이그레이션과 무관)

- **증상**: `tests/join/JoinPageClient.test.tsx`, `tests/payment/PaymentRedirectClient.test.tsx` 두 파일이 테스트 수집 단계에서 통째로 크래시 (`TypeError: Cannot read properties of undefined (reading 'match')`)
- **원인**: `apps/web/tests/setup.tsx`가 `window.location`을 `{href, origin, assign, replace}`만으로 목킹하는데, 두 테스트의 컴포넌트가 import하는 posthog-js가 모듈 로드 시 `location.hash.match(...)`를 호출함
- **수정** (1줄):

```diff
 Object.defineProperty(window, 'location', {
   value: {
     href: '',
     origin: 'http://localhost:3000',
+    hash: '',
     assign: vi.fn(),
     replace: vi.fn(),
```

---

## 2. 카카오 콜백 StrictMode 이중 실행 가드 누락

**선재 버그** (develop에도 동일하게 존재)

- **증상**: dev 모드에서 React StrictMode가 useEffect를 두 번 실행 → 1회용 카카오 인가 code로 `/api/v1/auth/kakao`에 토큰 교환을 중복 요청 → 두 번째 요청이 반드시 실패하고, 레이스에 따라 로그인 실패처럼 보임
- **비교**: 같은 패턴의 `PaymentRedirectClient.tsx`에는 `hasProcessed` useRef 가드가 있으나 `KakaoCallbackClient.tsx`에만 누락됨
- **수정** (`apps/web/src/app/(pages)/login/kakao/callback/_components/KakaoCallbackClient.tsx`):

```diff
-import { useEffect } from 'react';
+import { useEffect, useRef } from 'react';
 ...
 export default function KakaoCallbackPage() {
   const router = useRouter();
   const searchParams = useSearchParams();
+  // 카카오 인가 code는 1회용 — StrictMode 이중 실행 시 같은 code로 두 번 교환 요청하면 실패
+  const hasProcessed = useRef(false);

   useEffect(() => {
+    if (hasProcessed.current) return;
+    hasProcessed.current = true;
+
     const code = searchParams.get('code');
```

### 함께 기록: 로컬 카카오 "토큰 교환 실패" 조사 결과 (미해결, 백엔드 확인 필요)

로컬(`localhost:3000`)에서 카카오 로그인 시 dev 백엔드(`api.moongchijang.com/dev`)가 `KAKAO_TOKEN_EXCHANGE_FAILED`를 반환. 조사로 확정된 사실:

| 확인 항목                                       | 결과                                                      |
| ----------------------------------------------- | --------------------------------------------------------- |
| CLIENT_ID가 백엔드와 같은 카카오 앱인가         | ✅ (같은 키 + 배포 redirect로는 교환 성공)                |
| localhost 전체 경로가 카카오 콘솔에 등록돼 있나 | ✅ (authorize가 code 발급함)                              |
| 프론트 요청 필드/헤더가 올바른가                | ✅ (`KakaoLoginRequest` 스키마와 일치, Content-Type 정상) |
| 프론트 코드가 develop과 다른가                  | ✅ 동일 (diff로 확인 — 마이그레이션 무관)                 |
| 카카오 앱 client_secret                         | 활성화됨 (직접 curl 시 KOE010)                            |

**남은 용의자**: 백엔드가 body의 `redirectUri`(스키마 주석: "서버 검증용")를 처리하는 방식 — localhost가 허용 목록에 없거나 자체 설정값으로 교환하는 것으로 추정. **백엔드 팀에 dev 서버 `/api/v1/auth/kakao`의 redirectUri 검증 로직 확인 요청 필요.** (백엔드 응답이 카카오 원본 에러코드를 `detail: null`로 감추고 있어 프론트에서 최종 확정 불가)

---

## 3. 쿠키 `sameSite` 파라미터화 (MCJ-1635에서 제외·원상복구됨)

어드민 분리 대비 리팩토링이 마이그레이션 브랜치에 섞여 있던 것을 발견하고 **`packages/api-client/src/cookie.ts`를 develop 원본으로 복원**했다. 아래는 별도 티켓에서 다시 진행할 때를 위한 원 분석 내용.

### 문제

어드민 로그인 시점과 토큰 재발급(refresh) 시점에 `refreshToken` 쿠키의 `sameSite` 속성이 서로 다르게 적용된다.

| 시점          | 파일                                                                | `sameSite` 값 |
| ------------- | ------------------------------------------------------------------- | ------------- |
| 어드민 로그인 | `api/v1/auth/admin/email/login/route.ts` (MCJ-1589 브랜치에만 존재) | `'strict'`    |
| 토큰 재발급   | `cookie.ts`의 `setRefreshTokenCookie` (refresh 라우트에서 호출)     | `'lax'`       |

로그인 직후에는 `strict`로 세팅되지만, refresh가 호출되는 순간 하드코딩된 `'lax'`로 조용히 다운그레이드된다.

### 원인

BFF 패턴이라 쿠키 속성은 전적으로 프론트 Route Handler가 결정하는데(정상 설계), 그 속성이 로그인 라우트와 refresh 라우트 두 곳에 각각 하드코딩되어 있고 단일 진실 공급원이 없어 값이 발산했다.

### 영향

- 어드민의 `sameSite: 'strict'` CSRF 방어가 로그인 직후 잠깐만 적용되고 세션 대부분의 시간에는 무력화됨
- `/api/v1/auth/refresh`를 일반 사용자와 어드민이 공유해, 어드민 전용 강화 값이 공용 로직에 덮어써지는 구조적 리스크

### 제안 해결책 (별도 티켓)

`setRefreshTokenCookie`/`setAccessTokenCookie`/`applyRefreshTokenCookie`가 `sameSite`를 파라미터(기본 `'lax'`)로 받도록 변경하고, 호출부가 컨텍스트에 맞게 명시적으로 전달. MCJ-1589(어드민 로그인 라우트) 머지 후에는 어드민 라우트가 `'strict'`를 넘기고, 공용 refresh 라우트는 역할(role) 검증으로 `sameSite`를 분기(예: `proxy.ts`의 `getUserRole` 패턴 재사용).

---

## 4. 선재 결제 테스트 실패 18건 (미해결)

1번의 posthog 크래시를 걷어내면 드러나는 실패로, develop부터 깨져 있던 테스트들 (마이그레이션과 무관함을 diff로 확인).

- `tests/join/JoinPageClient.test.tsx` 10건 — 결제 버튼 클릭 시 `PortOne.requestPayment`가 호출되지 않음 (원인 미조사)
- `tests/payment/PaymentRedirectClient.test.tsx` 8건 — `useAuthStore`의 `isInitialized`가 테스트에서 `false`로 남아 컴포넌트가 로딩 화면에서 멈춤

---

## 5. Amplify 모노레포 배포 검증 (보류)

amplify.yml이 루트 단일앱 형식(`baseDirectory: apps/web/.next`)으로만 수정된 상태. Amplify의 Next SSR 호스팅은 모노레포에서 `applications: - appRoot: apps/web` 블록 + `AMPLIFY_MONOREPO_APP_ROOT` 환경변수를 기대하므로, **develop 머지 전 프리뷰 브랜치로 배포해 확인 필요**: ① Platform이 `WEB_COMPUTE`인지, ② 동적 라우트(`/feed` 등) SSR 정상 렌더, ③ `/api/v1/**` Route Handler 동작.
