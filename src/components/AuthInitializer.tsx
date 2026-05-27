'use client';

import { useEffect } from 'react';
import { useAuthStore } from '@/store/authStore';
import { tokenStorage } from '@/lib/token';
import { getApiV1UsersMe } from '@/api/generated/auth/auth';
import posthog from 'posthog-js';

const AuthInitializer = () => {
  const { setIsLoggedIn, setInitialized } = useAuthStore();
  useEffect(() => {
    fetch('/api/auth/status')
      .then((res) => res.json())
      .then(({ isLoggedIn, expiresIn }) => {
        setIsLoggedIn(isLoggedIn);
        if (expiresIn) {
          // 30초 여유 만료 시간 저장
          tokenStorage.setExpiration(expiresIn);
        }
        if (isLoggedIn && process.env.NODE_ENV !== 'development') {
          getApiV1UsersMe()
            .then((res) => {
              if (res.status === 200 && res.data?.data) {
                const { id, email, nickname } = res.data.data;
                posthog.identify(String(id), {
                  email: email ?? undefined,
                  nickname: nickname ?? undefined,
                });
              }
            })
            .catch(() => {});
        }
      })
      .catch(() => setIsLoggedIn(false))
      .finally(() => setInitialized());
  }, [setIsLoggedIn, setInitialized]);

  return null;
};

export default AuthInitializer;
