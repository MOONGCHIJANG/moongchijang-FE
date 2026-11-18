import { cn } from '@/lib/utils';

interface Props {
  /** 예: '9/23(수) 15:00' */
  pickupLabel: string;
  /** 픽업 일시 아래 보조 문구 (예: '결제 마감 9/22(화) 23:59') */
  subText?: string;
  /** '변경' 클릭 — 픽업 일시 선택 화면으로 돌아가기 */
  onChange: () => void;
  className?: string;
  /** '변경' 버튼 스타일 덮어쓰기 (디자인마다 색이 다름) */
  changeButtonClassName?: string;
}

/** 선택한 픽업 일시 + '변경' 버튼 카드 (같이 사기 바텀시트 / 혼자 사기 결제 공통) */
const PickupSummaryCard = ({
  pickupLabel,
  subText,
  onChange,
  className,
  changeButtonClassName,
}: Props) => (
  <div
    className={cn(
      'flex items-center justify-between rounded-xlarge border border-border-subtle bg-surface-white',
      className,
    )}
  >
    <div className="flex flex-col gap-g1">
      <p className="heading-sm-semibold text-text-basic">{pickupLabel} 픽업</p>
      {subText && (
        <p className="caption-sm-medium text-text-tertiary">{subText}</p>
      )}
    </div>
    <button
      type="button"
      onClick={onChange}
      className={cn(
        'caption-sm-medium text-text-disabled cursor-pointer',
        changeButtonClassName,
      )}
    >
      변경
    </button>
  </div>
);

export default PickupSummaryCard;
