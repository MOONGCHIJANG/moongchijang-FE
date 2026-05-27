'use client';

import { useMemo } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import {
  getApiV1GroupBuys,
  getGetApiV1GroupBuysQueryKey,
} from '@/api/hooks/group-buy/group-buy';
import {
  GetApiV1GroupBuysFilter,
  GetApiV1GroupBuysParams,
  type ApiResponseGroupBuyFeedPageResponseData,
  type GroupBuyFeedItemResponse,
} from '@/api/generated/api.schemas';
import { FilterId } from '../_components/FilterBar';

const FILTER_MAP: Record<FilterId, GetApiV1GroupBuysFilter> = {
  all: GetApiV1GroupBuysFilter.ALL,
  due: GetApiV1GroupBuysFilter.CLOSING_SOON,
  target: GetApiV1GroupBuysFilter.ALMOST_ACHIEVED,
};

const PAGE_SIZE = 10;

type FeedPageData = ApiResponseGroupBuyFeedPageResponseData;

function extractPageData(
  page: Awaited<ReturnType<typeof getApiV1GroupBuys>> | undefined,
): FeedPageData | undefined {
  return page?.data?.data as FeedPageData | undefined;
}

// getApiV1GroupBuys(Orval fetch)를 useInfiniteQuery로 감싸 인피니티 스크롤 지원
export function useFeedList(
  activeFilter: FilterId,
  districts?: string[],
  options?: { enabled?: boolean },
) {
  const baseParams = useMemo(
    () =>
      ({
        filter: FILTER_MAP[activeFilter],
        size: PAGE_SIZE,
        ...(districts?.length ? { districts } : {}),
      }) as GetApiV1GroupBuysParams,
    [activeFilter, districts],
  );

  const {
    data,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: getGetApiV1GroupBuysQueryKey(baseParams),
    queryFn: ({ pageParam, signal }) =>
      getApiV1GroupBuys(
        { ...baseParams, page: pageParam as number },
        { signal },
      ),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const pageData = extractPageData(lastPage);
      return pageData?.hasNext ? pageData.page + 1 : undefined;
    },
    enabled: options?.enabled ?? true,
  });

  const feeds = useMemo<GroupBuyFeedItemResponse[]>(
    () =>
      data?.pages.flatMap((page) => extractPageData(page)?.content ?? []) ?? [],
    [data],
  );

  const hasSearchResult =
    extractPageData(data?.pages[0])?.hasRegionalResult ?? true;

  return {
    feeds,
    hasSearchResult,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  };
}
