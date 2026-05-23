'use client';

import { useQueryClient } from '@tanstack/react-query';
import {
  useGetApiV1SearchRecent,
  getGetApiV1SearchRecentQueryKey,
  useDeleteApiV1SearchRecent,
  useDeleteApiV1SearchRecentKeyword,
} from '@/api/hooks/group-buy/group-buy';

type CachedResponse = {
  data: { success?: boolean; data?: unknown };
  status: number;
};

function patchKeywords(
  old: CachedResponse | undefined,
  updater: (keywords: string[]) => string[],
) {
  if (!old) return old;
  const inner = old.data?.data;
  const keywords = Array.isArray(inner) ? (inner as string[]) : [];
  return { ...old, data: { ...old.data, data: updater(keywords) } };
}

export function useRecentSearches() {
  const queryClient = useQueryClient();
  const queryKey = getGetApiV1SearchRecentQueryKey();

  const { data } = useGetApiV1SearchRecent();
  const recentSearches = (() => {
    if (data?.status !== 200) return [];
    const inner = data.data?.data;
    if (Array.isArray(inner))
      return (inner as string[]).filter(
        (k): k is string => typeof k === 'string',
      );
    return (inner?.keywords ?? [])
      .map((k) => k.keyword)
      .filter((k): k is string => !!k);
  })();

  const { mutate: clearAll } = useDeleteApiV1SearchRecent({
    mutation: {
      onMutate: async () => {
        await queryClient.cancelQueries({ queryKey });
        const previous = queryClient.getQueryData(queryKey);
        queryClient.setQueryData(queryKey, (old: CachedResponse | undefined) =>
          patchKeywords(old, () => []),
        );
        return { previous };
      },
      onError: (_err, _vars, context) => {
        queryClient.setQueryData(queryKey, context?.previous);
      },
      onSettled: () => queryClient.invalidateQueries({ queryKey }),
    },
  });

  const { mutate: removeOne } = useDeleteApiV1SearchRecentKeyword({
    mutation: {
      onMutate: async ({ keyword }) => {
        await queryClient.cancelQueries({ queryKey });
        const previous = queryClient.getQueryData(queryKey);
        queryClient.setQueryData(queryKey, (old: CachedResponse | undefined) =>
          patchKeywords(old, (keywords) =>
            keywords.filter((k) => k !== keyword),
          ),
        );
        return { previous };
      },
      onError: (_err, _vars, context) => {
        queryClient.setQueryData(queryKey, context?.previous);
      },
      onSettled: () => queryClient.invalidateQueries({ queryKey }),
    },
  });

  return {
    recentSearches,
    removeRecentSearch: (keyword: string) => removeOne({ keyword }),
    clearRecentSearches: () => clearAll(),
  };
}
