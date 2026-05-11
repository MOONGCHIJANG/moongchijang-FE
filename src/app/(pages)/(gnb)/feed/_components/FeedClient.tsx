'use client';

import { useState, useCallback, useMemo, useEffect, useLayoutEffect, useRef } from 'react';
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
import { REGIONS_DATA, Region } from '@/constants/regions';
import { useShake } from '@/hooks/useShake';
import {
  usePostApiV1Search,
  getGetApiV1SearchRecentQueryKey,
} from '@/api/hooks/group-buy/group-buy';
import { useFeedList } from '../_hooks/useFeedList';
import { useRecentSearches } from '../_hooks/useRecentSearches';

const ALL_REGIONS = REGIONS_DATA.flatMap((city) => city.regions);
const VALID_FILTERS: FilterId[] = ['all', 'due', 'target'];
const DEFAULT_REGION = REGIONS_DATA[0].regions[0];

function filterFromParam(param: string | null): FilterId {
  return VALID_FILTERS.includes(param as FilterId) ? (param as FilterId) : 'all';
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
  const [searchInput, setSearchInput] = useState(() => searchParams.get('search') ?? '');
  const [searchKeyword, setSearchKeyword] = useState(() => searchParams.get('search') ?? '');

  const queryClient = useQueryClient();
  const { recentSearches, removeRecentSearch, clearRecentSearches } = useRecentSearches();
  const { mutate: executeSearch } = usePostApiV1Search({
    mutation: {
      onSuccess: () =>
        queryClient.invalidateQueries({ queryKey: getGetApiV1SearchRecentQueryKey() }),
    },
  });

  const isPickupDay = false;
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

  const { feeds, hasSearchResult, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useFeedList(activeFilter, districts, searchKeyword);

  // ref로 최신 scroll 상태 유지 → observer는 fetchNextPage가 바뀔 때만 재생성
  const scrollStateRef = useRef({ hasNextPage, isFetchingNextPage, hasSearchResult });
  useLayoutEffect(() => {
    scrollStateRef.current = { hasNextPage, isFetchingNextPage, hasSearchResult };
  });

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const { hasNextPage, isFetchingNextPage, hasSearchResult } = scrollStateRef.current;
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage && hasSearchResult) {
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
    executeSearch({ data: { keyword } });
  };

  const handleCloseSearch = () => {
    if (searchInput === '') {
      setSearchKeyword('');
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
        districtValues.length === 1 && districtValues[0] === DEFAULT_REGION.districtType
          ? null
          : districtValues,
    });
  };

  const handleShake = useCallback(() => {
    setIsQrModalOpen(true);
  }, []);

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
        <FilterBar activeFilter={activeFilter} onFilterChange={handleFilterChange} />
      </header>

      <div className="flex flex-col gap-4 px-5 pb-5">
        {isLoading ? (
          <FeedSkeletonList />
        ) : !hasSearchResult ? (
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
        ) : feeds.length === 0 ? (
          <div className="flex flex-1 items-center justify-center text-text-disabled">
            진행 중인 공구가 없습니다
          </div>
        ) : (
          feeds.map((feed) => (
            <Link key={feed.id} href={`/item/${feed.id}`}>
              <FeedCard {...feed} />
            </Link>
          ))
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

      <QrModal
        isOpen={isQrModalOpen}
        onClose={() => setIsQrModalOpen(false)}
        isPickupDay={isPickupDay}
        orderNumber="20260419245"
        pickupLocation="서울 성동구 성동로 32길, 사이드템포"
        pickupTime="4월 15일 (화) 14:00~18:00"
        storeName="밤티 말빵"
        qrValue="https://moongchijang.com/verify/20260419245"
        dDayText={isPickupDay ? 'D-day' : 'D-7'}
        shakeEnabled={isEnabled}
        onShakeToggle={toggleShake}
      />
    </>
  );
}
