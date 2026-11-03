'use client';

import { Icon } from '@iconify/react';
import type { TodayPickup } from '../_hooks/useFeedHomePlaceholder';

interface PickupCardProps extends TodayPickup {
  onOpenQr?: () => void;
}

export const PickupCard = ({
  pickupAtLabel,
  productName,
  storeName,
  participantCount,
  onOpenQr,
}: PickupCardProps) => {
  return (
    <div className="flex items-center justify-between gap-2 rounded-2xlarge bg-[linear-gradient(165deg,var(--color-brand-primary)_36%,var(--color-brand-secondary)_111%)] px-2.5 py-3 text-text-basic-inverse">
      <div className="flex min-w-0 flex-col gap-0.5">
        <span className="caption-sm-regular">오늘 픽업 {pickupAtLabel}</span>
        <span className="truncate heading-sm-semibold">
          {productName} · {storeName}
        </span>
        <div className="flex items-center gap-0.5 caption-sm-regular">
          <Icon icon="iconamoon:store-fill" className="size-3 shrink-0" />
          <span className="caption-sm-bold">{storeName}</span>
          <span>• 참여자 {participantCount}명에게 나눠주세요</span>
        </div>
      </div>
      <button
        type="button"
        onClick={onOpenQr}
        className="h-11 w-19 shrink-0 rounded-2xlarge bg-button-white heading-sm-bold text-text-brand"
      >
        QR 열기
      </button>
    </div>
  );
};
