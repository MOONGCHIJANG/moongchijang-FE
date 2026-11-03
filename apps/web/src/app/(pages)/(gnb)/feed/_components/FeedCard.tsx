'use client';

import Image from 'next/image';
import { Icon } from '@iconify/react';
import type { GroupBuyFeedItemResponse } from '@moongchijang/api-client/generated/api.schemas';
import type { FeedCardExtra } from '../_hooks/useFeedHomePlaceholder';

// FeedCardExtra 필드는 아직 피드 API에 없어 값이 올 때만 노출
type FeedCardProps = Pick<
  GroupBuyFeedItemResponse,
  'storeName' | 'districtLabel' | 'productName' | 'price' | 'thumbnailUrl'
> &
  FeedCardExtra;

const BADGE =
  'min-w-10 rounded-medium px-1.75 py-1.25 text-center caption-xs-bold';

export const FeedCard = ({
  storeName,
  districtLabel,
  productName,
  price,
  thumbnailUrl,
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
            className={`${BADGE} absolute left-2.5 top-2.25 bg-surface-brand text-text-basic-inverse`}
          >
            NEW
          </span>
        )}
      </div>

      <div className="flex flex-col px-2">
        <div className="flex items-center gap-1 text-text-tertiary">
          <Icon
            icon="typcn:location"
            className="h-[18px] w-4 shrink-0 text-icon-primary"
          />
          <span className="truncate caption-sm-medium">
            {storeName} | {districtLabel}
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
            <span className="pb-1.5 caption-sm-medium text-text-tertiary">
              / {unitQuantity}개
            </span>
          )}
        </div>
      </div>

      {hasBadges && (
        <div className="flex gap-1 px-2">
          {minQuantity != null && (
            <span
              className={`${BADGE} bg-surface-brand-lighter text-text-brand`}
            >
              최소 {minQuantity}개부터
            </span>
          )}
          {closedDayLabel && (
            <span className={`${BADGE} bg-surface-default text-text-tertiary`}>
              {closedDayLabel}
            </span>
          )}
        </div>
      )}

      {teamCount != null && teamCount > 0 && (
        <div className="flex items-center justify-center gap-0.5 px-2 text-text-brand">
          <Icon icon="boxicons:community-filled" className="size-[18px]" />
          <span className="caption-sm-bold">
            지금 {teamCount}팀이 함께 모으는 중
          </span>
        </div>
      )}
    </div>
  );
};
