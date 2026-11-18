import type { ApiResponseGroupBuyDetailResponseData } from '@moongchijang/api-client/generated/api.schemas';

export interface OrderAvailability {
  /** 지금 주문 가능한지 */
  isOrderable: boolean;
  /** 매장 휴무 기간 안내 (예: '10/6(월) ~ 10/19(일) 휴무') */
  closedPeriodLabel: string;
  /** 정보 표 '주문 가능일' 값 (예: '10/20(월)부터 예정') */
  nextOrderableLabel: string;
  /** 바텀시트 비활성 버튼 보조 문구 (예: '10/20(월)부터 다시 열려요') */
  reopenLabel: string;
  /** 정보 표 '최소 수량' 값 (예: '10개부터') */
  minQuantityLabel: string;
}

/**
 * 상품 상세의 주문 가능 여부와 주문 불가 시 안내 문구를 한 곳에서 계산한다.
 * TopInfo / BottomJoin 등 화면 컴포넌트는 이 결과만 사용한다.
 */
export const getOrderAvailability = (
  data: ApiResponseGroupBuyDetailResponseData,
): OrderAvailability => {
  const isOrderable = data.canParticipate && !data.isClosed;

  // TODO(API): 휴무 기간·다음 주문 가능일·최소 수량 필드가 생기면 아래 임시 문구를 교체
  return {
    isOrderable,
    closedPeriodLabel: '10/6(월) ~ 10/19(일) 휴무',
    nextOrderableLabel: '10/20(월)부터 예정',
    reopenLabel: '10/20(월)부터 다시 열려요',
    minQuantityLabel: '10개부터',
  };
};
