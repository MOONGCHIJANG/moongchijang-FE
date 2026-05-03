'use client';

import { useState, useEffect, useRef } from 'react';
import { Icon } from '@iconify/react';
import { cn } from '@/lib/utils';
import { getApiV1StoresSearch } from '@/api/generated/group-buy-request/group-buy-request';
import { type ApiResponseStoreSearchListDataStoresItem } from '@/api/generated/api.schemas';
import { type Store } from './StoreSearchSheet';

interface StoreSearchStepProps {
  onSelectStore: (store: Store) => void;
  onBack: () => void;
}

export const StoreSearchStep = ({
  onSelectStore,
  onBack,
}: StoreSearchStepProps) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<
    ApiResponseStoreSearchListDataStoresItem[]
  >([]);
  const [isLoading, setIsLoading] = useState(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    if (debounceRef.current) clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(async () => {
      setIsLoading(true);
      try {
        const res = await getApiV1StoresSearch({ keyword: query.trim() });
        if (res.status === 200) {
          setResults(res.data.data?.stores ?? []);
        }
      } finally {
        setIsLoading(false);
      }
    }, 300);

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [query]);

  const handleSelect = (item: ApiResponseStoreSearchListDataStoresItem) => {
    if (!item.placeId || !item.storeName || !item.roadAddress) return;
    onSelectStore({
      placeId: item.placeId,
      storeName: item.storeName,
      roadAddress: item.roadAddress,
      lotAddress: item.lotAddress,
      latitude: item.latitude ?? 0,
      longitude: item.longitude ?? 0,
    });
  };

  const showEmpty =
    !isLoading && query.trim().length > 0 && results.length === 0;

  return (
    <div className="flex flex-col min-h-screen bg-white font-pretendard">
      <header className="flex items-center h-[57px] px-4 border-b border-gray-100 shrink-0 gap-[2px]">
        <button
          type="button"
          onClick={onBack}
          className="flex items-center justify-center w-8 h-8"
          aria-label="뒤로가기"
        >
          <Icon icon="lucide:chevron-left" className="w-6 h-6 text-gray-900" />
        </button>
        <span className="text-body-lg-semibold text-gray-900">매장 검색</span>
      </header>

      <div className="px-4 pt-5">
        <p className="text-heading-md-semibold text-gray-900 mb-5">
          매장 이름 또는 주소를 검색해주세요
        </p>
        <div className="flex items-center gap-2 px-3 py-4 bg-gray-50 rounded-xl">
          <Icon
            icon="lucide:search"
            className="w-4 h-4 text-gray-500 shrink-0"
          />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="매장 이름 또는 주소 검색"
            className="w-full bg-transparent text-body-sm-regular text-gray-700 placeholder:text-gray-300 outline-none font-pretendard"
            autoFocus
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery('')}
              className={cn(
                'flex items-center justify-center w-4 h-4 shrink-0',
                'text-gray-200',
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
              className="w-6 h-6 text-primary-400 animate-spin"
            />
          </div>
        )}

        {showEmpty && (
          <p className="text-body-lg-regular text-gray-300 text-center pt-10">
            검색 결과가 없어요.
          </p>
        )}

        {!isLoading && results.length > 0 && (
          <ul className="flex flex-col divide-y divide-gray-100">
            {results.map((item) => (
              <li key={item.placeId}>
                <button
                  type="button"
                  onClick={() => handleSelect(item)}
                  className={cn(
                    'w-full flex flex-col gap-0.5 px-5 py-3 text-left',
                    'active:bg-gray-50',
                  )}
                >
                  <span className="text-body-lg-regular text-gray-900">
                    {item.storeName ?? ''}
                  </span>
                  <span className="text-body-lg-regular text-gray-500">
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
