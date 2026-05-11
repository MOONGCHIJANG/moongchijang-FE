'use client';

import { useState } from 'react';
import { Icon } from '@iconify/react';
import { BottomSheet } from '@/components/BottomSheet';
import { Button } from '@/components/Button';
import { LocationBottomSheet } from './LocationBottomSheet';
import { cn } from '@/lib/utils';
import { type Region } from '@/constants/regions';
import {
  useGetApiV1StoresSearch,
  usePostApiV1GroupBuyRequests,
} from '@/api/hooks/group-buy-request/group-buy-request';
import type { ApiResponseStoreSearchListDataStoresItem } from '@/api/generated/api.schemas';

type Step = 'form' | 'stores';

interface GroupBuyRequestSheetProps {
  isOpen: boolean;
  onClose: () => void;
  detectedBakery?: string | null;
}

export const GroupBuyRequestSheet = ({
  isOpen,
  onClose,
  detectedBakery,
}: GroupBuyRequestSheetProps) => {
  const [step, setStep] = useState<Step>('form');
  const [productName, setProductName] = useState(detectedBakery ?? '');
  const [selectedRegion, setSelectedRegion] = useState<Region | null>(null);
  const [isLocationSheetOpen, setIsLocationSheetOpen] = useState(false);
  const [selectedStore, setSelectedStore] =
    useState<ApiResponseStoreSearchListDataStoresItem | null>(null);
  const [desiredQuantity, setDesiredQuantity] = useState(1);
  const [desiredPickupDate, setDesiredPickupDate] = useState('');
  const [minPickupDate, setMinPickupDate] = useState('');

  const storeSearchKeyword = selectedRegion
    ? `${selectedRegion.name} ${productName}`.trim()
    : productName.trim();

  const { data: storesData, isLoading: isSearchingStores } =
    useGetApiV1StoresSearch(
      { keyword: storeSearchKeyword },
      { query: { enabled: step === 'stores' && !!storeSearchKeyword } },
    );

  const stores =
    storesData?.status === 200 ? (storesData.data?.data?.stores ?? []) : [];

  const { mutate: submitRequest, isPending } = usePostApiV1GroupBuyRequests({
    mutation: { onSuccess: onClose },
  });

  const canFindStores = !!selectedRegion && !!productName.trim();
  const canSubmit =
    !!selectedStore?.storeName && desiredQuantity >= 1 && !!desiredPickupDate;

  const handleFindStores = () => {
    if (!canFindStores) return;
    setSelectedStore(null);
    setMinPickupDate(
      new Date(Date.now() + 86400000).toISOString().split('T')[0],
    );
    setStep('stores');
  };

  const handleSubmit = () => {
    if (!canSubmit) return;
    submitRequest({
      data: {
        storeName: selectedStore!.storeName!,
        storeAddress: selectedStore!.roadAddress ?? null,
        storeLatitude: selectedStore!.latitude ?? null,
        storeLongitude: selectedStore!.longitude ?? null,
        productName,
        desiredQuantity,
        desiredPickupDate,
      },
    });
  };

  return (
    <>
      <BottomSheet isOpen={isOpen} onClose={onClose}>
        <div className="px-5 pb-8 flex flex-col gap-6">
          {/* 헤더 */}
          <div className="flex items-center gap-2">
            {step === 'stores' && (
              <button type="button" onClick={() => setStep('form')}>
                <Icon
                  icon="mingcute:left-line"
                  className="h-6 w-6 text-icon-basic"
                />
              </button>
            )}
            <span className="heading-md-bold text-text-basic font-pretendard">
              공구 요청
            </span>
          </div>

          {step === 'form' ? (
            <div className="flex flex-col gap-4">
              {/* 상품명 */}
              <div className="flex flex-col gap-1.5">
                <span className="body-sm-bold text-text-tertiary font-pretendard">
                  원하는 상품
                </span>
                <input
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                  placeholder="상품명을 입력해주세요"
                  className="h-11 w-full rounded-xl border border-border-default px-4 body-sm-regular text-text-basic font-pretendard outline-none focus:border-border-brand"
                />
              </div>

              {/* 동네 선택 */}
              <div className="flex flex-col gap-1.5">
                <span className="body-sm-bold text-text-tertiary font-pretendard">
                  동네
                </span>
                <button
                  type="button"
                  onClick={() => setIsLocationSheetOpen(true)}
                  className="h-11 w-full rounded-xl border border-border-default px-4 flex items-center justify-between"
                >
                  <span
                    className={cn(
                      'body-sm-regular font-pretendard',
                      selectedRegion ? 'text-text-basic' : 'text-text-disabled',
                    )}
                  >
                    {selectedRegion?.name ?? '동네를 선택해주세요'}
                  </span>
                  <Icon
                    icon="mingcute:right-line"
                    className="h-5 w-5 text-icon-tertiary"
                  />
                </button>
              </div>

              <Button
                size="md"
                fullWidth
                disabled={!canFindStores}
                onClick={handleFindStores}
              >
                매장 찾기
              </Button>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {/* 매장 목록 */}
              <div className="flex flex-col gap-2 max-h-52 overflow-y-auto">
                {isSearchingStores ? (
                  <p className="py-6 text-center body-sm-regular text-text-disabled font-pretendard">
                    매장을 검색 중이에요
                  </p>
                ) : stores.length === 0 ? (
                  <p className="py-6 text-center body-sm-regular text-text-disabled font-pretendard">
                    검색된 매장이 없어요
                  </p>
                ) : (
                  stores.map((store) => (
                    <button
                      key={store.placeId}
                      type="button"
                      onClick={() => setSelectedStore(store)}
                      className={cn(
                        'w-full rounded-xl border px-4 py-3 text-left flex flex-col gap-0.5 transition-colors',
                        selectedStore?.placeId === store.placeId
                          ? 'border-border-brand bg-surface-brand-lighter'
                          : 'border-border-default bg-bg-white',
                      )}
                    >
                      <span className="body-sm-bold text-text-basic font-pretendard">
                        {store.storeName}
                      </span>
                      <span className="caption-xs-regular text-text-tertiary font-pretendard">
                        {store.roadAddress}
                      </span>
                    </button>
                  ))
                )}
              </div>

              {/* 수량 / 픽업일 */}
              <div className="flex flex-col gap-3">
                <div className="flex flex-col gap-1.5">
                  <span className="body-sm-bold text-text-tertiary font-pretendard">
                    희망 수량
                  </span>
                  <input
                    type="number"
                    min={1}
                    value={desiredQuantity}
                    onChange={(e) =>
                      setDesiredQuantity(Math.max(1, Number(e.target.value)))
                    }
                    className="h-11 w-full rounded-xl border border-border-default px-4 body-sm-regular text-text-basic font-pretendard outline-none focus:border-border-brand"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <span className="body-sm-bold text-text-tertiary font-pretendard">
                    희망 픽업일
                  </span>
                  <input
                    type="date"
                    value={desiredPickupDate}
                    min={minPickupDate}
                    onChange={(e) => setDesiredPickupDate(e.target.value)}
                    className="h-11 w-full rounded-xl border border-border-default px-4 body-sm-regular text-text-basic font-pretendard outline-none focus:border-border-brand"
                  />
                </div>
              </div>

              <Button
                size="md"
                fullWidth
                disabled={!canSubmit || isPending}
                onClick={handleSubmit}
              >
                {isPending ? '요청 중...' : '이 매장 공구요청하기'}
              </Button>
            </div>
          )}
        </div>
      </BottomSheet>

      {/* LocationBottomSheet는 DOM 순서상 뒤에 렌더링해 GroupBuyRequestSheet 위에 표시 */}
      <LocationBottomSheet
        isOpen={isLocationSheetOpen}
        onClose={() => setIsLocationSheetOpen(false)}
        selectedRegions={selectedRegion ? [selectedRegion] : []}
        onApply={(regions) => {
          setSelectedRegion(regions[0] ?? null);
          setIsLocationSheetOpen(false);
        }}
      />
    </>
  );
};
