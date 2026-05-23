import { create } from 'zustand';
import { postApiV1AuthLogout } from '@/api/generated/auth/auth';
import { tokenStorage } from '@/lib/token';

interface AuthState {
  isLoggedIn: boolean;
  isInitialized: boolean;
  setIsLoggedIn: (value: boolean) => void;
  setInitialized: () => void;
  logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()((set) => ({
  isLoggedIn: false,
  isInitialized: false,
  setIsLoggedIn: (value) => set({ isLoggedIn: value }),
  setInitialized: () => set({ isInitialized: true }),
  logout: async () => {
    await postApiV1AuthLogout().catch(() => {});
    tokenStorage.remove();
    set({ isLoggedIn: false });
  },
}));
