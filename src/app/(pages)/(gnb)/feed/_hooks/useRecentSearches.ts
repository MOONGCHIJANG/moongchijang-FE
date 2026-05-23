'use client';

import { useMemo } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import {
  useGetApiV1SearchRecent,
  getGetApiV1SearchRecentQueryKey,
  useDeleteApiV1SearchRecent,
  useDeleteApiV1SearchRecentKeyword,
  type getApiV1SearchRecentResponseSuccess,
} from '@/api/hooks/group-buy/group-buy';

// TODO: 백엔드 Swagger 스펙이 string[] 로 확정되면 { keywords: [...] } 분기 제거
function patchKeywords(
  old: getApiV1SearchRecentResponseSuccess | undefined,
  updater: (keywords: string[]) => string[],
) {
  if (!old) return old;
  const inner = old.data?.data as unknown;
  const keywords: string[] = Array.isArray(inner)
    ? inner.filter((k): k is string => typeof k === 'string')
    : ((inner as { keywords?: { keyword: string }[] })?.keywords ?? [])
        .map((k) => k.keyword)
        .filter((k): k is string => !!k);
  return {
    ...old,
    data: { ...old.data, data: updater(keywords) as typeof old.data.data },
  };
}

export function useRecentSearches() {
  const queryClient = useQueryClient();
  const queryKey = getGetApiV1SearchRecentQueryKey();

  const { data } = useGetApiV1SearchRecent();
  const recentSearches = useMemo(() => {
    if (data?.status !== 200) return [];
    const inner = data.data?.data;
    if (Array.isArray(inner))
      return (inner as string[]).filter(
        (k): k is string => typeof k === 'string',
      );
    return (inner?.keywords ?? [])
      .map((k) => k.keyword)
      .filter((k): k is string => !!k);
  }, [data]);

  const { mutate: clearAll } = useDeleteApiV1SearchRecent({
    mutation: {
      onMutate: async () => {
        await queryClient.cancelQueries({ queryKey });
        const previous = queryClient.getQueryData(queryKey);
        queryClient.setQueryData(
          queryKey,
          (old: getApiV1SearchRecentResponseSuccess | undefined) =>
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
        queryClient.setQueryData(
          queryKey,
          (old: getApiV1SearchRecentResponseSuccess | undefined) =>
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
