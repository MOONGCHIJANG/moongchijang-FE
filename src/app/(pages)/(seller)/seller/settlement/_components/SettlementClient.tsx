'use client';

import { useState } from 'react';
import {
  useGetApiV1OwnerSettlementsMonthlySummary,
  useGetApiV1OwnerSettlementsMonthChips,
  useGetApiV1OwnerSettlementsRefundRequests,
  useGetApiV1OwnerGroupBuysManage,
} from '@/api/hooks/owner/owner';
import {
  GetApiV1OwnerGroupBuysManageFilter,
  GetApiV1OwnerSettlementsRefundRequestsTab,
} from '@/api/hooks/api.schemas';
import { SellerTopBar } from '../../_components/SellerTopBar';
import { MonthSummarySection } from './MonthSummarySection';
import { MonthChipList } from './MonthChipList';
import { RefundBanner } from './RefundBanner';
import { SettlementGroupBuyList } from './SettlementGroupBuyList';

export function SettlementClient() {
  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const [selectedMonth, setSelectedMonth] = useState<number | null>(null);

  const { data: chipsResponse, isLoading: chipsLoading } =
    useGetApiV1OwnerSettlementsMonthChips();

  const chips =
    chipsResponse?.status === 200 ? chipsResponse.data.data.chips : [];

  const activeYear = selectedYear ?? chips[0]?.year ?? new Date().getFullYear();
  const activeMonth =
    selectedMonth ?? chips[0]?.month ?? new Date().getMonth() + 1;

  const { data: summaryResponse, isLoading: summaryLoading } =
    useGetApiV1OwnerSettlementsMonthlySummary(
      { year: activeYear, month: activeMonth },
      {
        query: {
          queryKey: ['ownerSettlementMonthlySummary', activeYear, activeMonth],
        },
      },
    );

  const { data: refundResponse } = useGetApiV1OwnerSettlementsRefundRequests(
    { tab: GetApiV1OwnerSettlementsRefundRequestsTab.PENDING },
    { query: { queryKey: ['ownerSettlementsRefundRequests', 'PENDING'] } },
  );

  const { data: groupBuysResponse, isLoading: groupBuysLoading } =
    useGetApiV1OwnerGroupBuysManage(
      { filter: GetApiV1OwnerGroupBuysManageFilter.ACHIEVED },
      { query: { queryKey: ['ownerGroupBuysManage', 'ACHIEVED'] } },
    );

  const summary =
    summaryResponse?.status === 200 ? summaryResponse.data.data : null;

  const pendingCount =
    refundResponse?.status === 200 ? refundResponse.data.data.pendingCount : 0;

  const achievedItems =
    groupBuysResponse?.status === 200 ? groupBuysResponse.data.data : [];

  const handleSelect = (year: number, month: number) => {
    setSelectedYear(year);
    setSelectedMonth(month);
  };

  return (
    <div className="flex min-h-full flex-col bg-bg-white-muted">
      <header className="sticky top-0 z-10 shrink-0 bg-surface-white px-5">
        <SellerTopBar />
      </header>

      <div className="flex flex-col gap-4 px-5 pb-5 pt-4">
        {/* 이번 달 정산 예정 카드 */}
        {summaryLoading ? (
          <div className="h-36 animate-pulse rounded-2xl bg-bg-gray-100" />
        ) : summary ? (
          <MonthSummarySection summary={summary} />
        ) : null}

        {/* 월 chip 가로 스크롤 */}
        {!chipsLoading && chips.length > 0 && (
          <div className="-mx-5 overflow-x-auto [&::-webkit-scrollbar]:hidden">
            <MonthChipList
              chips={chips}
              selectedYear={activeYear}
              selectedMonth={activeMonth}
              onSelect={handleSelect}
            />
          </div>
        )}

        {/* 환불 요청 확인 배너 */}
        {pendingCount > 0 && <RefundBanner pendingCount={pendingCount} />}

        {/* 공구 목록 */}
        <SettlementGroupBuyList
          items={achievedItems}
          isLoading={groupBuysLoading}
        />
      </div>
    </div>
  );
}
