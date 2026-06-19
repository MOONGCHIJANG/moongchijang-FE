import {
  NotificationSection,
  NotificationTriggerType,
  NotificationDeeplinkType,
} from '@/api/generated/api.schemas';

export function formatNotificationTime(
  occurredAt: string,
  section: NotificationSection,
): string {
  const now = new Date();
  const occurred = new Date(occurredAt);
  const diffMs = now.getTime() - occurred.getTime();
  const diffMinutes = Math.floor(diffMs / 1000 / 60);
  const diffHours = Math.floor(diffMinutes / 60);

  const formatDate = (d: Date) => {
    const month = d.getMonth() + 1;
    const day = d.getDate();
    const hours = String(d.getHours()).padStart(2, '0');
    const minutes = String(d.getMinutes()).padStart(2, '0');
    return `${month}/${day} ${hours}:${minutes}`;
  };

  if (section === NotificationSection.TODAY) {
    if (diffMinutes <= 3) return '방금 전';
    if (diffHours < 1) return `${diffMinutes}분 전`;
    return `${diffHours}시간 전`;
  }

  if (section === NotificationSection.YESTERDAY) {
    if (diffHours >= 24) return formatDate(occurred);
    if (diffHours < 1) return `${diffMinutes}분 전`;
    return `${diffHours}시간 전`;
  }

  return formatDate(occurred);
}

// triggerType 기반 아이콘
const TRIGGER_ICON_MAP: Partial<Record<NotificationTriggerType, string>> = {
  [NotificationTriggerType.PICKUP_SAME_DAY_MORNING]: 'store',
  [NotificationTriggerType.PICKUP_DAY_BEFORE_MORNING]: 'store',
  [NotificationTriggerType.PICKUP_NOT_COMPLETED_AFTER_CUTOFF]: 'check',
  [NotificationTriggerType.OWNER_PICKUP_SAME_DAY_MORNING]: 'store',
  [NotificationTriggerType.OWNER_PICKUP_DAY_BEFORE_MORNING]: 'clock',
  [NotificationTriggerType.OWNER_GROUPBUY_ACHIEVED_IMMEDIATE]: 'party',
  [NotificationTriggerType.OWNER_GROUPBUY_FAILED_IMMEDIATE]: 'x',
  [NotificationTriggerType.OWNER_CLOSE_REQUEST_APPROVED_IMMEDIATE]: 'check',
  [NotificationTriggerType.OWNER_CLOSE_REQUEST_REJECTED_IMMEDIATE]: 'x',
  [NotificationTriggerType.OWNER_OPEN_REQUEST_APPROVED_IMMEDIATE]: 'check',
  [NotificationTriggerType.OWNER_OPEN_REQUEST_REJECTED_IMMEDIATE]: 'x',
  [NotificationTriggerType.OWNER_ORDER_CONFIRM_REQUIRED_IMMEDIATE]: 'hand',
  [NotificationTriggerType.OWNER_ORDER_CANCELLED_IMMEDIATE]: 'x',
  [NotificationTriggerType.WISH_DEADLINE_MINUS_3_DAYS]: 'heart',
  [NotificationTriggerType.WISH_DEADLINE_MINUS_1_DAY]: 'heart',
  [NotificationTriggerType.WISH_TARGET_ACHIEVED_IMMEDIATE]: 'party',
  [NotificationTriggerType.APPLY_PAYMENT_SUCCESS_IMMEDIATE]: 'bag',
  [NotificationTriggerType.APPLY_GROUPBUY_ACHIEVED_IMMEDIATE]: 'party',
  [NotificationTriggerType.APPLY_GROUPBUY_FAILED_IMMEDIATE]: 'x',
  [NotificationTriggerType.REQUEST_OPENED_IMMEDIATE]: 'party',
  [NotificationTriggerType.REQUEST_REJECTED_IMMEDIATE]: 'x',
  [NotificationTriggerType.REQUEST_NEW_PARTICIPANT_IMMEDIATE]: 'hand',
  [NotificationTriggerType.REQUEST_TARGET_ACHIEVED_IMMEDIATE]: 'party',
  [NotificationTriggerType.REQUEST_DEADLINE_MINUS_3_DAYS]: 'clock',
};

const DEEPLINK_ICON_FALLBACK: Record<NotificationDeeplinkType, string> = {
  [NotificationDeeplinkType.PICKUP_GUIDE]: 'store',
  [NotificationDeeplinkType.GROUPBUY_DETAIL]: 'heart',
  [NotificationDeeplinkType.MY_APPLYING]: 'bag',
  [NotificationDeeplinkType.REQUEST_STATUS]: 'party',
};

export function resolveIcon(
  triggerType: NotificationTriggerType | null | undefined,
  deeplinkType: NotificationDeeplinkType,
): string {
  if (triggerType && TRIGGER_ICON_MAP[triggerType]) {
    return TRIGGER_ICON_MAP[triggerType]!;
  }
  return DEEPLINK_ICON_FALLBACK[deeplinkType];
}

export function resolveDeeplinkPath(
  triggerType: NotificationTriggerType | null | undefined,
  deeplinkType: NotificationDeeplinkType,
  deeplinkParams: Record<string, string>,
): string {
  if (triggerType === NotificationTriggerType.REQUEST_OPENED_IMMEDIATE) {
    return `/item/${deeplinkParams.groupBuyId}`; // 임시
  }

  switch (deeplinkType) {
    case NotificationDeeplinkType.PICKUP_GUIDE:
      return `/mypage/pickup/${deeplinkParams.participationId}`; // TODO: 실제 경로로 수정 필요
    case NotificationDeeplinkType.GROUPBUY_DETAIL:
      return `/item/${deeplinkParams.groupBuyId}`;
    case NotificationDeeplinkType.MY_APPLYING:
      return `/mypage`; // TODO: 실제 경로로 수정 필요
    case NotificationDeeplinkType.REQUEST_STATUS:
      return `/request`;
  }
}
