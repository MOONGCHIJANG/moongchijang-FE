'use client';

import { useEffect } from 'react';
import { logEvent } from '@/lib/analytics';
import { useAuthStore } from '@moongchijang/api-client/authStore';
import { Icon } from '@iconify/react';
import Image from 'next/image';
import Link from 'next/link';
import { ProfileSection } from './ProfileSection';

const MyPageClient = () => {
  const { isLoggedIn, isInitialized } = useAuthStore();

  useEffect(() => {
    if (!isInitialized) return;
    if (isLoggedIn) {
      logEvent('mypage_view');
    } else {
      logEvent('unauthorized_access', { target_screen: 'mypage' });
    }
  }, [isInitialized, isLoggedIn]);

  if (!isInitialized) return null;

  if (!isLoggedIn) {
    return (
      <div className="h-dvh bg-surface-white no-scroll">
        <div className="py-4 bg-bg-white-muted">
          <Link
            href="/login"
            className="flex justify-between w-full items-center p-g5 bg-surface-white"
          >
            <p className="heading-sm-semibold">로그인하고 뭉치장 이용하기</p>
            <Icon
              icon="lucide:chevron-right"
              className="w-8 h-8 text-icon-basic"
            />
          </Link>
        </div>
        <div className="flex flex-col gap-g5 items-center pt-25">
          <Image src="/icons/starpoint.svg" width={91} height={91} alt="" />
          <p className="whitespace-pre-line heading-sm-medium text-center">{`로그인 후\n이용 가능해요`}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col bg-bg-white-muted min-h-full">
      <ProfileSection />
    </div>
  );
};

export default MyPageClient;
