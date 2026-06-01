'use client';

import { useState } from 'react';
import { useGetApiV1OwnerSettlementsRefundRequests } from '@/api/hooks/owner/owner';
import { GetApiV1OwnerSettlementsRefundRequestsTab as Tab } from '@/api/hooks/api.schemas';
import { RefundTabBar } from './RefundTabBar';
import { RefundRequestCard } from './RefundRequestCard';

export function RefundRequestsClient() {
  const [activeTab, setActiveTab] = useState<Tab>(Tab.ALL);

  const { data: response, isLoading } =
    useGetApiV1OwnerSettlementsRefundRequests(
      { tab: activeTab },
      { query: { queryKey: ['ownerSettlementsRefundRequests', activeTab] } },
    );

  const data = response?.status === 200 ? response.data.data : null;
  const items = data?.items ?? [];
  const pendingCount = data?.pendingCount ?? 0;
  const completedCount = data?.completedCount ?? 0;

  return (
    <>
      <RefundTabBar
        activeTab={activeTab}
        pendingCount={pendingCount}
        completedCount={completedCount}
        onTabChange={setActiveTab}
      />

      <div className="flex flex-col gap-3 px-5 py-4">
        {isLoading ? (
          [...Array(3)].map((_, i) => (
            <div
              key={i}
              className="h-32 animate-pulse rounded-2xl bg-bg-gray-100"
            />
          ))
        ) : items.length === 0 ? (
          <p className="body-sm-regular py-12 text-center text-text-secondary">
            환불 요청이 없어요
          </p>
        ) : activeTab === Tab.ALL ? (
          <>
            {items
              .filter((i) => i.status === 'PENDING')
              .map((item) => (
                <RefundRequestCard key={item.participationId} item={item} />
              ))}
            {items.some((i) => i.status === 'COMPLETED') && (
              <>
                <p className="body-sm-semibold text-text-subtle pt-2">
                  처리완료
                </p>
                {items
                  .filter((i) => i.status === 'COMPLETED')
                  .map((item) => (
                    <RefundRequestCard key={item.participationId} item={item} />
                  ))}
              </>
            )}
          </>
        ) : (
          items.map((item) => (
            <RefundRequestCard key={item.participationId} item={item} />
          ))
        )}
      </div>
    </>
  );
}
