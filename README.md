# moongchijang-FE

## 환경

- **Node.js** – ^20 또는 ^22 권장
- **패키지 매니저** – [pnpm](https://pnpm.io)

## 기술 스택

| 분류          | 라이브러리                           |
| ------------- | ------------------------------------ |
| 프레임워크    | Next.js 16 (App Router), React 19    |
| 언어          | TypeScript 5                         |
| 스타일        | Tailwind CSS v4                      |
| API 코드 생성 | Orval 8                              |
| 스키마 검증   | Zod 4                                |
| Mock          | MSW v2 + Express                     |
| 테스트        | Vitest, Playwright                   |
| UI 문서       | Storybook 10                         |
| 코드 품질     | ESLint, Prettier, Husky, lint-staged |

## 시작하기

### 의존성 설치

```bash
pnpm install
```

### 환경변수 설정

```bash
cp .env.example .env
```

`.env` 주요 변수:

| 변수                       | 설명                                   |
| -------------------------- | -------------------------------------- |
| `NEXT_PUBLIC_API_MODE`     | `mock` \| `static` \| `real`           |
| `NEXT_PUBLIC_API_BASE_URL` | API 서버 주소                          |
| `SWAGGER_URL`              | Orval 코드 생성 시 사용할 Swagger 주소 |

## 스크립트

| 명령어           | 설명                            |
| ---------------- | ------------------------------- |
| `pnpm dev`       | 개발 서버 실행 (real 모드)      |
| `pnpm dev:mock`  | 개발 서버 + Mock 서버 동시 실행 |
| `pnpm build`     | 프로덕션 빌드                   |
| `pnpm start`     | 빌드된 앱 실행                  |
| `pnpm generate`  | Orval API 코드 재생성           |
| `pnpm lint`      | ESLint 실행                     |
| `pnpm storybook` | Storybook 실행                  |

## API 모드

`NEXT_PUBLIC_API_MODE` 값에 따라 API 호출 방식이 달라집니다.

### `mock` — 로컬 개발

```bash
pnpm dev:mock
```

MSW + Express 목서버(`:9090`)를 Next.js 개발 서버와 함께 실행합니다. `mocks/handlers.ts`에서 응답을 오버라이드할 수 있습니다.

### `static` — 데모 배포

별도 서버 없이 Orval이 생성한 mock 데이터를 정적으로 반환합니다. `NEXT_PUBLIC_API_BASE_URL`을 배포된 앱 자신의 URL로 설정하면 클라이언트 요청이 Route Handler를 통해 static registry로 연결됩니다.

```
NEXT_PUBLIC_API_MODE=static
NEXT_PUBLIC_API_BASE_URL=https://배포-앱-주소
```

### `real` — 프로덕션

모든 요청을 실서버로 전송합니다.

## API 코드 생성

Swagger 스펙 변경 후 아래 명령어로 재생성합니다.

```bash
pnpm generate
```

생성 결과물:

- `src/api/generated/` — fetch 함수, 타입, MSW mock factory
- `src/api/zod/` — Zod 스키마

> `src/api/generated/`와 `src/api/zod/`는 자동 생성 파일이므로 직접 수정하지 않습니다.

## 배포

AWS Amplify 기반. `amplify.yml`에 빌드 설정이 정의되어 있습니다.

## Jira 연동

브랜치명에 `MCJ-XX`를 포함하면 Jira 티켓과 자동으로 연결됩니다.
