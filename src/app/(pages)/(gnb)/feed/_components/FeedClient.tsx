'use client';

import {
  useState,
  useCallback,
  useMemo,
  useEffect,
  useLayoutEffect,
  useRef,
} from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { useQueryClient } from '@tanstack/react-query';
import { FeedTopBar } from './FeedTopBar';
import { SearchBar } from './SearchBar';
import { FilterBar, FilterId } from './FilterBar';
import { FeedCard } from './FeedCard';
import { FeedSkeletonList } from './FeedSkeleton';
import { LocationBottomSheet } from './LocationBottomSheet';
import { SearchOverlay } from './SearchOverlay';
import { QrModal } from './QrModal';
import { EmptyState } from './EmptyState';
import { GroupBuyRequestCard } from './GroupBuyRequestCard';
import { REGIONS_DATA, Region } from '@/constants/regions';
import { useShake } from '@/hooks/useShake';
import {
  usePostApiV1Search,
  getGetApiV1SearchRecentQueryKey,
} from '@/api/hooks/group-buy/group-buy';
import {
  type ApiResponseSearchAnalysisData,
  ApiResponseSearchAnalysisDataSearchCase,
  ApiResponseSearchAnalysisDataUiState,
} from '@/api/generated/api.schemas';
import { useGetApiV1PickupsMeNearestQr } from '@/api/hooks/pickup/pickup';
import { useAuthStore } from '@/store/authStore';
import { formatPickupDateTime } from '@/lib/date';
import { useFeedList } from '../_hooks/useFeedList';
import { useRecentSearches } from '../_hooks/useRecentSearches';

const ALL_REGIONS = REGIONS_DATA.flatMap((city) => city.regions);
const VALID_FILTERS: FilterId[] = ['all', 'due', 'target'];
const DEFAULT_REGION = REGIONS_DATA[0].regions[0];

function filterFromParam(param: string | null): FilterId {
  return VALID_FILTERS.includes(param as FilterId)
    ? (param as FilterId)
    : 'all';
}

function regionsFromParams(districtParams: string[]): Region[] {
  if (districtParams.length === 0) return [DEFAULT_REGION];
  const found = districtParams
    .map((d) => ALL_REGIONS.find((r) => r.districtType === d))
    .filter((r): r is Region => !!r);
  return found.length > 0 ? found : [DEFAULT_REGION];
}

