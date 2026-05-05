'use client';

import Image from 'next/image';
import { Icon } from '@iconify/react';
import { cn } from '@/lib/utils';
import type { GroupBuyFeedItem } from '@/api/generated/api.schemas';

export const FeedCard = ({
  dDay,
  pickupDate,
  storeName,
  region,
  currentQuantity,
  targetQuantity,
  productName,
  price,
  achievementRate,
  thumbnailUrl,
}: GroupBuyFeedItem) => {
  const DDAY_URGENCY_THRESHOLD = 4;
  const dDayLabel = dDay === 0 ? 'D-day' : `D-${dDay}`;
  const isUrgent = dDay < DDAY_URGENCY_THRESHOLD;

  const parts = pickupDate?.split('-');
  const formattedPickupDate =
    parts?.length === 3 ? `${parts[1]}월 ${parts[2]}일` : pickupDate;

  return (
    <div className="flex h-[272px] flex-col overflow-hidden rounded-xl bg-bg-white shadow-sm">
      <div className="relative h-[140px] shrink-0 bg-gray-200">
        {thumbnailUrl && (
          <Image
            src={thumbnailUrl}
            alt={productName}
            fill
            className="object-cover"
          />
        )}
        <div
          className={cn(
            'absolute left-0 top-0 min-w-[58px] h-[36px] rounded-br-[16px] px-2 py-1.5 text-center body-md-bold text-text-basic-inverse',
            isUrgent ? 'bg-surface-brand' : 'bg-surface-inverse',
          )}
        >
          {dDayLabel}
        </div>
      </div>

      <div className="flex flex-1 flex-col justify-between p-4">
        <div className="flex items-center justify-between body-md-medium text-text-tertiary">
          <div className="flex items-center gap-1">
            <Icon
              icon="typcn:location"
              className="h-[18px] w-4 text-icon-primary"
            />
            <span className="caption-sm-bold">
              {storeName} | {region}
            </span>
          </div>
          <div className="flex items-center gap-1 rounded-lg bg-surface-brand-lighter px-2 py-0.5 body-sm-bold text-text-brand">
            <Icon icon="fa7-solid:bag-shopping" className="h-3.5 w-3.5" />
            <span className="caption-xs-bold">
              {currentQuantity} / {targetQuantity}
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between gap-2">
          <div className="line-clamp-1 flex-1 heading-md-bold text-text-basic">
            {productName}
          </div>
          <span className="shrink-0 caption-sm-medium text-text-disabled">
            • 픽업 {formattedPickupDate}
          </span>
        </div>

        <div className="heading-1xl-bold text-text-basic">
          {(price ?? 0).toLocaleString()}원
        </div>

        <div className="flex items-center gap-2">
          <div className="relative h-2 flex-1 overflow-hidden rounded-full bg-gray-200">
            <div
              className="absolute left-0 top-0 h-full rounded-full bg-surface-brand transition-all duration-300"
              style={{ width: `${achievementRate}%` }}
            />
          </div>
          <span className="body-lg-bold text-text-brand">
            {achievementRate}%
          </span>
        </div>
      </div>
    </div>
  );
};
