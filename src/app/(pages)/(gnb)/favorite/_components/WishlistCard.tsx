'use client';

import Image from 'next/image';
import { Icon } from '@iconify/react';
import { cn } from '@/lib/utils';
import type { WishlistItemResponse } from '@/api/generated/api.schemas';

interface WishlistCardProps extends WishlistItemResponse {
  onRemove: () => void;
  isRemoving?: boolean;
}

export const WishlistCard = ({
  thumbnailUrl,
  dDay,
  dDayLabel,
  storeName,
  regionLabel,
  productName,
  price,
  achievementRate,
  onRemove,
  isRemoving = false,
}: WishlistCardProps) => {
  const isUrgent = dDay >= 0 && dDay < 4;

  return (
    <div
      className={cn(
        'flex gap-3 px-4 py-3 bg-bg-white border-b border-border-default transition-opacity',
        isRemoving && 'opacity-50 pointer-events-none',
      )}
    >
      {/* 썸네일 */}
      <div className="relative w-[109px] h-[109px] rounded-xl overflow-hidden bg-gray-200 shrink-0">
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
            'absolute top-0 left-0 px-2 py-1 caption-xs-bold text-text-basic-inverse',
            'rounded-tl-xl rounded-br-xl',
            isUrgent ? 'bg-surface-brand' : 'bg-surface-inverse',
          )}
        >
          {dDayLabel}
        </div>
      </div>

      {/* 컨텐츠 */}
      <div className="flex flex-1 flex-col justify-between min-w-0">
        {/* 가게명 | 지역 + 하트 */}
        <div className="flex items-start justify-between gap-2">
          <span className="caption-sm-regular text-text-tertiary font-pretendard truncate flex-1">
            {storeName} | {regionLabel}
          </span>
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onRemove();
            }}
            disabled={isRemoving}
            className="shrink-0"
            aria-label="찜 해제"
          >
            <Icon
              icon="solar:heart-bold"
              className="w-6 h-6 text-surface-brand"
            />
          </button>
        </div>

        {/* 상품명 */}
        <span className="heading-md-bold text-text-basic font-pretendard line-clamp-2">
          {productName}
        </span>

        {/* 가격 */}
        <span className="heading-md-bold text-text-basic font-pretendard">
          {(price ?? 0).toLocaleString()}원
        </span>

        {/* 달성률 */}
        <div className="flex items-center gap-2">
          <div className="relative h-1.5 flex-1 overflow-hidden rounded-full bg-gray-200">
            <div
              className="absolute left-0 top-0 h-full rounded-full bg-surface-brand transition-all"
              style={{ width: `${achievementRate}%` }}
            />
          </div>
          <span className="body-lg-bold text-text-brand font-pretendard w-8 text-right shrink-0">
            {achievementRate}%
          </span>
        </div>
      </div>
    </div>
  );
};
