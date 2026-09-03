'use client';

import { useMemo, useState } from 'react';
import { Icon } from '@iconify/react';
import { Input } from '@moongchijang/ui';
import { useGetApiV1AdminDashboardUrgentRefunds } from '@moongchijang/api-client/hooks/admin/admin';
import { AlertBanner } from '@/components/AlertBanner';
import { RefundDetailModal } from './_components/RefundDetailModal';
import { RefundStatusTabs } from './_components/RefundStatusTabs';
import { RefundsTable } from './_components/RefundsTable';
import { REFUND_MOCK_ROWS } from './_mock/refundMockData';
import type { RefundStatus } from './types';

const STATUS_TAB_ORDER: RefundStatus[] = [
  '검토대기',
  '처리중',
  '승인완료',
  '거절',
];

// 숫자 뱃지는 Figma 디자인 기준 "검토대기"·"처리중" 탭에만 표시한다.
const TABS_WITH_COUNT: (RefundStatus | 'ALL')[] = ['검토대기', '처리중'];

export default function AdminRefundsPage() {
  const [status, setStatus] = useState<RefundStatus | 'ALL'>('ALL');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRequestId, setSelectedRequestId] = useState<string | null>(
    null,
  );
  // 목업 데이터라 처리 결과를 서버에 반영할 수 없어, "처리 전"·상세 모달의 승인/거절
  // 클릭 시 화면에서만 상태를 전환해 인터랙션을 보여준다. 실제 API 연동 시 뮤테이션으로 교체 필요.
  const [statusOverrides, setStatusOverrides] = useState<
    Record<string, RefundStatus>
  >({});

  const { data: urgentRefundsResponse } =
    useGetApiV1AdminDashboardUrgentRefunds();
  const urgentRefunds =
    urgentRefundsResponse?.status === 200
      ? urgentRefundsResponse.data.data
      : null;

  const rows = useMemo(
    () =>
      REFUND_MOCK_ROWS.map((row) =>
        statusOverrides[row.requestId]
          ? { ...row, status: statusOverrides[row.requestId] }
          : row,
      ),
    [statusOverrides],
  );

  const selectedRow =
    rows.find((row) => row.requestId === selectedRequestId) ?? null;

  const counts = useMemo(() => {
    const base: Record<RefundStatus | 'ALL', number> = {
      검토대기: 0,
      처리중: 0,
      승인완료: 0,
      거절: 0,
      ALL: rows.length,
    };
    rows.forEach((row) => {
      base[row.status] += 1;
    });
    return base;
  }, [rows]);

  const keyword = searchTerm.trim().toLowerCase();
  const filteredRows = rows.filter((row) => {
    if (status !== 'ALL' && row.status !== status) return false;
    if (!keyword) return true;
    return (
      row.requestId.toLowerCase().includes(keyword) ||
      row.customerName.toLowerCase().includes(keyword) ||
      row.productName.toLowerCase().includes(keyword)
    );
  });

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
        <div className="flex items-center gap-g5">
          <div className="flex-1">
            <Input
              variant="admin"
              noHelperSpace
              leftIcon="lucide:search"
              placeholder="요청 ID, 소비자, 공구명을 검색해보세요"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          {/* 케이스 필터 드롭다운: Figma에 열림 상태·옵션 목록이 정의돼 있지 않아 시각 요소만
              구현했다. 실제 동작이 없어 disabled 처리해 클릭 가능한 컨트롤처럼 보이지 않게 한다. */}
          <button
            type="button"
            disabled
            aria-disabled="true"
            className="flex shrink-0 items-center gap-g4 rounded-large border border-border-default bg-bg-white px-g6 py-g5 heading-sm-medium text-text-subtle disabled:cursor-not-allowed disabled:opacity-60"
          >
            <Icon icon="lucide:filter" width={16} height={16} />
            전체
            <Icon icon="lucide:chevron-down" width={16} height={16} />
          </button>
        </div>

        <RefundStatusTabs
          tabs={[
            ...STATUS_TAB_ORDER.map((label) => ({
              status: label,
              label,
              count: TABS_WITH_COUNT.includes(label)
                ? counts[label]
                : undefined,
            })),
            {
              status: 'ALL' as const,
              label: '전체',
              // Figma 디자인 기준 '전체' 탭엔 숫자 뱃지가 없다.
              count: undefined,
            },
          ]}
          selected={status}
          onSelect={setStatus}
        />

        <RefundsTable
          rows={filteredRows}
          onProcess={(requestId) =>
            setStatusOverrides((prev) => ({ ...prev, [requestId]: '승인완료' }))
          }
          onSelectRow={setSelectedRequestId}
        />
      </div>

      <RefundDetailModal
        row={selectedRow}
        onClose={() => setSelectedRequestId(null)}
        onApprove={(requestId) => {
          setStatusOverrides((prev) => ({ ...prev, [requestId]: '승인완료' }));
          setSelectedRequestId(null);
        }}
        onReject={(requestId) => {
          setStatusOverrides((prev) => ({ ...prev, [requestId]: '거절' }));
          setSelectedRequestId(null);
        }}
      />
    </div>
  );
}
