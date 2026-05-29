'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { redirectStorage } from '@/lib/redirect';
import { useAuthStore } from '@/store/authStore';

export default function KakaoCallbackPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const code = searchParams.get('code');
    const error = searchParams.get('error');

    if (error || !code) {
      router.replace('/login');
      return;
    }

    const login = async () => {
      try {
        const res = await fetch('/api/v1/auth/kakao', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            authorizationCode: code,
            redirectUri: process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI,
          }),
        });

        const data = await res.json();

        if (!res.ok) {
          router.replace('/login');
          return;
        }

        const user = data?.data?.user;

        if (!user) {
          router.replace('/login');
          return;
        }

        // 토큰은 Route Handler에서 쿠키에 저장 완료
        // signupCompleted 여부로 이동 분기만 처리
        if (!user.signupCompleted) {
          // 카카오 닉네임 임시 저장
          if (user.nickname) {
            sessionStorage.setItem('kakaoNickname', user.nickname);
          }
          router.replace('/signup/email?step=profile');
          return;
        }

        useAuthStore.getState().setIsLoggedIn(true);
        const redirect = redirectStorage.consume();
        router.replace(redirect ?? '/feed');
      } catch {
        router.replace('/login');
      }
    };

    login();
  }, [searchParams, router]);

  return (
    <div className="flex items-center justify-center h-screen">
      <p className="body-md-regular text-text-tertiary">로그인 중...</p>
    </div>
  );
}
