'use client';

import { cn } from '@/lib/utils';

type Tab = 'description' | 'guidelines';

type DetailTabProps = {
  activeTab: Tab;
  onTabClick: (tab: Tab) => void;
};

const TABS: { key: Tab; label: string }[] = [
  { key: 'description', label: '상품 설명' },
  { key: 'guidelines', label: '유의 사항' },
];

const DetailTab = ({ activeTab, onTabClick }: DetailTabProps) => {
  return (
    <div className="flex sticky top-14 z-5 bg-bg-white">
      {TABS.map(({ key, label }) => (
        <button
          key={key}
          className={cn(
            'flex-1 text-center pt-p6 pb-p5 cursor-pointer transition-colors duration-150 text-base',
            activeTab === key
              ? 'text-text-basic border-b-2 border-button-natural body-md-bold'
              : 'text-text-tertiary body-md-regular',
          )}
          onClick={() => onTabClick(key)}
          tabIndex={0}
          type="button"
        >
          {label}
        </button>
      ))}
    </div>
  );
};

export default DetailTab;
