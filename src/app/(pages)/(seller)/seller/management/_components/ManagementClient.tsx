'use client';

import { useState } from 'react';
import { useGetApiV1OwnerGroupBuysManage } from '@/api/hooks/owner/owner';
import { GetApiV1OwnerGroupBuysManageFilter as Filter } from '@/api/generated/api.schemas';
import { ManageGroupBuyItem } from './ManageGroupBuyItem';

const TABS: { label: string; filter: Filter }[] = [
  { label: '전체', filter: Filter.ALL },
  { label: '진행중', filter: Filter.IN_PROGRESS },
  { label: '달성', filter: Filter.ACHIEVED },
  { label: '종료', filter: Filter.ENDED },
  { label: '승인대기', filter: Filter.PENDING_APPROVAL },
];

export function ManagementClient() {
  const [activeFilter, setActiveFilter] = useState<Filter>(Filter.ALL);

  const { data: response, isLoading } = useGetApiV1OwnerGroupBuysManage(
    { filter: activeFilter },
    { query: { queryKey: ['ownerGroupBuysManage', activeFilter] } },
  );

  const items = response?.status === 200 ? response.data.data : [];

  return (
    <>
      {/* 탭 */}
      <div className="flex gap-0 bg-surface-white px-5">
        {TABS.map(({ label, filter }) => (
          <button
            key={filter}
            type="button"
            onClick={() => setActiveFilter(filter)}
            className={`body-sm-medium px-3 py-3 transition-colors ${
              activeFilter === filter
                ? 'border-b-2 border-text-brand text-text-brand'
                : 'text-text-secondary'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* 목록 */}
      <div className="flex flex-col gap-3 px-5 py-4">
        {isLoading ? (
          Array.from({ length: 3 }, (_, i) => (
            <div
              key={i}
              className="h-32 animate-pulse rounded-2xl bg-bg-gray-100"
            />
          ))
        ) : items.length === 0 ? (
          <p className="body-sm-regular py-12 text-center text-text-secondary">
            공구가 없어요
          </p>
        ) : (
          items.map((item) => (
            <ManageGroupBuyItem key={item.groupBuyId} item={item} />
          ))
        )}
      </div>
    </>
  );
}
