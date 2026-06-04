import { create } from 'zustand';
import {
  deleteApiV1UsersMeRole,
  deleteApiV1UsersMeSeller,
} from '@/api/generated/auth/auth';
import {
  OwnerWithdrawRequest,
  WithdrawRequest,
} from '@/api/generated/api.schemas';
import { tokenStorage } from '@/lib/token';
import posthog from 'posthog-js';

interface AuthState {
  isLoggedIn: boolean;
  isInitialized: boolean;
  setIsLoggedIn: (value: boolean) => void;
  setInitialized: () => void;
  logout: () => Promise<void>;
  deleteAccount: (withdrawRequest?: WithdrawRequest) => Promise<boolean>;
  deleteOwnerAccount: (
    withdrawRequest?: OwnerWithdrawRequest,
  ) => Promise<boolean>;
}

export const useAuthStore = create<AuthState>()((set) => ({
  isLoggedIn: false,
  isInitialized: false,
  setIsLoggedIn: (value) => set({ isLoggedIn: value }),
  setInitialized: () => set({ isInitialized: true }),
  logout: async () => {
    await fetch('/api/v1/auth/logout', { method: 'POST' }).catch(() => {});
    tokenStorage.remove();
    set({ isLoggedIn: false });
    if (process.env.NODE_ENV !== 'development') posthog.reset();
  },
  deleteAccount: async (withdrawRequest?: WithdrawRequest) => {
    const res = await deleteApiV1UsersMeRole(withdrawRequest).catch(() => null);
    if (!res || res.status !== 200) return false;
    tokenStorage.remove();
    set({ isLoggedIn: false });
    if (process.env.NODE_ENV !== 'development') posthog.reset();
    return true;
  },
  deleteOwnerAccount: async (withdrawRequest?: OwnerWithdrawRequest) => {
    const res = await deleteApiV1UsersMeSeller(withdrawRequest ?? {}).catch(
      () => null,
    );
    if (!res || res.status !== 200) return false;
    tokenStorage.remove();
    set({ isLoggedIn: false });
    if (process.env.NODE_ENV !== 'development') posthog.reset();
    return true;
  },
}));
