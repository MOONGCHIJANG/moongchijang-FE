'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Icon } from '@iconify/react';
import { BottomSheet } from '@/components/BottomSheet';
import { Button } from '@/components/Button';
import { Chip } from '@/components/Chip';
import Link from 'next/link';
import { NeighborhoodPickerBottomSheet } from './NeighborhoodPickerBottomSheet';
import { DatePickerBottomSheet } from '../../../request/_components/DatePickerBottomSheet';
import { StoreSearchCard } from './StoreSearchCard';
import { cn } from '@/lib/utils';
import { type Region } from '@/constants/regions';
import {
  useGetApiV1StoresSearch,
  usePostApiV1GroupBuyRequests,
} from '@/api/hooks/group-buy-request/group-buy-request';
import type { ApiResponseStoreSearchListDataStoresItem } from '@/api/generated/api.schemas';

type Step = 'form' | 'stores';

const POPULAR_NEIGHBORHOODS = ['성수', '홍대', '망원', '연남', '이태원'];
const POPULAR_BAKERIES = [
  '두쫀쿠',
  '소금빵',
  '크루아상',
  '버터떡',
  '마들렌',
  '앙버터',
];

interface GroupBuyRequestSheetProps {
  isOpen: boolean;
  onClose: () => void;
  detectedBakery?: string | null;
  detectedNeighborhood?: string | null;
}

