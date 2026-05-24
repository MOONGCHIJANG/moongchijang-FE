import {
  NotificationSection,
  NotificationType,
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
    return `${diffHours}시간 전`;
  }

  if (section === NotificationSection.YESTERDAY) {
    if (diffHours >= 24) return formatDate(occurred); // 어제인데 24시간 초과
    return `${diffHours}시간 전`;
  }

  return formatDate(occurred);
}

export function resolveIcon(type: NotificationType, title: string): string {
  switch (type) {
    case NotificationType.PICKUP:
      return title === '픽업완료 확인이 필요해요.' ? 'check' : 'store';

    case NotificationType.WISH:
      return title === '찜한 공구 목표 인원 달성!' ? 'party' : 'heart';

    case NotificationType.APPLY:
      if (title === '공구 성공! 픽업 일정 확인하세요.') return 'party';
      if (title === '아쉽게도 공구가 미달성됐어요.') return 'x';
      return 'bag'; // '공구 참여 완료! 결제됐어요.'

    case NotificationType.REQUEST:
      if (title === '[요청공구] 새 참여자가 신청했어요.') return 'hand';
      if (title === '[요청공구] 공구 마감이 3일 남았어요.') return 'clock';
      if (title === '[요청공구] 공구 개설 실패..') return 'x';
      return 'party'; // 개설 성공, 달성 성공
  }
}
