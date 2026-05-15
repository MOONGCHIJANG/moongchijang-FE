## 📌 작업 목적

> 이번 PR의 목적을 간단히 설명해주세요.
> 결제 로직 안전성 테스트를 위한 테스트 코드 작성입니다.

> 왜 이 작업이 필요한지 작성해주세요.
> 실제 돈이 오고가는 결제 서비스인만큼 결제 안전성을 높여야한다고 생각해 테스트 코드를 도입하게 되었습니다!

---

## ✨ 변경 사항

> 이번 PR에서 변경된 내용을 작성해주세요.

#### 🔹 주요 변경 내용

-
-
- ***

## 🧪 테스트 설계

### 라이브러리 조합

| 라이브러리                    | 담당                                                                               |
| ----------------------------- | ---------------------------------------------------------------------------------- |
| **Vitest**                    | 테스트 러너 — 테스트 실행, 모킹(`vi.mock`, `vi.fn`), 어서션                        |
| **React Testing Library**     | 컴포넌트 렌더링 및 사용자 인터랙션 (`render`, `screen`, `userEvent`)               |
| **MSW (Mock Service Worker)** | 네트워크 레이어에서 HTTP 요청 인터셉트 — 실제 `fetch` 호출을 가로채 서버 역할 수행 |

RTL + MSW 조합으로 컴포넌트가 실제로 보내는 HTTP 요청(URL, body)까지 검증하는 **프론트엔드 통합 테스트** 구조입니다.  
PortOne SDK는 실제 결제 API를 호출하므로 `vi.mock`으로 대체했습니다.

---

## 🔍 테스트 내용

#### JoinPageClient (PC 결제 플로우)

| 케이스                  | 검증 내용                                                                                            |
| ----------------------- | ---------------------------------------------------------------------------------------------------- |
| 결제 성공               | participations → SDK → confirm 순서 호출, complete 페이지 이동, `sessionStorage.paymentSuccess` 저장 |
| SDK 실패 (USER_CANCEL)  | fail API 호출, fail 페이지 이동, `sessionStorage.paymentFail` 저장                                   |
| participations API 실패 | fail API 호출, fail 페이지 이동, `sessionStorage.paymentFail` 저장                                   |
| confirm API 실패        | fail API 호출, fail 페이지 이동, `sessionStorage.paymentFail` 저장                                   |

#### PaymentRedirectClient (모바일 결제 리다이렉트 플로우)

| 케이스                         | 검증 내용                                                                                      |
| ------------------------------ | ---------------------------------------------------------------------------------------------- |
| code 파라미터 있음 (PG사 실패) | fail API 올바른 파라미터로 호출, fail 페이지 이동, `sessionStorage.paymentFail` 저장           |
| code 파라미터 없음 (결제 성공) | confirm API 올바른 파라미터로 호출, complete 페이지 이동, `sessionStorage.paymentSuccess` 저장 |
| confirm 네트워크 에러          | fail API 호출, fail 페이지 이동, `sessionStorage.paymentFail` 저장                             |
| confirm 응답 Zod 파싱 실패     | fail API 호출, fail 페이지 이동, `sessionStorage.paymentFail` 저장                             |
| confirm 응답 status 500        | fail API 호출, fail 페이지 이동, `sessionStorage.paymentFail` 저장                             |
