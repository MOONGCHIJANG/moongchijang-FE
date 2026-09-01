'use client';

import { MetricCard } from './_components/MetricCard';
import { AlertBanner } from '@/components/AlertBanner';
import { UrgentRefundsTable } from './_components/UrgentRefundsTable';
import { PendingOrdersTable } from './_components/PendingOrdersTable';
import {
  useGetApiV1AdminSummary,
  useGetApiV1AdminDashboardUrgentRefunds,
  useGetApiV1AdminDashboardUnconfirmedOrders,
  useGetApiV1AdminRefunds,
} from '@moongchijang/api-client/hooks/admin/admin';
import {
  AdminDashboardUrgentRefundItemCaseFilter,
  GetApiV1AdminRefundsStatus,
} from '@moongchijang/api-client/generated/api.schemas';

// caseFilter enum → 표시 라벨. 스펙에 A~G 코드/한글 라벨 매핑표가 없어 enum 의미를 그대로 번역했다.
const REFUND_CASE_LABELS: Record<
  AdminDashboardUrgentRefundItemCaseFilter,
  string
> = {
  ALL: '전체',
  PRE_ACHIEVEMENT_FREE_CANCEL: '달성 전 취소',
  POST_ACHIEVEMENT_CANCEL: '달성 후 취소',
  PICKUP_PERIOD_NO_SHOW: '미수령',
  OWNER_FAULT_CANCEL: '사장님 귀책 취소',
  TARGET_NOT_MET: '목표 미달성',
  DISPUTE_OR_DROPOUT_REFUND: '분쟁/이탈 환불',
};

const REFUND_SLA_THRESHOLD_HOURS = 24;
const ORDER_SLA_THRESHOLD_HOURS = 48;

function formatCurrency(amount: number) {
  return `₩${amount.toLocaleString('ko-KR')}`;
}

function formatChangeRate(rate: number) {
  return `전일 대비 ${rate > 0 ? '+' : ''}${rate}%`;
}

function getChangeTone(rate: number): 'positive' | 'negative' {
  return rate >= 0 ? 'positive' : 'negative';
}

function formatDateTime(isoDateTime: string) {
  return isoDateTime.replace('T', ' ').slice(0, 16);
}

function formatDate(isoDate: string | null | undefined) {
  return isoDate ? isoDate.slice(0, 10) : '-';
}

function formatRefundSla(slaElapsedHours: number) {
  return slaElapsedHours >= REFUND_SLA_THRESHOLD_HOURS
    ? `${slaElapsedHours - REFUND_SLA_THRESHOLD_HOURS}시간 초과`
    : `${REFUND_SLA_THRESHOLD_HOURS - slaElapsedHours}시간 남음`;
}

function formatOrderElapsedLabel(elapsedHours: number, overdue: boolean) {
  return overdue ? `${elapsedHours}시간 경과` : `미확정 ${elapsedHours}시간`;
}

