import Image from 'next/image';
import React from 'react';
import { NotificationItemResponse } from '@/api/generated/api.schemas';
import { formatNotificationTime } from '@/lib/notice';

type NoticeItemProps = {
  item: NotificationItemResponse;
};

const NoticeItem = ({ item }: NoticeItemProps) => {
  const { title, body, isRead, occurredAt, section } = item;
  const timeLabel = formatNotificationTime(occurredAt, section);
  const textColor = isRead ? 'text-text-subtle-inverse' : 'text-text-subtle';

  return (
    <button className="px-p7 py-g4 flex gap-5.5 items-center border-b border-b-border-natural w-full">
      <Image
        src="/icons/notifications/store.svg"
        alt="store"
        width={20}
        height={20}
      />
      <div className="flex flex-1">
        <div className="flex flex-col gap-g3 flex-1 items-start">
          <p className={`${textColor} body-md-semibold`}>{title}</p>
          <p
            className={`${textColor} caption-sm-regular line-clamp-2 text-left`}
          >
            {body}
          </p>
        </div>
        <p className="text-text-subtle-inverse caption-sm-regular min-w-15 text-right">
          {timeLabel}
        </p>
      </div>
    </button>
  );
};

export default NoticeItem;
