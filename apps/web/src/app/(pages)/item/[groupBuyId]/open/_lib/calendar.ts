/** 'YYYY-MM-DD' (로컬 기준) */
export type DateKey = string;

export interface YearMonth {
  year: number;
  /** 0-indexed (Date#getMonth 와 동일) */
  month: number;
}

export interface CalendarCell {
  key: DateKey;
  day: number;
}

const pad = (n: number) => String(n).padStart(2, '0');

export const toDateKey = (date: Date): DateKey =>
  `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;

export const parseDateKey = (key: DateKey): Date => {
  const [y, m, d] = key.split('-').map(Number);
  return new Date(y, m - 1, d);
};

export const toYearMonth = (date: Date): YearMonth => ({
  year: date.getFullYear(),
  month: date.getMonth(),
});

const monthIndex = ({ year, month }: YearMonth) => year * 12 + month;

const fromMonthIndex = (index: number): YearMonth => ({
  year: Math.floor(index / 12),
  month: index % 12,
});

export const addMonths = (ym: YearMonth, diff: number): YearMonth =>
  fromMonthIndex(monthIndex(ym) + diff);

export const compareYearMonth = (a: YearMonth, b: YearMonth) =>
  monthIndex(a) - monthIndex(b);

/**
 * 달력에서 이동 가능한 월 범위.
 * 오늘이 속한 달 ~ 마지막 픽업 가능일이 속한 달 (예: 오늘 8월, 픽업 9~10월 → 8·9·10월)
 */
export const getMonthRange = (
  today: Date,
  availableDates: DateKey[],
): { min: YearMonth; max: YearMonth } => {
  const months = [
    toYearMonth(today),
    ...availableDates.map((key) => toYearMonth(parseDateKey(key))),
  ];
  const indexes = months.map(monthIndex);
  return {
    min: fromMonthIndex(Math.min(...indexes)),
    max: fromMonthIndex(Math.max(...indexes)),
  };
};

/** 첫 픽업 가능일이 속한 달 (없으면 오늘이 속한 달) */
export const getInitialMonth = (
  today: Date,
  availableDates: DateKey[],
): YearMonth => {
  const first = [...availableDates].sort()[0];
  return toYearMonth(first ? parseDateKey(first) : today);
};

/**
 * 일요일 시작 주 단위 행. 각 행은 항상 7칸이며 빈 칸은 null.
 */
export const getMonthWeeks = ({
  year,
  month,
}: YearMonth): (CalendarCell | null)[][] => {
  const firstWeekday = new Date(year, month, 1).getDay();
  const lastDay = new Date(year, month + 1, 0).getDate();

  const cells: (CalendarCell | null)[] = [
    ...Array.from({ length: firstWeekday }, () => null),
    ...Array.from({ length: lastDay }, (_, i) => ({
      key: `${year}-${pad(month + 1)}-${pad(i + 1)}`,
      day: i + 1,
    })),
  ];
  while (cells.length % 7 !== 0) cells.push(null);

  const weeks: (CalendarCell | null)[][] = [];
  for (let i = 0; i < cells.length; i += 7) weeks.push(cells.slice(i, i + 7));
  return weeks;
};
