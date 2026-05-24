export function formatPickupDate(dateStr: string) {
  const date = new Date(dateStr);
  const days = ['일', '월', '화', '수', '목', '금', '토'];
  return `${date.getMonth() + 1}/${date.getDate()}(${days[date.getDay()]})`;
}

export function formatShortDate(
  dateStr: string | null | undefined,
): string | null {
  if (!dateStr) return null;
  const d = new Date(dateStr);
  const days = ['일', '월', '화', '수', '목', '금', '토'];
  return `${d.getMonth() + 1}/${d.getDate()}(${days[d.getDay()]})`;
}

export function formatCompactDate(
  dateStr: string | null | undefined,
  fallback = '-',
): string {
  if (!dateStr) return fallback;
  const d = new Date(dateStr);
  return `${String(d.getFullYear()).slice(2)}.${String(d.getMonth() + 1).padStart(2, '0')}.${String(d.getDate()).padStart(2, '0')}`;
}

export function formatDeadline(dateStr: string) {
  const date = new Date(dateStr);
  return `${date.getMonth() + 1}월 ${date.getDate()}일`;
}

export function formatPickupTime(timeStr: string) {
  return timeStr.slice(0, 5);
}
