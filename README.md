# 🥐 뭉치장 — 줄서는 대신 함께 뭉치는 베이커리 공동구매 장터

**뭉치장** 프론트엔드 레포지토리입니다.

## 📍 주요 기능

### 🛍️ 소비자

**1️⃣ 지역 기반 공구 피드**

동네를 선택하면 해당 지역에서 진행 중인 공구를 모아볼 수 있습니다. 달성률·마감일 등 참여 판단에 필요한 정보를 한눈에 확인할 수 있습니다.

**2️⃣ 공구 참여 & 결제**

공구 상세 페이지에서 수량을 선택하고 포트원 결제를 통해 바로 참여할 수 있습니다. 결제 완료 후 참여 내역과 픽업 일정이 마이페이지에 자동으로 등록됩니다.

**3️⃣ QR 픽업 시스템**

픽업일이 되면 QR 코드가 활성화됩니다. 매장에서 QR을 제시해 예약 확인 없이 빠르게 픽업할 수 있습니다.

**4️⃣ 공구 요청**

원하는 상품의 공구가 없다면 직접 요청할 수 있습니다. 요청 현황을 통해 검토 진행 상태를 확인할 수 있습니다.

**5️⃣ 찜 & 알림**

관심 있는 공구를 찜해두고, 마감이 임박하면 알림으로 다시 상기할 수 있습니다.

### 🏷️ 사장님

**6️⃣ 공구 개설 & 관리**

판매자는 상품·수량·픽업 일정을 등록해 공구를 개설하고, 달성 현황과 주문 내역을 실시간으로 관리할 수 있습니다.

**7️⃣ 정산**

완료된 공구의 정산 내역을 월별로 확인하고, 환불 요청을 처리할 수 있습니다.

## ⚙️ 기술 스택

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

## 🏗️ 아키텍처 특징

### Orval 기반 API 코드 자동 생성

Orval로 OpenAPI 스펙 하나에서 fetch 클라이언트·React Query 훅·Zod 스키마·MSW 핸들러를 동시에 생성합니다. `pnpm generate` 한 번으로 네 가지가 함께 갱신되고, 타입 불일치는 컴파일 에러로 즉시 드러납니다. 같은 스펙에서 나온 MSW 핸들러로 백엔드 없이 UI를 먼저 개발하고, 실서버 연동 시에도 동일한 타입을 그대로 사용하기 때문에 연동 단계에서 구조가 어긋나는 상황이 발생하지 않습니다.

### Orval 2차 코드젠 — Static 데모 배포

Orval이 생성한 MSW 응답 팩토리를 `scripts/generate-static-registry.ts`가 다시 파싱해 URL 패턴·응답 함수 매핑 테이블(`index.static.ts`)을 자동 생성합니다. 이를 통해 Service Worker 없이 서버 사이드에서 팩토리를 직접 실행할 수 있어, 별도 서버 없이 빌드 산출물만으로 정적 호스팅에 데모를 배포할 수 있습니다.

## 🌐 API 모드

`NEXT_PUBLIC_API_MODE` 값 하나로 API 호출 방식을 전환합니다.

| 모드 | 설명 |
| --- | --- |
| `mock` | MSW + Express 목서버(`:9090`)와 함께 실행. 백엔드 없이 UI 개발 가능 |
| `static` | 별도 서버 없이 Orval 생성 응답 팩토리를 정적으로 반환. Vercel 등 정적 호스팅에 데모 배포 가능 |
| `real` | 모든 요청을 실서버로 전송 |

## 🎉 Contributors
| <img src="https://github.com/leemanjae02.png" width="100"> | <img src="https://github.com/sunhwaaRj.png" width="100"> | <img src="https://github.com/jmlee2147.png" width="100"> |
| :---: | :---: | :---: |
| [**leemanjae02**](https://github.com/leemanjae02) | [**sunhwaaRj**](https://github.com/sunhwaaRj) | [**jmlee2147**](https://github.com/jmlee2147) |
