'use client';

import { Icon } from '@iconify/react';
import { cn } from '@/lib/utils';
import { type ApiResponseStoreSearchListDataStoresItem } from '@/api/generated/api.schemas';
import { logEvent } from '@/lib/analytics';
import { useStoreSearch } from '../_hooks/useStoreSearch';

interface StoreSearchStepProps {
  onSelectStore: (store: Store) => void;
  onBack: () => void;
}

export interface Store {
  placeId: string | null;
  storeName: string;
  roadAddress: string;
  lotAddress?: string | null;
  latitude: number;
  longitude: number;
}

export const StoreSearchStep = ({
  onSelectStore,
  onBack,
}: StoreSearchStepProps) => {
  const { query, results, isLoading, handleQueryChange, clearQueryFromUrl } =
    useStoreSearch();

  const handleBack = () => {
    clearQueryFromUrl();
    onBack();
  };

  const handleSelect = (
    item: ApiResponseStoreSearchListDataStoresItem,
    position: number,
  ) => {
    if (
      !item.storeName ||
      !item.roadAddress ||
      item.latitude == null ||
      item.longitude == null
    )
      return;
    logEvent('groupbuy_request_store_select', {
      store_id: item.placeId ?? '',
      result_position: position,
      has_address: !!item.roadAddress,
    });
    onSelectStore({
      placeId: item.placeId ?? null,
      storeName: item.storeName,
      roadAddress: item.roadAddress,
      lotAddress: item.lotAddress,
      latitude: item.latitude,
      longitude: item.longitude,
    });
  };

  const showEmpty =
    !isLoading && query.trim().length > 0 && results.length === 0;

  return (
    <div className="flex flex-col min-h-full bg-white">
      <header className="flex flex-col border-b border-border-subtle shrink-0">
        <div style={{ height: 'env(safe-area-inset-top, 0px)' }} />
        <div className="flex items-center h-[57px] px-4 gap-[2px]">
          <button
            type="button"
            onClick={handleBack}
            className="flex items-center justify-center w-8 h-8"
            aria-label="뒤로가기"
          >
            <Icon
              icon="lucide:chevron-left"
              className="w-6 h-6 text-icon-basic"
            />
          </button>
          <span className="heading-sm-semibold text-text-basic">매장 검색</span>
        </div>
      </header>

      <div className="px-4 pt-5">
        <p className="heading-lg-semibold text-alpha-black-100 mb-5">
          매장 이름 또는 주소를 검색해주세요
        </p>
        <div className="flex items-center gap-2 px-3 py-4 bg-surface-default rounded-2xlarge">
          <Icon
            icon="lucide:search"
            className="w-4 h-4 text-icon-subtle shrink-0"
          />
          <input
            type="text"
            value={query}
            onChange={(e) => handleQueryChange(e.target.value)}
            placeholder="매장 이름 또는 주소 검색"
            className="w-full bg-transparent body-md-regular text-icon-basic placeholder:text-icon-disabled outline-none"
            autoFocus
            onFocus={() => logEvent('groupbuy_request_search_start', {})}
          />
          {query && (
            <button
              type="button"
              onClick={() => handleQueryChange('')}
              className={cn(
                'flex items-center justify-center w-4.5 h-4.5 text-icon-tertiary shrink-0',
              )}
              aria-label="검색어 지우기"
            >
              <Icon icon="solar:close-circle-bold" className="w-4.5 h-4.5" />
            </button>
          )}
        </div>
      </div>

      <div className="flex flex-col pt-5">
        {isLoading && (
          <div className="flex justify-center py-10">
            <Icon
              icon="lucide:loader-circle"
              className="w-6 h-6 text-text-brand animate-spin"
            />
          </div>
        )}

        {showEmpty && (
          <p className="body-md-regular text-text-tertiary text-center pt-10">
            검색 결과가 없어요.
          </p>
        )}

        {!isLoading && results.length > 0 && (
          <ul className="flex flex-col divide-y divide-border-subtle">
            {results.map((item, index) => (
              <li key={`${item.placeId}-${index}`}>
                <button
                  type="button"
                  onClick={() => handleSelect(item, index)}
                  className={cn(
                    'w-full flex flex-col gap-0.5 px-5 py-3 text-left',
                    'active:bg-surface-default',
                  )}
                >
                  <span className="body-md-regular text-text-basic">
                    {item.storeName ?? ''}
                  </span>
                  <span className="body-md-regular text-text-tertiary">
                    {item.roadAddress ?? ''}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};
