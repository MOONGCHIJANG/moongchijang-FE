import Image from 'next/image';
import React from 'react';
import { useRouter } from 'next/navigation';
import {
  NotificationDeeplinkType,
  NotificationItemResponse,
} from '@/api/generated/api.schemas';
import {
  formatNotificationTime,
  resolveDeeplinkPath,
  resolveIcon,
} from '@/lib/notice';
import { usePatchApiV1NotificationsNotificationIdRead } from '@/api/hooks/notification/notification';
import { useQueryClient } from '@tanstack/react-query';
import { logEvent } from '@/lib/analytics';

function resolveNotificationType(
  deeplinkType: NotificationDeeplinkType,
): 'group_open' | 'pickup_reminder' | 'request_result' {
  if (deeplinkType === NotificationDeeplinkType.PICKUP_GUIDE)
    return 'pickup_reminder';
  if (deeplinkType === NotificationDeeplinkType.REQUEST_STATUS)
    return 'request_result';
  return 'group_open';
}

type NoticeItemProps = {
  item: NotificationItemResponse;
};

const NoticeItem = ({ item }: NoticeItemProps) => {
  const { id, title, body, isRead, occurredAt, section } = item;
  const router = useRouter();
  const queryClient = useQueryClient();
  const timeLabel = formatNotificationTime(occurredAt, section);
  const textColor = isRead ? 'text-text-subtle-inverse' : 'text-text-subtle';
  const icon = resolveIcon(item.triggerType, item.deeplinkType);

  const { mutate: markAsRead } = usePatchApiV1NotificationsNotificationIdRead({
    mutation: {
      onSettled: () => {
        queryClient.invalidateQueries({ queryKey: ['/api/v1/notifications'] });
      },
    },
  });

  const handleClick = () => {
    const path = resolveDeeplinkPath(
      item.triggerType,
      item.deeplinkType,
      item.deeplinkParams,
    );
    logEvent('notification_click', {
      notification_type: resolveNotificationType(item.deeplinkType),
    });
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
        src={`/icons/notifications/${icon}.svg`}
        alt={icon}
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
