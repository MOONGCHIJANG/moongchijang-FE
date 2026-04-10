# moongchijang-FE

## 환경

- **Node.js** – ^20 또는 ^22 권장
- **패키지 매니저** – [pnpm](https://pnpm.io) (이 프로젝트는 pnpm 기준입니다)

## 기술 스택

- [Next.js](https://nextjs.org) 16 (App Router)
- [React](https://react.dev) 19
- [TypeScript](https://www.typescriptlang.org)
- [Tailwind CSS](https://tailwindcss.com) v4
- [Zod](https://zod.dev) (스키마/검증)
- [MSW](https://mswjs.io) (Mock Service Worker)

## 시작하기

### 의존성 설치

```bash
pnpm install
```

### 환경변수 설정

```bash
cp .env.example .env
```

## 스크립트

| 명령어          | 설명                            |
| --------------- | ------------------------------- |
| `pnpm dev`      | 개발 서버 실행                  |
| `pnpm dev:mock` | 개발 서버 + Mock 서버 동시 실행 |
| `pnpm build`    | 프로덕션 빌드                   |
| `pnpm start`    | 빌드된 앱 실행                  |
| `pnpm lint`     | ESLint 실행                     |
