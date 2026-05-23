'use client';

import React, { useState } from 'react';
import {
  GetApiV1NotificationsCategory,
  NotificationPage,
} from '@/api/generated/api.schemas';
import Header from '@/components/Header';
import { useRouter } from 'next/navigation';
import { Chip } from '@/components/Chip';

type NoticeClientProps = {
  data: NotificationPage;
};

type NotificationsCategory =
  (typeof GetApiV1NotificationsCategory)[keyof typeof GetApiV1NotificationsCategory];

const FILTER_TABS: { label: string; value: GetApiV1NotificationsCategory }[] = [
  { label: '전체', value: GetApiV1NotificationsCategory.ALL },
  { label: '픽업', value: GetApiV1NotificationsCategory.PICKUP },
  { label: '공구 참여', value: GetApiV1NotificationsCategory.PARTICIPATION },
  { label: '공구 신청', value: GetApiV1NotificationsCategory.REQUEST },
  { label: '찜', value: GetApiV1NotificationsCategory.WISHLIST },
];

const NoticeClient = ({ data }: NoticeClientProps) => {
  const router = useRouter();
  const [filter, setFilter] = useState<NotificationsCategory>(
    GetApiV1NotificationsCategory.ALL,
  );

  const isEmpty = true; // TODO: 알림 리스트가 비어있는지 여부

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
      {isEmpty ? <></> : <></>}
    </div>
  );
};

export default NoticeClient;
