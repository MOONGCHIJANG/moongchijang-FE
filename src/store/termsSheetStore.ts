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
  checked: CheckedState;
  toggle: (key: TermKey) => void;
  checkTerm: (key: TermKey) => void;
  reset: () => void;
}

export const useTermsSheetStore = create<TermsSheetState>()((set) => ({
  checked: INITIAL_CHECKED,
  toggle: (key) =>
    set((state) => ({
      checked: { ...state.checked, [key]: !state.checked[key] },
    })),
  checkTerm: (key) =>
    set((state) => ({
      checked: { ...state.checked, [key]: true },
    })),
  reset: () => set({ checked: INITIAL_CHECKED }),
}));
