'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Button } from '@/components/Button';
import Modal from '@/components/Modal';
import { DateRangePickerBottomSheet } from '../../create/_components/DateRangePickerBottomSheet';
import {
  useGetApiV1OwnerGroupBuysGroupBuyIdManageInProgress,
  useGetApiV1OwnerGroupBuysGroupBuyIdManageAchieved,
  usePostApiV1OwnerGroupBuysGroupBuyIdCloseRequests,
  usePostApiV1OwnerGroupBuysGroupBuyIdExtensionRequests,
  useGetApiV1OwnerGroupBuyRequestsRequestId,
} from '@/api/hooks/owner/owner';
import { OwnerGroupBuyCloseReasonType } from '@/api/generated/api.schemas';
import { formatDate } from '@/lib/date';
import { ParticipantCard } from './ParticipantCard';

/* ── 상수 ── */
type Mode = 'DEFAULT' | 'CLOSE';
type CloseStep = 'FORM' | 'CONFIRM' | 'DONE';
type CloseReason =
  (typeof OwnerGroupBuyCloseReasonType)[keyof typeof OwnerGroupBuyCloseReasonType];

const CLOSE_REASONS: { value: CloseReason; label: string }[] = [
  {
    value: OwnerGroupBuyCloseReasonType.SOLD_OUT,
    label: '개수 초과로 조기마감',
  },
  {
    value: OwnerGroupBuyCloseReasonType.STORE_CONDITION,
    label: '매장사정으로 공구 진행 불가',
  },
  { value: OwnerGroupBuyCloseReasonType.OTHER, label: '기타' },
];

const CLOSE_CONFIG: Record<
  CloseReason,
  {
    needsModal: boolean;
    modalTitle: string;
    confirmLabel: string;
    successMessage: string;
  }
> = {
  [OwnerGroupBuyCloseReasonType.SOLD_OUT]: {
    needsModal: true,
    modalTitle: '공구를 정말로 마감할까요?',
    confirmLabel: '마감하기',
    successMessage: '공구가 마감되었어요',
  },
  [OwnerGroupBuyCloseReasonType.STORE_CONDITION]: {
    needsModal: true,
    modalTitle: '공구 취소 시 패널티가 부과돼요\n그래도 취소하시겠어요?',
    confirmLabel: '취소하기',
    successMessage: '공구가 취소되었어요',
  },
  [OwnerGroupBuyCloseReasonType.OTHER]: {
    needsModal: false,
    modalTitle: '',
    confirmLabel: '',
    successMessage: '관리자에게 요청이 전달되었어요',
  },
};

/* ── StatCard ── */
function StatCard({
  value,
  label,
  bg,
  numCn,
}: {
  value: number;
  label: string;
  bg: string;
  numCn: string;
}) {
  return (
    <div
      className={`flex flex-col items-center gap-1.5 rounded-2xl py-3.5 ${bg}`}
    >
      <span className={`heading-lg-bold ${numCn}`}>{value}</span>
      <span className="caption-sm-regular text-text-tertiary">{label}</span>
    </div>
  );
}

/* ── 마감 완료 화면 ── */
function CloseSuccessView({
  message,
  onBack,
}: {
  message: string;
  onBack: () => void;
}) {
  return (
    <div className="flex flex-1 flex-col bg-bg-white-muted">
      <div className="flex flex-1 flex-col items-center justify-center gap-5">
        <Image src="/icons/complete.svg" width={80} height={80} alt="" />
        <div className="flex flex-col items-center gap-1 text-center">
          <p className="body-md-regular text-text-subtle">마감 요청 완료</p>
          <p className="heading-lg-bold text-text-basic">{message}</p>
        </div>
      </div>
      <div className="px-5 pb-8">
        <Button variant="black" size="lg" fullWidth onClick={onBack}>
          공구 관리 탭으로 돌아가기
        </Button>
      </div>
    </div>
  );
}

