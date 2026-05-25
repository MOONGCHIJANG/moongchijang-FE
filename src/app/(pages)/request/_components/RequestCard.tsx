'use client';

import Link from 'next/link';
import {
  GroupBuyRequestDetail,
  GroupBuyRequestDetailStatus,
} from '@/api/generated/api.schemas';
import { formatPickupDate, formatShortDate } from '@/lib/date';

function getStatusConfig(status: GroupBuyRequestDetailStatus): {
  label: string;
  className: string;
} {
  if (
    status === GroupBuyRequestDetailStatus.OPENED ||
    status === GroupBuyRequestDetailStatus.REJECTED
  ) {
    return {
      label: '검토 완료',
      className: 'bg-surface-default text-text-tertiary',
    };
  }
  return {
    label: '검토중',
    className: 'bg-surface-brand-lighter text-text-brand',
  };
}

interface RequestCardProps {
  request: GroupBuyRequestDetail;
}

export function RequestCard({ request }: RequestCardProps) {
  const statusConfig = getStatusConfig(request.status);
  const dateLabel = formatShortDate(request.createdAt);
  const pickupLabel = formatPickupDate(request.desiredPickupDate);

  return (
    <div className="bg-bg-white px-p6 py-p6">
      <div className="flex items-center gap-g3 mb-g3">
        <span className="heading-sm-bold text-text-basic">{dateLabel}</span>
        <span
          className={`inline-flex items-center rounded-medium px-[7px] py-[5px] caption-xs-bold ${statusConfig.className}`}
        >
          {statusConfig.label}
        </span>
      </div>
      <div className="border border-border-subtle rounded-2xlarge p-p3">
        <p className="heading-md-bold text-text-basic mb-g2 px-g2 pt-g2">
          {request.productName}
        </p>
        <p className="caption-sm-medium text-text-tertiary mb-g4 px-g2">
          {request.storeName} · 픽업 {pickupLabel} · 수량{' '}
          {request.desiredQuantity}개
        </p>
        <div className="flex flex-col gap-g3">
          <Link
            href={`/request/${request.requestId}/detail`}
            className="flex items-center justify-center w-full h-10 rounded-large bg-surface-inverse body-md-semibold text-text-basic-inverse"
          >
            신청 내역
          </Link>
          <Link
            href={`/request/${request.requestId}/status`}
            className="flex items-center justify-center w-full h-10 rounded-large border border-border-subtle bg-bg-white body-md-semibold text-text-subtle"
          >
            요청 현황
          </Link>
        </div>
      </div>
    </div>
  );
}
