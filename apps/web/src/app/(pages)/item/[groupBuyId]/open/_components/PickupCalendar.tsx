'use client';

import { useMemo, useState } from 'react';
import { cn } from '@/lib/utils';
import { SvgIcon } from '@/components/SvgIcon';
import {
  type DateKey,
  addMonths,
  compareYearMonth,
  getInitialMonth,
  getMonthRange,
  getMonthWeeks,
  parseDateKey,
} from '../_lib/calendar';

const WEEKDAYS = ['일', '월', '화', '수', '목', '금', '토'];

interface Props {
  todayKey: DateKey;
  /** 선택 가능한 픽업 날짜 */
  availableDates: DateKey[];
  selectedDate: DateKey | null;
  onSelect: (date: DateKey) => void;
}

const PickupCalendar = ({
  todayKey,
  availableDates,
  selectedDate,
  onSelect,
}: Props) => {
  const today = parseDateKey(todayKey);
  const { min, max } = getMonthRange(today, availableDates);
  const [viewMonth, setViewMonth] = useState(() =>
    getInitialMonth(today, availableDates),
  );

  const availableSet = useMemo(() => new Set(availableDates), [availableDates]);
  const weeks = getMonthWeeks(viewMonth);

  const canPrev = compareYearMonth(viewMonth, min) > 0;
  const canNext = compareYearMonth(viewMonth, max) < 0;

  return (
    <div className="mx-1.25 flex flex-col gap-g7 px-p5 py-p6 rounded-2xlarge border border-border-subtle bg-surface-white">
      <div className="flex items-center justify-center gap-g11">
        <MonthArrow
          direction="prev"
          disabled={!canPrev}
          onClick={() => setViewMonth((m) => addMonths(m, -1))}
        />
        <p className="heading-sm-bold text-text-basic">
          {viewMonth.year}년 {viewMonth.month + 1}월
        </p>
        <MonthArrow
          direction="next"
          disabled={!canNext}
          onClick={() => setViewMonth((m) => addMonths(m, 1))}
        />
      </div>

      <div className="flex flex-col gap-g7">
        <div className="flex justify-between">
          {WEEKDAYS.map((weekday) => (
            <span
              key={weekday}
              className="w-6 text-center body-md-regular text-text-subtle-inverse"
            >
              {weekday}
            </span>
          ))}
        </div>

        <div className="flex flex-col gap-g6">
          {weeks.map((week, weekIndex) => (
            <div key={weekIndex} className="flex justify-between">
              {week.map((cell, dayIndex) => {
                if (!cell) return <span key={dayIndex} className="w-6 h-6" />;

                const isToday = cell.key === todayKey;
                const isSelectable = availableSet.has(cell.key);
                const isSelected = cell.key === selectedDate;

                return (
                  <div key={cell.key} className="relative w-6 h-6">
                    {isSelectable ? (
                      <button
                        type="button"
                        aria-pressed={isSelected}
                        onClick={() => onSelect(cell.key)}
                        className={cn(
                          'flex items-center justify-center w-6 h-6 rounded-max cursor-pointer',
                          isSelected
                            ? 'bg-brand-primary body-md-semibold text-text-basic-inverse'
                            : 'body-md-regular text-text-basic',
                        )}
                      >
                        {cell.day}
                      </button>
                    ) : (
                      <span className="flex items-center justify-center w-6 h-6 body-md-regular text-text-subtle-inverse">
                        {cell.day}
                      </span>
                    )}
                    {isToday && (
                      <span className="absolute top-full left-1/2 -translate-x-1/2 -mt-0.5 whitespace-nowrap caption-xs-medium text-text-subtle-inverse">
                        오늘
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

interface MonthArrowProps {
  direction: 'prev' | 'next';
  disabled: boolean;
  onClick: () => void;
}

const MonthArrow = ({ direction, disabled, onClick }: MonthArrowProps) => (
  <button
    type="button"
    aria-label={direction === 'prev' ? '이전 달' : '다음 달'}
    disabled={disabled}
    onClick={onClick}
    className={cn(
      'flex items-center justify-center w-6 h-6',
      disabled ? 'text-icon-disabled' : 'text-icon-basic cursor-pointer',
    )}
  >
    <SvgIcon
      src={
        direction === 'prev'
          ? '/icons/arrow-ios-back.svg'
          : '/icons/arrow-ios-forward.svg'
      }
    />
  </button>
);

export default PickupCalendar;
