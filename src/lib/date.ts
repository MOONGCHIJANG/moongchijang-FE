export function formatPickupDate(dateStr: string) {
  const date = new Date(dateStr);
  const days = ['일', '월', '화', '수', '목', '금', '토'];
  return `${date.getMonth() + 1}/${date.getDate()}(${days[date.getDay()]})`;
}

export function formatDeadline(dateStr: string) {
  const date = new Date(dateStr);
  return `${date.getMonth() + 1}월 ${date.getDate()}일`;
}

export function formatPickupTime(timeStr: string) {
  return timeStr.slice(0, 5);
}
