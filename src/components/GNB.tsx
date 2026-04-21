import React from 'react';
import { Icon } from '@iconify/react';

export type TabId = 'feed' | 'request' | 'favorite' | 'mypage';

interface GNBProps {
  /**
   * 현재 활성화된 탭의 ID
   */
  activeTab?: TabId;
  /**
   * 탭이 클릭되었을 때 실행되는 콜백 함수
   */
  onTabChange?: (tab: TabId) => void;
  /**
   * 추가적인 컨테이너 클래스 (예: fixed bottom-0 w-full 등)
   */
  className?: string;
}

const TABS = [
  { id: 'feed', label: '피드', icon: 'fa7-solid:home' },
  { id: 'request', label: '공구요청', icon: 'bi:bag-plus-fill' },
  { id: 'favorite', label: '찜', icon: 'solar:heart-bold' },
  { id: 'mypage', label: '마이페이지', icon: 'fluent:person-20-filled' },
] as const;

export const GNB = ({
  activeTab = 'feed',
  onTabChange,
  className = '',
}: GNBProps) => {
  return (
    <div
      className={`inline-flex w-[393px] h-[58px] items-center justify-around px-4 rounded-t-2xl bg-white py-1 shadow-[0_-6px_8px_rgba(0,0,0,0.05)] ${className}`}
    >
      {TABS.map((tab) => {
        const isActive = activeTab === tab.id;
        const colorClass = isActive ? 'text-icon-basic' : 'text-icon-disabled';

        return (
          <button
            key={tab.id}
            onClick={() => onTabChange?.(tab.id as TabId)}
            className={`inline-flex min-w-[56px] flex-col items-center justify-center gap-0.5 ${colorClass} transition-colors`}
          >
            <div className="relative flex h-6 w-6 items-center justify-center overflow-hidden">
              <Icon icon={tab.icon} className="h-6 w-6" />
            </div>
            <div className="whitespace-nowrap text-center text-b4">
              {tab.label}
            </div>
          </button>
        );
      })}
    </div>
  );
};
