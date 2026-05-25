'use client';

import { useEffect, useRef, useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { StepEmailFormValues, stepEmailSchema } from '@/schemas/auth';
import {
  getApiV1AuthEmailAvailability,
  usePostApiV1AuthEmailSignup,
  usePostApiV1AuthEmailVerificationCodes,
  usePostApiV1AuthEmailVerificationCodesVerify,
} from '@/api/hooks/auth/auth';

export type EmailStatus = 'idle' | 'checking' | 'available' | 'duplicated';
export type CodeStatus = 'idle' | 'sent' | 'verified' | 'invalid' | 'timeout';

export const useStepEmail = (onNext: () => void) => {
  // 폼 관리
  const form = useForm<StepEmailFormValues>({
    resolver: zodResolver(stepEmailSchema),
    mode: 'onBlur',
  });

  const { handleSubmit, clearErrors, control } = form;

  const emailValue = useWatch({ control, name: 'email', defaultValue: '' });
  const codeValue = useWatch({
    control,
    name: 'verificationCode',
    defaultValue: '',
  });
  const passwordValue = useWatch({
    control,
    name: 'password',
    defaultValue: '',
  });
  const passwordConfirmValue = useWatch({
    control,
    name: 'passwordConfirm',
    defaultValue: '',
  });

  const [emailStatus, setEmailStatus] = useState<EmailStatus>('idle');
  const [emailError, setEmailError] = useState('');
  const [codeStatus, setCodeStatus] = useState<CodeStatus>('idle');
  const [timer, setTimer] = useState(0);

  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const signupTokenRef = useRef<string | null>(null);

  const { mutate: sendCode, isPending: isSendingCode } =
    usePostApiV1AuthEmailVerificationCodes();

  const { mutate: verifyCode, isPending: isVerifyingCode } =
    usePostApiV1AuthEmailVerificationCodesVerify();

  const { mutate: signup, isPending: isSigningUp } =
    usePostApiV1AuthEmailSignup();

  // 인증번호 타이머
  const startTimer = (seconds: number) => {
    if (timerRef.current) clearInterval(timerRef.current);
    setTimer(seconds);
    timerRef.current = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current!);
          setCodeStatus((status) => (status === 'sent' ? 'timeout' : status));
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const formatTimer = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  // 이메일 변경 시 상태 초기화
  const isEmailFormatValid = z.string().email().safeParse(emailValue).success;

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setEmailStatus('idle');
    setEmailError('');
    setCodeStatus('idle');
    if (timerRef.current) clearInterval(timerRef.current);
    setTimer(0);
    signupTokenRef.current = null;
  }, [emailValue]);

  // 중복확인 + 인증코드 발송 핸들러
  const handleCheckAndSendCode = async () => {
    if (!isEmailFormatValid) return;
    setEmailStatus('checking');
    setEmailError('');

    const res = await getApiV1AuthEmailAvailability({
      email: emailValue,
    }).catch(() => null);

    if (!res || res.status !== 200) {
      setEmailStatus('idle');
      setEmailError('이메일을 다시 한 번 확인해주세요.');
      return;
    }

    if (!res.data.data.available) {
      setEmailStatus('duplicated');
      return;
    }

    setEmailStatus('available');
    sendCode(
      { data: { email: emailValue } },
      {
        onSuccess: (result) => {
          if (result.status !== 200) {
            setEmailStatus('idle');
            setEmailError('이메일을 다시 한 번 확인해주세요.');
            return;
          }
          setCodeStatus('sent');
          startTimer(result.data.data.expiresInSeconds);
        },
        onError: () => {
          setEmailStatus('idle');
          setEmailError('이메일을 다시 한 번 확인해주세요.');
        },
      },
    );
  };

  // 인증번호 재발송 핸들러
  const handleResend = () => {
    clearErrors('verificationCode');
    setCodeStatus('sent');
    sendCode(
      { data: { email: emailValue } },
      {
        onSuccess: (result) => {
          if (result.status !== 200) {
            setEmailError('이메일을 다시 한 번 확인해주세요.');
            return;
          }
          startTimer(result.data.data.expiresInSeconds);
        },
        onError: () => {
          setEmailError('이메일을 다시 한 번 확인해주세요.');
        },
      },
    );
  };

  // 인증코드 확인 핸들러
  const handleVerifyCode = () => {
    verifyCode(
      { data: { email: emailValue, code: codeValue } },
      {
        onSuccess: (result) => {
          if (result.status !== 200 || !result.data.data.verified) {
            setCodeStatus('invalid');
            return;
          }
          signupTokenRef.current = result.data.data.signupToken;
          setCodeStatus('verified');
          if (timerRef.current) clearInterval(timerRef.current);
          setTimer(0);
        },
        onError: () => {
          setCodeStatus('invalid');
        },
      },
    );
  };

  // 이메일 회원가입 핸들러
  const onSubmit = () => {
    if (!signupTokenRef.current) return;

    signup(
      {
        data: {
          email: emailValue,
          password: passwordValue,
          signupToken: signupTokenRef.current,
        },
      },
      {
        onSuccess: (result) => {
          if (result.status !== 200) return;
          onNext();
        },
        onError: () => {
          // TODO: 에러 토스트
        },
      },
    );
  };

  // 다음 버튼 활성화 조건
  const isPasswordValid = /^(?=.*[A-Za-z])(?=.*[0-9]).{8,20}$/.test(
    passwordValue ?? '',
  );

  const isPasswordMatch =
    !!passwordValue && passwordValue === passwordConfirmValue;

  const canProceed =
    codeStatus === 'verified' && isPasswordValid && isPasswordMatch;

  // 각 폼 관련 헬퍼 텍스트
  const emailHelperText =
    emailError ||
    (emailStatus === 'duplicated'
      ? '이미 가입된 이메일이에요'
      : emailStatus === 'available'
        ? '사용 가능한 이메일이에요'
        : '');

  const emailHelperColor =
    emailError || emailStatus === 'duplicated'
      ? 'text-text-brand'
      : emailStatus === 'available'
        ? 'text-text-subtle-inverse'
        : '';

  const codeHelperText =
    codeStatus === 'invalid'
      ? '코드가 일치하지 않아요'
      : codeStatus === 'verified'
        ? '인증되었어요'
        : codeStatus === 'timeout'
          ? '시간이 초과되었어요'
          : '';

  const codeHelperColor =
    codeStatus === 'invalid' || codeStatus === 'timeout'
      ? 'text-text-brand'
      : codeStatus === 'verified'
        ? 'text-text-subtle-inverse'
        : '';

  const passwordConfirmHelperText =
    passwordConfirmValue && !isPasswordMatch
      ? '비밀번호가 일치하지 않아요'
      : '';

  const passwordConfirmHelperVariant =
    passwordConfirmValue && !isPasswordMatch ? 'error' : 'default';

  return {
    form,
    email: {
      helperText: emailHelperText,
      helperColor: emailHelperColor,
      status: emailStatus,
      isFormatValid: isEmailFormatValid,
    },
    code: {
      status: codeStatus,
      helperText: codeHelperText,
      helperColor: codeHelperColor,
      value: codeValue,
      timer,
      formatTimer,
    },
    password: {
      confirmHelperText: passwordConfirmHelperText,
      confirmHelperColor: passwordConfirmHelperVariant,
    },
    state: {
      canProceed,
      isSendingCode,
      isVerifyingCode,
      isSigningUp,
    },
    handlers: {
      handleCheckAndSendCode,
      handleResend,
      handleVerifyCode,
      handleSubmit,
      onSubmit,
    },
  };
};
