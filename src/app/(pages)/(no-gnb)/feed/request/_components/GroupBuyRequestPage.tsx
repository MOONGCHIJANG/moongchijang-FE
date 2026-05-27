'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Icon } from '@iconify/react';
import { Button } from '@/components/Button';
import Header from '@/components/Header';
import { Chip } from '@/components/Chip';
import Link from 'next/link';
import { NeighborhoodPickerBottomSheet } from '@/app/(pages)/(gnb)/feed/_components/NeighborhoodPickerBottomSheet';
import { DatePickerBottomSheet } from '@/app/(pages)/request/_components/DatePickerBottomSheet';
import { RequestConfirmModal } from '@/app/(pages)/request/_components/RequestConfirmModal';
import { SubmitCompleteStep } from '@/app/(pages)/request/_components/SubmitCompleteStep';
import type { RequestFormData } from '@/app/(pages)/request/_components/RequestFormStep';
import { StoreSearchCard } from '@/app/(pages)/(gnb)/feed/_components/StoreSearchCard';
import { cn } from '@/lib/utils';
import { type RequestRegion } from '@/constants/requestRegions';
import {
  useGetApiV1StoresSearch,
  usePostApiV1GroupBuyRequests,
} from '@/api/hooks/group-buy-request/group-buy-request';
import type { ApiResponseStoreSearchListDataStoresItem } from '@/api/generated/api.schemas';

type Step = 'form' | 'stores' | 'complete';

const POPULAR_NEIGHBORHOODS = ['성수', '홍대', '망원', '연남', '이태원'];
const POPULAR_BAKERIES = [
  '두쫀쿠',
  '소금빵',
  '크루아상',
  '버터떡',
  '마들렌',
  '앙버터',
];

const InfoBanner = ({
  title,
  subtitle,
}: {
  title: React.ReactNode;
  subtitle: string;
}) => (
  <div className="w-full p-4 bg-surface-white rounded-[10px] shadow-[0px_3px_10px_0px_rgba(0,0,0,0.10)] flex items-center gap-2">
    <div className="flex flex-col justify-center items-start">
      <span className="text-text-subtle text-xs font-bold font-pretendard leading-5">
        {title}
      </span>
      <span className="text-text-subtle text-xs font-normal font-pretendard leading-5">
        {subtitle}
      </span>
    </div>
  </div>
);

const SectionLabel = ({ label }: { label: string }) => (
  <div className="flex items-center gap-1.5">
    <Image src="/icons/icon.svg" alt="" width={20} height={20} />
    <span className="heading-sm-bold text-text-basic font-pretendard">
      {label}
    </span>
  </div>
);

const DirectInputChip = ({
  active,
  label,
  onClick,
}: {
  active: boolean;
  label: string;
  onClick: () => void;
}) => (
  <button
    type="button"
    onClick={onClick}
    className={cn(
      'inline-flex h-[26px] items-center gap-1 px-3 py-1 rounded-2xl font-pretendard caption-sm-bold transition-colors',
      active
        ? 'bg-surface-brand text-text-basic-inverse'
        : 'bg-surface-elevated outline outline-1 outline-offset-[-1px] outline-border-subtle text-text-tertiary',
    )}
  >
    {!active && <span className="text-12 leading-4">+</span>}
    <span className="text-12 leading-4">{label}</span>
  </button>
);

interface GroupBuyRequestPageProps {
  detectedBakery?: string | null;
  detectedNeighborhood?: string | null;
  initialStep?: Step;
  initialSelectedNeighborhood?: string | null;
  initialSelectedBakery?: string | null;
}