export default function AdminDashboardPage() {
  const {
    data: summaryResponse,
    isLoading: isSummaryLoading,
    isError: isSummaryError,
  } = useGetApiV1AdminSummary();
  const {
    data: pendingRefundCountResponse,
    isLoading: isPendingRefundCountLoading,
    isError: isPendingRefundCountError,
  } = useGetApiV1AdminRefunds({
    status: GetApiV1AdminRefundsStatus.WAITING,
    size: 1,
  });
  const {
    data: urgentRefundsResponse,
    isLoading: isUrgentRefundsLoading,
    isError: isUrgentRefundsError,
  } = useGetApiV1AdminDashboardUrgentRefunds();
  const {
    data: unconfirmedOrdersResponse,
    isLoading: isUnconfirmedOrdersLoading,
    isError: isUnconfirmedOrdersError,
  } = useGetApiV1AdminDashboardUnconfirmedOrders();

  const summary =
    summaryResponse?.status === 200 ? summaryResponse.data.data : null;
  const pendingRefundCount =
    pendingRefundCountResponse?.status === 200
      ? pendingRefundCountResponse.data.data.totalElements
      : null;
  const urgentRefunds =
    urgentRefundsResponse?.status === 200
      ? urgentRefundsResponse.data.data
      : null;
  const unconfirmedOrders =
    unconfirmedOrdersResponse?.status === 200
      ? unconfirmedOrdersResponse.data.data
      : null;

  const isLoading =
    isSummaryLoading ||
    isPendingRefundCountLoading ||
    isUrgentRefundsLoading ||
    isUnconfirmedOrdersLoading;

  const isError =
    isSummaryError ||
    isPendingRefundCountError ||
    isUrgentRefundsError ||
    isUnconfirmedOrdersError ||
    !summary ||
    pendingRefundCount === null ||
    !urgentRefunds ||
    !unconfirmedOrders;

  if (isLoading) {
    return (
      <div className="flex flex-col gap-g6">
        <h1 className="title-md-bold text-text-basic">대시보드</h1>
        <p role="status" className="body-lg-regular text-text-tertiary">
          불러오는 중입니다...
        </p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-col gap-g6">
        <h1 className="title-md-bold text-text-basic">대시보드</h1>
        <p role="alert" className="body-lg-regular text-accent-red-500">
          대시보드 데이터를 불러오지 못했습니다.
        </p>
      </div>
    );
  }

  const metrics = [
    {
      label: '검토 대기 환불',
      value: `${pendingRefundCount}건`,
      description: `총 환불 금액: ${formatCurrency(summary.pendingRefundAmount)}`,
      icon: 'figma:refund-refresh',
      trend: {
        text: formatChangeRate(summary.pendingRefundAmountChangeRate),
        tone: getChangeTone(summary.pendingRefundAmountChangeRate),
      },
    },
    {
      label: '개설 승인 대기',
      value: `${summary.pendingApprovalCount}건`,
      description: `평균 검토 시간: ${(summary.averageReviewMinutes / 60).toFixed(1)}시간`,
      icon: 'figma:hourglass',
      trend: {
        text: formatChangeRate(summary.pendingApprovalChangeRate),
        tone: getChangeTone(summary.pendingApprovalChangeRate),
      },
    },
    {
      label: '발주 미확정',
      value: `${summary.unconfirmedOrderCount}건`,
      description: `48시간 초과: ${summary.unconfirmedOrderOver48hCount}건`,
      icon: 'mynaui:truck',
    },
    {
      label: '오늘 처리 완료',
      value: `${summary.todayCompletedRefundCount + summary.todayCompletedApprovalCount}건`,
      description: `환불 ${summary.todayCompletedRefundCount}건 · 승인 ${summary.todayCompletedApprovalCount}건`,
      icon: 'figma:check-circle',
    },
  ];

  const urgentRefundRows = urgentRefunds.content.map((item) => ({
    requestId: `REF-${item.requestId}`,
    caseLabel: REFUND_CASE_LABELS[item.caseFilter],
    customerName: item.consumerName,
    itemName: item.groupBuyName,
    amount: formatCurrency(item.refundAmount),
    requestedAt: formatDateTime(item.requestedAt),
    sla: formatRefundSla(item.slaElapsedHours),
  }));

  const pendingOrderRows = unconfirmedOrders.content.map((item) => ({
    orderId: `ORD-${item.orderId}`,
    itemName: item.productName,
    storeName: item.storeName,
    achievedAt: formatDate(item.achievedAt),
    elapsedLabel: formatOrderElapsedLabel(item.elapsedHours, item.overdue),
    elapsedHours: item.elapsedHours,
    slaHours: ORDER_SLA_THRESHOLD_HOURS,
  }));

  return (
    <div className="flex flex-col gap-g6">
      <div className="flex flex-col gap-g4">
        <h1 className="title-md-bold text-text-basic">대시보드</h1>
        <div className="flex flex-row gap-g7">
          {metrics.map((metric) => (
            <MetricCard key={metric.label} {...metric} />
          ))}
        </div>
      </div>
      {(urgentRefunds.hasUrgentRefunds || summary.hasOrderOver48h) && (
        <AlertBanner
          title="긴급 처리 필요"
          description={`SLA 초과 환불 요청 ${urgentRefunds.totalUrgentCount}건, 발주 미확정 48시간 초과 ${summary.unconfirmedOrderOver48hCount}건`}
        />
      )}
      <div className="flex flex-col gap-g4">
        <UrgentRefundsTable
          title="긴급 처리 필요 환불 요청"
          description="SLA 초과 또는 임박한 케이스"
          rows={urgentRefundRows}
        />
        <PendingOrdersTable
          title="발주 미확정 모니터링"
          description="달성 후 48시간 경과 시 어드민 개입 필요"
          rows={pendingOrderRows}
        />
      </div>
    </div>
  );
}
