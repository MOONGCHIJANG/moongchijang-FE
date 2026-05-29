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

  const updateUrlQuery = useCallback(
    (value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value) {
        params.set('q', value);
      } else {
        params.delete('q');
      }
      const search = params.toString();
      router.replace(search ? `${pathname}?${search}` : pathname, {
        scroll: false,
      });
    },
    [router, pathname, searchParams],
  );

  const handleQueryChange = useCallback(
    (value: string) => {
      setQuery(value);
      updateUrlQuery(value);
    },
    [updateUrlQuery],
  );

  const clearQueryFromUrl = useCallback(() => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete('q');
    const search = params.toString();
    router.replace(search ? `${pathname}?${search}` : pathname, {
      scroll: false,
    });
  }, [router, pathname, searchParams]);

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
