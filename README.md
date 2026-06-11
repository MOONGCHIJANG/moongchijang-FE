# 🥐 뭉치장

> 줄서는 대신, 함께 뭉쳐서 구매하는 **베이커리 공동구매 장터**입니다. <br />
> 지역 기반 공구 피드 → 참여·결제 → QR 픽업으로 이어지는 소비자 경험과, <br />
> 공구 개설·관리·정산까지 아우르는 판매자 경험을 제공합니다. <br />
> 🌐 **[moongchijang.com](https://moongchijang.com)**

<!-- 커버 이미지 -->
<img width="1920" alt="main" src="https://github.com/user-attachments/assets/d887b09f-a1a3-414e-90fc-460d655a2d2e" />

## 목차

- [주요 기능](#-주요-기능)
- [기술 스택](#-기술-스택)
- [아키텍처 & 디렉토리 구조](#-아키텍처--디렉토리-구조)
- [핵심 설계 포인트](#-핵심-설계-포인트)
- [구현 로직 플로우](#-구현-로직-플로우)
- [CI/CD](#-cicd)
- [로컬 실행](#-로컬-실행)
- [팀원](#-팀원)

---

## ✨ 주요 기능

### 🛍️ 소비자

#### 1. 지역 기반 공구 피드

<!-- TODO: 스크린샷 -->

- 동네를 선택하면 해당 지역 진행 중인 공구를 모아볼 수 있습니다
- 달성률·마감일 등 참여 판단에 필요한 정보를 한눈에 확인

#### 2. 공구 참여 & 결제

<!-- TODO: 스크린샷 -->

- 수량 선택 후 **PortOne** 결제로 즉시 참여
- 결제 완료 후 참여 내역과 픽업 일정이 마이페이지에 자동 등록

#### 3. QR 픽업 시스템

<!-- TODO: 스크린샷 -->

- 픽업일 당일 QR 코드 자동 활성화
- 기기를 흔들면(`useShake`) QR 즉시 전체화면 표시 — 매장에서 바로 스캔

#### 4. 공구 요청

<!-- TODO: 스크린샷 -->

- 원하는 상품 공구가 없다면 직접 요청 등록
- 요청 현황 페이지에서 검토 진행 상태 실시간 확인

#### 5. 찜 & 알림

<!-- TODO: 스크린샷 -->

- 관심 공구를 찜해두고 마감 임박 알림으로 재상기

### 🏷️ 판매자 (사장님)

#### 6. 공구 개설 & 관리

<!-- TODO: 스크린샷 -->

- 상품·수량·픽업 일정 등록으로 공구 개설
- 달성 현황과 주문 내역 실시간 모니터링

#### 7. 정산

<!-- TODO: 스크린샷 -->

- 완료 공구 정산 내역 월별 조회
- 환불 요청 처리

---

## 🖥 기술 스택

<table>
  <tr>
    <th align="center">역할</th>
    <th align="center">종류</th>
  </tr>
  <tr>
    <td align="center"><b>Core</b></td>
    <td>
      <img src="https://img.shields.io/badge/React%2019-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" />
      <img src="https://img.shields.io/badge/Next.js%2016-000000?style=for-the-badge&logo=next.js&logoColor=white" />
      <img src="https://img.shields.io/badge/TypeScript%205-3178C6?style=for-the-badge&logo=typescript&logoColor=white" />
    </td>
  </tr>
  <tr>
    <td align="center"><b>Styling</b></td>
    <td>
      <img src="https://img.shields.io/badge/Tailwind%20CSS%20v4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" />
      <img src="https://img.shields.io/badge/tailwind--merge-06B6D4?style=for-the-badge&logoColor=white" />
      <img src="https://img.shields.io/badge/clsx-F7DF1E?style=for-the-badge&logoColor=black" />
    </td>
  </tr>
  <tr>
    <td align="center"><b>State &amp; Data</b></td>
    <td>
      <img src="https://img.shields.io/badge/Zustand%205-443E38?style=for-the-badge&logoColor=white" />
      <img src="https://img.shields.io/badge/TanStack%20Query%205-FF4154?style=for-the-badge&logo=reactquery&logoColor=white" />
    </td>
  </tr>
  <tr>
    <td align="center"><b>API Automation</b></td>
    <td>
      <img src="https://img.shields.io/badge/Orval%208-6C47FF?style=for-the-badge&logoColor=white" />
      <img src="https://img.shields.io/badge/Zod%204-3E67B1?style=for-the-badge&logo=zod&logoColor=white" />
      <img src="https://img.shields.io/badge/React%20Hook%20Form%207-EC5990?style=for-the-badge&logo=reacthookform&logoColor=white" />
    </td>
  </tr>
  <tr>
    <td align="center"><b>Payment</b></td>
    <td>
      <img src="https://img.shields.io/badge/PortOne-6728F5?style=for-the-badge&logoColor=white" />
    </td>
  </tr>
  <tr>
    <td align="center"><b>Map</b></td>
    <td>
      <img src="https://img.shields.io/badge/Naver%20Maps%20API-03C75A?style=for-the-badge&logo=naver&logoColor=white" />
    </td>
  </tr>
  <tr>
    <td align="center"><b>Analytics</b></td>
    <td>
      <img src="https://img.shields.io/badge/PostHog-F54E00?style=for-the-badge&logo=posthog&logoColor=white" />
    </td>
  </tr>
  <tr>
    <td align="center"><b>Testing</b></td>
    <td>
      <img src="https://img.shields.io/badge/Vitest-6E9F18?style=for-the-badge&logo=vitest&logoColor=white" />
      <img src="https://img.shields.io/badge/React%20Testing%20Library-E33332?style=for-the-badge&logo=testinglibrary&logoColor=white" />
      <img src="https://img.shields.io/badge/MSW%20v2-FF6A33?style=for-the-badge&logoColor=white" />
      <img src="https://img.shields.io/badge/Playwright-2EAD33?style=for-the-badge&logo=playwright&logoColor=white" />
      <img src="https://img.shields.io/badge/Storybook%2010-FF4785?style=for-the-badge&logo=storybook&logoColor=white" />
      <img src="https://img.shields.io/badge/Chromatic-FC521F?style=for-the-badge&logo=chromatic&logoColor=white" />
    </td>
  </tr>
  <tr>
    <td align="center"><b>Tooling</b></td>
    <td>
      <img src="https://img.shields.io/badge/ESLint-4B32C3?style=for-the-badge&logo=eslint&logoColor=white" />
      <img src="https://img.shields.io/badge/Prettier-F7B93E?style=for-the-badge&logo=prettier&logoColor=black" />
      <img src="https://img.shields.io/badge/Husky-000000?style=for-the-badge&logoColor=white" />
      <img src="https://img.shields.io/badge/lint--staged-F05032?style=for-the-badge&logoColor=white" />
      <img src="https://img.shields.io/badge/pnpm%2010-F69220?style=for-the-badge&logo=pnpm&logoColor=white" />
    </td>
  </tr>
  <tr>
    <td align="center"><b>Infra</b></td>
    <td>
      <img src="https://img.shields.io/badge/AWS%20Amplify-FF9900?style=for-the-badge&logo=awsamplify&logoColor=white" />
    </td>
  </tr>
  <tr>
    <td align="center"><b>Collaboration</b></td>
    <td>
      <img src="https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white" />
      <img src="https://img.shields.io/badge/Jira-0052CC?style=for-the-badge&logo=jira&logoColor=white" />
      <img src="https://img.shields.io/badge/Notion-000000?style=for-the-badge&logo=notion&logoColor=white" />
      <img src="https://img.shields.io/badge/Figma-F24E1E?style=for-the-badge&logo=figma&logoColor=white" />
    </td>
  </tr>
</table>

---

## 🏗 아키텍처 & 디렉토리 구조

Next.js **App Router** 기반의 페이지 구성을 따르며, 레이아웃 그룹으로 소비자·판매자·공통 영역을 명확히 분리했습니다.

```
src/
├── app/
│   ├── (pages)/
│   │   ├── (gnb)/              # GNB 포함 소비자 페이지
│   │   │   ├── feed/           # 공구 피드 (지역 선택)
│   │   │   ├── favorite/       # 찜 목록
│   │   │   └── mypage/         # 마이페이지 (주문·픽업 내역)
│   │   ├── (no-gnb)/           # GNB 없는 페이지
│   │   │   └── feed/request/   # 공구 요청 상세
│   │   ├── (seller)/           # 판매자 전용 레이아웃
│   │   │   └── seller/
│   │   │       ├── management/ # 공구 개설·관리
│   │   │       ├── settlement/ # 정산
│   │   │       ├── mypage/     # 판매자 마이페이지
│   │   │       └── notifications/
│   │   ├── item/[groupBuyId]/  # 공구 상세 + 참여
│   │   ├── mypage/             # 픽업·주문 상세·정보 변경
│   │   ├── payment/            # 결제 redirect · complete · fail
│   │   ├── request/            # 공구 요청 목록 + 신규 등록
│   │   ├── login/              # 카카오 OAuth · 이메일 로그인
│   │   ├── signup/             # 소비자 · 판매자 회원가입
│   │   ├── notifications/      # 알림 목록
│   │   └── terms/              # 약관
│   ├── api/                    # Next.js Route Handler (API 프록시)
│   └── layout.tsx / globals.css / not-found.tsx
├── api/
│   ├── generated/              # Orval 생성 fetch 클라이언트 · Zod 스키마
│   └── hooks/                  # Orval 생성 React Query 훅
├── components/                 # 재사용 가능한 순수 UI 컴포넌트
├── hooks/                      # 공통 커스텀 훅 (useShake, useQrScanner 등)
├── store/                      # Zustand 전역 상태 슬라이스
├── lib/                        # fetcher · 유틸 · 토큰 · 날짜 · 분석
├── providers/                  # QueryProvider 등 Provider 모음
├── schemas/                    # Zod 폼 스키마
├── constants/                  # 지역 코드 등 상수
├── types/                      # 전역 TypeScript 타입
└── styles/                     # 디자인 토큰 (tokens.css)
```

```
mocks/                          # MSW v2 핸들러 + Express 목서버
scripts/
├── generate-msw-index.ts       # MSW 핸들러 인덱스 자동 생성
└── generate-static-registry.ts # Static 모드용 URL→응답 매핑 테이블 생성
```

---

## ⚡ 핵심 설계 포인트

**Orval 기반 API 자동화**

- OpenAPI 스펙 하나에서 `fetch 클라이언트` · `React Query 훅` · `Zod 스키마` · `MSW 핸들러`를 `pnpm generate` 한 번으로 동시 생성
- 타입 불일치는 컴파일 에러로 즉시 드러나 런타임 연동 실패 원천 차단
- MSW 핸들러도 동일 스펙에서 생성 → 백엔드 없이 UI 선개발 후 실서버 전환 시 동일 타입 그대로 사용

**결제 로직 안정성 — Zod 런타임 파싱**

PortOne 결제 완료 후 돌아오는 응답은 외부 SDK에서 오는 값이라 타입만으로는 보장이 불가합니다.
Zod 스키마로 응답을 런타임에 파싱해 필드 누락·타입 불일치를 즉시 감지하고, 파싱 실패 시 결제 실패 페이지로 안전하게 분기합니다.

- 결제 성공·실패·리다이렉트 3가지 시나리오 모두 Zod로 응답 검증
- 스키마 정의가 곧 문서 역할 → 백엔드 응답 변경 시 컴파일 에러로 즉시 감지

**테스트 전략 — Vitest + RTL + MSW 조합**

단위 테스트부터 통합 시나리오까지 세 도구를 조합해 계층적으로 커버합니다.

- **Vitest** — 유틸 함수·커스텀 훅 단위 테스트, 빠른 피드백 루프
- **React Testing Library** — 컴포넌트를 실제 사용자 관점(쿼리·이벤트)으로 검증, 구현 세부사항에 의존하지 않는 테스트 작성
- **MSW v2** — 네트워크 계층을 가로채 실제 fetch 흐름 그대로 유지하면서 API 응답을 제어, 실서버 없이 통합 시나리오 재현
- 세 도구가 동일한 MSW 핸들러를 공유 → 개발 Mock과 테스트 Mock의 응답 불일치 원천 차단

---

## 🔄 구현 로직 플로우

**공구 참여 플로우**

```
공구 피드 (지역 선택)
    ↓
공구 상세 페이지 조회
    ↓
수량 선택 → 주문 정보 입력
    ↓
PortOne 결제 요청 (browser-sdk)
    ↓
결제 결과 redirect
    ├── 성공 → payment/complete → 마이페이지 참여 내역 등록
    └── 실패 → payment/fail → 오류 안내
```

**QR 픽업 플로우**

```
마이페이지 → 픽업 예정 목록
    ↓
픽업 상세 페이지 (참여 ID 기반)
    ↓
픽업일 당일: QR 코드 자동 활성화
    ↓
기기 흔들기 (useShake) 또는 버튼 탭 → QR 전체화면 표시
    ↓
매장 스캔 → 픽업 완료
```

**인증 플로우**

```
카카오 소셜 로그인 → /login/kakao/callback
    ↓
Access Token 발급 (JWT)
    ├── 신규 유저 → 회원가입 플로우 (이메일 / 판매자)
    └── 기존 유저 → 직전 방문 페이지 자동 복귀
```

---

## ☁️ CI/CD

> **Push to `develop` → AWS Amplify 자동 빌드 & 배포 ([moongchijang.com](https://moongchijang.com))**

| 단계          | 도구        | 주요 작업                                                       |
| ------------- | ----------- | --------------------------------------------------------------- |
| **preBuild**  | AWS Amplify | Node.js 22 설정, pnpm 10 설치, `pnpm install --frozen-lockfile` |
| **build**     | AWS Amplify | `pnpm build` (Next.js 프로덕션 빌드)                            |
| **artifacts** | AWS Amplify | `.next/` 산출물 배포                                            |

- **환경 변수**: AWS Amplify 콘솔 환경 변수로 관리 — 레포에 평문 미탑재

---

## 💻 로컬 실행

요구사항: **Node.js 22**, **pnpm 10**

```bash
# 1. 의존성 설치
pnpm install

# 2. API 코드 생성 (OpenAPI → hooks, schemas, MSW handlers)
pnpm generate

# 3-a. 실서버 연동 개발
pnpm dev

# 3-b. Mock 서버와 함께 개발 (백엔드 없이)
pnpm dev:mock
```

### 주요 명령어

```bash
pnpm generate        # Orval 코드젠 (API 변경 시 실행)
pnpm test            # Vitest 단위 테스트
pnpm storybook       # Storybook 로컬 서버 (http://localhost:6006)
pnpm lint            # ESLint
```

### 환경 변수

| 변수                              | 설명                                    |
| --------------------------------- | --------------------------------------- |
| `NEXT_PUBLIC_API_BASE_URL`        | 백엔드 API 서버 URL                     |
| `NEXT_PUBLIC_API_MODE`            | API 모드 (`mock` \| `static` \| `real`) |
| `NEXT_PUBLIC_KAKAO_CLIENT_ID`     | 카카오 REST API 키                      |
| `NEXT_PUBLIC_KAKAO_JS_KEY`        | 카카오 JavaScript 키                    |
| `NEXT_PUBLIC_KAKAO_REDIRECT_URI`  | 카카오 OAuth 리다이렉트 URI             |
| `NEXT_PUBLIC_PORTONE_STORE_ID`    | PortOne 스토어 ID                       |
| `NEXT_PUBLIC_PORTONE_CHANNEL_KEY` | PortOne 채널 키                         |
| `NEXT_PUBLIC_NAVER_MAP_CLIENT_ID` | 네이버 지도 클라이언트 ID               |
| `NEXT_PUBLIC_POSTHOG_KEY`         | PostHog 프로젝트 API 키                 |
| `NEXT_PUBLIC_POSTHOG_HOST`        | PostHog 호스트 URL                      |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID`   | Google Analytics 측정 ID                |
| `NEXT_PUBLIC_SITE_URL`            | 서비스 도메인 URL                       |

---

## 👥 팀원

| <img src="https://github.com/leemanjae02.png" width="200" height="200"/> | <img src="https://github.com/sunhwaaRj.png" width="200" height="200"/> | <img src="https://github.com/jmlee2147.png" width="200" height="200"/> |
| :----------------------------------------------------------------------: | :--------------------------------------------------------------------: | :--------------------------------------------------------------------: |
|       이만재 <br/> [@leemanjae02](https://github.com/leemanjae02)        |        김선화 <br/> [@sunhwaaRj](https://github.com/sunhwaaRj)         |        이지민 <br/> [@jmlee2147](https://github.com/jmlee2147)         |
|                            **Frontend Lead**                             |                              **Frontend**                              |                              **Frontend**                              |

<img width="1920" alt="sub" src="https://github.com/user-attachments/assets/cddf0ec1-a4a3-448e-a0a9-dd9d959766fa" />
