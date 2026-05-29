'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { type Store } from './StoreSearchStep';
import { type ApiResponseStoreSearchListDataStoresItem } from '@/api/generated/api.schemas';
import { RequestFormStep } from './RequestFormStep';
import { StoreSearchStep } from './StoreSearchStep';
import { MapConfirmStep } from './MapConfirmStep';
import { SubmitCompleteStep } from './SubmitCompleteStep';
import { ToastBlack } from '@/components/ToastBlack';
import { postApiV1GroupBuyRequests } from '@/api/generated/group-buy-request/group-buy-request';
import type { RequestFormData } from './RequestFormStep';
import { logEvent } from '@/lib/analytics';

type Step = 'form' | 'search' | 'map' | 'complete';

const STEP_META: Record<Step, { step: number; step_name: string }> = {
  form: { step: 1, step_name: '폼 입력' },
  search: { step: 2, step_name: '매장 검색' },
  map: { step: 3, step_name: '지도 확인' },
  complete: { step: 4, step_name: '완료' },
};

export const GroupBuyRequestClient = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialBakery = searchParams.get('bakery') ?? '';
  const [step, setStep] = useState<Step>('form');
  const [selectedStore, setSelectedStore] = useState<Store | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<
    ApiResponseStoreSearchListDataStoresItem[]
  >([]);
  const [isLoading, setIsLoading] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const toastTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const showToast = (message: string) => {
    if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    setToastMessage(message);
    toastTimerRef.current = setTimeout(() => setToastMessage(null), 3000);
  };

  useEffect(() => {
    const rawSource = searchParams.get('source');
    const source =
      rawSource === 'search_empty' || rawSource === 'mypage'
        ? rawSource
        : 'gnb';
    logEvent('screen_view', {
      screen_name: 'group_request_form',
      entry_source: source,
    });
    logEvent('group_request_start', { source });
    logEvent('groupbuy_request_form_start', { entry_source: source });
    logEvent('group_request_step', STEP_META.form);
    return () => {
      if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    };
  }, []);

  const goToStep = (next: Step) => {
    setStep(next);
    logEvent('group_request_step', STEP_META[next]);
  };

  const handleSubmit = async (data: RequestFormData) => {
    setIsLoading(true);
    try {
      const res = await postApiV1GroupBuyRequests({
        storeName: data.store.storeName,
        storeAddress: data.store.roadAddress,
        latitude: data.store.latitude,
        longitude: data.store.longitude,
        productName: data.productName,
        desiredQuantity: data.quantity,
        desiredPickupDate: data.pickupDate,
        additionalNote: data.additionalNote || null,
      });

      if (res.status === 201) {
        const requestId = res.data?.data?.requestId;
        logEvent('group_request_submit_success', {
          store_name: data.store.storeName,
          product_name: data.productName,
        });
        logEvent('groupbuy_request_submit_success', {
          request_id: requestId!,
          store_id: data.store.placeId,
          quantity: data.quantity,
        });
        goToStep('complete');
      } else {
        logEvent('group_request_submit_fail', { reason: 'server_error' });
        logEvent('groupbuy_request_submit_fail', {
          error_code: String(res.status),
          error_message_group: 'server_error',
        });
        showToast('요청 제출에 실패했어요. 다시 시도해 주세요.');
      }
    } catch {
      logEvent('group_request_submit_fail', { reason: 'network_error' });
      logEvent('groupbuy_request_submit_fail', {
        error_message_group: 'network_error',
      });
      showToast('요청 제출에 실패했어요. 다시 시도해 주세요.');
    } finally {
      setIsLoading(false);
    }
  };

  if (step === 'search') {
    return (
      <div className="h-full">
        <StoreSearchStep
          query={searchQuery}
          onQueryChange={setSearchQuery}
          results={searchResults}
          onResultsChange={setSearchResults}
          onSelectStore={(store) => {
            setSelectedStore(store);
            goToStep('map');
          }}
          onBack={() => goToStep('form')}
        />
      </div>
    );
  }

  if (step === 'map') {
    return (
      <div className="h-full">
        <MapConfirmStep
          store={selectedStore}
          onBack={() => goToStep('search')}
          onConfirm={() => goToStep('form')}
        />
      </div>
    );
  }

  if (step === 'complete') {
    return (
      <div className="h-full">
        <SubmitCompleteStep />
      </div>
    );
  }

  return (
    <div className="h-full">
      <RequestFormStep
        selectedStore={selectedStore}
        onSearchStore={() => goToStep('search')}
        onSubmit={handleSubmit}
        isLoading={isLoading}
        onBack={() => router.back()}
        initialProductName={initialBakery}
      />

      <div className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 w-[calc(100%-32px)] max-w-[408px] pointer-events-none">
        <ToastBlack
          isVisible={!!toastMessage}
          icon="lucide:circle-alert"
          message={toastMessage ?? ''}
        />
      </div>
    </div>
  );
};
