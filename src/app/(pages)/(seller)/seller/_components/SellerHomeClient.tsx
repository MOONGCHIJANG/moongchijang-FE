'use client';

import {
  useGetApiV1OwnerGroupBuysSummary,
  useGetApiV1OwnerGroupBuys,
} from '@/api/hooks/owner/owner';
import { useGetApiV1UsersMe } from '@/api/hooks/auth/auth';
import { SellerTopBar } from './SellerTopBar';
import { SummaryCards } from './SummaryCards';
import { GroupBuyList } from './GroupBuyList';
import { EmptyHome } from './EmptyHome';

export function SellerHomeClient() {
  const { data: meResponse } = useGetApiV1UsersMe();
  const { data: summaryResponse, isLoading: summaryLoading } =
    useGetApiV1OwnerGroupBuysSummary();
  const { data: groupBuysResponse, isLoading: listLoading } =
    useGetApiV1OwnerGroupBuys();

  const nickname =
    meResponse?.status === 200
      ? (meResponse.data.data.nickname ?? undefined)
      : undefined;

  const summary =
    summaryResponse?.status === 200 ? summaryResponse.data.data : null;
  const groupBuys =
    groupBuysResponse?.status === 200 ? groupBuysResponse.data.data : [];

  const isLoading = summaryLoading || listLoading;

  return (
    <div className="flex min-h-full flex-col bg-bg-white-muted">
      {/* 상단 바 */}
      <header className="sticky top-0 z-10 shrink-0 bg-surface-white px-5">
        <SellerTopBar storeName={nickname} />
      </header>

      {isLoading ? (
        /* 스켈레톤 */
        <div className="flex flex-col gap-4 px-5 pb-5 pt-4">
          <div className="grid grid-cols-2 gap-3">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="h-[72px] animate-pulse rounded-2xl bg-bg-gray-100"
              />
            ))}
          </div>
          <div className="flex flex-col gap-3">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="h-32 animate-pulse rounded-2xl bg-bg-gray-100"
              />
            ))}
          </div>
        </div>
      ) : !summary || summary.isEmpty ? (
        /* 빈 상태 - 수직 정중앙 */
        <div className="flex flex-1 items-center justify-center">
          <EmptyHome />
        </div>
      ) : (
        /* 데이터 상태 */
        <div className="flex flex-col gap-4 px-5 pb-5 pt-4">
          {summary && <SummaryCards summary={summary} />}

          <GroupBuyList groupBuys={groupBuys} />
        </div>
      )}
    </div>
  );
}
