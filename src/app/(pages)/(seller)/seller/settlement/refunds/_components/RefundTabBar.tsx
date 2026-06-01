'use client';

import { GetApiV1OwnerSettlementsRefundRequestsTab as Tab } from '@/api/hooks/api.schemas';

type Props = {
  activeTab: Tab;
  pendingCount: number;
  completedCount: number;
  onTabChange: (tab: Tab) => void;
};

const TABS: { label: string; tab: Tab }[] = [
  { label: '전체', tab: Tab.ALL },
  { label: '검토대기', tab: Tab.PENDING },
  { label: '처리완료', tab: Tab.COMPLETED },
];

export function RefundTabBar({
  activeTab,
  pendingCount,
  completedCount,
  onTabChange,
}: Props) {
  const getCount = (tab: Tab) => {
    if (tab === Tab.PENDING) return pendingCount;
    if (tab === Tab.COMPLETED) return completedCount;
    return null;
  };

  return (
    <div className="flex bg-surface-white border-b border-border-subtle">
      {TABS.map(({ label, tab }) => {
        const count = getCount(tab);
        return (
          <button
            key={tab}
            type="button"
            onClick={() => onTabChange(tab)}
            className={`body-sm-medium flex items-center gap-0.5 px-4 py-3 transition-colors ${
              activeTab === tab
                ? 'border-b-2 border-text-brand text-text-brand'
                : 'text-text-secondary'
            }`}
          >
            {label}
            {count != null && count > 0 && (
              <span className="caption-xs-bold ml-0.5">{count}</span>
            )}
          </button>
        );
      })}
    </div>
  );
}
