'use client';

import { useState } from 'react';
import { GNB, TabId } from '@/components/GNB';
import { FeedTab } from './tabs/FeedTab';

export default function HomeClient() {
  const [activeTab, setActiveTab] = useState<TabId>('feed');

  const renderContent = () => {
    switch (activeTab) {
      case 'feed':
        return <FeedTab />;
      default:
        return (
          <div className="flex flex-1 items-center justify-center text-gray-400">
            {activeTab} 컨텐츠 준비 중
          </div>
        );
    }
  };

  return (
    <div className="relative mx-auto flex h-dvh w-full min-w-[360px] max-w-[440px] flex-col overflow-hidden bg-surface-default">
      <main className="flex-1 overflow-y-auto pb-[84px]">
        {renderContent()}
      </main>

      <footer className="fixed bottom-0 left-0 right-0 z-50 mx-auto w-full min-w-[360px] max-w-[440px]">
        <GNB activeTab={activeTab} onTabChange={setActiveTab} />
      </footer>
    </div>
  );
}
