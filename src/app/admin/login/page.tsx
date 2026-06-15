'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Input from '@/components/Input';
import { Button } from '@/components/Button';
import { usePostApiV1AuthEmailLogin } from '@/api/hooks/auth/auth';
import { AuthUserRole } from '@/api/generated/api.schemas';
import { useAuthStore } from '@/store/authStore';
import { tokenStorage } from '@/lib/token';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const setIsLoggedIn = useAuthStore((s) => s.setIsLoggedIn);
  const { mutate: login, isPending } = usePostApiV1AuthEmailLogin();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrorMsg('');
    login(
      { data: { email, password } },
      {
        onSuccess: (res) => {
          if (res.status !== 200) {
            setErrorMsg('아이디 또는 비밀번호가 올바르지 않습니다.');
            return;
          }
          const { accessToken, expiresIn, user } = res.data.data;
          if (user.role !== AuthUserRole.ADMIN) {
            setErrorMsg('어드민 계정이 아닙니다.');
            return;
          }
          tokenStorage.set(accessToken, expiresIn);
          setIsLoggedIn(true);
          router.push('/admin/dashboard');
        },
        onError: () => {
          setErrorMsg('아이디 또는 비밀번호가 올바르지 않습니다.');
        },
      },
    );
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
