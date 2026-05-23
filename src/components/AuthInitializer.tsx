'use client';

import { useEffect } from 'react';
import { useAuthStore } from '@/store/authStore';

const AuthInitializer = () => {
  const { setIsLoggedIn, setInitialized } = useAuthStore();
  useEffect(() => {
    fetch('/api/auth/status')
      .then((res) => res.json())
      .then(({ isLoggedIn }) => {
        setIsLoggedIn(isLoggedIn);
      })
      .catch(() => setIsLoggedIn(false))
      .finally(() => setInitialized());
  }, [setIsLoggedIn, setInitialized]);

  return null;
};

export default AuthInitializer;
