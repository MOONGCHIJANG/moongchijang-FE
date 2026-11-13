import Image from 'next/image';

interface Props {
  onClick: () => void;
}

/** 혼자 사기 결제 화면 — 같이 사기(뭉쳐서 사기)로 전환 유도 배너 */
const SplitPurchaseBanner = ({ onClick }: Props) => (
  <div className="flex items-center justify-between px-p5 py-p6 rounded-large bg-surface-default">
    <div className="flex items-center gap-g3">
      {/* 🛒 쇼핑카트 — Figma 레이어 3개를 원본 위치 그대로 겹침 */}
      <span className="relative size-8 shrink-0 overflow-clip">
        <span className="absolute inset-[6.25%_16.24%_63.36%_51.21%]">
          <Image src="/icons/split-cart-1.svg" alt="" fill />
        </span>
        <span className="absolute inset-[9.19%_42.77%_60.23%_24.74%]">
          <Image src="/icons/split-cart-2.svg" alt="" fill />
        </span>
        <span className="absolute inset-[26.84%_12.41%_4.26%_9.38%]">
          <Image src="/icons/split-cart-3.svg" alt="" fill />
        </span>
      </span>
      <div className="flex flex-col text-text-basic">
        <p className="caption-sm-bold">친구와 나눠 사면 부담이 줄어요.</p>
        <p className="caption-sm-regular">픽업 날짜는 그대로, 부담만 줄이기</p>
      </div>
    </div>
    <button
      type="button"
      onClick={onClick}
      className="shrink-0 px-p5 py-p2 rounded-xlarge bg-button-tertiary-fill caption-sm-bold text-text-brand cursor-pointer"
    >
      뭉쳐서 사기 →
    </button>
  </div>
);

export default SplitPurchaseBanner;
