import { create } from 'zustand';
import { postApiV1AuthLogout } from '@/api/generated/auth/auth';
import { tokenStorage } from '@/lib/token';

interface AuthState {
  isLoggedIn: boolean;
  setIsLoggedIn: (value: boolean) => void;
  logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()((set) => ({
  isLoggedIn: false,
  setIsLoggedIn: (value) => set({ isLoggedIn: value }),
  logout: async () => {
    await postApiV1AuthLogout().catch(() => {});
    tokenStorage.remove();
    set({ isLoggedIn: false });
  },
}));
