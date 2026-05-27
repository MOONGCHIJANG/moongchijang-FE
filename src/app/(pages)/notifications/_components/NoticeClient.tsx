'use client';

import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { logEvent } from '@/lib/analytics';
import {
  GetApiV1NotificationsCategory,
  NotificationItemResponse,
  NotificationListResponse,
  NotificationSection,
} from '@/api/generated/api.schemas';
import Header from '@/components/Header';
import { useRouter } from 'next/navigation';
import { Chip } from '@/components/Chip';
import { Button } from '@/components/Button';
import Image from 'next/image';
import NoticeItem from './NoticeItem';
import NoticeSkeleton from './NoticeSkeleton';
import { useNotificationList } from '../_hooks/useNotificationList';

type NoticeClientProps = {
  initialData: NotificationListResponse;
};

type NotificationsCategory =
  (typeof GetApiV1NotificationsCategory)[keyof typeof GetApiV1NotificationsCategory];

const FILTER_TABS: { label: string; value: GetApiV1NotificationsCategory }[] = [
  { label: '전체', value: GetApiV1NotificationsCategory.ALL },
  { label: '픽업', value: GetApiV1NotificationsCategory.PICKUP },
  { label: '공구 참여', value: GetApiV1NotificationsCategory.APPLY },
  { label: '공구 신청', value: GetApiV1NotificationsCategory.REQUEST },
  { label: '찜', value: GetApiV1NotificationsCategory.WISH },
];

function groupBySection(items: NotificationItemResponse[]) {
  return {
    today: items.filter((i) => i.section === NotificationSection.TODAY),
    yesterday: items.filter((i) => i.section === NotificationSection.YESTERDAY),
    older: items.filter((i) => i.section === NotificationSection.OLDER),
  };
}

const NoticeClient = ({ initialData }: NoticeClientProps) => {
  const router = useRouter();
  const sentinelRef = useRef<HTMLDivElement>(null);
  const [filter, setFilter] = useState<NotificationsCategory>(
    GetApiV1NotificationsCategory.ALL,
  );

  useEffect(() => {
    logEvent('notification_view', {});
  }, []);

  const {
    items,
    isLoading,
    isFetching,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useNotificationList(filter);

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

  const displayItems =
    filter === GetApiV1NotificationsCategory.ALL && isLoading
      ? initialData.items
      : items;

  const { today, yesterday, older } = groupBySection(displayItems);
  const isEmpty = displayItems.length === 0 && !isLoading;

  const showSkeleton = isLoading || (isFetching && !isFetchingNextPage);

  const SECTIONS = [
    { label: '오늘', items: today },
    { label: '어제', items: yesterday },
    { label: '이전', items: older },
  ] as const;

  return (
    <div>
      <Header text="알림" onBack={() => router.push('/feed')} />
      <div className="flex gap-g3 px-p6 py-p3">
        {FILTER_TABS.map(({ label, value }) => (
          <Chip
            key={value}
            label={label}
            active={filter === value}
            onClick={() => setFilter(value)}
          />
        ))}
      </div>
      {showSkeleton ? (
        <NoticeSkeleton />
      ) : isEmpty ? (
        <div className="px-7 flex flex-col gap-g9 items-center w-full pt-30">
          <div className="flex flex-col gap-3.25 items-center">
            <Image
              src="/images/group-buy-request-complete.svg"
              alt="알림 없음"
              width={110}
              height={72.5}
            />
            <div className="flex flex-col gap-g3 items-center">
              <p className="text-center heading-md-bold">아직 알림이 없어요</p>
              <p className="whitespace-pre-line text-center body-md-semibold text-[#757575]">
                {`공구를 찜하거나 신청하면\n마감·픽업 일정을 알려드려요.`}
              </p>
            </div>
          </div>
          <Button fullWidth onClick={() => router.push('/feed')}>
            공구 둘러보기
          </Button>
        </div>
      ) : (
        <div className="flex flex-col bg-bg-white-muted gap-g5">
          {SECTIONS.filter(({ items }) => items.length > 0).map(
            ({ label, items }) => (
              <div
                key={label}
                className="flex flex-col gap-1.25 pt-p5 bg-surface-white"
              >
                <p className="px-p6 caption-sm-regular text-text-subtle-inverse">
                  {label}
                </p>
                <div>
                  {items.map((item) => (
                    <NoticeItem key={item.id} item={item} />
                  ))}
                </div>
              </div>
            ),
          )}
        </div>
      )}
      <div ref={sentinelRef} className="h-1" />
      {isFetchingNextPage && <NoticeSkeleton count={3} />}
    </div>
  );
};

export default NoticeClient;
