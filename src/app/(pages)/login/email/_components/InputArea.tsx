'use client';

import { Button } from '@/components/Button';
import Input from '@/components/Input';
import { loginSchema } from '@/lib/validation';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import Link from 'next/link';
import { redirectStorage } from '@/lib/redirect';
import { useAuthStore } from '@/store/authStore';
import { ToastBlack } from '@/components/ToastBlack';

const InputArea = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isPending, setIsPending] = useState(false);
  const router = useRouter();

  const { setIsLoggedIn } = useAuthStore();

  const handleLogin = async () => {
    setErrorMessage(null);

    const isValid = loginSchema.safeParse({ email, password }).success;
    if (!isValid) {
      setErrorMessage('이메일 또는 비밀번호를 확인해주세요.');
      return;
    }

    setIsPending(true);
    try {
      const res = await fetch('/api/v1/auth/email/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (res.ok) {
        const data = await res.json();
        const redirectTo = data?.redirectTo as string | null;

        // 회원가입 이어서 진행
        if (redirectTo) {
          router.push(redirectTo);
          return;
        }

        // signupCompleted: true → 정상 로그인
        setIsLoggedIn(true);
        const redirect = redirectStorage.consume();
        router.push(redirect ?? '/feed');
      } else {
        setErrorMessage('이메일 또는 비밀번호를 확인해주세요.');
      }
    } catch {
      setErrorMessage('네트워크 오류가 발생했습니다.');
    } finally {
      setIsPending(false);
    }
  };

  return (
    <>
      <div className="flex flex-col gap-g4 w-full">
        <Input
          label="이메일 주소"
          placeholder="이메일 주소를 입력해주세요."
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setErrorMessage(null);
          }}
        />
        <Input
          label="비밀번호"
          isPassword
          placeholder="비밀번호를 입력해주세요."
          helperText="영문, 숫자가 모두 들어간 8자 이상"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            setErrorMessage(null);
          }}
        />
      </div>
      <div className="flex flex-col gap-g5 w-full">
        <Button
          variant="primary"
          size="lg"
          disabled={isPending}
          className="w-full"
          onClick={handleLogin}
        >
          로그인
        </Button>
        <div className="w-full flex items-center justify-center text-text-tertiary body-md-regular">
          <Link href="/login/email/find">아이디/비밀번호 찾기</Link>
          <span className="mx-g5 text-border-subtle">|</span>
          <Link href="/signup/email">회원가입</Link>
        </div>
      </div>
      {errorMessage && (
        <div className="fixed bottom-7 left-4 right-4 z-50 flex justify-center">
          <ToastBlack
            message={errorMessage}
            isVisible
            icon="cuida:alert-outline"
          />
        </div>
      )}
    </>
  );
};

export default InputArea;
