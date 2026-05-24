'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { usePostApiV1AuthPasswordChange } from '@/api/hooks/auth/auth';
import Header from '@/components/Header';
import Input from '@/components/Input';
import { Button } from '@/components/Button';
import Modal from '@/components/Modal';
import { ToastBlack } from '@/components/ToastBlack';

const PASSWORD_REGEX = /^(?=.*[A-Za-z])(?=.*[0-9]).{8,20}$/;

export default function PasswordChangePage() {
  const router = useRouter();
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newPasswordConfirm, setNewPasswordConfirm] = useState('');
  const [currentPasswordError, setCurrentPasswordError] = useState('');
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [networkError, setNetworkError] = useState<string | null>(null);

  useEffect(() => {
    if (!networkError) return;
    const timer = setTimeout(() => setNetworkError(null), 3000);
    return () => clearTimeout(timer);
  }, [networkError]);

  const { mutate: changePassword, isPending } =
    usePostApiV1AuthPasswordChange();

  const isNewPasswordValid = PASSWORD_REGEX.test(newPassword);
  const isConfirmMatch =
    newPassword === newPasswordConfirm && newPasswordConfirm.length > 0;
  const canSubmit =
    currentPassword.length > 0 &&
    isNewPasswordValid &&
    isConfirmMatch &&
    !isPending;

  const newPasswordHelper =
    newPassword.length === 0
      ? ''
      : isNewPasswordValid
        ? '사용 가능한 비밀번호예요'
        : '비밀번호는 영문, 숫자 포함 8~20자이어야 해요';
  const newPasswordHelperColor =
    newPassword.length === 0
      ? 'text-text-subtle-inverse'
      : isNewPasswordValid
        ? 'text-text-basic'
        : 'text-text-error';

  const confirmHelper =
    newPasswordConfirm.length === 0
      ? ''
      : isConfirmMatch
        ? '비밀번호가 일치해요'
        : '비밀번호가 일치하지 않아요';
  const confirmHelperColor = isConfirmMatch
    ? 'text-text-basic'
    : 'text-text-error';

  function handleCurrentPasswordChange(value: string) {
    setCurrentPassword(value);
    setCurrentPasswordError('');
  }

  function handleSubmit() {
    if (!canSubmit) return;
    changePassword(
      { data: { currentPassword, newPassword, newPasswordConfirm } },
      {
        onSuccess: (res) => {
          if (res.status !== 200) {
            if (res.status === 400) {
              setCurrentPasswordError('현재 비밀번호가 올바르지 않아요');
            } else if (res.status === 403) {
              setCurrentPasswordError(
                '이메일로 가입한 계정에서만 변경 가능해요',
              );
            }
            return;
          }
          setShowSuccessModal(true);
        },
        onError: () => {
          setNetworkError('네트워크 오류가 발생했어요. 다시 시도해주세요.');
        },
      },
    );
  }

  return (
    <div className="min-h-dvh bg-bg-white flex flex-col">
      <Header text="비밀번호 변경" showBackButton />

      <div className="px-4 pt-8 flex flex-col gap-0">
        <div className={currentPasswordError ? 'mb-g5' : ''}>
          <Input
            label="현재 비밀번호"
            isPassword
            placeholder="현재 비밀번호를 입력해주세요"
            value={currentPassword}
            onChange={handleCurrentPasswordChange}
            isError={!!currentPasswordError}
            helperText={currentPasswordError}
            helperTextClassName={
              currentPasswordError ? 'text-text-error' : undefined
            }
          />
        </div>
        <div className={newPassword.length > 0 ? 'mb-g5' : ''}>
          <Input
            label="새 비밀번호"
            isPassword
            placeholder="변경하실 비밀번호를 입력해주세요"
            value={newPassword}
            onChange={setNewPassword}
            isError={newPassword.length > 0 && !isNewPasswordValid}
            helperText={newPasswordHelper}
            helperTextClassName={newPasswordHelperColor}
          />
        </div>
        <Input
          label="새 비밀번호 확인"
          isPassword
          placeholder="변경하실 비밀번호를 입력해주세요"
          value={newPasswordConfirm}
          onChange={setNewPasswordConfirm}
          isError={newPasswordConfirm.length > 0 && !isConfirmMatch}
          helperText={confirmHelper}
          helperTextClassName={confirmHelperColor}
        />
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

      <div className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 w-[calc(100%-32px)] max-w-[408px] pointer-events-none">
        <ToastBlack
          isVisible={!!networkError}
          icon="lucide:circle-alert"
          message={networkError ?? ''}
        />
      </div>

      <Modal
        isOpen={showSuccessModal}
        iconType="success"
        title="비밀번호 변경이 완료되었어요"
        confirmLabel="확인"
        onConfirm={() => router.back()}
      />
    </div>
  );
}
