'use client';

import { useMemo } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import {
  getApiV1Wishlists,
  getGetApiV1WishlistsQueryKey,
} from '@/api/hooks/wishlist/wishlist';
import {
  GetApiV1WishlistsFilter,
  GetApiV1WishlistsSort,
  type GroupBuyFeedItemResponse,
} from '@/api/generated/api.schemas';

const PAGE_SIZE = 20;

export function useWishlistList(
  filter: GetApiV1WishlistsFilter,
  sort: GetApiV1WishlistsSort,
) {
  const baseParams = useMemo(
    () => ({ filter, sort, size: PAGE_SIZE }),
    [filter, sort],
  );

  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: getGetApiV1WishlistsQueryKey(baseParams),
    queryFn: ({ pageParam, signal }) =>
      getApiV1Wishlists(
        { ...baseParams, page: pageParam as number },
        { signal },
      ),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const d = lastPage?.data?.data;
      if (!d) return undefined;
      // number는 0-based: 다음 1-based page = number + 2, 마지막 페이지이면 undefined
      return d.number + 1 < d.totalPages ? d.number + 2 : undefined;
    },
  });

  const items = useMemo<GroupBuyFeedItemResponse[]>(
    () => data?.pages.flatMap((page) => page?.data?.data?.content ?? []) ?? [],
    [data],
  );

  const firstPageData = data?.pages[0]?.data?.data;

  return {
    items,
    isLoading,
    isError,
    totalElements: firstPageData?.totalElements ?? 0,
    urgentCount: firstPageData?.urgentCount ?? 0,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  };
}
