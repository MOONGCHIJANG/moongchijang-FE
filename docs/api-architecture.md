# API 아키텍처 구조

이 프로젝트는 **Orval**로 OpenAPI 스펙을 코드로 변환하고, `NEXT_PUBLIC_API_MODE` 환경변수로 Mock / Static / Real 세 가지 모드를 전환합니다.

---

## 전체 요청 흐름

### CSR (클라이언트 컴포넌트 / 훅)

```
[클라이언트 컴포넌트]
        │
        │ Orval 생성 함수 호출 (getApiV1GroupBuys 등)
        ▼
[custom-fetch.ts]
        │
        │ NEXT_PUBLIC_API_BASE_URL + /api/v1/...
        ▼
 ┌──────────────────────────────────────┐
 │ mock 모드  → localhost:9090 (목서버)  │
 │ real 모드  → 실제 백엔드 서버         │
 └──────────────────────────────────────┘
```

> mock 모드에서는 `NEXT_PUBLIC_API_BASE_URL=http://localhost:9090`이므로
> `custom-fetch`가 Route Handler를 거치지 않고 Express 목서버로 직접 요청합니다.

### SSR (서버 컴포넌트) 또는 Route Handler 프록시 패턴

```
[서버 컴포넌트 / Route Handler]
        │
        │ serverFetch() 직접 호출
        ▼
[fetcher.ts]  (server-only — 브라우저에서 import 불가)
        │
        ├── mock 모드   → NEXT_PUBLIC_API_BASE_URL (localhost:9090)
        ├── static 모드 → 정적 레지스트리 (네트워크 요청 없음)
        └── real 모드   → NEXT_PUBLIC_API_BASE_URL (실서버)
```

> **Static 모드가 CSR에서 안 되는 이유**: `fetcher.ts`가 `import 'server-only'`를 선언하기 때문에 브라우저에서 import 자체가 불가합니다. Static 모드 분기 로직은 `fetcher.ts` 안에만 존재하므로, Static 모드는 서버 컴포넌트 또는 Route Handler에서만 동작합니다.

Route Handler(`src/app/api/v1/**/route.ts`)는 클라이언트 요청을 `serverFetch`로 프록시해야 할 때 사용합니다. 예를 들어 인증 토큰을 서버에서만 주입해야 하거나, 백엔드에 CORS가 설정되지 않은 경우입니다.

> **서버 컴포넌트에서 Orval 생성 함수를 직접 사용하는 경우**: `getApiV1GroupBuys` 등 Orval 생성 함수는 `customFetch`를 거칩니다. `customFetch`는 `server-only` 제약이 없으므로 서버 컴포넌트에서도 import할 수 있지만, Mock/Real 모드에서만 동작합니다(Static 모드 분기가 없음). Static 모드에서 서버 데이터가 필요하면 반드시 `serverFetch`를 사용해야 합니다.

---

## 파일별 역할

### 1. Orval (`orval.config.ts`) — v8.8.1

OpenAPI(Swagger) 스펙을 읽어 두 가지 결과물을 자동 생성합니다. `dotenv`로 `.env` 파일을 로드하므로 `SWAGGER_URL`을 `.env`에 선언해서 사용할 수 있습니다.

| 설정 키     | 출력 경로                         | 생성 내용                                                       |
| ----------- | --------------------------------- | --------------------------------------------------------------- |
| `fetch-api` | `src/api/generated/` (tags-split) | TypeScript 타입 + fetch 함수 + MSW 목 팩토리 (태그별 파일 분리) |
| `zod-api`   | `src/api/zod/**/*.ts`             | Zod 유효성 검사 스키마                                          |

모든 생성 파일 상단에는 `/* eslint-disable */`과 `// @ts-nocheck`가 자동 주입됩니다. 빌드 최적화를 위해 TypeScript 타입 체크와 ESLint 검사가 생성 파일에서는 비활성화됩니다.

`pnpm generate` 실행 시 스펙 기반으로 전부 재생성됩니다. **직접 수정하면 안 됩니다.**

---

### 2. `src/api/generated/` (Orval 생성 파일들)

