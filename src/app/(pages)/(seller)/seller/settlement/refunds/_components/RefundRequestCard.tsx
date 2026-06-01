'use client';

import Link from 'next/link';
import { OwnerRefundRequestListItem } from '@/api/hooks/api.schemas';
import { Button } from '@/components/Button';

type Props = {
  item: OwnerRefundRequestListItem;
};

function formatDate(dateStr: string) {
  return dateStr.replace(/-/g, '.');
}

export function RefundRequestCard({ item }: Props) {
  const isPending = item.status === 'PENDING';

  if (isPending) {
    const badgeLabel = item.exceeded24Hours
      ? `검토대기·${item.refundReasonLabel}`
      : '검토대기';

    return (
      <div className="flex flex-col gap-3 rounded-2xl bg-surface-white px-4 py-4 shadow-sm">
        <span className="self-start rounded-lg bg-primary-50 px-2 py-0.5 caption-xs-bold text-text-brand">
          {badgeLabel}
        </span>
        <div className="flex items-start justify-between gap-2">
          <p className="heading-sm-bold text-text-basic flex-1">
            {item.productName}
          </p>
          <p className="heading-sm-bold text-text-basic shrink-0">
            {item.paymentAmount.toLocaleString('ko-KR')}원
          </p>
        </div>
        <div className="flex flex-col gap-0.5">
          <p className="body-sm-regular text-text-subtle">
            {item.requesterName} {item.requesterCode}
          </p>
          <p className="body-sm-regular text-text-subtle">
            픽업 불가 · {formatDate(item.requestedDate)}
          </p>
        </div>
        <Link href={`/seller/settlement/refunds/${item.participationId}`}>
          <Button variant="black" size="md" fullWidth>
            환불 요청 상세보기
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-between rounded-2xl bg-surface-white px-4 py-4 shadow-sm">
      <div className="flex flex-col gap-1">
        <p className="body-md-semibold text-text-basic">{item.productName}</p>
        <p className="body-sm-regular text-text-subtle">
          {item.paymentAmount.toLocaleString('ko-KR')}원
        </p>
        <p className="body-sm-regular text-text-subtle">
          {item.requesterName} {item.requesterCode}
        </p>
        <p className="caption-sm-regular text-text-tertiary">
          {item.refundReasonLabel} · {formatDate(item.requestedDate)}
        </p>
      </div>
      <Link
        href={`/seller/settlement/refunds/${item.participationId}`}
        className="body-sm-regular text-text-subtle flex items-center gap-0.5 shrink-0"
      >
        상세 &gt;
      </Link>
    </div>
  );
}