export function FeedClient() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [activeFilter, setActiveFilter] = useState<FilterId>(() =>
    filterFromParam(searchParams.get('filter')),
  );
  const [isLocationSheetOpen, setIsLocationSheetOpen] = useState(false);
  const [selectedRegions, setSelectedRegions] = useState<Region[]>(() =>
    regionsFromParams(searchParams.getAll('districts')),
  );
  const [isQrModalOpen, setIsQrModalOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchInput, setSearchInput] = useState(
    () => searchParams.get('search') ?? '',
  );
  const [searchKeyword, setSearchKeyword] = useState(
    () => searchParams.get('search') ?? '',
  );
  const [searchAnalysis, setSearchAnalysis] =
    useState<ApiResponseSearchAnalysisData | null>(null);

  const queryClient = useQueryClient();
  const { recentSearches, removeRecentSearch, clearRecentSearches } =
    useRecentSearches();
  const { mutate: executeSearch, isPending: isSearchPending } =
    usePostApiV1Search({
      mutation: {
        onSuccess: (data) => {
          queryClient.invalidateQueries({
            queryKey: getGetApiV1SearchRecentQueryKey(),
          });
          setSearchAnalysis(
            data.status === 200 ? (data.data?.data ?? null) : null,
          );
        },
      },
    });

  const isLoggedIn = useAuthStore((s) => s.isLoggedIn);

  const { data: nearestQrResponse } = useGetApiV1PickupsMeNearestQr({
    query: { enabled: isLoggedIn },
  });
  const qrItem =
    nearestQrResponse?.status === 200
      ? (nearestQrResponse.data?.data?.item ?? null)
      : null;
  const isPickupDay = qrItem?.availabilityStatus === 'AVAILABLE';
  const dDayText = qrItem
    ? qrItem.dDay === 0
      ? 'D-day'
      : `D-${qrItem.dDay}`
    : '';

  const sentinelRef = useRef<HTMLDivElement>(null);

  const updateUrl = useCallback(
    (updates: Record<string, string | string[] | null>) => {
      const params = new URLSearchParams(searchParams.toString());
      Object.entries(updates).forEach(([key, value]) => {
        params.delete(key);
        if (value !== null) {
          if (Array.isArray(value)) {
            value.forEach((v) => params.append(key, v));
          } else {
            params.set(key, value);
          }
        }
      });
      const qs = params.toString();
      router.replace(`${pathname}${qs ? `?${qs}` : ''}`, { scroll: false });
    },
    [router, pathname, searchParams],
  );

  const districts = useMemo(
    () => selectedRegions.map((r) => r.districtType),
    [selectedRegions],
  );

  const {
    feeds,
    hasSearchResult,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useFeedList(activeFilter, districts, { enabled: !searchKeyword });

  const isSearchMode = !!searchKeyword;
  const displayItems = isSearchMode ? (searchAnalysis?.results ?? []) : feeds;
  const isDisplayLoading = isSearchMode
    ? isSearchPending && !searchAnalysis
    : isLoading;

  // ref로 최신 scroll 상태 유지 → observer는 fetchNextPage가 바뀔 때만 재생성
  const scrollStateRef = useRef({
    hasNextPage,
    isFetchingNextPage,
    hasSearchResult,
  });
  useLayoutEffect(() => {
    scrollStateRef.current = {
      hasNextPage,
      isFetchingNextPage,
      hasSearchResult,
    };
  });

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const { hasNextPage, isFetchingNextPage, hasSearchResult } =
          scrollStateRef.current;
        if (
          entries[0].isIntersecting &&
          hasNextPage &&
          !isFetchingNextPage &&
          hasSearchResult
        ) {
          fetchNextPage();
        }
      },
      { threshold: 0.1 },
    );
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [fetchNextPage]);

  const handleSearch = (keyword: string) => {
    setSearchKeyword(keyword);
    setSearchInput(keyword);
    setIsSearchOpen(false);
    updateUrl({ search: keyword || null, q: null });
    if (keyword) {
      executeSearch({ data: { keyword } });
    } else {
      setSearchAnalysis(null);
    }
  };

  const handleCloseSearch = () => {
    if (searchInput === '') {
      setSearchKeyword('');
      setSearchAnalysis(null);
      updateUrl({ search: null });
    } else {
      setSearchInput(searchKeyword);
    }
    setIsSearchOpen(false);
  };

  const handleFilterChange = (filter: FilterId) => {
    setActiveFilter(filter);
    updateUrl({ filter: filter === 'all' ? null : filter });
  };

  const handleApplyLocation = (newRegions: Region[]) => {
    const resolved = newRegions.length > 0 ? newRegions : [DEFAULT_REGION];
    setSelectedRegions(resolved);
    setIsLocationSheetOpen(false);
    const districtValues = resolved.map((r) => r.districtType);
    updateUrl({
      districts:
        districtValues.length === 1 &&
        districtValues[0] === DEFAULT_REGION.districtType
          ? null
          : districtValues,
    });
  };

  const handleOpenRequestSheet = useCallback(() => {
    const params = new URLSearchParams();
    if (searchAnalysis?.detectedProduct)
      params.set('bakery', searchAnalysis.detectedProduct);
    if (searchAnalysis?.detectedRegion)
      params.set('neighborhood', searchAnalysis.detectedRegion);
    const qs = params.toString();
    router.push(`/feed/request${qs ? `?${qs}` : ''}`);
  }, [router, searchAnalysis]);

  const handleShake = useCallback(() => {
    if (!isLoggedIn) return;
    setIsQrModalOpen(true);
  }, [isLoggedIn]);

  const { isEnabled, toggleShake } = useShake(handleShake);

  const locationDisplayText =
    selectedRegions.length === 1
      ? (selectedRegions[0]?.name ?? '지역 선택')
      : `${selectedRegions[0]?.name ?? '지역 선택'} 외 ${selectedRegions.length - 1}곳`;

  return (
    <>
      <header className="sticky top-0 z-10 flex flex-col gap-3 bg-bg-white-muted px-5 pb-2 pt-4">
        <FeedTopBar
          location={locationDisplayText}
          onLocationClick={() => setIsLocationSheetOpen(true)}
          onQrClick={() => setIsQrModalOpen(true)}
          showQr={isLoggedIn}
        />
        <div className="cursor-pointer" onClick={() => setIsSearchOpen(true)}>
          <SearchBar
            value={searchInput}
            onClear={() => {
              setSearchInput('');
              setIsSearchOpen(true);
            }}
          />
        </div>
        <FilterBar
          activeFilter={activeFilter}
          onFilterChange={handleFilterChange}
        />
      </header>

      <div className="flex flex-col gap-4 px-5 pb-5">
        {isDisplayLoading ? (
          <FeedSkeletonList />
        ) : !isSearchMode && !hasSearchResult ? (
          <>
            <div className="flex flex-col items-center pt-6 pb-0">
              <div className="px-3 py-1 bg-surface-brand-lighter rounded-lg inline-flex justify-center items-center">
                <span className="text-center text-text-brand text-base font-bold font-pretendard leading-6">
                  해당 지역은 공구 준비중이에요
                </span>
              </div>
              <div className="mt-3 h-14 border-l-2 border-dashed border-surface-brand" />
              <div className="h-2 w-2 rounded-full bg-surface-brand" />
            </div>
            <div className="-mx-5 -mt-4 flex flex-col gap-4 rounded-t-3xl bg-bg-white px-5 pt-5 pb-5">
              <span className="heading-sm-bold text-text-basic font-pretendard">
                지금 인기 있는 공구 상품
              </span>
              {feeds.map((feed) => (
                <Link key={feed.id} href={`/item/${feed.id}`}>
                  <FeedCard {...feed} />
                </Link>
              ))}
            </div>
          </>
        ) : displayItems.length === 0 ? (
          <div className="flex flex-col gap-4">
            <EmptyState
              title={'원하시는 공구가\n아직 없어요'}
              description={
                '다른 검색어를 입력하거나\n공구 개설을 요청해보세요.'
              }
            />
            <GroupBuyRequestCard onRequest={handleOpenRequestSheet} />
          </div>
        ) : (
          <>
            {displayItems.map((feed) => (
              <Link key={feed.id} href={`/item/${feed.id}`}>
                <FeedCard {...feed} />
              </Link>
            ))}
            {isSearchMode &&
              searchAnalysis?.uiState ===
                ApiResponseSearchAnalysisDataUiState.RESULTS && (
                <>
                  {searchAnalysis.searchCase ===
                    ApiResponseSearchAnalysisDataSearchCase.PRODUCT_ONLY && (
                    <GroupBuyRequestCard
                      icon="/icons/search.svg"
                      title={`찾으시는 ${searchAnalysis.detectedProduct ?? searchKeyword} 공구가\n없나요?`}
                      onRequest={handleOpenRequestSheet}
                    />
                  )}
                  {searchAnalysis.searchCase ===
                    ApiResponseSearchAnalysisDataSearchCase.NEIGHBORHOOD_ONLY && (
                    <GroupBuyRequestCard
                      icon="/icons/search.svg"
                      title={`찾으시는 ${searchAnalysis.detectedRegion ?? searchKeyword} 공구가\n없나요?`}
                      onRequest={handleOpenRequestSheet}
                    />
                  )}
                  {searchAnalysis.searchCase ===
                    ApiResponseSearchAnalysisDataSearchCase.BOTH_DETECTED && (
                    <GroupBuyRequestCard
                      icon="/icons/search.svg"
                      title={`찾으시는 ${searchAnalysis.detectedProduct ?? searchKeyword} 공구가\n없나요?`}
                      onRequest={handleOpenRequestSheet}
                    />
                  )}
                  {searchAnalysis.searchCase ===
                    ApiResponseSearchAnalysisDataSearchCase.NONE_DETECTED && (
                    <GroupBuyRequestCard onRequest={handleOpenRequestSheet} />
                  )}
                </>
              )}
          </>
        )}

        <div ref={sentinelRef} className="h-1" />
        {isFetchingNextPage && <FeedSkeletonList />}
      </div>

      <LocationBottomSheet
        isOpen={isLocationSheetOpen}
        onClose={() => setIsLocationSheetOpen(false)}
        selectedRegions={selectedRegions}
        onApply={handleApplyLocation}
      />

      <SearchOverlay
        isOpen={isSearchOpen}
        onClose={handleCloseSearch}
        onSearch={handleSearch}
        inputValue={searchInput}
        onInputChange={setSearchInput}
        recentSearches={recentSearches}
        onRemoveRecent={removeRecentSearch}
        onClearRecent={clearRecentSearches}
      />

      {isLoggedIn && (
        <QrModal
          isOpen={isQrModalOpen}
          onClose={() => setIsQrModalOpen(false)}
          isPickupDay={isPickupDay}
          storeName={qrItem?.storeName ?? ''}
          pickupAddress={qrItem?.pickupLocation ?? ''}
          pickupTimeStart={
            qrItem
              ? formatPickupDateTime(qrItem.pickupDate, qrItem.pickupTimeStart)
              : ''
          }
          pickupTimeEnd={qrItem?.pickupTimeEnd ?? ''}
          qrCode={qrItem?.qrCode ?? ''}
          dDayText={dDayText}
          shakeEnabled={isEnabled}
          onShakeToggle={() => toggleShake()}
          onDetailClick={() => {
            if (qrItem) router.push(`/mypage/pickup/${qrItem.participationId}`);
          }}
        />
      )}
    </>
  );
}
