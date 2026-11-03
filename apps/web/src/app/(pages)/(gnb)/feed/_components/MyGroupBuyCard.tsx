import { Icon } from '@iconify/react';
import { cn } from '@/lib/utils';
import type { MyGroupBuy } from '../_hooks/useFeedHomePlaceholder';

const ActionLink = ({ label }: { label: string }) => (
  <span className="flex items-center body-sm-bold text-text-brand">
    {label}
    <Icon icon="lucide:chevron-right" className="size-[18px]" />
  </span>
);

export const MyGroupBuyCard = (item: MyGroupBuy) => {
  return (
    <div
      className={cn(
        'flex h-30 w-62.5 shrink-0 flex-col justify-between rounded-[14px] border px-3 py-2',
        item.hasTodo
          ? 'border-border-brand bg-surface-secondary-lighter'
          : 'border-border-subtle bg-surface-white',
      )}
    >
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-1">
          {item.isHost ? (
            <span className="flex h-4 items-center gap-0.5 rounded-xlarge bg-surface-brand-lighter px-1 caption-xs-bold text-text-brand">
              <Icon icon="fa7-solid:crown" className="size-3" />
              총대
            </span>
          ) : (
            <span className="flex h-4 items-center rounded-xlarge border-[0.8px] border-border-strong bg-surface-white px-2 caption-xs-bold text-text-tertiary">
              참여
            </span>
          )}
          {item.hasTodo && (
            <span className="flex h-4 items-center rounded-xlarge bg-surface-brand px-2 caption-xs-bold text-text-basic-inverse">
              할 일
            </span>
          )}
          {item.deadlineLabel && (
            <span className="caption-sm-bold text-text-brand">
              {item.deadlineLabel}
            </span>
          )}
        </div>
        <span className="truncate heading-sm-semibold text-text-basic">
          {item.title}
        </span>
      </div>

      {item.status === 'transfer' ? (
        <div className="flex flex-col">
          <div className="flex gap-1 caption-sm-regular text-text-tertiary">
            총대가 결제했어요
            <span className="caption-sm-bold text-text-brand">
              {item.amount.toLocaleString()}원 보낼 차례
            </span>
          </div>
          <ActionLink label="송금하러 가기" />
        </div>
      ) : (
        <div className="flex flex-col gap-1">
          <div className="caption-sm-regular text-text-tertiary">
            {item.currentQuantity}개 모였어요 ·{' '}
            <span className="caption-sm-bold text-text-brand">
              {Math.max(item.targetQuantity - item.currentQuantity, 0)}개 더
            </span>{' '}
            모이면 결제
          </div>
          <div className="h-1.5 w-full overflow-hidden rounded-[3px] bg-surface-muted">
            <div
              className="h-full rounded-[3px] bg-surface-brand"
              style={{
                width: `${Math.min((item.currentQuantity / item.targetQuantity) * 100, 100)}%`,
              }}
            />
          </div>
          <ActionLink label={item.isHost ? '친구 초대하기' : '방 보기'} />
        </div>
      )}
    </div>
  );
};
