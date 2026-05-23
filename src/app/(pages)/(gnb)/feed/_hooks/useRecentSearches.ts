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

function patchKeywords(
  old: getApiV1SearchRecentResponseSuccess | undefined,
  updater: (keywords: string[]) => string[],
) {
  if (!old) return old;
  const keywords = (old.data?.data as string[]) ?? [];
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
    return (data.data?.data as string[]) ?? [];
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
