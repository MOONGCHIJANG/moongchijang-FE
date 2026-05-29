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
  usePostApiV1OwnerGroupBuysGroupBuyIdCloseRequests,
  usePostApiV1OwnerGroupBuysGroupBuyIdExtensionRequests,
} from '@/api/hooks/owner/owner';
import { OwnerGroupBuyCloseReasonType } from '@/api/generated/api.schemas';
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

/** 이유별 모달/성공 문구 설정 */
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

/* ── ManageDetailClient ── */
type Props = { groupBuyId: number; unitPrice?: number };

export function ManageDetailClient({ groupBuyId, unitPrice }: Props) {
  const router = useRouter();

  /* 데이터 */
  const { data, isLoading } =
    useGetApiV1OwnerGroupBuysGroupBuyIdManageInProgress(groupBuyId);
  const detail = data?.status === 200 ? data.data.data : null;
  const participants = detail?.participants ?? [];
  const summary = detail?.participantSummary;
  const totalQuantity = participants.reduce((s, p) => s + p.quantity, 0);
  const expectedRevenue = unitPrice != null ? totalQuantity * unitPrice : null;

  /* 페이지 모드 */
  const [mode, setMode] = useState<Mode>('DEFAULT');

  /* 기간 연장 */
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

  /* 공구 마감 */
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

  /* 이유별 분기 */
  const closeCfg = CLOSE_CONFIG[closeReason];

  /* 완료 상태 */
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
      {/* ── 액션 버튼 ── */}
      <div className="flex gap-2 bg-surface-white px-4 pt-3 pb-4">
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
          {/* ── 요약 카드 ── */}
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

          {/* ── 참여자 목록 ── */}
          <div className="flex flex-col gap-3 px-4 pt-4 pb-4">
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

          {/* ── 하단 고정 바 ── */}
          <div className="sticky bottom-0 border-t border-divider-default bg-surface-white px-5 py-3.5">
            {extEnd ? (
              /* 날짜 선택 완료 → 연장 요청 버튼 */
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
              /* 기본 → 수량 + 예상 수익 */
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
                  <div className="mt-1 flex items-center justify-between">
                    <span className="body-md-regular text-text-subtle">
                      예상 수익
                    </span>
                    <span className="heading-sm-bold text-text-brand">
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
          {/* ── 공구 마감 폼 ── */}
          <div className="flex-1 overflow-y-auto px-4 pt-5 pb-32">
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

          {/* ── 하단 고정 바 (마감하기) ── */}
          <div className="sticky bottom-0 border-t border-divider-default bg-surface-white px-5 py-3.5">
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

      {/* ── 날짜 선택 바텀시트 ── */}
      <DateRangePickerBottomSheet
        isOpen={showDatePicker}
        onClose={() => setShowDatePicker(false)}
        startDate={extStart}
        endDate={extEnd}
        onSelect={(s, e) => {
          setExtStart(s);
          setExtEnd(e);
        }}
      />

      {/* ── 마감 확인 모달 ── */}
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