export const GroupBuyRequestPage = ({
  detectedBakery,
  detectedNeighborhood,
  initialStep = 'form',
  initialSelectedNeighborhood,
  initialSelectedBakery,
}: GroupBuyRequestPageProps) => {
  const router = useRouter();

  const [step, setStep] = useState<Step>(initialStep);

  const [selectedNeighborhoodLabel, setSelectedNeighborhoodLabel] = useState<
    string | null
  >(detectedNeighborhood ?? null);
  const [selectedRegion, setSelectedRegion] = useState<RequestRegion | null>(
    null,
  );
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
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

  const hasDetectedBakery = !!detectedBakery;
  const hasDetectedNeighborhood = !!detectedNeighborhood;

  const effectiveNeighborhood =
    selectedNeighborhoodLabel ??
    selectedRegion?.name ??
    initialSelectedNeighborhood ??
    detectedNeighborhood ??
    null;
  const effectiveBakery =
    selectedBakeryLabel ||
    bakeryInput.trim() ||
    initialSelectedBakery ||
    detectedBakery ||
    null;

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
    mutation: { onSuccess: () => setStep('complete') },
  });

  const hasUserSelectedNeighborhood =
    !!selectedNeighborhoodLabel || !!selectedRegion;
  const hasUserSelectedBakery = !!selectedBakeryLabel || !!bakeryInput.trim();

  const canFindStores = hasDetectedBakery
    ? hasUserSelectedNeighborhood
    : hasDetectedNeighborhood
      ? hasUserSelectedBakery
      : hasUserSelectedNeighborhood && hasUserSelectedBakery;
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
    const params = new URLSearchParams(window.location.search);
    params.set('step', 'stores');
    if (effectiveNeighborhood)
      params.set('selectedNeighborhood', effectiveNeighborhood);
    if (effectiveBakery) params.set('selectedBakery', effectiveBakery);
    router.replace(`/feed/request?${params.toString()}`, { scroll: false });
  };

  const handleSubmit = () => {
    if (!canSubmit) return;
    setIsConfirmModalOpen(true);
  };

  const handleConfirm = () => {
    if (!selectedStore?.storeName) return;
    setIsConfirmModalOpen(false);
    submitRequest({
      data: {
        storeName: selectedStore.storeName,
        storeAddress: selectedStore!.roadAddress ?? null,
        latitude: selectedStore!.latitude ?? null,
        longitude: selectedStore!.longitude ?? null,
        productName: effectiveBakery ?? '',
        desiredQuantity,
        desiredPickupDate,
      },
    });
  };

  const confirmModalData: RequestFormData = {
    store: {
      placeId: selectedStore?.placeId ?? '',
      storeName: selectedStore?.storeName ?? '',
      roadAddress: selectedStore?.roadAddress ?? '',
      latitude: selectedStore?.latitude ?? 0,
      longitude: selectedStore?.longitude ?? 0,
    },
    productName: effectiveBakery ?? '',
    quantity: desiredQuantity,
    pickupDate: desiredPickupDate,
    additionalNote: '',
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

  const renderNeighborhoodSection = () => {
    const extraNeighborhood =
      detectedNeighborhood &&
      !POPULAR_NEIGHBORHOODS.includes(detectedNeighborhood)
        ? detectedNeighborhood
        : null;

    return (
      <div className="flex flex-col gap-3">
        <SectionLabel label="어느 동네인가요?" />
        <div className="flex flex-wrap gap-2 items-center">
          {extraNeighborhood && (
            <Chip
              key={extraNeighborhood}
              label={extraNeighborhood}
              active={selectedNeighborhoodLabel === extraNeighborhood}
              onClick={() => handleNeighborhoodChipClick(extraNeighborhood)}
            />
          )}
          {POPULAR_NEIGHBORHOODS.map((label) => (
            <Chip
              key={label}
              label={label}
              active={selectedNeighborhoodLabel === label}
              onClick={() => handleNeighborhoodChipClick(label)}
            />
          ))}
          <DirectInputChip
            active={!!selectedRegion}
            label={selectedRegion ? selectedRegion.name : '직접 입력'}
            onClick={() => setIsLocationSheetOpen(true)}
          />
        </div>
      </div>
    );
  };

  const renderBakerySection = (sectionLabel: string) => (
    <div className="flex flex-col gap-3">
      <SectionLabel label={sectionLabel} />
      <div className="flex flex-wrap gap-2 items-center">
        {POPULAR_BAKERIES.map((label) => (
          <Chip
            key={label}
            label={label}
            active={selectedBakeryLabel === label}
            onClick={() => handleBakeryChipClick(label)}
          />
        ))}
        <DirectInputChip
          active={showBakeryInput}
          label="직접 입력"
          onClick={() => {
            setSelectedBakeryLabel(null);
            setShowBakeryInput(true);
          }}
        />
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
          <InfoBanner
            title={<>{detectedBakery}는 파악했어요</>}
            subtitle="원하는 동네를 알려주시면 가게를 찾아드릴게요"
          />
          {renderNeighborhoodSection()}
        </div>
      );
    }

    // NUMBER_2 (동네 인식, 베이커리 미인식)
    if (hasDetectedNeighborhood) {
      return (
        <div className="flex flex-col gap-5">
          <InfoBanner
            title={
              <>요즘 {detectedNeighborhood}에서 가장 인기 있는 상품이에요</>
            }
            subtitle="원하는 상품을 알려주시면 가게를 찾아드릴게요"
          />
          {renderBakerySection('무슨 상품 찾으시나요?')}
        </div>
      );
    }

    // NUMBER_4 (둘 다 미인식)
    return (
      <div className="flex flex-col gap-5">
        <InfoBanner
          title="찾고 싶은 정보를 조금만 더 알려주세요"
          subtitle="동네와 상품을 선택해주시면 바로 찾아드릴게요"
        />
        {renderNeighborhoodSection()}
        <div className="border-t border-border-subtle" />
        {renderBakerySection('무슨 상품 찾으시나요?')}
      </div>
    );
  };

  const renderStoresContent = () => (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-2">
        <SectionLabel label={`추천 매장 ${stores.length}곳`} />
        <p className="caption-sm-regular text-text-tertiary font-pretendard">
          {'입력데이터와 자사 공구 이력을 분석해 '}
          <span className="caption-sm-bold text-text-subtle">{`${effectiveNeighborhood} ${effectiveBakery}`}</span>
          {' 관련된 매장을 찾았어요! 매장을 선택해주세요.'}
        </p>
      </div>
      {isSearchingStores ? (
        <p className="py-10 text-center body-sm-regular text-text-disabled font-pretendard">
          매장을 검색 중이에요
        </p>
      ) : stores.length === 0 ? (
        <p className="py-10 text-center body-sm-regular text-text-disabled font-pretendard">
          검색된 매장이 없어요
        </p>
      ) : (
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
      )}
      <div className="flex flex-col gap-3">
        <SectionLabel label="상품 선택" />
        <div className="flex items-center justify-between px-4 h-[52px] rounded-xl border border-border-default">
          <span className="body-sm-bold text-text-basic font-pretendard">
            {effectiveBakery}
          </span>
          <div className="flex items-center justify-center rounded-lg border border-border-default min-w-[88px] h-7 px-3 gap-3 shrink-0">
            <button
              type="button"
              onClick={() =>
                setDesiredQuantity(Math.max(1, desiredQuantity - 1))
              }
              className="body-sm-bold text-text-tertiary font-pretendard"
            >
              -
            </button>
            <span className="body-sm-regular text-text-basic font-pretendard w-4 text-center">
              {desiredQuantity}
            </span>
            <button
              type="button"
              onClick={() => setDesiredQuantity(desiredQuantity + 1)}
              className="body-sm-bold text-text-tertiary font-pretendard"
            >
              +
            </button>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <SectionLabel label="희망 픽업 날짜" />
        <button
          type="button"
          onClick={() => setIsDatePickerOpen(true)}
          className={cn(
            'body-md-regular flex items-center gap-2 px-3 py-4 bg-surface-default rounded-2xlarge w-full font-pretendard',
            desiredPickupDate ? 'text-text-subtle' : 'text-icon-disabled',
          )}
        >
          <Icon
            icon="lucide:calendar-check"
            className="w-4 h-4 text-icon-subtle shrink-0"
          />
          {desiredPickupDate || '날짜 선택'}
        </button>
        <div className="flex items-start gap-[2px]">
          <Icon
            icon="lucide:info"
            className="w-3 h-3 text-icon-primary mt-[3px] shrink-0"
          />
          <span className="caption-sm-regular text-text-brand font-pretendard">
            희망하신 날짜에 진행이 불가할 수 있으며, 실제 픽업일은 매장 협의 후
            확정됩니다.
          </span>
        </div>
      </div>
    </div>
  );

  if (step === 'complete') {
    return (
      <div className="flex h-dvh flex-col">
        <SubmitCompleteStep />
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-col h-dvh bg-surface-white">
        <Header
          text="공구 개설 요청"
          onBack={() => {
            if (step === 'stores') {
              setStep('form');
              const params = new URLSearchParams();
              if (detectedBakery) params.set('bakery', detectedBakery);
              if (detectedNeighborhood)
                params.set('neighborhood', detectedNeighborhood);
              const qs = params.toString();
              router.replace(`/feed/request${qs ? `?${qs}` : ''}`, {
                scroll: false,
              });
            } else {
              router.back();
            }
          }}
        />

        {/* 스크롤 컨텐츠 영역 */}
        <div className="flex-1 overflow-y-auto px-5 pt-5 pb-2">
          {step === 'form' ? renderFormContent() : renderStoresContent()}
        </div>

        {/* 하단 고정 버튼 */}
        <div className="px-5 py-4 pb-8 shadow-[0px_-2px_20px_0px_rgba(0,0,0,0.10)]">
          {step === 'form' ? (
            <Button
              size="md"
              fullWidth
              disabled={!canFindStores}
              onClick={handleFindStores}
            >
              {canFindStores ? '매장 찾기' : getDisabledButtonLabel()}
            </Button>
          ) : (
            <div className="flex flex-col gap-3">
              <Link
                href="/request/new"
                className="text-center caption-sm-regular text-text-tertiary font-pretendard"
              >
                직접 매장 검색하기
              </Link>
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
      </div>

      <RequestConfirmModal
        isOpen={isConfirmModalOpen}
        onClose={() => setIsConfirmModalOpen(false)}
        onConfirm={handleConfirm}
        data={confirmModalData}
      />

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
