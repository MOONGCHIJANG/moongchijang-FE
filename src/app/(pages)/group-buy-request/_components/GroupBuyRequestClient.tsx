'use client';

import { useState } from 'react';
import { type Store } from './StoreSearchStep';
import { RequestFormStep } from './RequestFormStep';
import { StoreSearchStep } from './StoreSearchStep';
import { MapConfirmStep } from './MapConfirmStep';
import { SubmitCompleteStep } from './SubmitCompleteStep';

type Step = 'form' | 'search' | 'map' | 'complete';

export const GroupBuyRequestClient = () => {
  const [step, setStep] = useState<Step>('form');
  const [selectedStore, setSelectedStore] = useState<Store | null>(null);

  if (step === 'search') {
    return (
      <StoreSearchStep
        onSelectStore={(store) => {
          setSelectedStore(store);
          setStep('map');
        }}
        onBack={() => setStep('form')}
      />
    );
  }

  if (step === 'map') {
    return (
      <MapConfirmStep
        store={selectedStore}
        onBack={() => setStep('search')}
        onConfirm={() => setStep('form')}
      />
    );
  }

  if (step === 'complete') {
    return <SubmitCompleteStep />;
  }

  return (
    <RequestFormStep
      selectedStore={selectedStore}
      onSearchStore={() => setStep('search')}
      onSubmit={() => setStep('complete')}
    />
  );
};
