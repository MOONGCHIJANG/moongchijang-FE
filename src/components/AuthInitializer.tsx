'use client';

import { useEffect } from 'react';
import { useAuthStore } from '@/store/authStore';
import { tokenStorage } from '@/lib/token';
import { getApiV1UsersMe } from '@/api/generated/auth/auth';
import posthog from 'posthog-js';

const AuthInitializer = () => {
  const { setIsLoggedIn, setInitialized } = useAuthStore();
  useEffect(() => {
    fetch('/api/v1/auth/refresh', { method: 'POST' })
      .then((res) => res.json())
      .then((data) => {
        const accessToken = data?.data?.accessToken;
        const expiresIn = data?.data?.expiresIn;

        if (accessToken && expiresIn) {
          tokenStorage.set(accessToken, expiresIn);
          setIsLoggedIn(true);

          if (process.env.NODE_ENV !== 'development') {
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
        } else {
          setIsLoggedIn(false);
        }
      })
      .catch(() => setIsLoggedIn(false))
      .finally(() => setInitialized());
  }, [setIsLoggedIn, setInitialized]);

  return null;
};

export default AuthInitializer;
