import type { DateKey } from './calendar';
import {
  formatMonthDayWeekday,
  getMockPickupDates,
  getMockPickupTimes,
} from './pickupDates';

/**
 * 픽업 일시 선택값.
 * 혼자 사기 / 같이 사기 화면 간 이동 시 URL 쿼리(?date=&time=)로 주고받는다.
 * → 새로고침·뒤로가기에도 선택값이 유지되고, 별도 전역 상태가 필요 없다.
 */
export interface PickupSelection {
  date: DateKey;
  time: string;
}

/** { date, time } → 'date=2026-11-20&time=15%3A00' */
export const toPickupQuery = ({ date, time }: PickupSelection): string =>
  new URLSearchParams({ date, time }).toString();

/**
 * 쿼리 값을 검증해 선택 가능한 일시일 때만 반환.
 * TODO(API): 픽업 가능 날짜·시간 API 반영 시 검증 기준 교체
 */
export const parsePickupSelection = (
  date: string | null | undefined,
  time: string | null | undefined,
  todayKey: DateKey,
): PickupSelection | null => {
  if (!date || !time) return null;
  if (!getMockPickupDates(todayKey).includes(date)) return null;
  if (!getMockPickupTimes().includes(time)) return null;
  return { date, time };
};

/** '9/23(수) 15:00' */
export const formatPickupLabel = ({ date, time }: PickupSelection): string =>
  `${formatMonthDayWeekday(date)} ${time}`;
