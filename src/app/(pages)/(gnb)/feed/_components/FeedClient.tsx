'use client';

import { useState, useCallback, useMemo, useEffect, useRef } from 'react';
import Link from 'next/link';
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
import { useFeedList } from '../_hooks/useFeedList';
import { useRecentSearches } from '../_hooks/useRecentSearches';

export function FeedClient() {
  const [activeFilter, setActiveFilter] = useState<FilterId>('all');
  const [isLocationSheetOpen, setIsLocationSheetOpen] = useState(false);
  const [selectedRegions, setSelectedRegions] = useState<Region[]>([
    REGIONS_DATA[0].regions[0],
  ]);
  const [isQrModalOpen, setIsQrModalOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState('');
  const {
    recentSearches,
    addRecentSearch,
    removeRecentSearch,
    clearRecentSearches,
  } = useRecentSearches();
  const isPickupDay = false;

  const sentinelRef = useRef<HTMLDivElement>(null);

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
  } = useFeedList(activeFilter, districts, searchKeyword);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage && hasSearchResult) {
          fetchNextPage();
        }
      },
      { threshold: 0.1 },
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [fetchNextPage, hasNextPage, isFetchingNextPage, hasSearchResult]);

  const handleSearch = (keyword: string) => {
    setSearchKeyword(keyword);
    addRecentSearch(keyword);
  };

  const handleRemoveRecent = (keyword: string) => {
    removeRecentSearch(keyword);
  };

  const handleClearRecent = () => {
    clearRecentSearches();
  };

  const handleShake = useCallback(() => {
    setIsQrModalOpen(true);
  }, []);

  const { isEnabled, toggleShake } = useShake(handleShake);

  const handleApplyLocation = (newRegions: Region[]) => {
    setSelectedRegions(
      newRegions.length > 0 ? newRegions : [REGIONS_DATA[0].regions[0]],
    );
    setIsLocationSheetOpen(false);
  };

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
        <div
          className="relative cursor-pointer"
          onClick={() => setIsSearchOpen(true)}
        >
          <SearchBar />
          <div className="absolute inset-0" />
        </div>
        <FilterBar
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
        />
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
        onClose={() => setIsSearchOpen(false)}
        onSearch={handleSearch}
        recentSearches={recentSearches}
        onRemoveRecent={handleRemoveRecent}
        onClearRecent={handleClearRecent}
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