export const GroupBuyRequestSheet = ({
  isOpen,
  onClose,
  detectedBakery,
  detectedNeighborhood,
}: GroupBuyRequestSheetProps) => {
  const [step, setStep] = useState<Step>('form');

  // TODO: NUMBER_3에서 detectedNeighborhood가 POPULAR_NEIGHBORHOODS에 없으면
  // 칩이 비활성화 상태지만 effectiveNeighborhood 폴백으로 버튼은 활성화됨
  // → 동적 칩 추가 또는 REGIONS_DATA 매칭으로 시각적 피드백 개선 필요
  const [selectedNeighborhoodLabel, setSelectedNeighborhoodLabel] = useState<
    string | null
  >(
    POPULAR_NEIGHBORHOODS.includes(detectedNeighborhood ?? '')
      ? (detectedNeighborhood ?? null)
      : null,
  );
  const [selectedRegion, setSelectedRegion] = useState<Region | null>(null);
  const [isLocationSheetOpen, setIsLocationSheetOpen] = useState(false);

  const [selectedBakeryLabel, setSelectedBakeryLabel] = useState<string | null>(
    null,
  );
  const [bakeryInput, setBakeryInput] = useState('');
  const [showBakeryInput, setShowBakeryInput] = useState(false);

  const [selectedStore, setSelectedStore] =
    useState<ApiResponseStoreSearchListDataStoresItem | null>(null);
  const [desiredQuantity, setDesiredQuantity] = useState(1);
  const [desiredPickupDate, setDesiredPickupDate] = useState('');
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);

  const [prevIsOpen, setPrevIsOpen] = useState(isOpen);
  if (prevIsOpen !== isOpen) {
    setPrevIsOpen(isOpen);
    if (isOpen) {
      setStep('form');
      setSelectedNeighborhoodLabel(
        POPULAR_NEIGHBORHOODS.includes(detectedNeighborhood ?? '')
          ? (detectedNeighborhood ?? null)
          : null,
      );
      setSelectedRegion(null);
      setIsLocationSheetOpen(false);
      setSelectedBakeryLabel(null);
      setBakeryInput('');
      setShowBakeryInput(false);
      setSelectedStore(null);
      setDesiredQuantity(1);
      setDesiredPickupDate('');
      setIsDatePickerOpen(false);
    }
  }

  const hasDetectedBakery = !!detectedBakery;
  const hasDetectedNeighborhood = !!detectedNeighborhood;

  const effectiveNeighborhood =
    selectedNeighborhoodLabel ??
    selectedRegion?.name ??
    detectedNeighborhood ??
    null;
  const effectiveBakery =
    selectedBakeryLabel || bakeryInput.trim() || detectedBakery || null;

  const storeSearchKeyword = [effectiveNeighborhood, effectiveBakery]
    .filter(Boolean)
    .join(' ')
    .trim();

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

  const canFindStores = !!effectiveNeighborhood && !!effectiveBakery;
  const canSubmit = !!selectedStore?.storeName && !!desiredPickupDate;

  const getDisabledButtonLabel = () => {
    if (!effectiveNeighborhood && !effectiveBakery)
      return '동네와 베이커리를 선택해주세요';
    if (!effectiveBakery) return '베이커리를 선택해주세요';
    return '동네를 선택해주세요';
  };

  const handleFindStores = () => {
    if (!canFindStores) return;
    setSelectedStore(null);
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
        productName: effectiveBakery ?? '',
        desiredQuantity,
        desiredPickupDate,
      },
    });
  };

  const handleNeighborhoodChipClick = (label: string) => {
    setSelectedNeighborhoodLabel((prev) => (prev === label ? null : label));
    setSelectedRegion(null);
  };

  const handleBakeryChipClick = (label: string) => {
    setSelectedBakeryLabel((prev) => (prev === label ? null : label));
    setBakeryInput('');
    setShowBakeryInput(false);
  };

  const renderNeighborhoodSection = () => (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-1.5">
        <Image src="/icons/icon.svg" alt="" width={20} height={20} />
        <span className="body-sm-bold text-text-tertiary font-pretendard">
          어느 동네인가요?
        </span>
      </div>
      <div className="flex flex-wrap gap-2">
        {POPULAR_NEIGHBORHOODS.map((label) => (
          <Chip
            key={label}
            label={label}
            active={selectedNeighborhoodLabel === label}
            onClick={() => handleNeighborhoodChipClick(label)}
          />
        ))}
        <button
          type="button"
          onClick={() => {
            setIsLocationSheetOpen(true);
          }}
          className={cn(
            'inline-flex h-[26px] items-center gap-1 px-3 py-1 rounded-2xl font-pretendard caption-sm-bold transition-colors',
            selectedRegion
              ? 'bg-surface-brand text-text-basic-inverse'
              : 'bg-surface-elevated outline outline-1 outline-offset-[-1px] outline-border-subtle text-text-tertiary',
          )}
        >
          {!selectedRegion && <span className="text-xs leading-4">+</span>}
          <span className="text-12 leading-4">
            {selectedRegion ? selectedRegion.name : '직접 입력'}
          </span>
        </button>
      </div>
    </div>
  );

  const renderBakerySection = (sectionLabel: string) => (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-1.5">
        <Image src="/icons/icon.svg" alt="" width={20} height={20} />
        <span className="body-sm-bold text-text-tertiary font-pretendard">
          {sectionLabel}
        </span>
      </div>
      <div className="flex flex-wrap gap-2">
        {POPULAR_BAKERIES.map((label) => (
          <Chip
            key={label}
            label={label}
            active={selectedBakeryLabel === label}
            onClick={() => handleBakeryChipClick(label)}
          />
        ))}
        <button
          type="button"
          onClick={() => {
            setSelectedBakeryLabel(null);
            setShowBakeryInput(true);
          }}
          className={cn(
            'inline-flex h-[26px] items-center gap-1 px-3 py-1 rounded-2xl font-pretendard caption-sm-bold transition-colors',
            showBakeryInput
              ? 'bg-surface-brand text-text-basic-inverse'
              : 'bg-surface-elevated outline outline-1 outline-offset-[-1px] outline-border-subtle text-text-tertiary',
          )}
        >
          {!showBakeryInput && <span className="text-xs leading-4">+</span>}
          <span className="text-12 leading-4">직접 입력</span>
        </button>
      </div>
      {showBakeryInput && (
        <input
          autoFocus
          value={bakeryInput}
          onChange={(e) => setBakeryInput(e.target.value)}
          placeholder="베이커리 또는 상품명을 정확히 작성해주세요"
          className="h-11 w-full rounded-xl border border-border-brand px-4 body-sm-regular text-text-basic font-pretendard outline-none"
        />
      )}
    </div>
  );

  const renderFormContent = () => {
    // NUMBER_1 (베이커리 인식, 동네 미인식) / NUMBER_3 (둘 다 인식)
    if (hasDetectedBakery) {
      return (
        <div className="flex flex-col gap-5">
          <div className="flex items-start gap-2 rounded-xl bg-amber-50 px-3 py-4">
            <span className="text-xl leading-none mt-0.5">🤖</span>
            <p className="body-sm-regular text-amber-700 font-pretendard whitespace-pre-line">
              {`[${detectedBakery}]는 파악했어요.\n동네만 알려주시면 바로 찾아드릴게요.`}
            </p>
          </div>
          {renderNeighborhoodSection()}
          <Button
            size="md"
            fullWidth
            disabled={!canFindStores}
            onClick={handleFindStores}
          >
            {canFindStores ? '매장 찾기' : getDisabledButtonLabel()}
          </Button>
        </div>
      );
    }

    // NUMBER_2 (동네 인식, 베이커리 미인식)
    if (hasDetectedNeighborhood) {
      return (
        <div className="flex flex-col gap-5">
          <div className="flex items-start gap-2 rounded-xl bg-amber-50 px-3 py-4">
            <Image
              src="/icons/icon.svg"
              alt=""
              width={20}
              height={20}
              className="mt-0.5 shrink-0"
            />
            <p className="body-sm-regular text-amber-700 font-pretendard whitespace-pre-line">
              {`요즘 ${detectedNeighborhood}에서 가장 인기 있는\n베이커리예요. 탭해서 바로 찾아드릴게요.`}
            </p>
          </div>
          {renderBakerySection('무슨 상품 찾으시나요?')}
          <Button
            size="md"
            fullWidth
            disabled={!canFindStores}
            onClick={handleFindStores}
          >
            {canFindStores ? '매장 찾기' : getDisabledButtonLabel()}
          </Button>
        </div>
      );
    }

    // NUMBER_4 (둘 다 미인식)
    return (
      <div className="flex flex-col gap-5">
        <div className="flex items-start gap-2 rounded-xl bg-amber-50 px-3 py-4">
          <span className="text-xl leading-none mt-0.5">😵</span>
          <p className="body-sm-regular text-amber-700 font-pretendard whitespace-pre-line">
            {
              '검색어를 잘 못 알아들었어요!\n아래에서 골라주시면 바로 찾아드릴게요.'
            }
          </p>
        </div>
        {renderNeighborhoodSection()}
        <div className="border-t border-border-subtle" />
        {renderBakerySection('어떤 베이커리 찾으시나요?')}
        <Button
          size="md"
          fullWidth
          disabled={!canFindStores}
          onClick={handleFindStores}
        >
          {canFindStores ? '매장 찾기' : getDisabledButtonLabel()}
        </Button>
      </div>
    );
  };

  return (
    <>
      <BottomSheet isOpen={isOpen} onClose={onClose}>
        <div className="px-5 pb-8 flex flex-col gap-6">
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
              ✨ 공구 개설 요청
            </span>
          </div>

          {step === 'form' ? (
            renderFormContent()
          ) : (
            <div className="flex flex-col gap-5">
              <p className="caption-sm-bold text-text-tertiary font-pretendard">
                {'입력데이터와 자사 공구 이력을 분석해  '}
                <span className="caption-sm-bold text-text-brand">{`[${effectiveNeighborhood} ${effectiveBakery}]`}</span>
                {'과 가장 관련된 매장을 추천해드려요'}
              </p>
              {isSearchingStores ? (
                <p className="py-10 text-center body-sm-regular text-text-disabled font-pretendard">
                  매장을 검색 중이에요
                </p>
              ) : stores.length === 0 ? (
                <p className="py-10 text-center body-sm-regular text-text-disabled font-pretendard">
                  검색된 매장이 없어요
                </p>
              ) : (
                <div className="flex flex-col gap-4">
                  <span className="body-sm-bold text-text-basic font-pretendard flex items-center gap-1.5">
                    <Image
                      src="/icons/icon.svg"
                      alt=""
                      width={20}
                      height={20}
                    />
                    추천 매장 {stores.length}곳
                  </span>
                  <div className="flex flex-col gap-2">
                    {stores.map((store) => (
                      <StoreSearchCard
                        key={store.placeId}
                        store={store}
                        isSelected={selectedStore?.placeId === store.placeId}
                        onClick={() => setSelectedStore(store)}
                      />
                    ))}
                  </div>
                  <Link
                    href={`/request?bakery=${encodeURIComponent(effectiveBakery ?? '')}`}
                    onClick={onClose}
                    className="text-center caption-sm-regular text-text-tertiary font-pretendard underline underline-offset-2"
                  >
                    직접 매장 검색하기
                  </Link>
                </div>
              )}
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
                  <button
                    type="button"
                    onClick={() => setIsDatePickerOpen(true)}
                    className={cn(
                      'h-11 w-full rounded-xl border border-border-default px-4 flex items-center body-sm-regular font-pretendard',
                      desiredPickupDate
                        ? 'text-text-basic'
                        : 'text-text-disabled',
                    )}
                  >
                    {desiredPickupDate || '날짜를 선택해주세요'}
                  </button>
                </div>
              </div>
              <Button
                size="md"
                fullWidth
                disabled={!canSubmit || isPending}
                onClick={handleSubmit}
              >
                {isPending ? '요청 중...' : '선택한 매장으로 공구 개설하기'}
              </Button>
            </div>
          )}
        </div>
      </BottomSheet>

      <DatePickerBottomSheet
        isOpen={isDatePickerOpen}
        onClose={() => setIsDatePickerOpen(false)}
        selectedDate={desiredPickupDate}
        onSelect={(date: string) => setDesiredPickupDate(date)}
      />

      <NeighborhoodPickerBottomSheet
        isOpen={isLocationSheetOpen}
        onClose={() => setIsLocationSheetOpen(false)}
        selectedRegion={selectedRegion}
        onSelect={(region) => {
          setSelectedRegion(region);
          setSelectedNeighborhoodLabel(null);
        }}
      />
    </>
  );
};
