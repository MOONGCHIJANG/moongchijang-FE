import { type DateKey, parseDateKey, toDateKey } from './calendar';

/** 서버/클라이언트 시간대 차이로 인한 hydration 불일치를 막기 위해 KST 기준 오늘을 문자열로 고정 */
export const getTodayKeyKST = (): DateKey =>
  new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Asia/Seoul',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(new Date());

/**
 * TODO(API): 픽업 가능 날짜 목록이 API 에 추가되면 교체.
 * 임시로 오늘+2일 ~ 오늘+35일 중 월요일(매장 휴무)을 제외한 날짜를 반환 → 월 이동 확인용
 */
export const getMockPickupDates = (todayKey: DateKey): DateKey[] => {
  const today = parseDateKey(todayKey);
  const dates: DateKey[] = [];
  for (let offset = 2; offset <= 35; offset += 1) {
    const date = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() + offset,
    );
    if (date.getDay() !== 1) dates.push(toDateKey(date));
  }
  return dates;
};
