'use client';

import { useState, useEffect } from 'react';
import { getApiV1GroupBuys } from '@/api/generated/group-buy/group-buy';
import {
  GetApiV1GroupBuysFilter,
  type GroupBuyFeedItem,
} from '@/api/generated/api.schemas';
import { FilterId } from '../_components/FilterBar';

const FILTER_MAP: Record<FilterId, GetApiV1GroupBuysFilter> = {
  all: GetApiV1GroupBuysFilter.ALL,
  due: GetApiV1GroupBuysFilter.CLOSING_SOON,
  target: GetApiV1GroupBuysFilter.ALMOST_ACHIEVED,
};

export function useFeedList(activeFilter: FilterId) {
  const [feeds, setFeeds] = useState<GroupBuyFeedItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchFeeds = async () => {
      setIsLoading(true);
      try {
        const result = await getApiV1GroupBuys({
          filter: FILTER_MAP[activeFilter],
        });
        if (result.data?.data?.content) {
          setFeeds(result.data.data.content);
        }
      } catch (err) {
        setFeeds([]);
        setError(err instanceof Error ? err : new Error('Unknown error'));
      } finally {
        setIsLoading(false);
      }
    };

    fetchFeeds();
  }, [activeFilter]);

  return { feeds, isLoading, error };
}
