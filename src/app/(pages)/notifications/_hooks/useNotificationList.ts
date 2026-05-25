import { useInfiniteQuery } from '@tanstack/react-query';
import {
  GetApiV1NotificationsCategory,
  NotificationItemResponse,
} from '@/api/generated/api.schemas';
import { getApiV1Notifications } from '@/api/hooks/notification/notification';

interface UseNotificationListOptions {
  initialLimit?: number;
  limit?: number;
}

export function useNotificationList(
  category: GetApiV1NotificationsCategory,
  { initialLimit = 15, limit = 10 }: UseNotificationListOptions = {},
) {
  const {
    data,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isFetching,
  } = useInfiniteQuery({
    queryKey: ['/api/v1/notifications', { category, initialLimit, limit }],
    queryFn: async ({ pageParam }) => {
      const isFirstPage = pageParam === undefined;
      const res = await getApiV1Notifications({
        category,
        cursor: pageParam as string | undefined,
        limit: isFirstPage ? initialLimit : limit,
      });
      if (res.status !== 200) throw new Error(`HTTP ${res.status}`);
      return res.data.data;
    },
    initialPageParam: undefined as string | undefined,
    getNextPageParam: (lastPage) =>
      lastPage.hasNext ? (lastPage.nextCursor ?? undefined) : undefined,
  });

  const items: NotificationItemResponse[] =
    data?.pages.flatMap((page) => page.items) ?? [];

  return {
    items,
    isLoading,
    isFetching,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  };
}
