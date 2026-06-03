'use client';

import { OwnerGroupBuyManageListItem } from '@/api/hooks/api.schemas';
import { Badge } from '@/components/Badge';
import { formatDate } from '@/lib/date';

type Props = {
  items: OwnerGroupBuyManageListItem[];
  isLoading: boolean;
};

export function SettlementGroupBuyList({ items, isLoading }: Props) {
  if (isLoading) {
    return (
      <div className="flex flex-col gap-3">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="h-24 animate-pulse rounded-2xl bg-bg-gray-100"
          />
        ))}
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <p className="body-sm-regular py-12 text-center text-text-secondary">
        정산 내역이 없어요
      </p>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {items.map((item) => {
        const amount = item.price * (item.currentQuantity ?? 0);
        return (
          <div
            key={item.groupBuyId}
            className="flex flex-col justify-between gap-3 rounded-2xl bg-surface-white px-4 py-4 shadow-sm"
          >
            <div className="flex items-start justify-between gap-2">
              <div className="flex flex-col gap-1">
                <p className="heading-sm-bold text-text-basic">
                  {item.productName}
                </p>
                <p className="body-sm-regular text-text-tertiary">
                  참여 {item.currentQuantity ?? 0}명 ·{' '}
                  {formatDate(item.pickupDate)}
                </p>
              </div>
              <Badge
                label="정산대기"
                className="min-w-[40px] bg-primary-50"
                textClassName="caption-xs-bold text-text-brand"
              />
            </div>
            <p className="heading-1xl-bold text-right text-text-basic">
              {amount.toLocaleString('ko-KR')}원
            </p>
          </div>
        );
      })}
    </div>
  );
}
