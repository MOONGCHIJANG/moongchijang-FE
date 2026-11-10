import { Icon } from '@iconify/react';
import { cn } from '@/lib/utils';
import type { MyGroupBuy } from '../_hooks/useFeedHomePlaceholder';

const ActionLink = ({ label }: { label: string }) => (
  <span className="flex h-5.5 items-start body-sm-bold text-text-brand">
    {label}
    <Icon icon="lucide:chevron-right" className="size-5.5" />
  </span>
);

const ProgressBar = ({
  current,
  target,
}: {
  current: number;
  target: number;
}) => (
  <div className="h-1.5 w-full overflow-hidden rounded-[3px] bg-surface-muted">
    <div
      className="h-full rounded-[3px] bg-surface-brand"
      style={{ width: `${Math.min((current / target) * 100, 100)}%` }}
    />
  </div>
);

export const MyGroupBuyCard = (item: MyGroupBuy) => {
  const remaining =
    item.status === 'collecting'
      ? Math.max(item.targetQuantity - item.currentQuantity, 0)
      : 0;

  return (
    <div
      className={cn(
        'flex w-62.5 shrink-0 flex-col rounded-[14px] border px-3',
        item.status === 'transfer' && 'h-30 gap-2 py-4',
        item.status === 'collecting' &&
          (item.isHost ? 'h-30 gap-3 py-4' : 'gap-1 py-2'),
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
      ) : item.isHost ? (
        <div className="flex flex-col gap-1">
          <ProgressBar
            current={item.currentQuantity}
            target={item.targetQuantity}
          />
          <div className="flex items-center justify-between">
            <div className="flex gap-1 caption-sm-regular text-text-tertiary">
              {item.currentQuantity}개 모였어요
              <span className="caption-sm-bold text-text-brand">
                {remaining}개 더
              </span>
            </div>
            <ActionLink label="친구 초대하기" />
          </div>
        </div>
      ) : (
        <>
          <div className="flex flex-col">
            <div className="flex gap-1 caption-sm-regular text-text-tertiary">
              <span>
                {item.currentQuantity}개 모였어요{' '}
                <span className="font-bold">·</span>
              </span>
              <span className="flex gap-1.25">
                <span className="caption-sm-bold text-text-brand">
                  {remaining}개 더
                </span>
                모이면 결제
              </span>
            </div>
            <ProgressBar
              current={item.currentQuantity}
              target={item.targetQuantity}
            />
          </div>
          <ActionLink label="방 보기" />
        </>
      )}
    </div>
  );
};