Orval이 `tags-split` 모드로 설정되어 있으며, 현재 스펙에서는 **단일 `api.ts` 파일**로 생성됩니다 (백엔드 Swagger 태그가 분리되면 태그별 파일로 나뉩니다). 파일 안에는 크게 세 가지가 들어 있으며, **런타임에서 완전히 별도 맥락**으로 사용됩니다.

**① TypeScript 타입**

```ts
export interface GroupBuyFeedItem { ... }
export interface ApiResponseGroupBuyFeedPage { ... }
```

**② fetch 함수** — 실제 API 호출에 사용

```ts
export const getApiV1GroupBuys = async (params?, options?) => {
  return customFetch(getGetApiV1GroupBuysUrl(params), {
    method: 'GET',
    ...options,
  });
};
```

클라이언트 컴포넌트/훅에서 import해서 사용합니다.

**③ MSW 목 팩토리** — 목서버 및 static 레지스트리 전용, 실제 요청 흐름과 무관

```ts
export const getGetApiV1GroupBuysResponseMock = () => ({ ... }); // faker로 랜덤 데이터 생성
export const getGetApiV1GroupBuysMockHandler = () => http.get(...);
```

`mock-helpers.ts`에서 `getGet...ResponseMock()`을 기반 데이터로 참조하고, `index.msw.ts`의 `generatedHandlers`에 포함됩니다. `index.static.ts`의 `generatedStaticMockEntries`에서도 GET 응답 팩토리로 활용됩니다.

---

### 3. `src/lib/custom-fetch.ts`

Orval의 `mutator`로 지정된 함수입니다. Orval은 fetch를 직접 호출하지 않고, `orval.config.ts`에 지정된 이 함수를 대신 호출하도록 코드를 생성합니다.

```ts
// orval.config.ts
mutator: { path: './src/lib/custom-fetch.ts', name: 'customFetch' }

// 그 결과 Orval이 이렇게 생성함
export const getApiV1GroupBuys = async (params?) => {
  return customFetch('/api/v1/group-buys?...', { method: 'GET' });
};
```

**왜 native fetch를 그대로 쓰지 않나요?**

Orval은 응답을 반드시 `{ data, status, headers }` 구조로 받아야 합니다. Orval이 생성하는 모든 응답 타입이 이 구조 기반이기 때문입니다.

```ts
// native fetch가 반환하는 것
const res = await fetch(url); // Response { ok, status, json(), ... }

// Orval이 기대하는 것
{ data: <파싱된 JSON>, status: 200, headers: Headers }
```

이 변환이 `custom-fetch`의 핵심입니다. Route Handler로 가는 통로가 아니라, **Orval 타입 계약을 맞추기 위해 존재**합니다.

`body`가 `FormData`인 경우 `Content-Type: application/json` 헤더를 자동으로 제외하여 브라우저가 올바른 `multipart/form-data` 헤더를 설정하도록 합니다.

또한 Orval은 200/404 등 상태 코드별로 응답 타입을 Union으로 표현합니다.

```ts
// 404가 있는 엔드포인트 예시 (getApiV1GroupBuysGroupBuyId)
type getApiV1GroupBuysGroupBuyIdResponse =
  | getApiV1GroupBuysGroupBuyIdResponseSuccess // status: 200
  | getApiV1GroupBuysGroupBuyIdResponseError; // status: 404

// 404 없는 엔드포인트(getApiV1GroupBuys 등)는 Success 단일 타입으로 생성됩니다
type getApiV1GroupBuysResponse = getApiV1GroupBuysResponseSuccess; // status: 200만 존재
```

`status`를 기준으로 TypeScript가 `data` 타입을 좁혀주기 때문에, `custom-fetch`는 에러 시 throw 없이 `{ data, status, headers }`를 그대로 반환합니다.

---

### 4. `src/lib/fetcher.ts`

**서버 전용** (`import 'server-only'`) fetch 로직입니다. 서버 컴포넌트와 Route Handler에서만 사용합니다.

**왜 `custom-fetch`와 별도로 존재하나요?**

