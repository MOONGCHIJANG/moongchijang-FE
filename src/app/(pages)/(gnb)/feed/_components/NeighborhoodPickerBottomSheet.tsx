'use client';

import { useState } from 'react';
import { Icon } from '@iconify/react';
import { BottomSheet } from '@/components/BottomSheet';
import { Button } from '@/components/Button';
import { cn } from '@/lib/utils';
import { NEIGHBORHOOD_REGIONS_DATA, type Region } from '@/constants/regions';

interface NeighborhoodPickerBottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  selectedRegion: Region | null;
  onSelect: (region: Region) => void;
}

const ALL_NEIGHBORHOODS = NEIGHBORHOOD_REGIONS_DATA.flatMap((city) =>
  city.regions.map((r) => ({ ...r, cityName: city.name })),
);

export const NeighborhoodPickerBottomSheet = ({
  isOpen,
  onClose,
  selectedRegion,
  onSelect,
}: NeighborhoodPickerBottomSheetProps) => {
  const [selectedCityType, setSelectedCityType] = useState(
    NEIGHBORHOOD_REGIONS_DATA[0].regionType,
  );
  const [searchQuery, setSearchQuery] = useState('');

  const isSearching = searchQuery.trim().length > 0;

  const filteredNeighborhoods = isSearching
    ? ALL_NEIGHBORHOODS.filter((r) => r.name.includes(searchQuery.trim()))
    : null;

  const currentCity =
    NEIGHBORHOOD_REGIONS_DATA.find((c) => c.regionType === selectedCityType) ??
    NEIGHBORHOOD_REGIONS_DATA[0];

  const handleSelect = (region: Region) => {
    onSelect(region);
    onClose();
  };

  return (
    <BottomSheet
      isOpen={isOpen}
      onClose={onClose}
      className="pb-0 overflow-hidden"
    >
      <div className="px-5 pt-6 pb-3">
        <h2 className="heading-lg-bold text-text-basic font-pretendard mb-4">
          동네 선택
        </h2>
        <div className="flex items-center gap-2 h-11 rounded-xl border border-border-default px-3 bg-surface-elevated">
          <Icon
            icon="mingcute:search-line"
            className="h-5 w-5 text-icon-tertiary shrink-0"
          />
          <input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="동네 검색"
            className="flex-1 body-sm-regular text-text-basic font-pretendard bg-transparent outline-none placeholder:text-text-disabled"
          />
          {searchQuery && (
            <button type="button" onClick={() => setSearchQuery('')}>
              <Icon
                icon="mingcute:close-circle-fill"
                className="h-5 w-5 text-icon-tertiary"
              />
            </button>
          )}
        </div>
      </div>

      {isSearching ? (
        <div className="h-[420px] overflow-y-auto px-5 scrollbar-hide">
          {filteredNeighborhoods!.length === 0 ? (
            <p className="py-10 text-center body-sm-regular text-text-disabled font-pretendard">
              검색 결과가 없어요
            </p>
          ) : (
            <div className="flex flex-col">
              {filteredNeighborhoods!.map((r) => (
                <button
                  key={`${r.districtType}-${r.name}`}
                  type="button"
                  onClick={() => handleSelect(r)}
                  className={cn(
                    'h-[52px] flex items-center justify-between px-4 rounded-2xl transition-colors body-sm-regular font-pretendard',
                    selectedRegion?.districtType === r.districtType &&
                      selectedRegion?.name === r.name
                      ? 'bg-primary-25 text-text-brand body-sm-bold'
                      : 'text-text-basic',
                  )}
                >
                  <span>{r.name}</span>
                  <span className="text-text-disabled caption-xs-regular">
                    {r.cityName}
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>
      ) : (
        <div className="flex h-[420px] border-t border-divider-light">
          <div className="h-full w-[110px] overflow-y-auto bg-surface-elevated scrollbar-hide">
            {NEIGHBORHOOD_REGIONS_DATA.map((city) => (
              <button
                key={city.regionType}
                type="button"
                onClick={() => setSelectedCityType(city.regionType)}
                className={cn(
                  'w-full h-[52px] flex items-center justify-center body-md-regular transition-all font-pretendard',
                  selectedCityType === city.regionType
                    ? 'bg-bg-white text-text-basic shadow-[inset_-2px_0_0_#FFF]'
                    : 'text-text-tertiary',
                )}
              >
                {city.name}
              </button>
            ))}
          </div>

          <div className="h-full flex-1 overflow-y-auto bg-bg-white px-4 scrollbar-hide">
            {currentCity.regions.map((region) => {
              const isSelected =
                selectedRegion?.districtType === region.districtType &&
                selectedRegion?.name === region.name;
              return (
                <div
                  key={`${region.districtType}-${region.name}`}
                  className="h-[52px] flex items-center"
                >
                  <button
                    type="button"
                    onClick={() => handleSelect(region)}
                    className={cn(
                      'flex w-full h-[42px] items-center justify-between px-4 rounded-2xl border transition-all font-pretendard',
                      isSelected
                        ? 'bg-primary-25 border-border-brand-lighter text-text-brand body-sm-bold'
                        : 'bg-transparent border-transparent text-text-basic body-sm-regular',
                    )}
                  >
                    <span>{region.name}</span>
                    {isSelected && (
                      <Icon
                        icon="material-symbols:check"
                        className="h-5 w-5 text-text-brand"
                      />
                    )}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}

      <div className="px-5 pt-4 pb-6 shadow-[0_-12px_30px_rgba(0,0,0,0.08)]">
        <Button fullWidth size="md" onClick={onClose}>
          닫기
        </Button>
      </div>
    </BottomSheet>
  );
};
