'use client';

import React, { useState } from 'react';
import {
  GetApiV1NotificationsCategory,
  NotificationListResponse,
  NotificationSection,
} from '@/api/generated/api.schemas';
import Header from '@/components/Header';
import { useRouter } from 'next/navigation';
import { Chip } from '@/components/Chip';
import { Button } from '@/components/Button';
import Image from 'next/image';
import NoticeItem from './NoticeItem';

type NoticeClientProps = {
  data: NotificationListResponse;
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

const NoticeClient = ({ data }: NoticeClientProps) => {
  console.log('알림 데이터:', data);
  const router = useRouter();
  const [filter, setFilter] = useState<NotificationsCategory>(
    GetApiV1NotificationsCategory.ALL,
  );

  const filteredItems = data.items.filter((item) =>
    filter === GetApiV1NotificationsCategory.ALL ? true : item.type === filter,
  );

  const todayItems = filteredItems.filter(
    (item) => item.section === NotificationSection.TODAY,
  );
  const yesterdayItems = filteredItems.filter(
    (item) => item.section === NotificationSection.YESTERDAY,
  );
  const olderItems = filteredItems.filter(
    (item) => item.section === NotificationSection.OLDER,
  );

  const isEmpty = filteredItems.length === 0;
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
      {isEmpty ? (
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
              <p className="whitespace-pre-line text-center body-md-semibold text-[#757575]">{`공구를 찜하거나 신청하면\n마감·픽업 일정을 알려드려요.`}</p>
            </div>
          </div>
          <Button fullWidth onClick={() => router.push('/feed')}>
            공구 둘러보기
          </Button>
        </div>
      ) : (
        <div className="flex flex-col h-dvh bg-bg-white-muted gap-g5">
          {(
            [
              { label: '오늘', items: todayItems },
              { label: '어제', items: yesterdayItems },
              { label: '이전', items: olderItems },
            ] as const
          )
            .filter(({ items }) => items.length > 0)
            .map(({ label, items }) => (
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
            ))}
        </div>
      )}
    </div>
  );
};

export default NoticeClient;
