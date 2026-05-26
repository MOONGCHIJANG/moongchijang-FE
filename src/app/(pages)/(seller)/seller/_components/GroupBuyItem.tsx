import { Icon } from '@iconify/react';
import type {
  ApiResponseOwnerGroupBuyListDataItem,
  ApiResponseOwnerGroupBuyListDataItemStatus,
} from '@/api/generated/api.schemas';
import { ApiResponseOwnerGroupBuyListDataItemStatus as Status } from '@/api/generated/api.schemas';

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

function formatDeadlineDate(deadline: string): string {
  const date = new Date(deadline);
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const dayNames = ['일', '월', '화', '수', '목', '금', '토'];
  return `${month}/${day}(${dayNames[date.getDay()]})`;
}

type Props = { item: ApiResponseOwnerGroupBuyListDataItem };

export function GroupBuyItem({ item }: Props) {
  const dDay = calcDDay(item.deadline);
  const dDayLabel =
    dDay > 0 ? `공구마감D-${dDay}` : dDay === 0 ? '공구마감D-day' : '마감';
  const clampedRate = Math.min(Math.max(item.achievementRate, 0), 100);

  return (
    <div className="flex flex-col gap-2.5 rounded-2xl bg-white px-4 py-4 shadow-sm">
      {/* 배지 행 */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <span className="rounded-full bg-surface-brand-lighter px-2.5 py-0.5 text-xs font-medium text-text-brand">
            {STATUS_LABEL[item.status]}
          </span>
          <span className="rounded-full border border-border-gray-200 px-2.5 py-0.5 text-xs font-medium text-text-secondary">
            {dDayLabel}
          </span>
        </div>
        <Icon
          icon="lucide:chevron-right"
          className="h-4 w-4 text-icon-disabled"
        />
      </div>

      {/* 상품명 */}
      <p className="body-md-bold text-text-basic">{item.productName}</p>

      {/* 가격 · 픽업일 */}
      <p className="body-sm-regular text-text-secondary">
        {item.price.toLocaleString('ko-KR')}원 · 픽업{' '}
        {formatDeadlineDate(item.deadline)}
      </p>

      {/* 프로그레스바 + 달성률 */}
      <div className="flex items-center gap-2">
        <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-bg-gray-100">
          <div
            className="h-full rounded-full bg-brand-primary transition-all"
            style={{ width: `${clampedRate}%` }}
          />
        </div>
        <span className="w-9 shrink-0 text-right text-xs font-medium text-text-brand">
          {item.achievementRate}%
        </span>
      </div>
    </div>
  );
}
