'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Input from '@/components/Input';
import { Button } from '@/components/Button';
import { useAuthStore } from '@/store/authStore';
import { tokenStorage } from '@/lib/token';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [isPending, setIsPending] = useState(false);

  const setIsLoggedIn = useAuthStore((s) => s.setIsLoggedIn);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrorMsg('');
    setIsPending(true);

    try {
      const res = await fetch('/api/v1/auth/admin/email/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (res.ok) {
        const data = await res.json();
        const accessToken = data?.data?.accessToken;
        const expiresIn = data?.data?.expiresIn;
        if (accessToken && expiresIn) {
          tokenStorage.set(accessToken, expiresIn);
        }
        setIsLoggedIn(true);
        router.push(data?.redirectTo ?? '/admin/dashboard');
      } else {
        setErrorMsg('아이디 또는 비밀번호가 올바르지 않습니다.');
      }
    } catch {
      setErrorMsg('네트워크 오류가 발생했습니다.');
    } finally {
      setIsPending(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-surface-white">
      <div className="flex w-72 flex-col items-center">
        <h1 className="mb-3 text-3xl font-bold tracking-widest text-text-basic">
          ADMIN
        </h1>
        <Image
          src="/images/mcj-logo-1.png"
          alt="뭉치장"
          width={120}
          height={56}
          className="mb-10 object-contain"
        />
        <form onSubmit={handleSubmit} className="flex w-full flex-col gap-4">
          <Input
            label="아이디"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            noHelperSpace
          />
          <Input
            label="비밀번호"
            isPassword
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            noHelperSpace
          />
          {errorMsg && (
            <p className="caption-sm-medium text-text-error">{errorMsg}</p>
          )}
          <div className="mt-3">
            <Button
              type="submit"
              variant="primary"
              size="lg"
              fullWidth
              disabled={!email || !password || isPending}
            >
              {isPending ? '로그인 중...' : '로그인'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
