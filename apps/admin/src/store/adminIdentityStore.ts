import { create } from 'zustand';

interface AdminIdentityState {
  name: string | null;
  setName: (name: string | null) => void;
}

export const useAdminIdentityStore = create<AdminIdentityState>()((set) => ({
  name: null,
  setName: (name) => set({ name }),
}));
