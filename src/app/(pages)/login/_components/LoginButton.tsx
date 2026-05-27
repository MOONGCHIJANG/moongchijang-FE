'use client';
import { Button } from '@/components/Button';
import { getKakaoAuthUrl } from '@/lib/kakao';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react';

const LoginButton = () => {
  const router = useRouter();
  const handleKakaoLogin = () => {
    window.location.href = getKakaoAuthUrl();
  };
  const handleEmailLogin = () => {
    router.push('/login/email');
  };

  return (
    <div className="flex flex-col gap-4.25 w-full">
      <Button
        variant="ghost"
        size="lg"
        className="w-full bg-[#FEE500] text-black flex gap-2 items-center"
        onClick={handleKakaoLogin}
      >
        <Image
          src="/icons/kakao-logo.svg"
          alt=""
          width={18}
          height={18}
          aria-hidden
        />
        카카오로 시작하기
      </Button>
      <Button
        variant="outline"
        size="lg"
        className="w-full"
        onClick={handleEmailLogin}
      >
        이메일로 시작하기
      </Button>
    </div>
  );
};

export default LoginButton;
