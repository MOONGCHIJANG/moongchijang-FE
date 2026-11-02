# 입점 요청 API가 희망 수량·희망 픽업 날짜를 아직 필수로 받음

## 무엇이 다른지

- 기능명세 v2 2.1.2: 입점 요청 폼에서 `희망 참여 수량`·`희망 픽업 날짜` 필드를 삭제합니다 (필수: 매장, 상품명 / 선택: 추가 요청사항).
- 실제 API: `GroupBuyRequestCreate`에 `desiredQuantity`(`@minimum 1`)와 `desiredPickupDate`가 여전히 필수 필드입니다.

## 어디서 확인했는지

- `packages/api-client/src/generated/api.schemas.ts`의 `GroupBuyRequestCreate`
- 사용처: `apps/web/src/app/(pages)/request/_components/RequestFormStep.tsx`, `RequestConfirmModal.tsx`, `RequestDetailClient.tsx`

## 왜 지금 우리 코드에서 고치면 안 되는지

필드를 폼에서 지우면 필수값이 빠져 제출이 실패합니다. 임의의 기본값을 채워 보내는 것은 스펙 추측이므로 하지 않습니다. MCJ-1650 레거시 삭제에서는 필드를 그대로 두었습니다.

## 언제/누가 해결해야 하는지

백엔드가 두 필드를 제거하거나 optional로 바꾼 뒤, Orval 자동 생성 PR이 반영되면 프론트에서 필드·안내 문구(명세 2.1.3)·`DatePickerBottomSheet`를 함께 제거합니다.
