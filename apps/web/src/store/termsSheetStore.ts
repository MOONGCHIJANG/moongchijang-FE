import { create } from 'zustand';

export type TermKey =
  | 'orderConfirm'
  | 'cancelAfterGoal'
  | 'noRefundAfterNoShow'
  | 'personalInfo'
  | 'intermediary';

type CheckedState = Record<TermKey, boolean>;

const INITIAL_CHECKED: CheckedState = {
  orderConfirm: false,
  cancelAfterGoal: false,
  noRefundAfterNoShow: false,
  personalInfo: false,
  intermediary: false,
};

interface TermsSheetState {
  isOpen: boolean;
  checked: CheckedState;
  open: () => void;
  close: () => void;
  toggle: (key: TermKey) => void;
  checkTerm: (key: TermKey) => void;
}

export const useTermsSheetStore = create<TermsSheetState>()((set) => ({
  isOpen: false,
  checked: INITIAL_CHECKED,
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false, checked: INITIAL_CHECKED }),
  toggle: (key) =>
    set((state) => ({
      checked: { ...state.checked, [key]: !state.checked[key] },
    })),
  checkTerm: (key) =>
    set((state) => ({
      checked: { ...state.checked, [key]: true },
    })),
}));
