'use client';

import { useState, useEffect } from 'react';
import { Icon } from '@iconify/react';
import { REGIONS_DATA, Region } from '@/constants/regions';
import { cn } from '@/lib/utils';
import { Button } from '@/components/Button';
import { BottomSheet } from '@/components/BottomSheet';
import { Badge } from '@/components/Badge';

interface LocationBottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  selectedRegions: Region[];
  onApply: (regions: Region[]) => void;
}

export const LocationBottomSheet = ({
  isOpen,
  onClose,
  selectedRegions: initialSelectedRegions,
  onApply,
}: LocationBottomSheetProps) => {
  const [selectedCityId, setSelectedCityId] = useState<string>(
    REGIONS_DATA[1].id,
  );
  const [tempSelectedRegions, setTempSelectedRegions] = useState<Region[]>(
    initialSelectedRegions,
  );
  useEffect(() => {
    if (isOpen) setTempSelectedRegions(initialSelectedRegions);
    // initialSelectedRegions는 isOpen=true일 때만 읽어야 해서 의도적으로 제외
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  const currentCity =
    REGIONS_DATA.find((city) => city.id === selectedCityId) || REGIONS_DATA[0];

  const handleRegionClick = (region: Region) => {
    const isSelected = tempSelectedRegions.some((r) => r.id === region.id);
    if (isSelected) {
      setTempSelectedRegions(
        tempSelectedRegions.filter((r) => r.id !== region.id),
      );
    } else {
      if (tempSelectedRegions.length < 10) {
        setTempSelectedRegions([...tempSelectedRegions, region]);
      }
    }
  };

  return (
    <BottomSheet
      isOpen={isOpen}
      onClose={onClose}
      className="pb-0 overflow-hidden"
    >
      <div className="flex items-center justify-between px-5 pt-6 pb-2">
        <div className="flex items-center gap-2">
          <h2 className="text-heading-md-bold text-gray-900 font-pretendard">
            관심 지역 설정
          </h2>
        </div>
        <button
          onClick={onClose}
          className="p-1 hover:opacity-70 transition-opacity"
        >
          <Icon
            icon="material-symbols-light:close"
            className="h-8 w-8 text-gray-400"
          />
        </button>
      </div>

      <p className="px-5 text-body-sm-regular text-gray-400 mb-5 font-pretendard">
        설정하신 지역 기반으로 공구 상품을 추천해드려요.
      </p>

      <div className="flex h-[500px] border-t border-gray-50 pb-[172px]">
        <div className="w-[110px] overflow-y-auto bg-gray-25 scrollbar-hide">
          {REGIONS_DATA.map((city) => {
            const isActive = selectedCityId === city.id;
            return (
              <button
                key={city.id}
                onClick={() => setSelectedCityId(city.id)}
                className={cn(
                  'w-full h-[52px] flex items-center justify-center text-body-md-medium transition-all font-pretendard',
                  isActive
                    ? 'bg-white text-gray-900 font-normal shadow-[inset_-2px_0_0_#FFF]'
                    : 'text-gray-500 font-normal',
                )}
              >
                {city.name}
              </button>
            );
          })}
        </div>

        <div className="flex-1 overflow-y-auto px-4 pt-3 bg-white scrollbar-hide">
          {currentCity.regions.map((region) => {
            const isSelected = tempSelectedRegions.some(
              (r) => r.id === region.id,
            );
            return (
              <button
                key={region.id}
                onClick={() => handleRegionClick(region)}
                className={cn(
                  'flex w-full h-[42px] items-center justify-between px-3 transition-all rounded-lg mb-[9px] font-pretendard border',
                  isSelected
                    ? 'bg-primary-25! border-primary-50! text-primary-400! font-bold text-body-sm-regular'
                    : 'bg-transparent border-transparent text-gray-900 font-normal text-body-sm-regular hover:bg-gray-50',
                )}
              >
                <span
                  className={isSelected ? 'text-primary-400!' : 'text-gray-900'}
                >
                  {region.name}
                </span>
                {isSelected && (
                  <span className="text-[11px] font-bold text-primary-400! ml-1">
                    1
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      <div className="absolute bottom-0 left-0 w-full bg-white px-5 pt-6 pb-6 flex flex-col gap-3 shadow-[0_-12px_30px_rgba(0,0,0,0.08)]">
        <div className="flex items-center justify-between font-pretendard">
          <div className="flex items-center gap-1.5">
            <span className="text-body-sm-medium text-gray-700">선택한 곳</span>
            <span className="text-body-sm-bold text-gray-700">
              {tempSelectedRegions.length}/10
            </span>
          </div>
          <button
            onClick={() => setTempSelectedRegions([])}
            className="flex items-center gap-1 text-caption-md-medium text-gray-300 hover:text-gray-400 transition-colors"
          >
            <Icon icon="solar:restart-linear" className="h-4 w-4" />
            <span>초기화</span>
          </button>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide min-h-[32px]">
          {tempSelectedRegions.length > 0 ? (
            tempSelectedRegions.map((region) => (
              <Badge
                key={region.id}
                label={region.name}
                onDelete={() =>
                  setTempSelectedRegions((prev) =>
                    prev.filter((r) => r.id !== region.id),
                  )
                }
                className="whitespace-nowrap"
              />
            ))
          ) : (
            <div className="text-caption-md-regular text-gray-200 py-1 font-pretendard">
              지역을 선택해주세요.
            </div>
          )}
        </div>

        <Button
          fullWidth
          size="xl"
          onClick={() => onApply(tempSelectedRegions)}
          className="text-white font-bold text-[16px] h-12 shadow-none"
          disabled={tempSelectedRegions.length === 0}
        >
          적용하기
        </Button>
      </div>
    </BottomSheet>
  );
};
