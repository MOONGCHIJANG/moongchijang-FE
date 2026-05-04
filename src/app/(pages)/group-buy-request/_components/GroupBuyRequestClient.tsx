'use client';

import { useState, useEffect, useRef } from 'react';
import { type Store } from './StoreSearchStep';
import { RequestFormStep } from './RequestFormStep';
import { StoreSearchStep } from './StoreSearchStep';
import { MapConfirmStep } from './MapConfirmStep';
import { SubmitCompleteStep } from './SubmitCompleteStep';
import { Toast } from '@/components/Toast';
import { postApiV1GroupBuyRequests } from '@/api/generated/group-buy-request/group-buy-request';
import type { RequestFormData } from './RequestFormStep';

type Step = 'form' | 'search' | 'map' | 'complete';

export const GroupBuyRequestClient = () => {
  const [step, setStep] = useState<Step>('form');
  const [selectedStore, setSelectedStore] = useState<Store | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const toastTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const showToast = (message: string) => {
    if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    setToastMessage(message);
    toastTimerRef.current = setTimeout(() => setToastMessage(null), 3000);
  };

  useEffect(() => {
    return () => {
      if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    };
  }, []);

  const handleSubmit = async (data: RequestFormData) => {
    setIsLoading(true);
    try {
      const res = await postApiV1GroupBuyRequests({
        storeName: data.store.storeName,
        storeAddress: data.store.roadAddress,
        storeLatitude: data.store.latitude,
        storeLongitude: data.store.longitude,
        productName: data.productName,
        desiredQuantity: Number(data.quantity),
        desiredPickupDate: data.pickupDate,
        additionalNote: data.additionalNote || null,
      });

      if (res.status === 201) {
        setStep('complete');
      } else {
        showToast('요청 제출에 실패했어요. 다시 시도해 주세요.');
      }
    } catch {
      showToast('요청 제출에 실패했어요. 다시 시도해 주세요.');
    } finally {
      setIsLoading(false);
    }
  };

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
    <>
      <RequestFormStep
        selectedStore={selectedStore}
        onSearchStore={() => setStep('search')}
        onSubmit={handleSubmit}
        isLoading={isLoading}
      />

      <div className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 w-[calc(100%-32px)] max-w-[408px] pointer-events-none">
        <Toast
          isVisible={!!toastMessage}
          icon="lucide:circle-alert"
          message={toastMessage ?? ''}
        />
      </div>
    </>
  );
};
