'use client';

import { useQueryClient } from '@tanstack/react-query';
import {
  useGetApiV1SearchRecent,
  getGetApiV1SearchRecentQueryKey,
  useDeleteApiV1SearchRecent,
  useDeleteApiV1SearchRecentKeyword,
  type getApiV1SearchRecentResponse,
} from '@/api/hooks/group-buy/group-buy';
import type { ApiResponseRecentSearchListDataKeywordsItem } from '@/api/generated/api.schemas';

// GET/DELETE recent 훅(Orval)을 조합; addRecentSearch는 setQueryData로 낙관적 업데이트
export function useRecentSearches() {
  const queryClient = useQueryClient();

  const { data } = useGetApiV1SearchRecent();
  const recentSearches = (
    data?.status === 200 ? (data.data?.data?.keywords ?? []) : []
  )
    .map((k) => k.keyword)
    .filter((k): k is string => !!k);

  const { mutate: clearAll } = useDeleteApiV1SearchRecent({
    mutation: {
      onSuccess: () =>
        queryClient.invalidateQueries({
          queryKey: getGetApiV1SearchRecentQueryKey(),
        }),
    },
  });

  const { mutate: removeOne } = useDeleteApiV1SearchRecentKeyword({
    mutation: {
      onSuccess: () =>
        queryClient.invalidateQueries({
          queryKey: getGetApiV1SearchRecentQueryKey(),
        }),
    },
  });

  // TODO: 백엔드가 검색 시 자동 저장하지 않는다면 POST API 연동 필요 (현재는 캐시만 업데이트)
  const addRecentSearch = (keyword: string) => {
    queryClient.setQueryData<getApiV1SearchRecentResponse>(
      getGetApiV1SearchRecentQueryKey(),
      (old) => {
        if (!old || old.status !== 200) return old;
        const prev = old.data?.data?.keywords ?? [];
        const next: ApiResponseRecentSearchListDataKeywordsItem[] = [
          { keyword },
          ...prev.filter((k) => k.keyword !== keyword),
        ].slice(0, 10);
        return {
          ...old,
          data: { ...old.data, data: { ...old.data?.data, keywords: next } },
        };
      },
    );
  };

  return {
    recentSearches,
    addRecentSearch,
    removeRecentSearch: (keyword: string) => removeOne({ keyword }),
    clearRecentSearches: () => clearAll(),
  };
}
