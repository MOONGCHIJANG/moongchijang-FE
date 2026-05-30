import { Suspense } from 'react';
import { GroupBuyRequestClient } from '../_components/GroupBuyRequestClient';

export default function GroupBuyRequestNewPage() {
  return (
    <div
      data-scroll-reset="request"
      className="relative mx-auto flex h-dvh w-full min-w-[360px] max-w-[440px] flex-col overflow-y-auto bg-white"
    >
      <Suspense>
        <GroupBuyRequestClient />
      </Suspense>
    </div>
  );
}
