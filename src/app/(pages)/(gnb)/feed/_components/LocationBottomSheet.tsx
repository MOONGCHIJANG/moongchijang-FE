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
          <h2 className="heading-lg-bold text-text-basic font-pretendard">
            관심 지역 설정
          </h2>
        </div>
      </div>

      <p className="px-5 caption-sm-bold text-text-disabled mb-5 font-pretendard">
        설정하신 지역 기반으로 공구 상품을 추천해드려요.
      </p>

      <div className="flex h-[500px] items-start border-t border-divider-light">
        <div className="h-full w-[110px] overflow-y-auto bg-surface-elevated pb-[180px] scrollbar-hide">
          {REGIONS_DATA.map((city) => {
            const isActive = selectedCityId === city.id;
            return (
              <button
                key={city.id}
                onClick={() => setSelectedCityId(city.id)}
                className={cn(
                  'w-full h-[52px] flex items-center justify-center body-md-regular transition-all font-pretendard',
                  isActive
                    ? 'bg-bg-white text-text-basic shadow-[inset_-2px_0_0_#FFF]'
                    : 'text-text-tertiary',
                )}
              >
                {city.name}
              </button>
            );
          })}
        </div>

        <div className="h-full flex-1 overflow-y-auto bg-bg-white px-4 pb-[180px] scrollbar-hide">
          <div className="flex flex-col gap-1.5">
            {currentCity.regions.map((region) => {
              const isSelected = tempSelectedRegions.some(
                (r) => r.id === region.id,
              );
              return (
                <button
                  key={region.id}
                  onClick={() => handleRegionClick(region)}
                  className={cn(
                    'flex w-full h-[42px] items-center justify-between px-4 transition-all rounded-2xl font-pretendard border',
                    isSelected
                      ? 'bg-primary-25! border-border-brand-lighter! text-text-brand! body-sm-bold'
                      : 'bg-transparent border-transparent text-text-basic body-sm-regular hover:bg-surface-default',
                  )}
                >
                  <span
                    className={
                      isSelected ? 'text-text-brand!' : 'text-text-basic'
                    }
                  >
                    {region.name}
                  </span>
                  {isSelected && (
                    <span className="text-[11px] font-bold text-text-brand! ml-1">
                      <Icon icon="material-symbols:check" className="h-5 w-5" />
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 w-full bg-white px-5 pt-6 pb-6 flex flex-col gap-3 shadow-[0_-12px_30px_rgba(0,0,0,0.08)]">
        <div className="flex items-center justify-between font-pretendard">
          <div className="flex items-center gap-1.5">
            <span className="body-md-bold text-text-subtle">선택한 곳</span>
            <span className="body-md-bold text-text-subtle">
              {tempSelectedRegions.length}
            </span>
            <span className="body-md-bold text-text-disabled">/ 10</span>
          </div>
          <button
            onClick={() => setTempSelectedRegions([])}
            className="flex items-center gap-1 body-md-medium text-icon-disabled hover:text-text-disabled transition-colors"
          >
            <Icon icon="solar:restart-linear" className="h-4 w-4" />
            <span className="body-md-bold text-text-disabled">초기화</span>
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
            <div className="body-md-medium text-text-subtle-inverse py-1 font-pretendard">
              지역을 선택해주세요.
            </div>
          )}
        </div>
        <Button
          fullWidth
          size="md"
          onClick={() => onApply(tempSelectedRegions)}
          disabled={tempSelectedRegions.length === 0}
        >
          적용하기
        </Button>
      </div>
    </BottomSheet>
  );
};
