'use client';

import { use, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  useGetApiV1UsersMeParticipations,
  useGetApiV1UsersMeRefunds,
} from '@/api/hooks/my-page/my-page';
import {
  ApiResponseMypageParticipationListDataItem,
  ApiResponseRefundListDataItem,
} from '@/api/generated/api.schemas';
import { useGetApiV1ParticipationsParticipationIdPickup } from '@/api/hooks/pickup/pickup';
import Header from '@/components/Header';
import Tooltip from '@/components/Tooltip';
import Modal from '@/components/Modal';
import { formatShortDate, formatCompactDate } from '@/lib/date';

type OrderVariant =
  | 'active'
  | 'waiting'
  | 'completed'
  | 'refund-pending'
  | 'refund-completed';

const MINI_TAG: Record<OrderVariant, { label: string; className: string }> = {
  active: {
    label: '달성 전',
    className: 'bg-surface-brand-lighter text-text-brand',
  },
  waiting: {
    label: '픽업 대기',
    className: 'bg-surface-default text-text-subtle',
  },
  completed: {
    label: '픽업 완료',
    className: 'bg-surface-inverse text-text-basic-inverse',
  },
  'refund-pending': {
    label: '환불 대기',
    className: 'bg-surface-default text-text-subtle',
  },
  'refund-completed': {
    label: '환불 완료',
    className: 'bg-surface-brand text-text-basic-inverse',
  },
};

function formatAmount(n: number): string {
  return n.toLocaleString('ko-KR') + '원';
}

