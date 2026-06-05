'use client';

import { useState, useEffect, useLayoutEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useQueryClient } from '@tanstack/react-query';
import { Icon } from '@iconify/react';
import Header from '@/components/Header';
import Toast from '@/app/(pages)/item/[groupBuyId]/_components/Toast';
import { Chip } from '@/components/Chip';
import { EmptyState } from '@/app/(pages)/(gnb)/feed/_components/EmptyState';
import Footer from '@/components/Footer';
import { WishlistCard } from './WishlistCard';
import { useWishlistList } from '../_hooks/useWishlistList';
import { useDeleteApiV1GroupBuysGroupBuyIdWishlist } from '@/api/hooks/wishlist/wishlist';
import {
  GetApiV1WishlistsFilter,
  GetApiV1WishlistsSort,
} from '@/api/generated/api.schemas';
import { logEvent } from '@/lib/analytics';
import { useAuthStore } from '@/store/authStore';

type WishlistFilter =
  (typeof GetApiV1WishlistsFilter)[keyof typeof GetApiV1WishlistsFilter];
type WishlistSort =
  (typeof GetApiV1WishlistsSort)[keyof typeof GetApiV1WishlistsSort];

const FILTER_TABS: { label: string; value: WishlistFilter }[] = [
  { label: '전체', value: GetApiV1WishlistsFilter.ALL },
  { label: '모집중', value: GetApiV1WishlistsFilter.OPEN },
  { label: '마감임박', value: GetApiV1WishlistsFilter.CLOSING_SOON },
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
  const { isLoggedIn, isInitialized } = useAuthStore();

  if (!isInitialized) return null;

  if (!isLoggedIn) {
    return (
      <div className="flex flex-col h-full min-h-[calc(100dvh-58px)]">
        <Header text="찜" showBackButton={false} />
        <div className="flex-1 flex flex-col items-center justify-center pb-[58px]">
          <div className="flex flex-col items-center gap-g4">
            <Image
              src="/icons/moongchinyang.svg"
              alt=""
              width={51}
              height={65}
              className="mb-g4 w-20 h-25"
            />
            <span className="heading-md-semibold text-text-basic">
              찜한 상품을 확인하려면&#160;
              <Link href="/login" className="text-brand-primary">
                로그인
              </Link>
              이 필요해요🥐
            </span>
          </div>
        </div>
      </div>
    );
  }

  return <FavoriteListContent />;
}

function FavoriteListContent() {
  const queryClient = useQueryClient();
  const [filter, setFilter] = useState<WishlistFilter>(
    GetApiV1WishlistsFilter.ALL,
  );
  const [sort, setSort] = useState<WishlistSort>(GetApiV1WishlistsSort.LATEST);
  const [excludeClosed, setExcludeClosed] = useState(false);
  const sentinelRef = useRef<HTMLDivElement>(null);

  const {
    items,
    isLoading,
    totalElements,
    urgentCount,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useWishlistList(filter, sort, excludeClosed);

  const scrollStateRef = useRef({ hasNextPage, isFetchingNextPage });
  useLayoutEffect(() => {
    scrollStateRef.current = { hasNextPage, isFetchingNextPage };
  });

  const hasFiredRef = useRef(false);
  useEffect(() => {
    if (!isLoading && !hasFiredRef.current) {
      logEvent('wishlist_view', { item_count: totalElements });
      hasFiredRef.current = true;
    }
  }, [isLoading, totalElements]);

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
      },
    },
  });

  return (
    <div className="flex flex-col h-full">
      <Header text="찜" showBackButton={false} />

      <div className="flex-1 overflow-y-auto flex flex-col">
        <div className="flex-1">
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

          {/* 마감 제외 · 정렬 */}
          <div className="flex items-center justify-between px-4 pb-3">
            {filter === GetApiV1WishlistsFilter.ALL ? (
              <button
                type="button"
                onClick={() => setExcludeClosed((prev) => !prev)}
                className="flex items-center gap-2"
              >
                <Icon
                  icon={
                    excludeClosed
                      ? 'material-symbols:radio-button-checked'
                      : 'material-symbols:radio-button-unchecked'
                  }
                  className={
                    excludeClosed
                      ? 'w-4 h-4 text-button-natural'
                      : 'w-4 h-4 text-icon-tertiary'
                  }
                />
                <span className="caption-sm-regular text-text-basic font-pretendard">
                  마감 제외
                </span>
              </button>
            ) : (
              <div />
            )}
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
            <div className="bg-bg-white overflow-hidden">
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
            <div className="bg-bg-white overflow-hidden pb-5">
              {items.map((item) => (
                <Link
                  key={item.groupBuyId}
                  href={`/item/${item.groupBuyId}`}
                  onClick={() =>
                    logEvent('wishlist_item_click', {
                      item_id: item.groupBuyId,
                      item_name: item.productName,
                    })
                  }
                >
                  <WishlistCard
                    {...item}
                    isRemoving={
                      isPending && removingVars?.groupBuyId === item.groupBuyId
                    }
                    onRemove={() =>
                      removeWishlist({ groupBuyId: item.groupBuyId })
                    }
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
        <Footer hasBottomSticky={false} />
      </div>

      {urgentCount > 0 && (
        <div className="fixed bottom-[74px] left-1/2 z-40 -translate-x-1/2 w-[calc(100%-32px)] max-w-[408px] flex justify-center">
          <Toast>
            마감까지 24시간 이내인 찜한 상품이 {urgentCount}개 있어요.
            서두르세요!
          </Toast>
        </div>
      )}
    </div>
  );
}
