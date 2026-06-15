'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useQueryClient } from '@tanstack/react-query';
import {
  NotificationItemResponse,
  NotificationTriggerType,
} from '@/api/generated/api.schemas';
import { formatNotificationTime, resolveIcon } from '@/lib/notice';
import { usePatchApiV1NotificationsNotificationIdRead } from '@/api/hooks/notification/notification';
import { Button } from '@/components/Button';

type Cta = { label: string } & (
  | { href: string; action?: never }
  | { action: 'qr'; href?: never }
);

const ICON_ALT: Partial<Record<NotificationTriggerType, string>> = {
  [NotificationTriggerType.OWNER_PICKUP_SAME_DAY_MORNING]: '오늘 픽업 알림',
  [NotificationTriggerType.OWNER_PICKUP_DAY_BEFORE_MORNING]: '내일 픽업 알림',
  [NotificationTriggerType.OWNER_GROUPBUY_ACHIEVED_IMMEDIATE]: '공구 확정 알림',
  [NotificationTriggerType.OWNER_CLOSE_REQUEST_APPROVED_IMMEDIATE]: '공구 개설 알림',
  [NotificationTriggerType.OWNER_CLOSE_REQUEST_REJECTED_IMMEDIATE]: '공구 취소 알림',
};

function resolveCta(
  triggerType: NotificationTriggerType | null | undefined,
  params: Record<string, string>,
): Cta | null {
  const groupBuyPath = params.groupBuyId
    ? `/seller/management/${params.groupBuyId}`
    : '/seller';

  switch (triggerType) {
    case NotificationTriggerType.OWNER_PICKUP_SAME_DAY_MORNING:
      return { label: 'QR 스캔 열기', action: 'qr' as const };
    case NotificationTriggerType.OWNER_PICKUP_DAY_BEFORE_MORNING:
      return { label: '예약자 명단 보기', href: groupBuyPath };
    case NotificationTriggerType.OWNER_GROUPBUY_ACHIEVED_IMMEDIATE:
      return { label: '준비 부탁드려요', href: groupBuyPath };
    default:
      return null;
  }
}

function BodyText({ text }: { text: string }) {
  const parts = text.split(/(\d+개)/g);
  return (
    <>
      {parts.map((part, i) =>
        /^\d+개$/.test(part) ? (
          <span key={i} className="text-primary-400 font-semibold">
            {part}
          </span>
        ) : (
          <span key={i}>{part}</span>
        ),
      )}
    </>
  );
}

type Props = { item: NotificationItemResponse; onQrOpen?: () => void };

export default function SellerNoticeItem({ item, onQrOpen }: Props) {
  const {
    id,
    title,
    body,
    isRead,
    occurredAt,
    section,
    triggerType,
    deeplinkType,
    deeplinkParams,
  } = item;
  const router = useRouter();
  const queryClient = useQueryClient();

  const icon = resolveIcon(triggerType, deeplinkType);
  const iconAlt = (triggerType && ICON_ALT[triggerType]) ?? '알림';
  const timeLabel = formatNotificationTime(occurredAt, section);
  const cta = resolveCta(triggerType, deeplinkParams);
  const textColor = isRead ? 'text-text-subtle-inverse' : 'text-text-subtle';

  const { mutate: markAsRead } = usePatchApiV1NotificationsNotificationIdRead({
    mutation: {
      onSettled: () => {
        queryClient.invalidateQueries({ queryKey: ['/api/v1/notifications'] });
      },
    },
  });

  const handleClick = () => {
    if (!isRead) markAsRead({ notificationId: id });
    if (cta?.href) router.push(cta.href);
  };

  return (
    <button
      type="button"
      className="flex w-full cursor-pointer items-start gap-5.5 border-b border-b-border-natural px-p7 py-g4 text-left"
      onClick={handleClick}
    >
      <Image
        src={`/icons/notifications/${icon}.svg`}
        alt={iconAlt}
        width={20}
        height={20}
        className="mt-0.5 shrink-0"
      />
      <div className="flex min-w-0 flex-1 flex-col gap-g3">
        <div className="flex items-start justify-between gap-2">
          <p
            className={`body-md-semibold ${isRead ? 'text-text-subtle-inverse' : 'text-text-basic'}`}
          >
            {title}
          </p>
          <p className="caption-sm-regular min-w-15 shrink-0 text-right text-text-subtle-inverse">
            {timeLabel}
          </p>
        </div>
        <p
          className={`body-sm-regular whitespace-pre-line text-left ${textColor}`}
        >
          <BodyText text={body} />
        </p>
        {cta && (
          <Button
            variant="brand-soft"
            size="cta"
            fullWidth
            onClick={(e) => {
              e.stopPropagation();
              if (!isRead) markAsRead({ notificationId: id });
              if (cta.action === 'qr') onQrOpen?.();
              else if (cta.href) router.push(cta.href);
            }}
          >
            {cta.label}
          </Button>
        )}
      </div>
    </button>
  );
}