export default function OrderDetailPage({
  params,
}: {
  params: Promise<{ participationId: string }>;
}) {
  const { participationId } = use(params);
  const id = Number(participationId);
  const router = useRouter();
  const [showCancelModal, setShowCancelModal] = useState(false);

  const { data: activeRes, isPending: isActivePending } =
    useGetApiV1UsersMeParticipations({ status: 'ACTIVE' });
  const { data: completedRes, isPending: isCompletedPending } =
    useGetApiV1UsersMeParticipations({ status: 'COMPLETED' });
  const { data: refundRes, isPending: isRefundPending } =
    useGetApiV1UsersMeRefunds();
  const { data: pickupRes } =
    useGetApiV1ParticipationsParticipationIdPickup(id);

  if (isActivePending || isCompletedPending || isRefundPending) {
    return (
      <div className="min-h-dvh bg-bg-white-muted flex flex-col">
        <Header text="주문 상세" showBackButton />
        <div className="flex-1 flex items-center justify-center">
          <div className="w-8 h-8 border-4 border-border-brand border-t-transparent rounded-full animate-spin" />
        </div>
      </div>
    );
  }

  const activeItems: ApiResponseMypageParticipationListDataItem[] =
    activeRes?.status === 200 ? (activeRes.data?.data ?? []) : [];
  const completedItems: ApiResponseMypageParticipationListDataItem[] =
    completedRes?.status === 200 ? (completedRes.data?.data ?? []) : [];
  const refundItems: ApiResponseRefundListDataItem[] =
    refundRes?.status === 200 ? (refundRes.data?.data ?? []) : [];
  const pickup = pickupRes?.status === 200 ? pickupRes.data?.data : null;

  const activeItem = activeItems.find((p) => p.participationId === id);
  const completedItem = completedItems.find((p) => p.participationId === id);
  const refundItem = refundItems.find((p) => p.participationId === id);

  let variant: OrderVariant | null = null;
  if (activeItem) {
    variant =
      activeItem.achievementStatus === 'BEFORE_ACHIEVED' ? 'active' : 'waiting';
  } else if (completedItem) {
    variant = 'completed';
  } else if (refundItem) {
    variant =
      refundItem.refundStatus === 'PENDING'
        ? 'refund-pending'
        : 'refund-completed';
  }

  const item = activeItem ?? completedItem;
  const productName =
    pickup?.productName ?? item?.productName ?? refundItem?.productName ?? '-';
  const storeName =
    pickup?.storeName ?? item?.storeName ?? refundItem?.storeName ?? '-';
  const pickupDate =
    pickup?.pickupDate ?? item?.pickupDate ?? refundItem?.pickupDate ?? null;
  const quantity =
    pickup?.quantity ?? item?.quantity ?? refundItem?.quantity ?? 0;
  const paymentAmount = item?.paymentAmount ?? refundItem?.paymentAmount ?? 0;
  const tag = variant ? MINI_TAG[variant] : null;

  return (
    <div className="min-h-dvh bg-bg-white-muted flex flex-col">
      <Header text="주문 상세" showBackButton />

      <div className="flex flex-col py-g5">
        {/* 주문 상태 */}
        <div className="bg-surface-white px-g5 py-g5">
          <p className="heading-sm-bold text-text-basic mb-g5">
            {formatCompactDate(pickupDate)} 결제
          </p>
          {tag && (
            <span
              className={`inline-flex items-center px-2 py-[3px] rounded-large caption-xs-bold mb-g3 ${tag.className}`}
            >
              {tag.label}
            </span>
          )}
          <div className="flex items-center gap-g4">
            <div className="w-16 h-16 rounded-2xlarge bg-surface-default shrink-0" />
            <div className="flex flex-col gap-p3">
              <p className="heading-md-bold text-text-basic">{productName}</p>
              <p className="caption-sm-medium text-text-tertiary">
                {storeName} · 픽업 {formatShortDate(pickupDate) ?? '-'} · 수량{' '}
                {quantity}개
              </p>
            </div>
          </div>
        </div>

        {/* 결제 내역 */}
        <div className="bg-surface-white px-g5 py-g5 mt-g5">
          <p className="heading-md-bold text-text-basic mb-g4">결제 내역</p>
          <div className="flex flex-col">
            <PaymentRow label="상품 금액" value={formatAmount(paymentAmount)} />
            <div className="border-b border-dashed border-divider-default" />
            <PaymentRow label="수수료" value="0원" />
            <div className="border-b border-border-focus" />
            <PaymentRow
              label="최종 결제"
              value={formatAmount(paymentAmount)}
              bold
              highlight
            />
            {/* TODO: 백엔드에서 paymentMethod 필드 추가되면 표시 */}
          </div>
        </div>

        {/* 툴팁 + 주문 취소 */}
        {variant === 'active' && (
          <div className="flex flex-col items-center gap-19 mt-g3">
            <div className="relative w-full flex justify-center">
              <Tooltip text="공구가 달성되지 않으면 자동으로 환불돼요" />
            </div>
            {activeItem?.canCancel && (
              <button
                className="caption-sm-medium text-text-tertiary underline underline-offset-2"
                onClick={() => setShowCancelModal(true)}
              >
                주문 취소
              </button>
            )}
          </div>
        )}

        {/* 환불 내역 */}
        {(variant === 'refund-pending' || variant === 'refund-completed') &&
          refundItem && (
            <div className="bg-surface-white px-g5 py-g5 mt-g5">
              <p className="body-md-bold text-text-basic mb-g4">환불 내역</p>
              <div className="flex flex-col">
                <PaymentRow
                  label="상품 금액"
                  value={formatAmount(refundItem.paymentAmount)}
                />
                <div className="border-b border-dashed border-divider-default" />
                <PaymentRow label="수수료" value="0원" />
                <div className="border-b border-divider-default" />
                <PaymentRow
                  label="환불 금액"
                  value={formatAmount(refundItem.paymentAmount)}
                  bold
                  highlight
                />
                {/* TODO: 백엔드에서 paymentMethod 필드 추가되면 표시 */}
              </div>
            </div>
          )}
      </div>
      <Modal
        isOpen={showCancelModal}
        title="정말 취소하시겠어요?"
        iconType="warning"
        confirmLabel="취소하기"
        cancelLabel="다시 생각하기"
        onConfirm={() => router.push(`/mypage/order/${id}/cancel`)}
        onCancel={() => setShowCancelModal(false)}
      />
    </div>
  );
}

function PaymentRow({
  label,
  value,
  bold = false,
  highlight = false,
}: {
  label: string;
  value: string;
  bold?: boolean;
  highlight?: boolean;
}) {
  return (
    <div className="flex justify-between items-center py-p4">
      <span
        className={
          bold
            ? 'heading-sm-bold text-text-basic'
            : 'body-md-semibold text-text-basic'
        }
      >
        {label}
      </span>
      <span
        className={
          bold
            ? `heading-lg-bold ${highlight ? 'text-text-brand' : 'text-text-basic'}`
            : 'body-md-semibold text-text-tertiary'
        }
      >
        {value}
      </span>
    </div>
  );
}
