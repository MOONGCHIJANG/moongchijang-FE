'use client';

import type { ReactNode } from 'react';
import Image from 'next/image';
import { Icon } from '@iconify/react';
import { cn } from '@/lib/utils';

// 아직 피드 API에 없는 필드라 값이 올 때만 노출
export type FeedCardExtra = {
  isNew?: boolean;
  minQuantity?: number;
  closedDayLabel?: string;
  teamCount?: number;
  unitQuantity?: number;
};

type FeedCardProps = {
  storeName: string;
  locationLabel: string;
  productName: string;
  price?: number;
  thumbnailUrl?: string | null;
  /** 배지 줄 오른쪽 슬롯 (예: 찜 화면의 하트 버튼) */
  action?: ReactNode;
} & FeedCardExtra;

const BADGE =
  'min-w-10 rounded-medium px-1.75 py-1.25 text-center caption-xs-bold';

export const FeedCard = ({
  storeName,
  locationLabel,
  productName,
  price,
  thumbnailUrl,
  action,
  isNew,
  minQuantity,
  closedDayLabel,
  teamCount,
  unitQuantity,
}: FeedCardProps) => {
  const hasBadges = minQuantity != null || !!closedDayLabel;

  return (
    <div className="flex flex-col gap-2 overflow-hidden rounded-xlarge bg-bg-white pb-2 shadow-[0_0_10px_0_rgba(0,0,0,0.2)]">
      <div className="relative h-[140px] w-full shrink-0 bg-gray-200">
        {thumbnailUrl && (
          <Image
            src={thumbnailUrl}
            alt={productName}
            fill
            className="object-cover"
          />
        )}
        {isNew && (
          <span
            className={cn(
              BADGE,
              'absolute left-2.5 top-2.25 bg-surface-brand text-text-basic-inverse',
            )}
          >
            NEW
          </span>
        )}
      </div>

      <div className="flex flex-col px-2">
        <div className="flex items-center gap-1 text-text-tertiary">
          <Icon
            icon="typcn:location"
            aria-hidden
            className="h-[18px] w-4 shrink-0 text-icon-primary"
          />
          <span className="truncate caption-sm-medium">
            {storeName} | {locationLabel}
          </span>
        </div>
        <span className="truncate heading-sm-semibold text-text-basic">
          {productName}
        </span>
        <div className="flex items-end gap-1">
          <span className="heading-1xl-semibold text-text-basic">
            {(price ?? 0).toLocaleString()}원
          </span>
          {unitQuantity != null && (
            <span className="pb-0.75 caption-sm-medium text-text-tertiary">
              / {unitQuantity}개
            </span>
          )}
        </div>
      </div>

      {(hasBadges || action) && (
        <div className="flex items-center justify-between px-2">
          <div className="flex gap-1">
            {minQuantity != null && (
              <span
                className={cn(
                  BADGE,
                  'bg-surface-brand-lighter text-text-brand',
                )}
              >
                최소 {minQuantity}개부터
              </span>
            )}
            {closedDayLabel && (
              <span
                className={cn(BADGE, 'bg-surface-default text-text-tertiary')}
              >
                {closedDayLabel}
              </span>
            )}
          </div>
          {action}
        </div>
      )}

      {teamCount != null && teamCount > 0 && (
        <div className="flex items-center gap-0.5 px-[7px] text-text-brand">
          <Icon
            icon="boxicons:community-filled"
            aria-hidden
            className="size-[18px] shrink-0"
          />
          <span className="whitespace-nowrap caption-sm-bold">
            지금 {teamCount}팀이 함께 모으는 중
          </span>
        </div>
      )}
    </div>
  );
};
