# v2에서 수정 후 재사용하는 v1 컴포넌트

v2 GUI([Figma 2차 GUI](https://www.figma.com/design/aSmUN95u8N3JE2kCSYz7nN/%EC%82%AC%EA%B3%A0%EB%AD%89%EC%B9%98-%EC%9E%91%EC%97%85%EC%8B%A4?node-id=6747-2136)) 기준으로, 통째로 대체되지 않고 일부만 고쳐서 계속 쓰는 v1 컴포넌트 목록입니다. v2에 없는 라우트, 미사용 컴포넌트, v2에서 통째로 대체되는 컴포넌트(`WishlistCard`, `ParticipationTab`, `ParticipationCard`)는 MCJ-1650에서 제거했습니다. 그래서 현재 찜 목록과 마이페이지 참여 내역은 비어 있습니다.

경로는 `apps/web/src/` 기준입니다.

## 공통

| 컴포넌트                     | 변경 내용                                                                        |
| ---------------------------- | -------------------------------------------------------------------------------- |
| `components/GNB.tsx`         | 탭을 피드 · 뭉쳐서사기 · 찜 · 마이페이지로 변경, 뭉쳐서사기 탭에 할 일 개수 뱃지 |
| `components/Modal.tsx`       | 틀 유지, v2 `Modal-*` 디자인으로 내용 교체                                       |
| `components/BottomSheet.tsx` | 틀 유지, v2 `Bottomsheet-*` 디자인으로 내용 교체                                 |
| `components/ShareBtn.tsx`    | 상품 상세 "공유하기" 버튼, v2 스타일 적용                                        |

## 피드 `/feed`

| 컴포넌트                                              | 변경 내용                                                                          |
| ----------------------------------------------------- | ---------------------------------------------------------------------------------- |
| `feed/_components/FilterBar.tsx`                      | 칩을 전체 · 이번 주 픽업 · 적게 사도 OK · 새로 들어왔어요로 변경                   |
| `feed/_components/FeedCard.tsx`                       | D-day·달성률 게이지·고정 픽업일 제거 → 1개 가격, 최소 수량, 픽업 가능 시작일, 휴무 |
| `feed/_components/FeedTopBar.tsx`                     | QR 아이콘을 오늘 픽업하는 총대에게만 노출                                          |
| `feed/_components/QrModal.tsx`                        | 총대 전용으로 축소                                                                 |
| `feed/_components/SearchOverlay.tsx`, `SearchBar.tsx` | 최근·추천 검색어, 결과 없음 시 입점 요청 카드                                      |
| `feed/_components/EmptyState.tsx`                     | "공구 개설을 요청해보세요" 문구 제거                                               |

## 상품 상세 `/item/[groupBuyId]`

| 컴포넌트                                       | 변경 내용                                                |
| ---------------------------------------------- | -------------------------------------------------------- |
| `item/[groupBuyId]/_components/TopInfo.tsx`    | 달성률·마감일 제거, 픽업 가능 기간·휴무일·최소/최대 수량 |
| `item/[groupBuyId]/_components/DetailTab.tsx`  | 유의사항 탭 내용 전면 교체 (명세 1.2.5)                  |
| `item/[groupBuyId]/_components/BottomJoin.tsx` | "공구 참여하기" → 혼자 사기 / 뭉쳐서 사기 CTA            |
| `item/[groupBuyId]/_components/Toast.tsx`      | v2 `PDP-Toast` 스타일                                    |

## 참여·결제

| 컴포넌트                                                 | 변경 내용                                                                          |
| -------------------------------------------------------- | ---------------------------------------------------------------------------------- |
| `item/[groupBuyId]/join/_components/JoinForm.tsx`        | 결제 금액 영역(상품 금액·수수료 0%·최종 결제) 유지, 혼자 사기 결제 화면으로 재구성 |
| `item/[groupBuyId]/join/_components/NumStepper.tsx`      | v2 `Num` 스타일, 최소 구매 수량 자동 설정                                          |
| `item/[groupBuyId]/join/_components/AgreeTermsSheet.tsx` | 동의 문구 변경 (판매자는 매장, 취소·환불은 매장 정책)                              |
| `payment/complete/_components/PaymentCompleteClient.tsx` | 매장 정산 안내 + 정산 계좌 등록 버튼 추가                                          |

## 알림 `/notifications`

| 컴포넌트                                     | 변경 내용                                         |
| -------------------------------------------- | ------------------------------------------------- |
| `notifications/_components/NoticeClient.tsx` | 탭을 전체 · 함께 사기 · 정산 · 픽업 · 찜으로 변경 |
| `notifications/_components/NoticeItem.tsx`   | 알림 카드에 CTA 버튼(결제하기 등) 추가            |