/* ── 승인대기 상세 ── */
function PendingApprovalDetailView({ requestId }: { requestId: number }) {
  const { data, isLoading } =
    useGetApiV1OwnerGroupBuyRequestsRequestId(requestId);
  const detail = data?.status === 200 ? data.data.data : null;

  if (isLoading) {
    return (
      <div className="min-h-full bg-bg-white-muted">
        <div className="bg-white px-5 py-5">
          <div className="flex flex-col gap-3">
            <div className="h-6 w-16 animate-pulse rounded-large bg-surface-default" />
            <div className="h-8 w-52 animate-pulse rounded bg-surface-default" />
            <div className="h-4 w-64 animate-pulse rounded bg-surface-default" />
          </div>
        </div>
        <div className="mt-2 bg-white px-5 py-5">
          <div className="h-5 w-24 animate-pulse rounded bg-surface-default" />
        </div>
      </div>
    );
  }

  const periodLabel =
    detail?.requestedAt && detail?.deadline
      ? `${formatDate(detail.requestedAt)} ~ ${formatDate(detail.deadline)}`
      : detail?.deadline
        ? formatDate(detail.deadline)
        : '-';

  return (
    <div className="min-h-full bg-bg-white-muted">
      {/* 상단 상태 안내 */}
      <div className="bg-white px-5 py-5">
        <span className="caption-xs-bold mb-3 inline-flex w-fit rounded-large bg-secondary-50 px-2 py-0.5 text-secondary-600">
          승인대기
        </span>
        <p className="heading-md-bold mt-3 text-text-basic">
          운영자가 공구 신청을 검토 중입니다
        </p>
        <p className="body-sm-regular mt-1.5 text-text-tertiary">
          승인 완료 후 공구가 진행됩니다. 보통 1~2 영업일 소요됩니다.
        </p>
      </div>

      {/* 공구 신청 정보 */}
      <div className="mt-2 bg-white px-5 pb-8 pt-5">
        <p className="heading-sm-bold mb-4 text-text-basic">공구 신청 정보</p>
        <div className="divide-y divide-border-default">
          <PendingInfoRow label="상품명" value={detail?.productName ?? '-'} />
          <PendingInfoRow
            label="공구가"
            value={detail ? `${detail.price.toLocaleString('ko-KR')}원` : '-'}
          />
          <PendingInfoRow label="공구 기간" value={periodLabel} />
          <PendingInfoRow
            label="목표 수량"
            value={detail ? `${detail.targetQuantity}개` : '-'}
          />
          <PendingInfoRow
            label="픽업 날짜"
            value={detail?.pickupDate ? formatDate(detail.pickupDate) : '-'}
          />
          {detail?.productDescription && (
            <div className="py-4">
              <p className="body-sm-regular mb-2 text-text-tertiary">
                추가 요청사항
              </p>
              <p className="body-sm-regular text-text-basic">
                {detail.productDescription}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function PendingInfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between py-4">
      <span className="body-sm-regular shrink-0 text-text-tertiary">
        {label}
      </span>
      <span className="body-sm-regular text-right text-text-basic">
        {value}
      </span>
    </div>
  );
}

/* ── 종료 상세 ── */
function EndedDetailView({
  groupBuyId,
  unitPrice,
}: {
  groupBuyId: number;
  unitPrice?: number;
}) {
  const { data, isLoading } =
    useGetApiV1OwnerGroupBuysGroupBuyIdManageAchieved(groupBuyId);
  const detail = data?.status === 200 ? data.data.data : null;
  const participants = detail?.participants ?? [];
  const summary = detail?.participantSummary;
  const totalQuantity = participants.reduce((s, p) => s + p.quantity, 0);
  const expectedRevenue = unitPrice != null ? totalQuantity * unitPrice : null;

  return (
    <>
      <div className="bg-surface-white px-4 py-3 text-center">
        <p className="body-sm-regular text-text-tertiary">
          종료된 공동구매입니다
        </p>
      </div>

      <div className="bg-surface-white px-4 pb-4">
        {isLoading ? (
          <div className="grid grid-cols-3 gap-2">
            {Array.from({ length: 3 }, (_, i) => (
              <div
                key={i}
                className="h-[72px] animate-pulse rounded-2xl bg-surface-default"
              />
            ))}
          </div>
        ) : (
          summary && (
            <div className="grid grid-cols-3 gap-2">
              <StatCard
                value={summary.totalCount}
                label="총 참여자"
                bg="bg-surface-brand-lighter"
                numCn="text-text-brand"
              />
              <StatCard
                value={summary.completedCount}
                label="완료"
                bg="bg-success-50"
                numCn="text-text-success"
              />
              <StatCard
                value={summary.waitingCount}
                label="환불"
                bg="bg-surface-white border border-divider-default"
                numCn="text-text-basic"
              />
            </div>
          )
        )}
      </div>

      <div className="flex flex-col gap-3 px-4 pb-4 pt-4">
        {isLoading
          ? Array.from({ length: 3 }, (_, i) => (
              <div
                key={i}
                className="h-44 animate-pulse rounded-2xl bg-surface-default"
              />
            ))
          : participants.map((p, i) => (
              <ParticipantCard key={i} participant={p} index={i} />
            ))}
      </div>

      <div className="sticky bottom-0 rounded-t-2xl bg-surface-white px-5 py-4 shadow-[0_-2px_12px_rgba(0,0,0,0.08)]">
        <div className="flex items-center justify-between">
          <span className="body-md-regular text-text-subtle">총 수량</span>
          <span className="heading-sm-bold text-text-basic">
            {totalQuantity}개
          </span>
        </div>
        {expectedRevenue !== null && (
          <div className="mt-1.5 flex items-center justify-between">
            <span className="body-md-regular text-text-subtle">예상 수익</span>
            <span className="heading-md-bold text-text-brand">
              {expectedRevenue.toLocaleString('ko-KR')}원
            </span>
          </div>
        )}
      </div>
    </>
  );
}

/* ── 진행중/달성 상세 ── */
function InProgressDetailView({
  groupBuyId,
  unitPrice,
}: {
  groupBuyId: number;
  unitPrice?: number;
}) {
  const router = useRouter();

  const { data, isLoading } =
    useGetApiV1OwnerGroupBuysGroupBuyIdManageInProgress(groupBuyId);
  const detail = data?.status === 200 ? data.data.data : null;
  const participants = detail?.participants ?? [];
  const summary = detail?.participantSummary;
  const totalQuantity = participants.reduce((s, p) => s + p.quantity, 0);
  const expectedRevenue = unitPrice != null ? totalQuantity * unitPrice : null;

  const [mode, setMode] = useState<Mode>('DEFAULT');

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [extStart, setExtStart] = useState('');
  const [extEnd, setExtEnd] = useState('');
  const { mutate: requestExtension, isPending: isExtending } =
    usePostApiV1OwnerGroupBuysGroupBuyIdExtensionRequests();

  const handleExtensionClick = () => {
    setMode('DEFAULT');
    setShowDatePicker(true);
  };

  const handleExtension = () => {
    if (!extEnd) return;
    requestExtension(
      { groupBuyId, data: { extendedDeadline: `${extEnd}T23:59:59` } },
      { onSuccess: () => router.push('/seller/management') },
    );
  };

  const [closeStep, setCloseStep] = useState<CloseStep>('FORM');
  const [closeReason, setCloseReason] = useState<CloseReason>(
    OwnerGroupBuyCloseReasonType.SOLD_OUT,
  );
  const [reasonDetail, setReasonDetail] = useState('');
  const { mutate: closeGroupBuy, isPending: isClosing } =
    usePostApiV1OwnerGroupBuysGroupBuyIdCloseRequests();

  const handleClose = () =>
    closeGroupBuy(
      {
        groupBuyId,
        data: {
          reason: closeReason,
          reasonDetail:
            closeReason === OwnerGroupBuyCloseReasonType.OTHER
              ? reasonDetail
              : null,
        },
      },
      { onSuccess: () => setCloseStep('DONE') },
    );

  const closeDisabled =
    isClosing ||
    (closeReason === OwnerGroupBuyCloseReasonType.OTHER &&
      !reasonDetail.trim());

  const closeCfg = CLOSE_CONFIG[closeReason];

  if (closeStep === 'DONE') {
    return (
      <CloseSuccessView
        message={closeCfg.successMessage}
        onBack={() => router.push('/seller/management')}
      />
    );
  }

  return (
    <>
      <div className="flex gap-2 bg-surface-white px-4 pb-4 pt-3">
        <Button
          variant={showDatePicker ? 'black' : 'outline'}
          size="md"
          fullWidth
          onClick={handleExtensionClick}
        >
          기간 연장
        </Button>
        <Button
          variant={mode === 'CLOSE' ? 'black' : 'outline'}
          size="md"
          fullWidth
          onClick={() => {
            setShowDatePicker(false);
            setMode('CLOSE');
          }}
        >
          공구 마감
        </Button>
      </div>

      {mode === 'DEFAULT' ? (
        <>
          <div className="bg-surface-white px-4 pb-4">
            {isLoading ? (
              <div className="grid grid-cols-3 gap-2">
                {Array.from({ length: 3 }, (_, i) => (
                  <div
                    key={i}
                    className="h-[72px] animate-pulse rounded-2xl bg-surface-default"
                  />
                ))}
              </div>
            ) : (
              summary && (
                <div className="grid grid-cols-3 gap-2">
                  <StatCard
                    value={summary.totalCount}
                    label="총 참여자"
                    bg="bg-surface-brand-lighter"
                    numCn="text-text-brand"
                  />
                  <StatCard
                    value={summary.completedCount}
                    label="완료"
                    bg="bg-success-50"
                    numCn="text-text-success"
                  />
                  <StatCard
                    value={summary.waitingCount}
                    label="환불"
                    bg="bg-surface-white border border-divider-default"
                    numCn="text-text-basic"
                  />
                </div>
              )
            )}
          </div>

          <div className="flex flex-col gap-3 px-4 pb-4 pt-4">
            {isLoading
              ? Array.from({ length: 3 }, (_, i) => (
                  <div
                    key={i}
                    className="h-44 animate-pulse rounded-2xl bg-surface-default"
                  />
                ))
              : participants.map((p, i) => (
                  <ParticipantCard key={i} participant={p} index={i} />
                ))}
          </div>

          <div className="sticky bottom-0 rounded-t-2xl bg-surface-white px-5 py-4 shadow-[0_-2px_12px_rgba(0,0,0,0.08)]">
            {extEnd ? (
              <Button
                size="lg"
                fullWidth
                disabled={isExtending}
                onClick={handleExtension}
                className="text-text-basic-inverse"
              >
                {isExtending ? '요청 중...' : '기간 연장 완료'}
              </Button>
            ) : (
              <>
                <div className="flex items-center justify-between">
                  <span className="body-md-regular text-text-subtle">
                    총 수량
                  </span>
                  <span className="heading-sm-bold text-text-basic">
                    {totalQuantity}개
                  </span>
                </div>
                {expectedRevenue !== null && (
                  <div className="mt-1.5 flex items-center justify-between">
                    <span className="body-md-regular text-text-subtle">
                      예상 수익
                    </span>
                    <span className="heading-md-bold text-text-brand">
                      {expectedRevenue.toLocaleString('ko-KR')}원
                    </span>
                  </div>
                )}
              </>
            )}
          </div>
        </>
      ) : (
        <>
          <div className="flex-1 overflow-y-auto px-4 pb-32 pt-5">
            <p className="heading-md-bold mb-5 text-text-basic">
              공구 마감 요청시는 이유가 무엇인가요?
            </p>
            <div className="flex flex-col gap-3">
              {CLOSE_REASONS.map(({ value, label }) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setCloseReason(value)}
                  className="flex items-center gap-3 text-left body-sm-medium text-text-basic"
                >
                  <span
                    className={cn(
                      'flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-colors',
                      closeReason === value
                        ? 'border-brand-primary bg-brand-primary'
                        : 'border-border-default bg-white',
                    )}
                  >
                    {closeReason === value && (
                      <span className="h-2 w-2 rounded-full bg-white" />
                    )}
                  </span>
                  {label}
                </button>
              ))}
            </div>

            <textarea
              value={reasonDetail}
              onChange={(e) => setReasonDetail(e.target.value)}
              placeholder="사유를 작성해주세요"
              maxLength={100}
              rows={4}
              className="mt-5 w-full resize-none rounded-2xlarge border border-border-default bg-surface-white px-4 py-3.5 body-sm-regular text-text-subtle placeholder:text-icon-disabled outline-none"
            />
          </div>

          <div className="sticky bottom-0 rounded-t-2xl bg-surface-white px-5 py-4 shadow-[0_-2px_12px_rgba(0,0,0,0.08)]">
            <Button
              size="lg"
              fullWidth
              disabled={closeDisabled}
              onClick={() => {
                if (closeCfg.needsModal) {
                  setCloseStep('CONFIRM');
                } else {
                  handleClose();
                }
              }}
              className="text-text-basic-inverse"
            >
              {isClosing ? '처리 중...' : '공구 마감하기'}
            </Button>
          </div>
        </>
      )}

      <DateRangePickerBottomSheet
        isOpen={showDatePicker}
        onClose={() => setShowDatePicker(false)}
        startDate={extStart}
        endDate={extEnd}
        onSelect={(s, e) => {
          setExtStart(s);
          setExtEnd(e);
        }}
        existingStartDate={detail?.recruitmentStartDate}
        existingEndDate={detail?.recruitmentEndDate}
        confirmLabel="기간 연장 완료"
        pendingLabel="연장기간을 선택해주세요"
      />

      <Modal
        isOpen={closeStep === 'CONFIRM'}
        iconType="warning"
        title={closeCfg.modalTitle}
        confirmLabel={closeCfg.confirmLabel}
        cancelLabel="다시 생각하기"
        onConfirm={handleClose}
        onCancel={() => setCloseStep('FORM')}
      />
    </>
  );
}

/* ── ManageDetailClient ── */
type Props = {
  groupBuyId: number;
  unitPrice?: number;
  status?: string;
  requestId?: number;
};

export function ManageDetailClient({
  groupBuyId,
  unitPrice,
  status,
  requestId,
}: Props) {
  if (status === 'PENDING_APPROVAL') {
    if (requestId == null) return null;
    return <PendingApprovalDetailView requestId={requestId} />;
  }
  if (status === 'ENDED') {
    return <EndedDetailView groupBuyId={groupBuyId} unitPrice={unitPrice} />;
  }
  return <InProgressDetailView groupBuyId={groupBuyId} unitPrice={unitPrice} />;
}
