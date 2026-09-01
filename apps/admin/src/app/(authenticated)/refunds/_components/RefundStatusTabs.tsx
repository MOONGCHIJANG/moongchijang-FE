import { cn } from '@/lib/utils';
import type { RefundStatus } from '../types';

interface RefundStatusTab {
  status: RefundStatus | 'ALL';
  label: string;
  count?: number;
}

interface RefundStatusTabsProps {
  tabs: RefundStatusTab[];
  selected: RefundStatus | 'ALL';
  onSelect: (status: RefundStatus | 'ALL') => void;
}

export function RefundStatusTabs({
  tabs,
  selected,
  onSelect,
}: RefundStatusTabsProps) {
  return (
    <div className="flex items-center border-b border-border-subtle">
      {tabs.map((tab) => {
        const isActive = tab.status === selected;
        return (
          <button
            key={tab.status}
            type="button"
            onClick={() => onSelect(tab.status)}
            aria-current={isActive ? 'true' : undefined}
            className={cn(
              'flex items-center gap-g3 border-b-2 px-g7 py-g5 body-lg-medium transition-colors',
              isActive
                ? 'border-text-basic text-text-basic'
                : 'border-transparent text-text-tertiary',
            )}
          >
            {tab.label}
            {typeof tab.count === 'number' && (
              <span className="rounded-full bg-primary-400 px-[5px] py-[2px] caption-sm-medium text-bg-white">
                {tab.count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
