import Image from 'next/image';
import React from 'react';
import { useRouter } from 'next/navigation';
import {
  NotificationDeeplinkType,
  NotificationItemResponse,
} from '@/api/generated/api.schemas';
import { formatNotificationTime } from '@/lib/notice';
import { usePatchApiV1NotificationsNotificationIdRead } from '@/api/hooks/notification/notification';
import { useQueryClient } from '@tanstack/react-query';

type NoticeItemProps = {
  item: NotificationItemResponse;
};

function resolveDeeplinkPath(
  deeplinkType: NotificationDeeplinkType,
  deeplinkParams: Record<string, string>,
): string {
  switch (deeplinkType) {
    case NotificationDeeplinkType.PICKUP_GUIDE:
      return `/mypage/pickup/${deeplinkParams.participationId}`; // 임시
    case NotificationDeeplinkType.GROUPBUY_DETAIL:
      return `/item/${deeplinkParams.groupBuyId}`;
    case NotificationDeeplinkType.MY_APPLYING:
      return `/mypage`; // 임시
    case NotificationDeeplinkType.REQUEST_STATUS:
      return `/request`;
  }
}

const NoticeItem = ({ item }: NoticeItemProps) => {
  const {
    id,
    title,
    body,
    isRead,
    occurredAt,
    section,
    deeplinkType,
    deeplinkParams,
  } = item;
  const router = useRouter();
  const queryClient = useQueryClient();
  const timeLabel = formatNotificationTime(occurredAt, section);
  const textColor = isRead ? 'text-text-subtle-inverse' : 'text-text-subtle';

  const { mutate: markAsRead } = usePatchApiV1NotificationsNotificationIdRead({
    mutation: {
      onSettled: () => {
        queryClient.invalidateQueries({ queryKey: ['/api/v1/notifications'] });
      },
    },
  });

  const handleClick = () => {
    const path = resolveDeeplinkPath(deeplinkType, deeplinkParams);
    if (!isRead) {
      markAsRead({ notificationId: id });
    }
    router.push(path);
  };

  return (
    <button
      className="px-p7 py-g4 flex gap-5.5 items-center border-b border-b-border-natural w-full cursor-pointer"
      onClick={handleClick}
    >
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
