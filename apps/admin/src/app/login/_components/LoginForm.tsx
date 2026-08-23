'use client';

import { Button, Input } from '@moongchijang/ui';
import { useAuthStore } from '@moongchijang/api-client/authStore';
import { tokenStorage } from '@moongchijang/api-client/token';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isPending, setIsPending] = useState(false);
  const router = useRouter();
  const { setIsLoggedIn } = useAuthStore();

  const canSubmit = email.length > 0 && password.length > 0;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!canSubmit || isPending) return;

    setErrorMessage(null);
    setIsPending(true);
    try {
      const res = await fetch('/api/v1/auth/admin/email/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();

      if (res.ok) {
        const accessToken = data?.data?.accessToken;
        const expiresIn = data?.data?.expiresIn;
        if (accessToken && expiresIn) {
          tokenStorage.set(accessToken, expiresIn);
        }
        setIsLoggedIn(true);
        router.push('/');
      } else {
        setErrorMessage('아이디 또는 비밀번호를 확인해주세요.');
      }
    } catch {
      setErrorMessage('네트워크 오류가 발생했습니다.');
    } finally {
      setIsPending(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-8 lg:gap-[3.704vh]"
    >
      <div className="flex w-[362px] flex-col gap-3 lg:w-[18.854vw] lg:gap-[1.481vh]">
        <Input
          variant="admin"
          label="아이디"
          placeholder="아이디를 입력해주세요"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          noHelperSpace
        />
        <Input
          variant="admin"
          label="비밀번호"
          isPassword
          placeholder="비밀번호를 입력해주세요"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          noHelperSpace
        />
        {errorMessage && (
          <p className="body-sm-regular text-text-error">{errorMessage}</p>
        )}
      </div>
      <Button
        type="submit"
        variant="primary"
        size="lg"
        fullWidth
        disabled={!canSubmit || isPending}
        className="lg:h-[5.185vh]"
      >
        로그인
      </Button>
    </form>
  );
}
