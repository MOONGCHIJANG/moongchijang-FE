// "YYYY-MM-DD" date-only strings are parsed as UTC midnight by spec,
// causing KST (UTC+9) users to see the previous day. Append T00:00:00 to force local parsing.
function parseDate(dateStr: string): Date {
  if (/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
    return new Date(dateStr + 'T00:00:00');
  }
  return new Date(dateStr);
}

export function formatDate(dateStr: string): string {
  const d = parseDate(dateStr);
  if (isNaN(d.getTime())) return '-';
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  return `${yyyy}.${mm}.${dd}`;
}

export function formatPickupDate(dateStr: string): string {
  const date = parseDate(dateStr);
  if (isNaN(date.getTime())) return '-';
  const days = ['일', '월', '화', '수', '목', '금', '토'];
  return `${date.getMonth() + 1}/${date.getDate()}(${days[date.getDay()]})`;
}

export function formatShortDate(
  dateStr: string | null | undefined,
): string | null {
  if (!dateStr) return null;
  const d = parseDate(dateStr);
  const days = ['일', '월', '화', '수', '목', '금', '토'];
  return `${d.getMonth() + 1}/${d.getDate()}(${days[d.getDay()]})`;
}

export function formatCompactDate(
  dateStr: string | null | undefined,
  fallback = '-',
): string {
  if (!dateStr) return fallback;
  const d = parseDate(dateStr);
  return `${String(d.getFullYear()).slice(2)}.${String(d.getMonth() + 1).padStart(2, '0')}.${String(d.getDate()).padStart(2, '0')}`;
}

export function formatDeadline(dateStr: string): string {
  const date = parseDate(dateStr);
  if (isNaN(date.getTime())) return '-';
  return `${date.getMonth() + 1}월 ${date.getDate()}일`;
}

export function formatPickupTime(timeStr: string) {
  return timeStr.slice(0, 5);
}

export function formatTime(timeStr: string) {
  return timeStr.slice(0, 5);
}

export function formatPickupDateTime(dateStr: string, timeStr: string) {
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return timeStr;
  const days = ['일', '월', '화', '수', '목', '금', '토'];
  return `${date.getMonth() + 1}월 ${date.getDate()}일 (${days[date.getDay()]}) ${formatTime(timeStr)}`;
}

export function formatPickupDateTimeRange(
  dateStr: string,
  startTimeStr: string,
  endTimeStr: string,
) {
  const date = parseDate(dateStr);
  if (isNaN(date.getTime()))
    return `${formatTime(startTimeStr)} ~ ${formatTime(endTimeStr)}`;
  const days = ['일', '월', '화', '수', '목', '금', '토'];
  return `${date.getMonth() + 1}월 ${date.getDate()}일 (${days[date.getDay()]}) ${formatTime(startTimeStr)} ~ ${formatTime(endTimeStr)}`;
}
