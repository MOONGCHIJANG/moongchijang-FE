'use client';

import { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { Icon } from '@iconify/react';
import { Button, Input } from '@moongchijang/ui';
import { usePostApiV1AdminRefundsParticipationIdManual } from '@moongchijang/api-client/hooks/admin/admin';
import {
  AdminManualRefundRefundReason,
  type ApiResponseAdminRefundPageDataContentItem,
} from '@moongchijang/api-client/generated/api.schemas';
import { Modal } from '@/components/Modal';
import { cn } from '@/lib/utils';
import { Chip } from './Chip';

interface RefundDetailModalProps {
  row: ApiResponseAdminRefundPageDataContentItem | null;
  onClose: () => void;
}

function formatCurrency(amount: number) {
  return `₩${amount.toLocaleString('ko-KR')}`;
}

const REASON_OPTIONS: { value: AdminManualRefundRefundReason; label: string }[] = [
  { value: AdminManualRefundRefundReason.NOT_ACHIEVED, label: '공구 미달성' },
  { value: AdminManualRefundRefundReason.EARLY_EXIT, label: '중도 포기' },
  { value: AdminManualRefundRefundReason.PAYMENT_ERROR, label: '결제 오류' },
  { value: AdminManualRefundRefundReason.OTHER, label: '기타' },
];

function InfoGrid({
  items,
}: {
  items: { label: string; value: React.ReactNode }[];
}) {
  return (
    <div className="flex items-start justify-between gap-g8">
      <div className="flex shrink-0 flex-col gap-g5">
        {items.map((item) => (
          <span
            key={item.label}
            className="heading-sm-bold whitespace-nowrap text-text-basic"
          >
            {item.label}
          </span>
        ))}
      </div>
      <div className="flex flex-col items-end gap-g5">
        {items.map((item) => (
          <div key={item.label} className="heading-sm-regular text-text-basic">
            {item.value}
          </div>
        ))}
      </div>
    </div>
  );
}

function RefundDetailContent({
  row,
  onClose,
}: {
  row: ApiResponseAdminRefundPageDataContentItem;
  onClose: () => void;
}) {
  const queryClient = useQueryClient();
  const [reason, setReason] = useState<AdminManualRefundRefundReason>(
    AdminManualRefundRefundReason.NOT_ACHIEVED,
  );
  const [detailReason, setDetailReason] = useState('');

  const { mutate, isPending, data: mutationResponse } =
    usePostApiV1AdminRefundsParticipationIdManual({
      mutation: {
        onSuccess: (response) => {
          if (response.status === 200) {
            queryClient.invalidateQueries({ queryKey: ['/api/v1/admin/refunds'] });
            queryClient.invalidateQueries({
              queryKey: ['/api/v1/admin/dashboard/urgent-refunds'],
            });
            onClose();
          }
        },
      },
    });

  const conflictMessage =
    mutationResponse?.status === 409 ? mutationResponse.data.error.message : null;

  const isWaiting = row.refundStatus === 'WAITING';

  return (
    <>
      <div className="flex items-start justify-between gap-g6 border-b border-border-subtle p-g7">
        <div className="flex flex-col gap-g3">
          <div className="flex flex-wrap items-center gap-g4">
            <h2 className="heading-1xl-bold text-text-basic">
              환불 처리 - #{row.participationId}
            </h2>
            <Chip tone={isWaiting ? 'outline' : 'success'}>
              {isWaiting ? '대기중' : '완료'}
            </Chip>
          </div>
          <p className="body-md-regular text-text-tertiary">
            {row.storeName} · {row.productName}
          </p>
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label="닫기"
          className="shrink-0 rounded-full p-g3 text-icon-subtle hover:bg-gray-50"
        >
          <Icon icon="lucide:x" width={20} height={20} />
        </button>
      </div>

      <div className="flex flex-col gap-g5 p-g7">
        <section className="flex flex-col gap-g5 rounded-large border border-border-subtle bg-bg-white p-g7">
          <InfoGrid
            items={[
              { label: '참여 ID', value: row.participationId },
              { label: '소비자', value: row.userName },
              { label: '공구명', value: row.productName },
              { label: '매장명', value: row.storeName },
              { label: '결제 금액', value: formatCurrency(row.paymentAmount) },
              { label: '환불 사유', value: row.refundReason ?? '-' },
              { label: '요청 일시', value: row.createdAt },
            ]}
          />
        </section>

        {isWaiting ? (
          <section className="flex flex-col gap-g5 rounded-large border border-border-subtle bg-bg-white p-g7">
            <h3 className="heading-lg-bold text-text-subtle">환불 처리</h3>
            <div className="h-px bg-border-default" />

            <div className="flex flex-col gap-g3">
              <span className="body-md-semibold text-text-subtle">
                처리 사유
              </span>
              <div className="flex flex-wrap gap-g3">
                {REASON_OPTIONS.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => setReason(option.value)}
                    className={cn(
                      'rounded-full border px-g5 py-g3 body-md-regular transition-colors',
                      reason === option.value
                        ? 'border-primary-400 bg-primary-50 text-primary-400'
                        : 'border-border-default text-text-subtle',
                    )}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>

            <Input
              variant="admin"
              label="상세 사유 (선택)"
              maxLength={100}
              value={detailReason}
              onChange={(event) => setDetailReason(event.target.value)}
              placeholder="필요 시 상세 사유를 입력하세요"
            />

            {conflictMessage && (
              <p className="body-md-regular text-text-error">{conflictMessage}</p>
            )}

            <Button
              variant="primary"
              size="lg"
              fullWidth
              disabled={isPending}
              onClick={() =>
                mutate({
                  participationId: row.participationId,
                  data: {
                    refundReason: reason,
                    detailReason: detailReason.trim() || undefined,
                  },
                })
              }
            >
              환불 처리
            </Button>
          </section>
        ) : (
          <div className="flex items-center justify-center rounded-large bg-gray-50 p-g6">
            <Chip tone="success">이미 처리된 환불입니다</Chip>
          </div>
        )}
      </div>
    </>
  );
}

export function RefundDetailModal({ row, onClose }: RefundDetailModalProps) {
  return (
    <Modal open={row !== null} onClose={onClose} className="max-w-2xl">
      {row && (
        <RefundDetailContent
          key={row.participationId}
          row={row}
          onClose={onClose}
        />
      )}
    </Modal>
  );
}