|             | custom-fetch.ts                           | fetcher.ts                  |
| ----------- | ----------------------------------------- | --------------------------- |
| 존재 이유   | Orval 응답 타입 구조 맞추기               | 환경 분기 + 인증 + 보안     |
| 실행 환경   | 클라이언트 + 서버 (server-only 제약 없음) | 서버만 (`server-only`)      |
| 보안 정보   | 없음                                      | 인증 토큰 주입 가능         |
| 에러 처리   | throw 안 함 (Orval Union 타입)            | throw 함 (serverFetch 기준) |
| static 모드 | 지원 안 함                                | 정적 레지스트리 분기 처리   |

`NEXT_PUBLIC_API_MODE` 환경변수로 동작이 결정됩니다.

| 모드     | 동작                                        |
| -------- | ------------------------------------------- |
| `mock`   | `NEXT_PUBLIC_API_BASE_URL`로 요청 (목서버)  |
| `static` | 네트워크 없이 정적 레지스트리에서 응답 반환 |
| `real`   | `NEXT_PUBLIC_API_BASE_URL`로 요청 (실서버)  |

두 가지 함수를 제공합니다.

```ts
// 서버 컴포넌트 / 비즈니스 로직용 — 4xx/5xx 시 throw
serverFetch<T>(path, token?, init?): Promise<T>

// Route Handler 프록시용 — throw 없이 { status, data } 반환
serverFetchRaw(path, token?, init?): Promise<{ status, data }>
```

---

### 5. Route Handler (`src/app/api/v1/**/route.ts`)

클라이언트 요청을 `serverFetch`로 프록시하는 Next.js API 라우트입니다.

```ts
export async function GET(request: NextRequest) {
  const queryString = request.nextUrl.searchParams.toString();
  const path = `/api/v1/group-buys${queryString ? `?${queryString}` : ''}`;
  try {
    const data = await serverFetch(path);
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 },
    );
  }
}
```

**언제 필요한가요?**

- 백엔드에 CORS가 설정되지 않아 브라우저에서 직접 호출할 수 없을 때
- 인증 토큰을 서버에서만 주입해야 할 때 (`serverFetch`의 `token` 파라미터)

현재 mock 모드에서는 `NEXT_PUBLIC_API_BASE_URL=http://localhost:9090`이므로 `custom-fetch`가 Route Handler를 경유하지 않고 목서버로 직접 요청합니다.

---

### 6. MSW 목서버 레이어

`pnpm dev:mock` 실행 시 동작하는 로컬 개발용 API 서버입니다. 내부적으로 `concurrently`를 사용해 Next.js 개발 서버와 Express 목서버를 동시에 실행합니다.

```json
"dev:mock": "concurrently \"next dev\" \"tsx mocks/dev-server.ts\""
```

```
mocks/dev-server.ts   ← Express 서버 (포트 9090) 실행
mocks/handlers.ts     ← 핸들러 목록 조합 (override + generated)
mocks/mock-helpers.ts ← faker 기반 커스텀 응답 데이터 생성
```

**핸들러 우선순위:**

```ts
export const handlers = [
  ...overrideHandlers, // 1순위: faker로 직접 작성한 커스텀 핸들러
  ...generatedHandlers, // 2순위: Orval이 자동 생성한 핸들러
];
```

MSW는 first-match 방식이라 `overrideHandlers`가 먼저 등록된 엔드포인트를 가로챕니다.

**커스텀 핸들러가 필요한 이유:**
Orval 자동 생성 목은 타입만 맞추고 값 범위 제한이 없어서 UI가 깨질 수 있습니다 (예: 상품명이 300자짜리 랜덤 문자열). `mock-helpers.ts`에서 `getGet...ResponseMock()`의 결과를 스프레드로 덮어써 UI에서 안전한 범위의 값을 보장합니다.

---

### 7. Static Registry (`src/lib/static-registry.ts`)

`NEXT_PUBLIC_API_MODE=static`일 때 사용하는 **in-memory 응답 레지스트리**입니다. 실서버 없이 데모 배포할 때 씁니다.

