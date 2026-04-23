'use client';

import { useState, useEffect } from 'react';
import { GNB, TabId } from '@/components/GNB';
import { FeedTopBar } from './FeedTopBar';
import { SearchBar } from './SearchBar';
import { FilterBar } from './FilterBar';
import { FeedCard } from './FeedCard';
import { LocationBottomSheet } from './LocationBottomSheet';
import { Feed, FilterId } from '../_types/feed';
import { REGIONS_DATA, Region } from '@/constants/regions';

// 추후 API로 대체될 목 데이터 (상수화)
const MOCK_DATA: Feed[] = [
  {
    id: 1,
    dDay: 'D-2',
    pickupDate: '04월 15일',
    storeName: '사이드템포',
    location: '성수동',
    currentParticipants: 36,
    maxParticipants: 50,
    title: '두바이쫀득쿠키 4개입',
    price: 18000,
    progress: 72,
  },
  {
    id: 2,
    dDay: 'D-7',
    pickupDate: '04월 30일',
    storeName: '오하다',
    location: '경북 구미시',
    currentParticipants: 36,
    maxParticipants: 50,
    title: '귀여운 동물빵 모음',
    price: 18000,
    progress: 72,
  },
];

export default function HomeClient() {
  const [activeTab, setActiveTab] = useState<TabId>('feed');
  const [activeFilter, setActiveFilter] = useState<FilterId>('all');
  const [feeds, setFeeds] = useState<Feed[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [isLocationSheetOpen, setIsLocationSheetOpen] = useState(false);
  const [selectedRegions, setSelectedRegions] = useState<Region[]>([
    REGIONS_DATA[0].regions[0],
  ]);

  useEffect(() => {
    const fetchFeeds = async () => {
      setIsLoading(true);
      try {
        await new Promise((resolve) => setTimeout(resolve, 500));
        setFeeds(MOCK_DATA);
      } catch (error) {
        console.error('피드 데이터를 가져오는 데 실패했습니다:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (activeTab === 'feed') {
      fetchFeeds();
    }
  }, [activeTab, selectedRegions]);

  const handleApplyLocation = (newRegions: Region[]) => {
    const finalRegions =
      newRegions.length > 0 ? newRegions : [REGIONS_DATA[0].regions[0]];
    setSelectedRegions(finalRegions);
    setIsLocationSheetOpen(false);
  };

  const locationDisplayText =
    selectedRegions.length === 1
      ? selectedRegions[0].name
      : `${selectedRegions[0].name} 외 ${selectedRegions.length - 1}곳`;

  const renderHeader = () => {
    if (activeTab !== 'feed') return null;

    return (
      <header className="sticky top-0 z-50 flex flex-col gap-3 bg-surface-default px-5 pb-4 pt-2">
        <FeedTopBar
          location={locationDisplayText}
          onLocationClick={() => setIsLocationSheetOpen(true)}
        />
        <SearchBar onSearch={(value) => console.log('검색어:', value)} />
        <FilterBar
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
        />
      </header>
    );
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'feed':
        if (isLoading) {
          return (
            <div className="flex h-[300px] items-center justify-center text-gray-400">
              데이터를 불러오는 중입니다...
            </div>
          );
        }

        return (
          <div className="flex flex-col gap-4 px-5 pb-5">
            {feeds.map((feed) => (
              <FeedCard key={feed.id} {...feed} />
            ))}
          </div>
        );

      default:
        return (
          <div className="flex flex-1 items-center justify-center text-gray-400">
            {activeTab} 컨텐츠 준비 중
          </div>
        );
    }
  };

  return (
    <div className="mx-auto flex h-screen w-[393px] flex-col overflow-hidden bg-surface-default">
      {renderHeader()}
      <main className="flex-1 overflow-y-auto pb-[84px]">
        {renderContent()}
      </main>
      <footer className="fixed bottom-0 z-50 w-[393px]">
        <GNB activeTab={activeTab} onTabChange={setActiveTab} />
      </footer>

      <LocationBottomSheet
        isOpen={isLocationSheetOpen}
        onClose={() => setIsLocationSheetOpen(false)}
        selectedRegions={selectedRegions}
        onApply={handleApplyLocation}
      />
    </div>
  );
}
