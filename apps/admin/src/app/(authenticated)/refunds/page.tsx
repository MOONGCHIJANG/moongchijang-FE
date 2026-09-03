'use client';

import { useState } from 'react';
import {
  useGetApiV1AdminDashboardUrgentRefunds,
  useGetApiV1AdminRefunds,
} from '@moongchijang/api-client/hooks/admin/admin';
import { GetApiV1AdminRefundsStatus } from '@moongchijang/api-client/generated/api.schemas';
import { AlertBanner } from '@/components/AlertBanner';
import { RefundDetailModal } from './_components/RefundDetailModal';
import { RefundStatusTabs } from './_components/RefundStatusTabs';
import { RefundsTable } from './_components/RefundsTable';

const STATUS_TABS: { status: GetApiV1AdminRefundsStatus; label: string }[] = [
  { status: GetApiV1AdminRefundsStatus.ALL, label: '전체' },
  { status: GetApiV1AdminRefundsStatus.WAITING, label: '대기중' },
  { status: GetApiV1AdminRefundsStatus.COMPLETED, label: '완료' },
];

const PAGE_SIZE = 20;

export default function AdminRefundsPage() {
  const [status, setStatus] = useState<GetApiV1AdminRefundsStatus>(
    GetApiV1AdminRefundsStatus.ALL,
  );
  const [page, setPage] = useState(0);
  const [selectedParticipationId, setSelectedParticipationId] = useState<
    number | null
  >(null);

  const { data: urgentRefundsResponse } =
    useGetApiV1AdminDashboardUrgentRefunds();
  const urgentRefunds =
    urgentRefundsResponse?.status === 200
      ? urgentRefundsResponse.data.data
      : null;

  const { data: refundsResponse, isLoading } = useGetApiV1AdminRefunds({
    status,
    page,
    size: PAGE_SIZE,
  });
  const refundsData =
    refundsResponse?.status === 200 ? refundsResponse.data.data : null;
  const rows = refundsData?.content ?? [];

  // 상태 탭 숫자 배지용으로 대기중 건수만 별도 조회한다. 목록 API에 상태별 집계 응답이 없다.
  const { data: waitingCountResponse } = useGetApiV1AdminRefunds({
    status: GetApiV1AdminRefundsStatus.WAITING,
    page: 0,
    size: 1,
  });
  const waitingCount =
    waitingCountResponse?.status === 200
      ? waitingCountResponse.data.data.totalElements
      : undefined;

  const selectedRow =
    rows.find((row) => row.participationId === selectedParticipationId) ??
    null;

  return (
    <div className="flex flex-col gap-g6">
      <h1 className="title-md-bold text-text-basic">환불 요청 관리</h1>

      {urgentRefunds?.hasUrgentRefunds && (
        <AlertBanner
          title={`SLA 초과 ${urgentRefunds.totalUrgentCount}건`}
          description="영업일 기준 1일 내 처리 필요"
        />
      )}

      <div className="flex flex-col gap-g5 rounded-large bg-bg-white p-p7 shadow-[1px_2px_10px_0px_rgba(0,0,0,0.1)]">
        <RefundStatusTabs
          tabs={STATUS_TABS.map((tab) => ({
            ...tab,
            count:
              tab.status === GetApiV1AdminRefundsStatus.WAITING
                ? waitingCount
                : undefined,
          }))}
          selected={status}
          onSelect={(next) => {
            setStatus(next);
            setPage(0);
          }}
        />

        <RefundsTable
          rows={rows}
          isLoading={isLoading}
          onSelectRow={setSelectedParticipationId}
        />

        {refundsData && refundsData.totalPages > 1 && (
          <div className="flex items-center justify-center gap-g3">
            <button
              type="button"
              disabled={page === 0}
              onClick={() => setPage((prev) => prev - 1)}
              className="rounded-large border border-border-default px-g5 py-g3 caption-sm-semibold text-text-subtle disabled:opacity-40"
            >
              이전
            </button>
            <span className="caption-sm-regular text-text-tertiary">
              {page + 1} / {refundsData.totalPages}
            </span>
            <button
              type="button"
              disabled={page + 1 >= refundsData.totalPages}
              onClick={() => setPage((prev) => prev + 1)}
              className="rounded-large border border-border-default px-g5 py-g3 caption-sm-semibold text-text-subtle disabled:opacity-40"
            >
              다음
            </button>
          </div>
        )}
      </div>

      <RefundDetailModal
        row={selectedRow}
        onClose={() => setSelectedParticipationId(null)}
      />
    </div>
  );
}
