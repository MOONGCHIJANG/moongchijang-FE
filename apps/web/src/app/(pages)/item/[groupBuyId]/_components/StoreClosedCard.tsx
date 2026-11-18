interface Props {
  /** 예: '10/6(월) ~ 10/19(일) 휴무' */
  periodLabel: string;
}

/**
 * 매장 휴무로 주문할 수 없을 때 보여주는 안내 카드
 */
const StoreClosedCard = ({ periodLabel }: Props) => {
  return (
    <div className="w-full px-p5 py-p3 rounded-xlarge border border-border-natural bg-surface-secondary-lighter caption-sm-regular text-secondary-800">
      <p>
        <span aria-hidden>🏖️ </span>
        <span className="font-bold">매장이 쉬는 기간이에요</span>
      </p>
      <p>{periodLabel} 지금은 고를 수 있는 픽업 날짜가 없어요.</p>
    </div>
  );
};

export default StoreClosedCard;