**대부분의 경우 이 파일을 건드릴 필요가 없습니다.** GET 엔드포인트는 `npm run generate`로 생성된 `index.static.ts`가 자동으로 처리해줍니다. static 모드로 배포하면 별도 설정 없이 모든 GET 요청에 Orval 생성 faker 데이터가 반환됩니다.

다음 경우에만 수정합니다:

**① faker 대신 고정 데이터를 보여주고 싶을 때 → `STATIC_FALLBACK`**

```ts
export const STATIC_FALLBACK: Record<string, StaticLoader> = {
  // faker 랜덤 데이터 대신 Orval 생성 mock 함수 사용
  '/api/v1/group-buys': () =>
    import('@/api/generated/api').then((m) =>
      m.getGetApiV1GroupBuysResponseMock(),
    ),

  // 또는 직접 JSON 파일 import
  '/api/v1/some-endpoint': () => import('@/mocks/data/some-endpoint.json'),
};
```

`STATIC_FALLBACK`에 등록된 경로는 `index.static.ts` 자동 매칭보다 우선 적용됩니다. 현재는 비어 있어 모든 GET 요청이 `index.static.ts` 자동 매칭으로 처리됩니다.

**② 아직 개발되지 않은 API를 503으로 처리할 때 → `PENDING_ENDPOINTS`**

```ts
export const PENDING_ENDPOINTS = new Set<string>([
  '/api/v1/payments', // 준비 중인 엔드포인트
]);
// → 해당 경로 호출 시 503 + "API /api/v1/payments 는 아직 준비 중입니다." 반환
```

현재는 비어 있습니다.

**POST/PUT/PATCH/DELETE**는 별도 등록 없이 항상 빈 성공 응답 `{}`을 반환합니다.

`NEXT_PUBLIC_API_MODE=real`이면 이 파일의 내용은 완전히 무시됩니다. 모드를 전환할 때 레지스트리를 정리하지 않아도 됩니다.

---

### 8. 생성 스크립트 (`scripts/`)

`pnpm generate` 실행 시 Orval 이후에 순서대로 실행됩니다.

| 스크립트                      | 출력 파일                           | 역할                                              |
| ----------------------------- | ----------------------------------- | ------------------------------------------------- |
| `generate-msw-index.ts`       | `src/api/generated/index.msw.ts`    | 모든 MSW 핸들러를 배열로 묶은 index 생성          |
| `generate-static-registry.ts` | `src/api/generated/index.static.ts` | GET 엔드포인트의 URL 패턴 + 응답 팩토리 목록 생성 |

---

### 9. Zod 스키마 (`src/api/zod/`)

Orval이 OpenAPI 스펙에서 생성한 **런타임 유효성 검사** 스키마입니다.

```ts
import { GetApiV1GroupBuysResponse } from '@/api/zod/group-buy/group-buy';

GetApiV1GroupBuysResponse.parse(data); // 폼 유효성 검사, API 응답 런타임 검증 등에 활용
```

---

## 생성 파일을 커밋하는 이유

`src/api/generated/`와 `src/api/zod/`는 자동 생성 파일이지만 **반드시 커밋해야 합니다.**

| 이유               | 설명                                                                                                      |
| ------------------ | --------------------------------------------------------------------------------------------------------- |
| 백엔드 의존성 제거 | `pnpm generate`는 `SWAGGER_URL`의 백엔드가 실행 중이어야 함. 팀원 모두가 항상 백엔드에 접근 가능하지 않음 |
| CI/CD 독립         | 빌드 파이프라인에서 백엔드 없이 타입 체크, 빌드 가능                                                      |
| API 변경 추적      | git diff로 타입·엔드포인트 변경사항을 코드 리뷰 시 확인 가능                                              |
| 즉시 개발 시작     | clone 후 `generate` 없이 바로 개발 가능                                                                   |

생성 파일이 바뀌었다면 반드시 함께 커밋해야 합니다.

---

## 환경변수 요약

