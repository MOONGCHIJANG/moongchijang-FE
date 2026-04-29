'use client';

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
}: GroupBuyFeedItem) => {
  const DDAY_URGENCY_THRESHOLD = 4;
  const dDayLabel = dDay === 0 ? 'D-day' : `D-${dDay}`;
  const isUrgent = dDay < DDAY_URGENCY_THRESHOLD;

  const parts = pickupDate?.split('-');
  const formattedPickupDate =
    parts?.length === 3 ? `${parts[1]}월 ${parts[2]}일` : pickupDate;

  return (
    <div className="flex h-[272px] flex-col overflow-hidden rounded-2xl bg-white shadow-sm">
      <div className="relative h-[140px] shrink-0 bg-gray-200">
        <div
          className={cn(
            'absolute left-0 top-0 min-w-[58px] rounded-br-2xl px-2 py-1.5 text-center text-caption-md-medium font-bold text-white',
            isUrgent ? 'bg-primary-400' : 'bg-surface-alpha',
          )}
        >
          {dDayLabel}
        </div>
      </div>

      <div className="flex flex-1 flex-col justify-between p-4">
        <div className="flex items-center justify-between text-caption-md-medium text-gray-500">
          <div className="flex items-center gap-1">
            <Icon
              icon="solar:map-point-bold"
              className="h-4 w-4 text-primary-400"
            />
            <span>
              {storeName} | {region}
            </span>
          </div>
          <div className="flex items-center gap-1 rounded bg-primary-50 px-2 py-0.5 text-caption-sm-medium font-bold text-primary-400">
            <Icon
              icon="solar:users-group-rounded-bold"
              className="h-3.5 w-3.5"
            />
            <span>
              {currentQuantity} / {targetQuantity}
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between gap-2">
          <div className="line-clamp-1 flex-1 text-heading-sm-bold text-gray-900">
            {productName}
          </div>
          <span className="shrink-0 text-caption-md-regular text-gray-400">
            픽업 {formattedPickupDate}
          </span>
        </div>

        <div className="text-heading-md-bold text-gray-900">
          {(price ?? 0).toLocaleString()}원
        </div>

        <div className="flex items-center gap-2">
          <div className="relative h-2 flex-1 overflow-hidden rounded-full bg-gray-200">
            <div
              className="absolute left-0 top-0 h-full rounded-full bg-primary-400 transition-all duration-300"
              style={{ width: `${achievementRate}%` }}
            />
          </div>
          <span className="text-caption-md-medium font-bold text-primary-400">
            {achievementRate}%
          </span>
        </div>
      </div>
    </div>
  );
};
