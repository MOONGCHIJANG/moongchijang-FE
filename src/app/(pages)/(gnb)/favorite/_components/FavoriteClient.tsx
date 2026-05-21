'use client';

import { useState, useEffect, useLayoutEffect, useRef } from 'react';
import Link from 'next/link';
import { useQueryClient } from '@tanstack/react-query';
import { Icon } from '@iconify/react';
import Header from '@/components/Header';
import { ToastBlack } from '@/components/ToastBlack';
import Toast from '@/app/(pages)/item/[groupBuyId]/_components/Toast';
import { Chip } from '@/components/Chip';
import { EmptyState } from '@/app/(pages)/(gnb)/feed/_components/EmptyState';
import { WishlistCard } from './WishlistCard';
import { useWishlistList } from '../_hooks/useWishlistList';
import { useDeleteApiV1GroupBuysGroupBuyIdWishlist } from '@/api/hooks/wishlist/wishlist';
import {
  GetApiV1WishlistsFilter,
  GetApiV1WishlistsSort,
} from '@/api/generated/api.schemas';

type WishlistFilter =
  (typeof GetApiV1WishlistsFilter)[keyof typeof GetApiV1WishlistsFilter];
type WishlistSort =
  (typeof GetApiV1WishlistsSort)[keyof typeof GetApiV1WishlistsSort];

const FILTER_TABS: { label: string; value: WishlistFilter }[] = [
  { label: '전체', value: GetApiV1WishlistsFilter.ALL },
  { label: '모집중', value: GetApiV1WishlistsFilter.OPEN },
  { label: '마감임박', value: GetApiV1WishlistsFilter.CLOSING_SOON },
  { label: '마감', value: GetApiV1WishlistsFilter.CLOSED },
];

const WishlistSkeleton = () => (
  <div className="flex gap-3 px-4 py-3 bg-bg-white border-b border-border-default">
    <div className="w-[109px] h-[109px] rounded-xl animate-pulse bg-gray-200 shrink-0" />
    <div className="flex flex-1 flex-col justify-between py-0.5">
      <div className="h-3.5 w-28 rounded animate-pulse bg-gray-200" />
      <div className="h-[26px] w-36 rounded animate-pulse bg-gray-200" />
      <div className="h-[26px] w-24 rounded animate-pulse bg-gray-200" />
      <div className="h-1.5 rounded-full animate-pulse bg-gray-200" />
    </div>
  </div>
);

export function FavoriteClient() {
  const queryClient = useQueryClient();
  const [filter, setFilter] = useState<WishlistFilter>(
    GetApiV1WishlistsFilter.ALL,
  );
  const [sort, setSort] = useState<WishlistSort>(GetApiV1WishlistsSort.LATEST);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const toastTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const sentinelRef = useRef<HTMLDivElement>(null);

  const showToast = (message: string) => {
    if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    setToastMessage(message);
    toastTimerRef.current = setTimeout(() => setToastMessage(null), 3000);
  };

  useEffect(() => {
    return () => {
      if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    };
  }, []);

  const {
    items,
    isLoading,
    totalElements,
    urgentCount,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useWishlistList(filter, sort);

  const scrollStateRef = useRef({ hasNextPage, isFetchingNextPage });
  useLayoutEffect(() => {
    scrollStateRef.current = { hasNextPage, isFetchingNextPage };
  });

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const { hasNextPage, isFetchingNextPage } = scrollStateRef.current;
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 0.1 },
    );
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [fetchNextPage]);

  const {
    mutate: removeWishlist,
    variables: removingVars,
    isPending,
  } = useDeleteApiV1GroupBuysGroupBuyIdWishlist({
    mutation: {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['/api/v1/wishlists'] });
        showToast('찜이 해제되었어요');
      },
      onError: () => {
        showToast('찜 해제에 실패했어요');
      },
    },
  });

  return (
    <div className="flex flex-col h-full">
      <Header text="찜" showBackButton={false} />

      <div className="flex-1 overflow-y-auto bg-[#F9F9FA]">
        {/* 필터 탭 */}
        <div className="flex gap-2 px-4 pt-4 pb-2">
          {FILTER_TABS.map(({ label, value }) => (
            <Chip
              key={value}
              label={
                filter === value && totalElements > 0
                  ? `${label}(${totalElements})`
                  : label
              }
              active={filter === value}
              onClick={() => setFilter(value)}
            />
          ))}
        </div>

        {/* 정렬 */}
        <div className="flex items-center justify-end px-4 pb-3">
          <button
            type="button"
            onClick={() =>
              setSort((prev) =>
                prev === GetApiV1WishlistsSort.LATEST
                  ? GetApiV1WishlistsSort.DEADLINE
                  : GetApiV1WishlistsSort.LATEST,
              )
            }
            className="flex items-center gap-1 caption-sm-regular text-text-basic font-pretendard"
          >
            <span>
              {sort === GetApiV1WishlistsSort.DEADLINE
                ? '마감임박순'
                : '최신순'}
            </span>
            <Icon
              icon="pepicons-pencil:down-up"
              className="w-4 h-4 text-icon-basic"
            />
          </button>
        </div>

        {/* 목록 */}
        {isLoading ? (
          <div className="bg-bg-white rounded-t-3xl overflow-hidden">
            {Array.from({ length: 4 }, (_, i) => (
              <WishlistSkeleton key={i} />
            ))}
          </div>
        ) : items.length === 0 ? (
          <EmptyState
            title={'찜한 공구가 없어요'}
            description={'마음에 드는 공구를 찜해보세요!'}
          />
        ) : (
          <div className="bg-bg-white rounded-t-3xl overflow-hidden pb-5">
            {items.map((item) => (
              <Link key={item.id} href={`/item/${item.id}`}>
                <WishlistCard
                  {...item}
                  isRemoving={isPending && removingVars?.groupBuyId === item.id}
                  onRemove={() => removeWishlist({ groupBuyId: item.id })}
                />
              </Link>
            ))}
          </div>
        )}
        <div ref={sentinelRef} className="h-1" />
        {isFetchingNextPage && (
          <div className="bg-bg-white">
            <WishlistSkeleton />
          </div>
        )}
      </div>

      {urgentCount > 0 && (
        <div className="fixed bottom-[74px] left-1/2 z-40 -translate-x-1/2 w-[calc(100%-32px)] max-w-[408px] flex justify-center">
          <Toast>
            마감까지 24시간 이내인 찜한 상품이 {urgentCount}개 있어요.
            서두르세요!
          </Toast>
        </div>
      )}

      <div className="fixed bottom-[74px] left-1/2 z-50 -translate-x-1/2 w-[calc(100%-32px)] max-w-[408px] pointer-events-none">
        <ToastBlack isVisible={!!toastMessage} message={toastMessage ?? ''} />
      </div>
    </div>
  );
}
