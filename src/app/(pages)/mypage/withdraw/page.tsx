'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Icon } from '@iconify/react';
import { useGetApiV1UsersMeParticipationsPickupWaiting } from '@/api/hooks/my-page/my-page';
import { useAuthStore } from '@/store/authStore';
import Header from '@/components/Header';
import Modal from '@/components/Modal';

const NOTICE_ITEMS = [
  {
    prefix: '참여 중인 공구가 있으면',
    chip: '자동취소',
    icon: 'fluent:calendar-cancel-16-filled',
    suffix: '돼요',
  },
  {
    prefix: '수령예정 공구가 있으면',
    chip: '탈퇴가 불가',
    icon: 'typcn:cancel',
    suffix: '해요',
  },
  {
    prefix: '보유 찜 목록이',
    chip: '삭제',
    icon: 'lets-icons:trash',
    suffix: '돼요',
  },
  {
    prefix: '동일 이메일 재가입은',
    chip: '30일',
    icon: 'uis:calender',
    suffix: '후에 가능해요',
  },
];

const WITHDRAW_REASONS = [
  '원하는 공구가 없어요',
  '서비스 이용이 불편해요',
  '개인정보가 걱정돼요',
  '기타',
];

export default function WithdrawPage() {
  const router = useRouter();
  const [selectedReason, setSelectedReason] = useState<string | null>(null);
  const [reasonDetail, setReasonDetail] = useState('');
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showBlockedModal, setShowBlockedModal] = useState(false);

  const { data: pickupWaitingData } =
    useGetApiV1UsersMeParticipationsPickupWaiting(undefined);
  const hasPickupWaiting =
    pickupWaitingData?.status === 200 &&
    (pickupWaitingData.data?.data?.content?.length ?? 0) > 0;

  const deleteAccount = useAuthStore((s) => s.deleteAccount);
  const [isPending, setIsPending] = useState(false);

  function handleWithdrawButtonClick() {
    if (hasPickupWaiting) {
      setShowBlockedModal(true);
    } else {
      setShowConfirmModal(true);
    }
  }

  async function handleWithdraw() {
    setIsPending(true);
    const success = await deleteAccount();
    setIsPending(false);
    if (!success) {
      setShowConfirmModal(false);
      setShowBlockedModal(true);
      return;
    }
    router.push('/login');
  }

  return (
    <div className="min-h-dvh bg-bg-white flex flex-col">
      <Header text="탈퇴하기" showBackButton />

      <div className="flex flex-col gap-g7 pt-p10 pb-[80px]">
        {/* 페이지 타이틀 */}
        <p className="heading-lg-bold text-text-brand text-center px-g5">
          탈퇴하기 전에 확인해주세요
        </p>

        {/* 유의사항 카드 */}
        <div className="mx-g8 bg-surface-white rounded-2xlarge border border-border-subtle p-p5 flex flex-col gap-g5">
          {NOTICE_ITEMS.map(({ prefix, chip, icon, suffix }) => (
            <div
              key={chip}
              className="flex items-center justify-center gap-g3 flex-wrap"
            >
              <span className="body-md-semibold text-text-subtle">
                {prefix}
              </span>
              <span className="inline-flex items-center gap-g2 bg-surface-brand-lighter border border-border-brand rounded-medium px-g3 py-g2">
                <Icon icon={icon} className="w-5 h-5 text-icon-primary" />
                <span className="body-md-semibold text-[#FF502E]">{chip}</span>
              </span>
              <span className="body-md-semibold text-text-basic">{suffix}</span>
            </div>
          ))}
        </div>

        {/* 탈퇴 사유 */}
        <div className="mx-p9 bg-surface-white px-g4 py-g4">
          <p className="caption-sm-medium text-text-disabled mb-3">
            탈퇴 사유 (선택)
          </p>
          <ul className="flex flex-col gap-g5">
            {WITHDRAW_REASONS.map((reason) => (
              <li key={reason}>
                <label className="flex items-center gap-p3 cursor-pointer">
                  <input
                    type="radio"
                    name="withdrawReason"
                    value={reason}
                    checked={selectedReason === reason}
                    onChange={() => setSelectedReason(reason)}
                    className="w-5 h-5 accent-button-primary-fill"
                  />
                  <span className="body-md-regular text-text-basic">
                    {reason}
                  </span>
                </label>
              </li>
            ))}
          </ul>
          {selectedReason === '기타' && (
            <textarea
              className="mt-g4 w-full rounded-xl border border-border-default bg-white px-g4 py-g4 body-md-regular text-text-basic placeholder:text-text-disabled resize-none outline-none focus:border-border-focus"
              rows={4}
              maxLength={500}
              placeholder="사유를 작성해주세요"
              value={reasonDetail}
              onChange={(e) => setReasonDetail(e.target.value)}
            />
          )}
        </div>
      </div>

      {/* 하단 고정 탈퇴하기 */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full min-w-[360px] max-w-[440px] flex justify-center pb-13">
        <button
          type="button"
          className="caption-sm-medium text-text-disabled underline disabled:opacity-50"
          onClick={handleWithdrawButtonClick}
          disabled={isPending}
        >
          탈퇴하기
        </button>
      </div>

      {/* 탈퇴 확인 모달 */}
      <Modal
        isOpen={showConfirmModal}
        iconType="warning"
        title="정말 탈퇴할까요?"
        description={`탈퇴 시 모든 정보가 삭제되며\n복구가 불가해요`}
        confirmLabel="탈퇴하기"
        cancelLabel="다시 생각하기"
        confirmVariant="danger"
        onConfirm={handleWithdraw}
        onCancel={() => setShowConfirmModal(false)}
      />

      {/* 탈퇴 불가 모달 */}
      <Modal
        isOpen={showBlockedModal}
        iconType="warning"
        title="탈퇴가 불가해요"
        description={`수령 예정인 공구가 있어요.\n뭉치장 카카오톡 채널로 문의해주세요.`}
        confirmLabel="확인"
        onConfirm={() => setShowBlockedModal(false)}
        onCancel={() => setShowBlockedModal(false)}
      />
    </div>
  );
}
