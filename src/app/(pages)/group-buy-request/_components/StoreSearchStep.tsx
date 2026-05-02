'use client';

import { type Store } from './StoreSearchSheet';

interface StoreSearchStepProps {
  onSelectStore: (store: Store) => void;
  onBack: () => void;
}

export const StoreSearchStep = ({
  onSelectStore: _onSelectStore,
  onBack: _onBack,
}: StoreSearchStepProps) => {
  return null;
};
