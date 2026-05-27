import Link from 'next/link';
import { Icon } from '@iconify/react';
import {
  OwnerGroupBuyManageListItem,
  OwnerGroupBuyManageListItemStatus as Status,
} from '@/api/generated/api.schemas';
import { Badge } from '@/components/Badge';
import { formatPickupDate } from '@/lib/date';
import { GroupBuyProgressBar } from '../../_components/GroupBuyProgressBar';

const STATUS_CONFIG: Record<
  OwnerGroupBuyManageListItem['status'],
  { label: string; badgeClassName: string; textClassName: string }
> = {
  [Status.ALL]: {
    label: '전체',
    badgeClassName: 'bg-surface-default',
    textClassName: 'text-text-secondary caption-xs-bold',
  },
  [Status.IN_PROGRESS]: {
    label: '진행중',
    badgeClassName: 'bg-surface-brand-lighter',
    textClassName: 'text-text-brand caption-xs-bold',
  },
  [Status.ACHIEVED]: {
    label: '달성',
    badgeClassName: 'bg-[var(--color-success-25)]',
    textClassName: 'text-text-success caption-xs-bold',
  },
  [Status.ENDED]: {
    label: '종료',
    badgeClassName: 'bg-surface-default',
    textClassName: 'text-text-secondary caption-xs-bold',
  },
  [Status.PENDING_APPROVAL]: {
    label: '승인대기',
    badgeClassName: 'bg-[#FFFAEB]',
    textClassName: 'text-[#B54708] caption-xs-bold',
  },
};

type Props = { item: OwnerGroupBuyManageListItem };

export function ManageGroupBuyItem({ item }: Props) {
  const config = STATUS_CONFIG[item.status];

  const dDayLabel =
    item.deadlineDday != null
      ? item.deadlineDday > 0
        ? `공구마감 D-${item.deadlineDday}`
        : item.deadlineDday === 0
          ? '공구마감 D-day'
          : '마감'
      : null;

  const pickupDDayLabel =
    item.status === Status.ACHIEVED && item.deadlineDday != null
      ? `픽업 D-${item.deadlineDday}`
      : null;

  return (
    <Link
      href={`/seller/management/${item.groupBuyId}`}
      className="flex flex-col gap-2.5 rounded-2xl bg-white px-4 py-4 shadow-sm"
    >
      {/* 배지 행 */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <Badge
            label={config.label}
            className={config.badgeClassName}
            textClassName={config.textClassName}
          />
          {item.status === Status.IN_PROGRESS && dDayLabel && (
            <Badge
              label={dDayLabel}
              className="bg-surface-brand-lighter"
              textClassName="text-text-brand caption-xs-bold"
            />
          )}
          {item.status === Status.ACHIEVED && pickupDDayLabel && (
            <Badge
              label={pickupDDayLabel}
              className="bg-[var(--color-success-25)]"
              textClassName="text-text-success caption-xs-bold"
            />
          )}
        </div>
        <Icon
          icon="lucide:chevron-right"
          className="h-4 w-4 text-icon-disabled"
        />
      </div>

      {/* 상품명 */}
      <p className="heading-md-bold text-text-basic">{item.productName}</p>

      {/* 가격 · 부가 정보 */}
      <p className="body-md-regular text-text-tertiary">
        {item.price.toLocaleString('ko-KR')}원 ·{' '}
        {item.status === Status.PENDING_APPROVAL
          ? '운영자 검토 중'
          : `픽업 ${formatPickupDate(item.pickupDate)}`}
      </p>

      {/* 진행중: 프로그레스바 */}
      {item.status === Status.IN_PROGRESS && item.achievementRate != null && (
        <GroupBuyProgressBar achievementRate={item.achievementRate} />
      )}

      {/* 달성: QR 스캔 준비 버튼 */}
      {item.status === Status.ACHIEVED && (
        <button
          type="button"
          onClick={(e) => e.preventDefault()}
          className="w-full rounded-xl border border-border-gray-200 py-2.5 body-sm-medium text-text-secondary"
        >
          QR 스캔 준비
        </button>
      )}
    </Link>
  );
}
