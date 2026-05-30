'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { getApiV1StoresSearch } from '@/api/generated/group-buy-request/group-buy-request';
import { type ApiResponseStoreSearchListDataStoresItem } from '@/api/generated/api.schemas';
import { logEvent } from '@/lib/analytics';

interface UseStoreSearchReturn {
  query: string;
  results: ApiResponseStoreSearchListDataStoresItem[];
  isLoading: boolean;
  handleQueryChange: (value: string) => void;
  clearQueryFromUrl: () => void;
}

export const useStoreSearch = (): UseStoreSearchReturn => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [query, setQuery] = useState(searchParams.get('q') ?? '');
  const [results, setResults] = useState<
    ApiResponseStoreSearchListDataStoresItem[]
  >([]);
  const [isLoading, setIsLoading] = useState(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastFetchedQuery = useRef('');
  // ref로 최신 searchParams를 유지해 콜백 deps에서 searchParams 제거
  const searchParamsRef = useRef(searchParams);
  useEffect(() => {
    searchParamsRef.current = searchParams;
  }, [searchParams]);

  const replaceUrlParam = useCallback(
    (key: string, value: string | null) => {
      const params = new URLSearchParams(searchParamsRef.current.toString());
      if (value !== null) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
      const search = params.toString();
      router.replace(search ? `${pathname}?${search}` : pathname, {
        scroll: false,
      });
    },
    [router, pathname],
  );

  const handleQueryChange = useCallback(
    (value: string) => {
      setQuery(value);
      replaceUrlParam('q', value || null);
    },
    [replaceUrlParam],
  );

  const clearQueryFromUrl = useCallback(
    () => replaceUrlParam('q', null),
    [replaceUrlParam],
  );

  useEffect(() => {
    if (!query.trim()) {
      lastFetchedQuery.current = '';
      setResults([]);
      return;
    }

    if (query.trim() === lastFetchedQuery.current) return;

    if (debounceRef.current) clearTimeout(debounceRef.current);

    const controller = new AbortController();

    debounceRef.current = setTimeout(async () => {
      setIsLoading(true);
      try {
        const res = await getApiV1StoresSearch(
          { keyword: query.trim() },
          { signal: controller.signal },
        );
        if (res.status === 200) {
          const stores = res.data.data?.stores ?? [];
          lastFetchedQuery.current = query.trim();
          setResults(stores);
          logEvent('groupbuy_request_search', {
            query_length: query.trim().length,
            result_count: stores.length,
          });
        }
      } catch (err) {
        if (err instanceof Error && err.name !== 'AbortError') {
          console.error(err);
        }
      } finally {
        setIsLoading(false);
      }
    }, 300);

    return () => {
      controller.abort();
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [query]);

  return { query, results, isLoading, handleQueryChange, clearQueryFromUrl };
};
