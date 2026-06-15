import { Icon } from '@iconify/react';
import { OwnerGroupBuyParticipantItem } from '@/api/generated/api.schemas';
import { Badge } from '@/components/Badge';

type Cfg = {
  badge: string;
  label: string;
  bgCn: string;
  textCn: string;
  statusCn: string;
};

function resolveConfig(paymentStatus: string): Cfg {
  const s = paymentStatus;
  // 결제 완료 계열
  if (
    s === '결제완료' ||
    s === 'PAID' ||
    s === 'PAYMENT_COMPLETED' ||
    s === 'PAID_WAITING_GOAL'
  ) {
    return {
      badge: '완료',
      label: '결제완료',
      bgCn: 'bg-success-50',
      textCn: 'text-success-600',
      statusCn: 'text-text-success',
    };
  }
  // 환불·취소 완료 계열
  if (
    s === '환불완료' ||
    s === '취소' ||
    s === 'REFUNDED' ||
    s === 'REFUND_COMPLETED' ||
    s === 'CANCELLED'
  ) {
    return {
      badge: '취소',
      label: '환불완료',
      bgCn: 'bg-surface-default',
      textCn: 'text-text-subtle',
      statusCn: 'text-text-error',
    };
  }
  // 환불 요청·대기 계열
  if (s === '환불요청' || s === 'REFUND_REQUESTED' || s === 'REFUND_PENDING') {
    return {
      badge: '환불중',
      label: '환불요청',
      bgCn: 'bg-surface-default',
      textCn: 'text-text-subtle',
      statusCn: 'text-text-error',
    };
  }
  // 대기
  return {
    badge: '대기',
    label: '대기중',
    bgCn: 'bg-surface-default',
    textCn: 'text-text-tertiary',
    statusCn: 'text-text-tertiary',
  };
}

function InfoRow({
  label,
  value,
  valueCn = 'text-text-basic',
}: {
  label: string;
  value: string;
  valueCn?: string;
}) {
  return (
    <div className="flex items-center justify-between py-[3px]">
      <span className="body-sm-regular text-text-tertiary">{label}</span>
      <span className={`body-sm-regular ${valueCn}`}>{value}</span>
    </div>
  );
}

type Props = { participant: OwnerGroupBuyParticipantItem; index: number };

export function ParticipantCard({ participant: p, index }: Props) {
  const cfg = resolveConfig(p.paymentStatus);
  const code = `P${String(index + 1).padStart(3, '0')}`;

  return (
    <div className="rounded-2xl bg-surface-white px-4 py-4 shadow-sm">
      {/* 이름 · 코드 · 배지 */}
      <div className="mb-1.5 flex items-center justify-between">
        <p className="heading-sm-bold text-text-basic">
          {p.name}
          <span className="ml-1 body-sm-regular text-text-tertiary">
            {code}
          </span>
        </p>
        <Badge
          label={cfg.badge}
          className={`h-auto min-w-10 rounded-md px-1.5 py-[5px] ${cfg.bgCn}`}
          textClassName={`caption-xs-bold ${cfg.textCn}`}
        />
      </div>

      {/* 전화번호 */}
      <div className="mb-3 flex items-center gap-1">
        <Icon
          icon="lucide:phone"
          className="h-3.5 w-3.5 shrink-0 text-icon-subtle"
        />
        <span className="body-sm-regular text-text-tertiary">
          {p.phoneNumber}
        </span>
      </div>

      {/* 상세 행 */}
      <div className="flex flex-col gap-0.5 border-t border-divider-default pt-2.5">
        <InfoRow label="상품" value={p.productName} />
        <InfoRow label="수량" value={`${p.quantity}개`} />
        <InfoRow label="결제수단" value={p.paymentMethod} />
        <InfoRow label="결제상태" value={cfg.label} valueCn={cfg.statusCn} />
      </div>
    </div>
  );
}
