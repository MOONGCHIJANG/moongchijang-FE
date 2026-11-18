import { type DateKey, parseDateKey, toDateKey } from './calendar';

const WEEKDAY_LABELS = ['일', '월', '화', '수', '목', '금', '토'];

/** 서버/클라이언트 시간대 차이로 인한 hydration 불일치를 막기 위해 KST 기준 오늘을 문자열로 고정 */
export const getTodayKeyKST = (): DateKey =>
  new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Asia/Seoul',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(new Date());

/** '2026-10-16' → '10/16' */
export const formatMonthDay = (key: DateKey): string => {
  const date = parseDateKey(key);
  return `${date.getMonth() + 1}/${date.getDate()}`;
};

/** '2026-10-16' → '10/16(금)' */
export const formatMonthDayWeekday = (key: DateKey): string =>
  `${formatMonthDay(key)}(${WEEKDAY_LABELS[parseDateKey(key).getDay()]})`;

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

/** TODO(API): 픽업 가능 시간은 백엔드에서 내려줄 예정 — 연동 시 교체 */
export const getMockPickupTimes = (): string[] => [
  '12:00',
  '13:00',
  '14:00',
  '15:00',
  '16:00',
  '17:00',
  '18:00',
  '19:00',
];

/**
 * TODO(API): 결제 마감 일시는 백엔드에서 내려줄 예정 — 연동 시 교체.
 * 임시로 픽업일 하루 전 23:59 로 표시
 */
export const getMockPaymentDeadlineLabel = (pickupDate: DateKey): string => {
  const date = parseDateKey(pickupDate);
  date.setDate(date.getDate() - 1);
  return `${formatMonthDayWeekday(toDateKey(date))} 23:59`;
};
