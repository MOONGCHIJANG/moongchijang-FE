'use client';

import { useQueryClient } from '@tanstack/react-query';
import {
  useGetApiV1SearchRecent,
  getGetApiV1SearchRecentQueryKey,
  useDeleteApiV1SearchRecent,
  useDeleteApiV1SearchRecentKeyword,
} from '@/api/hooks/group-buy/group-buy';

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

  return {
    recentSearches,
    removeRecentSearch: (keyword: string) => removeOne({ keyword }),
    clearRecentSearches: () => clearAll(),
  };
}
