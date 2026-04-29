'use client';

import { useState, useCallback } from 'react';
import { FeedTopBar } from '../FeedTopBar';
import { SearchBar } from '../SearchBar';
import { FilterBar, FilterId } from '../FilterBar';
import { FeedCard } from '../FeedCard';
import { FeedSkeletonList } from '../FeedSkeleton';
import { LocationBottomSheet } from '../LocationBottomSheet';
import { QrModal } from '../QrModal';
import { REGIONS_DATA, Region } from '@/constants/regions';
import { useShake } from '@/hooks/useShake';
import { useFeedList } from '../../_hooks/useFeedList';

export function FeedTab() {
  const [activeFilter, setActiveFilter] = useState<FilterId>('all');
  const [isLocationSheetOpen, setIsLocationSheetOpen] = useState(false);
  const [selectedRegions, setSelectedRegions] = useState<Region[]>([
    REGIONS_DATA[0].regions[0],
  ]);
  const [isQrModalOpen, setIsQrModalOpen] = useState(false);
  const [isPickupDay] = useState(() => Math.random() < 0.5);

  const { feeds, isLoading } = useFeedList(activeFilter, 'feed');

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
      ? selectedRegions[0].name
      : `${selectedRegions[0].name} 외 ${selectedRegions.length - 1}곳`;

  return (
    <>
      <header className="sticky top-0 z-50 flex flex-col gap-3 bg-surface-default px-5 pb-4 pt-2">
        <FeedTopBar
          location={locationDisplayText}
          onLocationClick={() => setIsLocationSheetOpen(true)}
          onQrClick={() => setIsQrModalOpen(true)}
        />
        <SearchBar onSearch={(value) => console.log('검색어:', value)} />
        <FilterBar
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
        />
      </header>

      <div className="flex flex-col gap-4 px-5 pb-5">
        {isLoading ? (
          <FeedSkeletonList />
        ) : feeds.length === 0 ? (
          <div className="flex flex-1 items-center justify-center text-gray-400">
            진행 중인 공구가 없습니다
          </div>
        ) : (
          feeds.map((feed) => <FeedCard key={feed.id} {...feed} />)
        )}
      </div>

      <LocationBottomSheet
        isOpen={isLocationSheetOpen}
        onClose={() => setIsLocationSheetOpen(false)}
        selectedRegions={selectedRegions}
        onApply={handleApplyLocation}
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
