'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useQueryClient } from '@tanstack/react-query';
import {
  useGetApiV1UsersMe,
  getApiV1UsersNicknameAvailability,
  getGetApiV1UsersMeQueryKey,
  patchApiV1UsersMeProfile,
} from '@/api/hooks/auth/auth';
import Header from '@/components/Header';
import Input from '@/components/Input';
import { Button } from '@/components/Button';
import Modal from '@/components/Modal';

const NICKNAME_REGEX = /^[A-Za-z0-9가-힣]{2,10}$/;
type CheckState = 'idle' | 'available' | 'unavailable';

export default function NicknameChangePage() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [nickname, setNickname] = useState('');
  const [checkState, setCheckState] = useState<CheckState>('idle');
  const [isChecking, setIsChecking] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const { data: meData } = useGetApiV1UsersMe();
  const currentUser = meData?.status === 200 ? meData.data?.data : null;

  const isValidFormat = NICKNAME_REGEX.test(nickname);
  const canCheck =
    isValidFormat && !isChecking && !isSubmitting && checkState !== 'available';
  const canSubmit = checkState === 'available' && !isSubmitting;

  const helperMessage =
    checkState === 'available'
      ? '사용 가능한 닉네임이에요'
      : checkState === 'unavailable'
        ? '이미 사용 중인 닉네임이에요'
        : '2~10자, 한글/영문/숫자';

  const helperColor =
    checkState === 'available'
      ? 'text-text-basic'
      : checkState === 'unavailable'
        ? 'text-text-error'
        : 'text-text-subtle-inverse';

  function handleNicknameChange(value: string) {
    setNickname(value);
    setCheckState('idle');
  }

  async function handleCheck() {
    if (!canCheck) return;
    setIsChecking(true);
    const res = await getApiV1UsersNicknameAvailability({ nickname }).catch(
      () => null,
    );
    setIsChecking(false);
    if (!res || res.status !== 200) {
      setCheckState('unavailable');
      return;
    }
    setCheckState(res.data?.data?.available ? 'available' : 'unavailable');
  }

  async function handleSubmit() {
    if (!canSubmit) return;
    setIsSubmitting(true);
    const res = await patchApiV1UsersMeProfile({
      nickname,
      phoneNumber: currentUser?.phoneNumber ?? '',
    }).catch(() => null);
    setIsSubmitting(false);
    if (!res || res.status !== 200) return;
    queryClient.invalidateQueries({ queryKey: getGetApiV1UsersMeQueryKey() });
    setShowSuccessModal(true);
  }

  return (
    <div className="min-h-dvh bg-bg-white flex flex-col">
      <Header text="닉네임 변경" showBackButton />

      <div className="px-4 pt-6 flex flex-col gap-g3">
        <p className="caption-sm-medium text-text-disabled">새 닉네임</p>
        <div className="flex items-start gap-g3">
          <div className="flex-1 min-w-0">
            <Input
              placeholder="변경하실 닉네임을 입력해주세요"
              value={nickname}
              onChange={handleNicknameChange}
              helperText={helperMessage}
              helperTextClassName={helperColor}
              isError={checkState === 'unavailable'}
            />
          </div>
          <Button
            size="sm"
            disabled={!canCheck}
            onClick={handleCheck}
            className="flex-shrink-0 mt-[5px] w-[58px]"
          >
            {isChecking ? '확인 중' : '중복확인'}
          </Button>
        </div>
      </div>

      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full min-w-[360px] max-w-[440px] px-p4 pb-13">
        <Button
          variant="black"
          size="lg"
          disabled={!canSubmit}
          className="w-full disabled:bg-button-disabled-fill disabled:text-button-white"
          onClick={handleSubmit}
        >
          완료
        </Button>
      </div>

      <Modal
        isOpen={showSuccessModal}
        iconType="success"
        title="닉네임 변경이 완료되었어요"
        confirmLabel="확인"
        onConfirm={() => router.back()}
      />
    </div>
  );
}
