'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useQueryClient } from '@tanstack/react-query';
import {
  usePostApiV1UsersMePhoneVerificationCodes,
  usePostApiV1UsersMePhoneVerificationCodesVerify,
  usePatchApiV1UsersMePhoneNumber,
  getGetApiV1UsersMeQueryKey,
} from '@/api/hooks/auth/auth';
import { Icon } from '@iconify/react';
import Image from 'next/image';
import Header from '@/components/Header';
import Input from '@/components/Input';
import { Button } from '@/components/Button';
import Modal from '@/components/Modal';
import { formatPhone, isValidPhone } from '@/lib/phone';

type Step = 'entry' | 'verify';
const TIMER_SECONDS = 180;

function formatTimer(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, '0')}`;
}

export default function PhoneChangePage() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [step, setStep] = useState<Step>('entry');
  const [phone, setPhone] = useState('');
  const [code, setCode] = useState('');
  const [codeSent, setCodeSent] = useState(false);
  const [sendCount, setSendCount] = useState(0);
  const [timeLeft, setTimeLeft] = useState(TIMER_SECONDS);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [isCodeError, setIsCodeError] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const { mutate: sendCode, isPending: isSending } =
    usePostApiV1UsersMePhoneVerificationCodes();
  const { mutate: verifyCode, isPending: isVerifying } =
    usePostApiV1UsersMePhoneVerificationCodesVerify();
  const { mutate: updatePhoneNumber } = usePatchApiV1UsersMePhoneNumber();

  useEffect(() => {
    if (sendCount === 0) return;
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current!);
          timerRef.current = null;
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [sendCount]);

  const isPhoneValid = isValidPhone(phone);
  const isCodeValid = /^\d{6}$/.test(code);
  const canSend = isPhoneValid && !isSending;
  const canVerify = codeSent && isCodeValid && timeLeft > 0 && !isVerifying;

  function handlePhoneChange(e: React.ChangeEvent<HTMLInputElement>) {
    setPhone(formatPhone(e.target.value));
    if (codeSent) {
      setCodeSent(false);
      setCode('');
      if (timerRef.current) clearInterval(timerRef.current);
    }
  }

  function handleSendCode() {
    if (!canSend) return;
    sendCode(
      { data: { phoneNumber: phone } },
      {
        onSuccess: (res) => {
          if (res.status !== 200) return;
          setCodeSent(true);
          setTimeLeft(TIMER_SECONDS);
          setSendCount((c) => c + 1);
          setCode('');
        },
      },
    );
  }

  function handleVerify() {
    if (!canVerify) return;
    verifyCode(
      { data: { phoneNumber: phone, code } },
      {
        onSuccess: (res) => {
          if (res.status !== 200) {
            setIsCodeError(true);
            return;
          }
          updatePhoneNumber(
            { data: { phoneNumber: phone } },
            {
              onSuccess: () => {
                queryClient.invalidateQueries({
                  queryKey: getGetApiV1UsersMeQueryKey(),
                });
                setShowSuccessModal(true);
              },
            },
          );
        },
        onError: () => setIsCodeError(true),
      },
    );
  }

  if (step === 'entry') {
    return (
      <div className="min-h-dvh bg-bg-white flex flex-col">
        <Header text="휴대폰 번호" showBackButton />
        <div className="flex-1 flex flex-col items-center px-8 pb-[132px]">
          <div className="flex-1 flex flex-col items-center justify-center gap-10">
            <p className="heading-1xl-bold text-text-basic text-center whitespace-pre-line">
              {'변경할 번호로\n본인인증을 해주세요'}
            </p>
            <Image src="/icons/profile.svg" alt="" width={117} height={117} />
          </div>
          <div className="w-full rounded-2xlarge bg-surface-secondary-lighter px-g4 py-g6 flex flex-col items-center gap-3">
            <div className="flex items-center gap-1">
              <Icon
                icon="ph:seal-question-fill"
                className="w-4 h-4 text-icon-secondary"
              />
              <p className="body-md-bold text-text-subtle">
                본인 명의의 번호로만 변경 가능해요
              </p>
            </div>
            <p className="caption-sm-medium text-text-disabled text-center whitespace-pre-line">
              {
                '다른 사람 명의의 번호로는 변경할 수 없어요.\n꼭 본인 명의 번호로 인증해 주세요.'
              }
            </p>
          </div>
        </div>
        <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full min-w-[360px] max-w-[440px] px-p4 pb-13">
          <Button
            variant="black"
            size="lg"
            className="w-full"
            onClick={() => setStep('verify')}
          >
            인증하기
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-dvh bg-bg-white flex flex-col">
      <Header text="휴대폰 번호" showBackButton />
      <div className="px-4 pt-6 flex flex-col gap-g4">
        <div className="flex flex-col gap-g3">
          <p className="caption-sm-medium text-text-disabled">휴대폰 번호</p>
          <div className="flex items-start gap-g3">
            <div className="flex-1 min-w-0">
              <Input
                placeholder="변경하실 휴대폰 번호를 입력해주세요"
                value={phone}
                onChange={handlePhoneChange}
              />
            </div>
            <Button
              size="sm"
              disabled={!canSend}
              onClick={handleSendCode}
              className="flex-shrink-0 mt-[5px] w-[58px]"
            >
              {isSending ? '발송 중' : codeSent ? '재발송' : '인증'}
            </Button>
          </div>
        </div>
        <div className="flex flex-col gap-g3">
          <div className="flex items-center justify-between">
            <p className="caption-sm-medium text-text-disabled">인증번호</p>
            {codeSent && (
              <span
                className={`caption-sm-medium ${timeLeft === 0 ? 'text-text-error' : 'text-text-brand'}`}
              >
                {formatTimer(timeLeft)}
              </span>
            )}
          </div>
          <Input
            placeholder="인증번호를 입력해주세요"
            value={code}
            onChange={(e) => {
              setCode(e.target.value.replace(/\D/g, '').slice(0, 6));
              setIsCodeError(false);
            }}
            isError={isCodeError || (codeSent && timeLeft === 0)}
            helperText={
              isCodeError
                ? '인증번호가 올바르지 않아요'
                : codeSent && timeLeft === 0
                  ? '인증 시간이 만료되었어요'
                  : undefined
            }
          />
        </div>
      </div>
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full min-w-[360px] max-w-[440px] px-p4 pb-13">
        <Button
          size="lg"
          disabled={!canVerify}
          className="w-full"
          onClick={handleVerify}
        >
          완료
        </Button>
      </div>
      <Modal
        isOpen={showSuccessModal}
        iconType="success"
        title={'휴대폰 번호 변경이\n완료되었어요'}
        confirmLabel="확인"
        onConfirm={() => router.back()}
      />
    </div>
  );
}
