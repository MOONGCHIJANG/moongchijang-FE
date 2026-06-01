'use client';

import Link from 'next/link';
import { Icon } from '@iconify/react';

type Props = {
  pendingCount: number;
};

export function RefundBanner({ pendingCount }: Props) {
  if (pendingCount === 0) return null;

  return (
    <Link
      href="/seller/settlement/refunds"
      className="flex items-center justify-between rounded-2xl border border-button-primary-fill bg-primary-50 px-4 py-3.5"
    >
      <div className="flex items-center gap-2">
        <Icon icon="lucide:alert-circle" className="h-5 w-5 text-text-brand" />
        <span className="body-md-semibold text-text-brand">환불 요청 확인</span>
      </div>
      <div className="flex items-center gap-1">
        <span className="body-sm-regular text-text-brand">
          {pendingCount}건의 검토대기
        </span>
        <Icon icon="lucide:chevron-right" className="h-4 w-4 text-text-brand" />
      </div>
    </Link>
  );
}
