import { NotificationSection } from '@/api/generated/api.schemas';

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
