'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  useGetApiV1OwnerSettlementsRefundRequestsParticipationId,
  usePostApiV1OwnerSettlementsRefundRequestsParticipationIdReviewSubmissions,
} from '@/api/hooks/owner/owner';
import { OwnerRefundReviewActionType } from '@/api/hooks/api.schemas';
import { Button } from '@/components/Button';
import { formatDate } from '@/lib/date';

type Props = {
  participationId: number;
};

export function RefundDetailClient({ participationId }: Props) {
  const router = useRouter();
  const [action, setAction] = useState<'APPROVE' | 'DISPUTE' | null>(null);
  const [disputeReason, setDisputeReason] = useState('');

  const { data: response, isLoading } =
    useGetApiV1OwnerSettlementsRefundRequestsParticipationId(participationId);

  const { mutate: submitReview, isPending: isSubmitting } =
    usePostApiV1OwnerSettlementsRefundRequestsParticipationIdReviewSubmissions();

  const detail = response?.status === 200 ? response.data.data : null;

  const handleSubmit = () => {
    if (!action || !detail) return;
    submitReview(
      {
        participationId,
        data: {
          action:
            action as (typeof OwnerRefundReviewActionType)[keyof typeof OwnerRefundReviewActionType],
          disputeReason: action === 'DISPUTE' ? disputeReason : null,
        },
      },
      {
        onSuccess: () => {
          router.back();
        },
      },
    );
  };

  const isPending = detail?.status === 'PENDING';
  const canSubmit =
    isPending &&
    action !== null &&
    (action !== 'DISPUTE' || disputeReason.trim().length > 0);

  if (isLoading) {
    return (
      <div className="flex flex-col gap-4 px-5 py-4">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="h-12 animate-pulse rounded-xl bg-bg-gray-100"
          />
        ))}
      </div>
    );
  }

  if (!detail) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <p className="body-md-regular text-text-subtle">
          정보를 불러올 수 없어요
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-0 pb-10">
      {/* 기본 정보 */}
      <div className="flex flex-col gap-2 bg-surface-white px-5 py-5">
        <p className="heading-sm-bold text-text-basic">{detail.productName}</p>
        <p className="body-sm-regular text-text-subtle">
          {detail.requesterName} · {formatDate(detail.requestedDate)} 요청
        </p>
      </div>

      <div className="h-2 bg-bg-white-muted" />

      {/* 금액 정보 */}
      <div className="flex flex-col gap-4 bg-surface-white px-5 py-5">
        <InfoRow
          label="결제 금액"
          value={`${detail.paymentAmount.toLocaleString('ko-KR')}원`}
        />
        <InfoRow
          label="위약금 (10%)"
          value={`-${detail.penaltyAmount.toLocaleString('ko-KR')}원`}
          valueClassName="text-text-error"
        />
        <div className="h-px bg-border-subtle" />
        <InfoRow
          label="환불 예정 금액"
          value={`${detail.refundExpectedAmount.toLocaleString('ko-KR')}원`}
          valueClassName="heading-sm-bold text-text-basic"
        />
      </div>

      <div className="h-2 bg-bg-white-muted" />

      {/* 환불 사유 */}
      {detail.refundReasonDetail && (
        <>
          <div className="flex flex-col gap-2 bg-surface-white px-5 py-5">
            <p className="body-md-semibold text-text-basic">환불 사유</p>
            <p className="body-md-regular text-text-subtle">
              {detail.refundReasonDetail}
            </p>
          </div>
          <div className="h-2 bg-bg-white-muted" />
        </>
      )}

      {/* 의견 제출 */}
      {isPending && (
        <div className="flex flex-col gap-3 bg-surface-white px-5 py-5">
          <p className="body-md-semibold text-text-basic">의견 제출</p>

          <label
            className={`flex items-center gap-3 cursor-pointer rounded-2xl border px-4 py-3.5 ${
              action === 'APPROVE'
                ? 'border-button-primary-fill bg-primary-50'
                : 'border-border-default'
            }`}
          >
            <input
              type="radio"
              name="action"
              value="APPROVE"
              checked={action === 'APPROVE'}
              onChange={() => setAction('APPROVE')}
              className="sr-only"
            />
            <RadioIndicator selected={action === 'APPROVE'} />
            <div className="flex flex-col gap-0.5">
              <span className="body-md-semibold text-text-basic">
                동의합니다
              </span>
              <span className="body-sm-regular text-text-subtle">
                환불 요청에 동의해요. 어드민이 처리합니다.
              </span>
            </div>
          </label>

          <label
            className={`flex items-center gap-3 cursor-pointer rounded-2xl border px-4 py-3.5 ${
              action === 'DISPUTE'
                ? 'border-button-primary-fill bg-primary-50'
                : 'border-border-default'
            }`}
          >
            <input
              type="radio"
              name="action"
              value="DISPUTE"
              checked={action === 'DISPUTE'}
              onChange={() => setAction('DISPUTE')}
              className="sr-only"
            />
            <RadioIndicator selected={action === 'DISPUTE'} />
            <div className="flex flex-col gap-0.5">
              <span className="body-md-semibold text-text-basic">
                의의를 제기합니다
              </span>
              <span className="body-sm-regular text-text-subtle">
                사유 입력 후 CS 티켓으로 전달합니다.
              </span>
            </div>
          </label>

          {action === 'DISPUTE' && (
            <textarea
              value={disputeReason}
              onChange={(e) => setDisputeReason(e.target.value)}
              placeholder="의의 제기 사유를 입력해주세요 (최대 500자)"
              maxLength={500}
              rows={4}
              className="w-full resize-none rounded-xl border border-border-default bg-surface-default px-4 py-3 body-md-regular text-text-basic placeholder:text-text-tertiary outline-none focus:border-text-brand"
            />
          )}
        </div>
      )}

      {/* 제출 버튼 */}
      {isPending && (
        <div className="px-5 pt-4">
          <Button
            variant="primary"
            size="lg"
            fullWidth
            disabled={!canSubmit || isSubmitting}
            onClick={handleSubmit}
          >
            {isSubmitting ? '제출 중...' : '제출하기'}
          </Button>
        </div>
      )}
    </div>
  );
}

function RadioIndicator({ selected }: { selected: boolean }) {
  return (
    <span
      className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full ${
        selected
          ? 'bg-button-primary-fill'
          : 'border-2 border-border-default bg-surface-white'
      }`}
    >
      {selected && (
        <svg width="14" height="10" viewBox="0 0 14 10" fill="none">
          <path
            d="M1 5L5 9L13 1"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
    </span>
  );
}

function InfoRow({
  label,
  value,
  valueClassName,
}: {
  label: string;
  value: string;
  valueClassName?: string;
}) {
  return (
    <div className="flex items-center justify-between">
      <span className="body-md-regular text-text-subtle">{label}</span>
      <span
        className={`body-md-regular text-text-basic ${valueClassName ?? ''}`}
      >
        {value}
      </span>
    </div>
  );
}
