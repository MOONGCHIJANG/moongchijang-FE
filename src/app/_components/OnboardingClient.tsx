'use client';
import { Button } from '@/components/Button';
import { redirectStorage } from '@/lib/redirect';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';
import { OnboardingCarousel } from './OnboardingCarousel';

const OnboardingClient = () => {
  const router = useRouter();
  const handleLogin = () => {
    redirectStorage.set(`/feed`);
    router.push('/login');
  };

  return (
    <>
      <OnboardingCarousel />
      <div className="fixed z-20 bottom-4.25 left-0 right-0 w-full mx-auto max-w-110 gap-g4 flex flex-col items-center">
        <div className="px-4 w-full">
          <Button
            size="lg"
            fullWidth
            className="bg-button-natural"
            onClick={handleLogin}
          >
            로그인
          </Button>
        </div>
        <Link href="/feed" className="text-text-tertiary heading-sm-regular">
          비회원으로 둘러보기
        </Link>
      </div>
    </>
  );
};

export default OnboardingClient;
