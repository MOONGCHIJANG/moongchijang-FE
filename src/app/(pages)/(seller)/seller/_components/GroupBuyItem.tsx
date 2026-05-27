import Link from 'next/link';
import { Icon } from '@iconify/react';
import type {
  ApiResponseOwnerGroupBuyListDataItem,
  ApiResponseOwnerGroupBuyListDataItemStatus,
} from '@/api/generated/api.schemas';
import { ApiResponseOwnerGroupBuyListDataItemStatus as Status } from '@/api/generated/api.schemas';
import { Badge } from '@/components/Badge';
import { formatPickupDate } from '@/lib/date';
import { GroupBuyProgressBar } from './GroupBuyProgressBar';

const STATUS_LABEL: Record<ApiResponseOwnerGroupBuyListDataItemStatus, string> =
  {
    [Status.IN_PROGRESS]: '진행중',
    [Status.ACHIEVED]: '달성',
    [Status.FAILED]: '미달',
  };

function calcDDay(deadline: string): number {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const end = new Date(deadline);
  end.setHours(0, 0, 0, 0);
  return Math.ceil((end.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
}

type Props = { item: ApiResponseOwnerGroupBuyListDataItem };

export function GroupBuyItem({ item }: Props) {
  const dDay = calcDDay(item.deadline);
  const dDayLabel =
    dDay > 0 ? `공구마감D-${dDay}` : dDay === 0 ? '공구마감D-day' : '마감';

  return (
    <Link
      href={`/seller/management/${item.groupBuyId}`}
      className="flex flex-col gap-2.5 rounded-2xl bg-white px-4 py-4 shadow-sm"
    >
      {/* 배지 행 */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <Badge
            label={STATUS_LABEL[item.status]}
            className="bg-surface-brand-lighter"
            textClassName="text-text-brand caption-xs-bold"
          />
          <Badge
            label={dDayLabel}
            className="bg-surface-brand-lighter"
            textClassName="text-text-brand caption-xs-bold"
          />
        </div>
        <Icon
          icon="lucide:chevron-right"
          className="h-4 w-4 text-icon-disabled"
        />
      </div>

      {/* 상품명 */}
      <p className="heading-md-bold text-text-basic">{item.productName}</p>

      {/* 가격 · 픽업일 */}
      <p className="body-md-regular text-text-tertiary">
        {item.price.toLocaleString('ko-KR')}원 · 픽업{' '}
        {formatPickupDate(item.deadline)}
      </p>

      {/* 프로그레스바 */}
      <GroupBuyProgressBar achievementRate={item.achievementRate} />
    </Link>
  );
}
