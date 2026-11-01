'use client';

import Image from 'next/image';
import { Icon } from '@iconify/react';
import type { GroupBuyFeedItemResponse } from '@moongchijang/api-client/generated/api.schemas';

export const FeedCard = ({
  storeName,
  regionLabel,
  productName,
  price,
  thumbnailUrl,
  pickupDateLabel,
}: GroupBuyFeedItemResponse) => {
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
      </div>

      <div className="flex flex-1 flex-col justify-between p-4">
        <div className="flex items-center justify-between body-md-medium text-text-tertiary">
          <div className="flex items-center gap-1">
            <Icon
              icon="typcn:location"
              className="h-[18px] w-4 text-icon-primary"
            />
            <span className="caption-sm-bold">
              {storeName} | {regionLabel}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          <span className="truncate heading-md-bold text-text-basic min-w-0">
            {productName}
          </span>
          <span className="shrink-0 caption-sm-medium text-text-disabled">
            • 픽업 {pickupDateLabel}
          </span>
        </div>

        <div className="heading-1xl-bold text-text-basic">
          {(price ?? 0).toLocaleString()}원
        </div>
      </div>
    </div>
  );
};
