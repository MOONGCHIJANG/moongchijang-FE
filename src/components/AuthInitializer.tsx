'use client';

import { useEffect } from 'react';
import { useAuthStore } from '@/store/authStore';
import { tokenStorage } from '@/lib/token';

const AuthInitializer = () => {
  const { setIsLoggedIn, setInitialized } = useAuthStore();
  useEffect(() => {
    fetch('/api/auth/status')
      .then((res) => res.json())
      .then(({ isLoggedIn, expiresIn }) => {
        setIsLoggedIn(isLoggedIn);
        if (isLoggedIn && expiresIn) {
          // 30초 여유 만료 시간 저장
          tokenStorage.setExpiration(expiresIn);
        }
      })
      .catch(() => setIsLoggedIn(false))
      .finally(() => setInitialized());
  }, [setIsLoggedIn, setInitialized]);

  return null;
};

export default AuthInitializer;
