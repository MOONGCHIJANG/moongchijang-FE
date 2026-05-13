'use client';

import { Button } from '@/components/Button';
import Input from '@/components/Input';
import { loginSchema } from '@/lib/validation';
import { tokenStorage } from '@/lib/token';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { usePostApiV1AuthEmailLogin } from '@/api/hooks/auth/auth';
import Link from 'next/link';
import Toast from '@/app/(pages)/item/[groupBuyId]/_components/Toast';

const InputArea = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const router = useRouter();

  const { mutate: login, isPending } = usePostApiV1AuthEmailLogin();

  const handleLogin = () => {
    setErrorMessage(null);

    // 정합성 검사 유지
    const isValid = loginSchema.safeParse({ email, password }).success;
    if (!isValid) {
      setErrorMessage('이메일 또는 비밀번호를 확인해주세요.');
      return;
    }

    login(
      { data: { email, password } },
      {
        onSuccess: (response) => {
          if (response.status === 200) {
            const { accessToken, expiresIn } = response.data.data;
            tokenStorage.set(accessToken, expiresIn);
            router.push('/feed');
          } else {
            setErrorMessage('이메일 또는 비밀번호를 확인해주세요.1');
          }
        },
        onError: () => {
          setErrorMessage('이메일 또는 비밀번호를 확인해주세요.2');
        },
      },
    );
  };

  return (
    <>
      <div className="flex flex-col gap-g4 w-full">
        <Input
          label="이메일 주소"
          placeholder="이메일 주소를 입력해주세요."
          value={email}
          onChange={(v) => {
            setEmail(v);
            setErrorMessage(null);
          }}
        />
        <Input
          label="비밀번호"
          isPassword
          placeholder="비밀번호를 입력해주세요."
          helperText="영문, 숫자, 특수문자가 모두 들어간 8자 이상"
          value={password}
          onChange={(v) => {
            setPassword(v);
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
          <Link href="/login/email/find" className="text-text-tertiary">
            아이디/비밀번호 찾기
          </Link>
          <span className="mx-g5 text-border-subtle">|</span>
          <button>회원가입</button>
        </div>
      </div>
      {errorMessage && (
        <div className="fixed bottom-7 left-4 right-4 z-50 flex justify-center">
          <Toast>{errorMessage}</Toast>
        </div>
      )}
    </>
  );
};

export default InputArea;