| 변수                       | mock 예시                            | real 예시                 | 설명                                             |
| -------------------------- | ------------------------------------ | ------------------------- | ------------------------------------------------ |
| `NEXT_PUBLIC_API_MODE`     | `mock`                               | `real`                    | fetcher의 동작 모드 결정                         |
| `NEXT_PUBLIC_API_BASE_URL` | `http://localhost:9090`              | `https://api.example.com` | custom-fetch / fetcher가 요청을 보낼 베이스 URL  |
| `SWAGGER_URL`              | `http://localhost:8080/openapi.yaml` | —                         | Orval이 스펙을 읽어올 URL (generate 시에만 사용) |

---

## 개발 시 파일별 접근 가이드

### 건드리지 않아도 되는 것

| 파일                                  | 이유                                                         |
| ------------------------------------- | ------------------------------------------------------------ |
| `src/api/generated/` (생성 파일 전체) | Orval 자동 생성 (tags-split), `pnpm generate`로만 갱신       |
| `src/api/generated/index.msw.ts`      | 스크립트 자동 생성                                           |
| `src/api/generated/index.static.ts`   | 스크립트 자동 생성                                           |
| `src/api/zod/**/*.ts`                 | Orval 자동 생성                                              |
| `scripts/generate-*.ts`               | 생성 스크립트, 구조 변경 없으면 수정 불필요                  |
| `mocks/dev-server.ts`                 | Express 서버 설정, 포트 변경 등 특별한 경우 외엔 수정 불필요 |

### 필요 시 수정하는 것

| 파일                         | 언제 수정하나요                                        |
| ---------------------------- | ------------------------------------------------------ |
| `mocks/handlers.ts`          | override 핸들러 추가/제거 시                           |
| `mocks/mock-helpers.ts`      | 특정 엔드포인트 faker 데이터 커스텀이 필요할 때        |
| `src/lib/static-registry.ts` | static 모드에서 엔드포인트 추가/준비중 처리 시         |
| `src/app/api/v1/**/route.ts` | 새 API에 서버 프록시가 필요할 때                       |
| `src/lib/custom-fetch.ts`    | 공통 요청 헤더 변경, 인증 방식 변경 시                 |
| `src/lib/fetcher.ts`         | 서버 fetch 공통 로직 변경, 모드 분기 추가 시           |
| `orval.config.ts`            | 생성 경로·mutator 변경 등 프로젝트 구조가 크게 바뀔 때 |

---

### override 핸들러 관리 주의사항

`handlers.ts`의 `overrideHandlers`는 Orval 재생성과 독립적으로 관리됩니다. API 스펙이 변경돼 생성 파일들이 재생성되더라도 `mock-helpers.ts`의 faker 데이터는 자동으로 업데이트되지 않습니다.

```ts
// mock-helpers.ts
const base = getGetApiV1GroupBuysResponseMock(); // Orval 생성 목 데이터 (새 필드 자동 반영)
return {
  ...base,
  success: true,
  data: {
    ...base.data,
    content: base.data.content.map((item) => ({
      ...item,
      storeName: faker.string.alpha({ length: { min: 4, max: 15 } }), // 여기서 덮어쓴 필드만 커스텀
    })),
  },
};
```

`base`를 스프레드로 받고 필요한 필드만 덮어쓰는 방식이라 신규 필드는 Orval 생성 값이 자동으로 채워집니다. 다만 **UI에서 문제가 되는 엔드포인트만 override하고 나머지는 generatedHandlers에 맡기는 것**이 관리 부담을 줄이는 방법입니다.

---

## 새 API 추가 시 흐름

1. 백엔드에서 OpenAPI 스펙 업데이트
2. `pnpm generate` 실행 → `src/api/generated/api.ts`, `index.msw.ts`, `index.static.ts`, `src/api/zod/` 재생성
3. 생성된 파일 커밋
4. 목서버에서 커스텀 응답이 필요하면 `mock-helpers.ts`에 팩토리 함수 추가 후 `handlers.ts`에 override 핸들러 등록
5. 컴포넌트에서 `src/api/generated/`의 생성 함수 import해서 사용
6. 인증이 필요하거나 CORS 문제가 있으면 Route Handler 추가 후 `serverFetch`로 연결
