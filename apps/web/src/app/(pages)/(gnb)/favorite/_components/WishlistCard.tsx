'use client';

import Image from 'next/image';
import { Icon } from '@iconify/react';
import { cn } from '@/lib/utils';
import type { WishlistItemResponse } from '@moongchijang/api-client/generated/api.schemas';

interface WishlistCardProps extends WishlistItemResponse {
  onRemove: () => void;
  isRemoving?: boolean;
}

export const WishlistCard = ({
  thumbnailUrl,
  storeName,
  regionLabel,
  productName,
  price,
  onRemove,
  isRemoving = false,
}: WishlistCardProps) => {
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
      </div>
    </div>
  );
};
