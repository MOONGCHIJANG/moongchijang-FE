'use client';

import { useEffect, useRef, useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { useAuthStore } from '@/store/authStore';
import {
  formatPhoneNumber,
  StepProfileFormValues,
  stepProfileSchema,
} from '@/schemas/auth';
import {
  usePatchApiV1UsersMeAdditionalInfo,
  usePostApiV1AuthPhoneVerificationCodes,
  usePostApiV1AuthPhoneVerificationCodesVerify,
} from '@/api/hooks/auth/auth';

type PhoneStatus = 'idle' | 'sent' | 'verified' | 'invalid' | 'timeout';

type ProfileState = {
  phoneStatus: PhoneStatus;
  phoneError: string;
  timer: number;
};

const initialProfileState: ProfileState = {
  phoneStatus: 'idle',
  phoneError: '',
  timer: 0,
};

export const useStepProfile = (onNext: () => void) => {
  const form = useForm<StepProfileFormValues>({
    resolver: zodResolver(stepProfileSchema),
    mode: 'onBlur',
  });

  const {
    handleSubmit,
    clearErrors,
    control,
    formState: { errors },
  } = form;

  const nicknameValue = useWatch({
    control,
    name: 'nickname',
    defaultValue: '',
  });
  const phoneValue = useWatch({
    control,
    name: 'phoneNumber',
    defaultValue: '',
  });
  const codeValue = useWatch({
    control,
    name: 'verificationCode',
    defaultValue: '',
  });

  const [profileState, setProfileState] =
    useState<ProfileState>(initialProfileState);
  const { phoneStatus, phoneError, timer } = profileState;

  const setProfile = (patch: Partial<ProfileState>) =>
    setProfileState((prev) => ({ ...prev, ...patch }));

  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // 훅
  const { mutate: sendCode, isPending: isSendingCode } =
    usePostApiV1AuthPhoneVerificationCodes();

  const { mutate: verifyCode, isPending: isVerifyingCode } =
    usePostApiV1AuthPhoneVerificationCodesVerify();

  const { mutate: saveAdditionalInfo, isPending: isSaving } =
    usePatchApiV1UsersMeAdditionalInfo();

  const { setIsLoggedIn } = useAuthStore();

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  // 전화번호 변경 시 상태 초기화
  useEffect(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setProfileState(initialProfileState); // setState 한 번만
  }, [phoneValue]);

  // 타이머 시작
  const startTimer = (seconds: number) => {
    if (timerRef.current) clearInterval(timerRef.current);
    setProfile({ timer: seconds });
    timerRef.current = setInterval(() => {
      setProfileState((prev) => {
        if (prev.timer <= 1) {
          clearInterval(timerRef.current!);
          return {
            ...prev,
            timer: 0,
            phoneStatus:
              prev.phoneStatus === 'sent' ? 'timeout' : prev.phoneStatus,
          };
        }
        return { ...prev, timer: prev.timer - 1 };
      });
    }, 1000);
  };

  const formatTimer = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  const isPhoneFormatValid = /^01[0-9]\d{7,8}$/.test(phoneValue);

  const handleSendCode = () => {
    if (!isPhoneFormatValid) return;
    setProfile({ phoneError: '' });

    sendCode(
      { data: { phoneNumber: formatPhoneNumber(phoneValue) } },
      {
        onSuccess: (result) => {
          if (result.status !== 200) {
            setProfile({ phoneError: '인증번호 전송에 실패했습니다.' });
            return;
          }
          setProfile({ phoneStatus: 'sent' });
          startTimer(result.data.data.expiresInSeconds);
        },
        onError: () => {
          setProfile({ phoneError: '인증번호 전송에 실패했습니다.' });
        },
      },
    );
  };

  const handleResend = () => {
    clearErrors('verificationCode');
    setProfile({ phoneStatus: 'sent', phoneError: '' });

    sendCode(
      { data: { phoneNumber: formatPhoneNumber(phoneValue) } },
      {
        onSuccess: (result) => {
          if (result.status !== 200) {
            setProfile({ phoneError: '인증번호 전송에 실패했습니다.' });
            return;
          }
          startTimer(result.data.data.expiresInSeconds);
        },
        onError: () => {
          setProfile({ phoneError: '인증번호 전송에 실패했습니다.' });
        },
      },
    );
  };

  const handleVerifyCode = () => {
    verifyCode(
      { data: { phoneNumber: formatPhoneNumber(phoneValue), code: codeValue } },
      {
        onSuccess: (result) => {
          if (result.status !== 200 || !result.data.data.verified) {
            setProfile({ phoneStatus: 'invalid' });
            return;
          }
          if (timerRef.current) clearInterval(timerRef.current);
          setProfile({ phoneStatus: 'verified', timer: 0 });
        },
        onError: () => {
          setProfile({ phoneStatus: 'invalid' });
        },
      },
    );
  };

  const onSubmit = () => {
    if (phoneStatus !== 'verified') return;

    saveAdditionalInfo(
      {
        data: {
          nickname: nicknameValue,
          phoneNumber: formatPhoneNumber(phoneValue),
        },
      },
      {
        onSuccess: (result) => {
          if (result.status !== 200) return;
          setIsLoggedIn(true);
          onNext();
        },
        onError: () => {
          // TODO: 에러 토스트
        },
      },
    );
  };

  const isNicknameValid = /^[A-Za-z0-9가-힣]{2,10}$/.test(nicknameValue);

  const canProceed = isNicknameValid && phoneStatus === 'verified';

  const nicknameHelperText =
    errors.nickname?.message ?? '2~10자, 한글/영문/숫자';
  const nicknameHelperClassName = errors.nickname
    ? 'text-text-brand'
    : 'text-text-subtle-inverse';

  const phoneHelperText =
    phoneError ||
    (phoneStatus === 'sent'
      ? '인증번호가 전송되었어요.'
      : '숫자만 입력해주세요');
  const phoneHelperClassName = phoneError
    ? 'text-text-brand'
    : 'text-text-subtle-inverse';

  const codeHelperText =
    phoneStatus === 'invalid'
      ? '번호를 다시 확인해주세요'
      : phoneStatus === 'verified'
        ? '인증에 성공했어요!'
        : phoneStatus === 'timeout'
          ? '시간이 초과되었어요'
          : '';

  const codeHelperClassName =
    phoneStatus === 'invalid' || phoneStatus === 'timeout'
      ? 'text-text-brand'
      : phoneStatus === 'verified'
        ? 'text-text-subtle-inverse'
        : '';

  return {
    form,
    control,
    // 값
    codeValue,
    timer,
    formatTimer,
    // 조건
    isPhoneFormatValid,
    canProceed,
    // 로딩
    isSendingCode,
    isVerifyingCode,
    isSaving,
    // 상태
    phoneStatus,
    // 파생 UI
    nicknameHelperText,
    nicknameHelperClassName,
    phoneHelperText,
    phoneHelperClassName,
    codeHelperText,
    codeHelperClassName,
    // 핸들러
    handleSendCode,
    handleResend,
    handleVerifyCode,
    handleSubmit,
    onSubmit,
  };
};
