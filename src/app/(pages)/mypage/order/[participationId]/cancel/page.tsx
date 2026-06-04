'use client';

import { use, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useGetApiV1UsersMeParticipations } from '@/api/hooks/my-page/my-page';
import { usePostApiV1ParticipationsParticipationIdCancel } from '@/api/hooks/participation/participation';
import {
  ApiResponseMypageParticipationListDataItem,
  CancelParticipationRequestReason,
} from '@/api/generated/api.schemas';
import Header from '@/components/Header';
import { Button } from '@/components/Button';
import { ToastBlack } from '@/components/ToastBlack';
import { formatShortDate } from '@/lib/date';
import Image from 'next/image';

function formatAmount(n: number): string {
  return n.toLocaleString('ko-KR') + '원';
}

const CANCEL_REASONS: {
  label: string;
  value: CancelParticipationRequestReason;
}[] = [
  {
    label: '시간이 안 될 것 같아요',
    value: CancelParticipationRequestReason.TIME_UNAVAILABLE,
  },
  {
    label: '먹고 싶지 않아졌어요',
    value: CancelParticipationRequestReason.NO_LONGER_WANTED,
  },
  {
    label: '직접 가는 게 나을 것 같아요',
    value: CancelParticipationRequestReason.PREFER_DIRECT_VISIT,
  },
  {
    label: '다른 곳에서 사는 게 나을 것 같아요',
    value: CancelParticipationRequestReason.BOUGHT_ELSEWHERE,
  },
  { label: '기타', value: CancelParticipationRequestReason.OTHER },
];

export default function CancelPage({
  params,
}: {
  params: Promise<{ participationId: string }>;
}) {
  const { participationId } = use(params);
  const id = Number(participationId);
  const router = useRouter();

  const [selectedReason, setSelectedReason] =
    useState<CancelParticipationRequestReason | null>(null);
  const [reasonDetail, setReasonDetail] = useState('');
  const [submitError, setSubmitError] = useState<string | null>(null);

  useEffect(() => {
    if (!submitError) return;
    const timer = setTimeout(() => setSubmitError(null), 3000);
    return () => clearTimeout(timer);
  }, [submitError]);

  const { data: activeRes } = useGetApiV1UsersMeParticipations({
    status: 'IN_PROGRESS',
  });
  const activeItems: ApiResponseMypageParticipationListDataItem[] =
    activeRes?.status === 200 ? (activeRes.data?.data ?? []) : [];
  const item = activeItems.find((p) => p.participationId === id);

  const { mutate: cancel, isPending } =
    usePostApiV1ParticipationsParticipationIdCancel();

  const isDisabled =
    !selectedReason ||
    (selectedReason === CancelParticipationRequestReason.OTHER &&
      !reasonDetail.trim()) ||
    isPending;

  function handleSubmit() {
    if (!selectedReason) return;
    cancel(
      {
        participationId: id,
        data: {
          reason: selectedReason,
          ...(selectedReason === CancelParticipationRequestReason.OTHER && {
            reasonDetail,
          }),
        },
      },
      {
        onSuccess: (res) => {
          if (res.status !== 200) {
            setSubmitError('취소 요청에 실패했어요. 다시 시도해주세요.');
            return;
          }
          router.push(`/mypage/order/${id}/cancel/complete`);
        },
      },
    );
  }

  return (
    <div className="min-h-dvh bg-bg-white-muted flex flex-col">
      <Header text="주문 취소" showBackButton />

      <div className="flex flex-col gap-g3 py-g5 pb-[160px]">
        {/* 취소 공구 상품 */}
        {item && (
          <div className="bg-surface-white px-g5 py-g5">
            <p className="heading-sm-bold text-text-basic mb-g4">
              취소 공구 상품
            </p>
            <div className="flex items-center gap-g3">
              <Image
                src={item.thumbnailUrl || '/images/owner.svg'}
                alt={item.productName}
                width={64}
                height={64}
                className="w-16 h-16 rounded-2xlarge bg-surface-default shrink-0 object-cover"
              />
              <div className="flex flex-col gap-p3">
                <p className="heading-md-bold text-text-basic">
                  {item.productName}
                </p>
                <p className="caption-sm-medium text-text-tertiary">
                  {item.storeName} · 픽업{' '}
                  {formatShortDate(item.pickupDate) ?? '-'} · 수량{' '}
                  {item.quantity}개
                </p>
              </div>
            </div>
          </div>
        )}

        {/* 취소 사유 */}
        <div className="bg-surface-white px-g5 py-g5">
          <p className="heading-sm-bold text-text-basic mb-p4">
            취소 사유가 무엇인가요?
          </p>
          <ul className="flex flex-col gap-g4 py-p3">
            {CANCEL_REASONS.map(({ label, value }) => (
              <li key={value}>
                <label className="flex items-center gap-p3 cursor-pointer">
                  <input
                    type="radio"
                    name="cancelReason"
                    value={value}
                    checked={selectedReason === value}
                    onChange={() => setSelectedReason(value)}
                    className="w-5 h-5 accent-button-primary-fill"
                  />
                  <span className="body-md-regular text-text-basic">
                    {label}
                  </span>
                </label>
              </li>
            ))}
          </ul>
          {selectedReason === CancelParticipationRequestReason.OTHER && (
            <textarea
              className="mt-p2 w-full rounded-xl border border-border-default bg-white px-g4 py-g4 body-md-regular text-text-basic placeholder:text-text-disabled resize-none outline-none focus:border-border-focus"
              rows={4}
              maxLength={500}
              placeholder="사유를 작성해주세요"
              value={reasonDetail}
              onChange={(e) => setReasonDetail(e.target.value)}
            />
          )}
        </div>

        {/* 예상 환불 내역 */}
        {item && (
          <div className="bg-surface-white px-g5 py-g5">
            <div className="flex justify-between items-center mb-p3">
              <p className="heading-sm-bold text-text-basic">예상 환불 금액</p>
              <p className="heading-lg-bold text-text-brand">
                {formatAmount(item.paymentAmount)}
              </p>
            </div>
            <div className="flex flex-col mt-p3 border-t border-divider-subtle">
              <div className="flex justify-between items-center py-p4">
                <span className="body-md-semibold text-text-basic">
                  실제 결제 금액
                </span>
                <span className="body-md-semibold text-text-tertiary">
                  {formatAmount(item.paymentAmount)}
                </span>
              </div>
              <div className="border-b border-dashed border-divider-default" />
              <div className="flex justify-between items-center py-p4">
                <span className="body-md-semibold text-text-basic">수수료</span>
                <span className="body-md-semibold text-text-tertiary">0원</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 에러 토스트 */}
      <div className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 w-[calc(100%-32px)] max-w-[408px] pointer-events-none">
        <ToastBlack
          isVisible={!!submitError}
          icon="lucide:circle-alert"
          message={submitError ?? ''}
        />
      </div>

      {/* 하단 고정 버튼 */}
      <div className="pwa-pb fixed bottom-0 left-1/2 -translate-x-1/2 w-full min-w-[360px] max-w-[440px] px-g5 pb-g5 pt-g3 bg-surface-white">
        <Button
          size="lg"
          fullWidth
          disabled={isDisabled}
          onClick={handleSubmit}
        >
          취소하기
        </Button>
      </div>
    </div>
  );
}
