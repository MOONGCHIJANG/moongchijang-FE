'use client';

import { useEffect } from 'react';
import { useAuthStore } from '@/store/authStore';

const AuthInitializer = () => {
  const { setIsLoggedIn } = useAuthStore();

  useEffect(() => {
    fetch('/api/auth/status')
      .then((res) => res.json())
      .then(({ isLoggedIn }) => setIsLoggedIn(isLoggedIn))
      .catch(() => setIsLoggedIn(false));
  }, [setIsLoggedIn]);

  return null;
};

export default AuthInitializer;
