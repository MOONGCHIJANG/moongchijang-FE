'use client';

import { OwnerSettlementMonthlySummary } from '@/api/hooks/api.schemas';

type Props = {
  summary: OwnerSettlementMonthlySummary;
};

export function MonthSummarySection({ summary }: Props) {
  return (
    <div className="rounded-2xl bg-surface-white px-5 py-5 flex flex-col gap-3 border border-primary-200 shadow-[0_4px_20px_rgba(255,80,46,0.14)]">
      <p className="body-md-regular text-text-subtle">이번 달 정산 예정</p>
      <p className="heading-1xl-semibold text-text-basic">
        {summary.settlementExpectedAmount.toLocaleString('ko-KR')}원
      </p>
      <div className="grid grid-cols-2 gap-2 rounded-xl bg-surface-elevated px-3 py-3">
        <div className="flex flex-col gap-0.5">
          <span className="caption-sm-regular text-text-basic">
            공구 수익금
          </span>
          <span className="body-md-semibold text-text-basic">
            {summary.grossRevenueAmount.toLocaleString('ko-KR')}원
          </span>
        </div>
        <div className="flex flex-col gap-0.5">
          <span className="caption-sm-regular text-text-basic">
            환불 수수료
          </span>
          <span className="body-md-semibold text-text-basic">
            -{Math.abs(summary.refundFeeAmount).toLocaleString('ko-KR')}원
          </span>
        </div>
      </div>
    </div>
  );
}
