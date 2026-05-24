'use client';

import { ApiResponseRefundListDataItemRefundStatus } from '@/api/hooks/api.schemas';
import { Icon } from '@iconify/react';
import Image from 'next/image';
import Link from 'next/link';
import { formatCompactDate, formatShortDate } from '@/lib/date';

interface BaseCardFields {
  participationId: number;
  productName: string;
  storeName: string;
  pickupDate: string | null;
  quantity: number;
  paymentAmount: number;
  // TODO: 백엔드에서 참여 목록 API에 thumbnailUrl 추가되면 연결
  imageUrl?: string | null;
}

type ActiveProps = BaseCardFields & {
  variant: 'active';
  achievementRate: number;
  dDay: number;
};

type PickupProps = BaseCardFields & {
  variant: 'pickup';
  onQrClick: () => void;
  onPickupClick: () => void;
};

type CompletedProps = BaseCardFields & { variant: 'completed' };

type RefundedProps = BaseCardFields & {
  variant: 'refunded';
  refundStatus: ApiResponseRefundListDataItemRefundStatus;
};

type ParticipationCardProps =
  | ActiveProps
  | PickupProps
  | CompletedProps
  | RefundedProps;

function formatDDay(dDay: number): string {
  if (dDay === 0) return 'D-day';
  if (dDay < 0) return `D${dDay}`;
  return `D-${dDay}`;
}

export function ParticipationCard(props: ParticipationCardProps) {
  const {
    participationId,
    productName,
    storeName,
    pickupDate,
    quantity,
    variant,
    imageUrl,
  } = props;
  const dateLabel = formatCompactDate(pickupDate, '날짜 미정');
  const pickupDateStr = formatShortDate(pickupDate);

  return (
    <div className="bg-surface-white p-g5">
      {/* 날짜 + 주문상세 */}
      <div className="flex items-center justify-between mb-g2">
        <div className="flex items-center gap-g3">
          <span className="heading-sm-bold text-text-basic">{dateLabel}</span>
          {variant === 'refunded' && (
            <span
              className={`inline-flex items-center px-2 py-[3px] rounded-large caption-xs-bold ${
                props.refundStatus === 'COMPLETED'
                  ? 'bg-surface-brand text-text-basic-inverse'
                  : 'bg-surface-default text-text-subtle'
              }`}
            >
              {props.refundStatus === 'COMPLETED' ? '환불 완료' : '환불 대기'}
            </span>
          )}
        </div>
        <Link
          href={`/mypage/order/${participationId}`}
          className="flex items-center gap-g1 caption-sm-medium text-text-tertiary"
        >
          주문상세
          <Icon icon="lucide:chevron-right" className="w-4 h-4" />
        </Link>
      </div>

      {/* 상품 정보 */}
      <div className="flex gap-g4 mb-g4">
        <div className="w-[60px] h-[60px] shrink-0 rounded-2xlarge overflow-hidden bg-surface-muted">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={productName}
              width={60}
              height={60}
              className="object-cover w-full h-full"
            />
          ) : (
            <div className="w-full h-full bg-surface-muted" />
          )}
        </div>
        <div className="flex flex-col justify-center min-w-0">
          <p className="heading-md-bold text-text-basic mb-p2 truncate">
            {productName}
          </p>
          <div className="flex flex-wrap gap-x-g2 caption-sm-medium text-text-tertiary">
            <span>{storeName}</span>
            {pickupDateStr && <span>· 픽업 {pickupDateStr}</span>}
            <span>· 수량 {quantity}개</span>
          </div>
        </div>
      </div>

      {/* 탭별 분기 */}
      {variant === 'active' && (
        <div className="flex flex-col mb-2 gap-g4">
          <div className="border-t border-dashed border-divider-default" />
          <div className="flex items-center gap-g3">
            <span className="shrink-0 px-2 py-[3px] rounded-large bg-surface-brand-lighter text-text-brand caption-xs-bold">
              마감까지 {formatDDay(props.dDay)}
            </span>
            <div className="flex-1 relative h-2 bg-surface-muted rounded-full overflow-hidden">
              <div
                className="absolute inset-y-0 left-0 bg-surface-brand rounded-full transition-all"
                style={{ width: `${Math.min(props.achievementRate, 100)}%` }}
              />
            </div>
            <span className="shrink-0 body-lg-bold text-text-brand">
              {props.achievementRate}%
            </span>
          </div>
        </div>
      )}

      {variant === 'pickup' && (
        <div className="flex mb-2 border border-border-subtle rounded-large">
          <button
            type="button"
            className="flex-1 py-[10px] caption-sm-bold text-text-subtle text-center"
            onClick={props.onPickupClick}
          >
            픽업 안내
          </button>
          <div className="flex items-center">
            <div className="w-px h-4 bg-border-default" />
          </div>
          <button
            type="button"
            className="flex-1 py-[10px] caption-sm-bold text-text-subtle text-center"
            onClick={props.onQrClick}
          >
            큐알 코드
          </button>
        </div>
      )}
    </div>
  );
}
