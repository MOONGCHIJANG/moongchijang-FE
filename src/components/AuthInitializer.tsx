'use client';

import { useEffect } from 'react';
import { useAuthStore } from '@/store/authStore';

const AuthInitializer = () => {
  const { setIsLoggedIn, setInitialized } = useAuthStore();
  useEffect(() => {
    fetch('/api/auth/status')
      .then((res) => res.json())
      .then(({ isLoggedIn, expiresIn }) => {
        setIsLoggedIn(isLoggedIn);
        if (isLoggedIn && expiresIn) {
          // 30초 여유 만료 시간 저장
          localStorage.setItem(
            'accessTokenExpiresAt',
            String(Date.now() + (expiresIn - 30) * 1000),
          );
        }
      })
      .catch(() => setIsLoggedIn(false))
      .finally(() => setInitialized());
  }, [setIsLoggedIn, setInitialized]);

  return null;
};

export default AuthInitializer;
