'use client';

import { useEffect, useState } from 'react';
import { Icon } from '@iconify/react';
import { BottomSheet } from '@/components/BottomSheet';
import { Button } from '@/components/Button';
import { cn } from '@/lib/utils';

interface DatePickerBottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  selectedDate: string; // 'YYYY-MM-DD'
  onSelect: (date: string) => void;
}

const DAYS_OF_WEEK = ['일', '월', '화', '수', '목', '금', '토'];

function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year: number, month: number): number {
  return new Date(year, month, 1).getDay();
}

function toDateKey(year: number, month: number, day: number): string {
  return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
}

export const DatePickerBottomSheet = ({
  isOpen,
  onClose,
  selectedDate,
  onSelect,
}: DatePickerBottomSheetProps) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const getInitialView = () => {
    if (selectedDate) {
      const [y, m] = selectedDate.split('-').map(Number);
      return { year: y, month: m - 1 };
    }
    return { year: today.getFullYear(), month: today.getMonth() };
  };

  const [viewYear, setViewYear] = useState(getInitialView().year);
  const [viewMonth, setViewMonth] = useState(getInitialView().month);
  const [tempSelected, setTempSelected] = useState(selectedDate);

  useEffect(() => {
    if (isOpen) {
      setTempSelected(selectedDate);
      const init = getInitialView();
      setViewYear(init.year);
      setViewMonth(init.month);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  const handlePrevMonth = () => {
    if (viewMonth === 0) {
      setViewMonth(11);
      setViewYear((y) => y - 1);
    } else {
      setViewMonth((m) => m - 1);
    }
  };

  const handleNextMonth = () => {
    if (viewMonth === 11) {
      setViewMonth(0);
      setViewYear((y) => y + 1);
    } else {
      setViewMonth((m) => m + 1);
    }
  };

  const handleDayClick = (day: number) => {
    const date = new Date(viewYear, viewMonth, day);
    if (date < today) return;
    setTempSelected(toDateKey(viewYear, viewMonth, day));
  };

  const handleConfirm = () => {
    if (!tempSelected) return;
    onSelect(tempSelected);
    onClose();
  };

  const daysInMonth = getDaysInMonth(viewYear, viewMonth);
  const firstDay = getFirstDayOfMonth(viewYear, viewMonth);

  const cells: (number | null)[] = [
    ...Array<null>(firstDay).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];
  while (cells.length % 7 !== 0) cells.push(null);

  const isSelectedDay = (day: number) => {
    if (!tempSelected) return false;
    return tempSelected === toDateKey(viewYear, viewMonth, day);
  };

  const isTodayDay = (day: number) =>
    today.getFullYear() === viewYear &&
    today.getMonth() === viewMonth &&
    today.getDate() === day;

  const isPastDay = (day: number) => new Date(viewYear, viewMonth, day) < today;

  const isPrevMonthDisabled =
    viewYear < today.getFullYear() ||
    (viewYear === today.getFullYear() && viewMonth <= today.getMonth());

  return (
    <BottomSheet
      isOpen={isOpen}
      onClose={onClose}
      className="pb-0 overflow-hidden"
    >
      <div className="px-5 pt-5">
        {/* 월 네비게이터 */}
        <div className="flex items-center justify-between mb-4.5">
          <button
            type="button"
            onClick={handlePrevMonth}
            disabled={isPrevMonthDisabled}
            className={cn(
              'p-1.5 rounded-full transition-colors',
              isPrevMonthDisabled
                ? 'text-gray-200 cursor-not-allowed'
                : 'text-gray-700',
            )}
            aria-label="이전 달"
          >
            <Icon icon="lucide:chevron-left" className="w-6 h-6" />
          </button>

          <span className="text-heading-sm-semibold text-gray-900 font-pretendard">
            {viewYear}년 {viewMonth + 1}월
          </span>

          <button
            type="button"
            onClick={handleNextMonth}
            className="p-1.5 rounded-full text-gray-700 transition-colors"
            aria-label="다음 달"
          >
            <Icon icon="lucide:chevron-right" className="w-6 h-6" />
          </button>
        </div>

        {/* 요일 헤더 */}
        <div className="grid grid-cols-7 mb-1">
          {DAYS_OF_WEEK.map((day) => (
            <div
              key={day}
              className={cn(
                'text-center text-[18px] font-medium text-gray-900 py-4 font-pretendard',
              )}
            >
              {day}
            </div>
          ))}
        </div>

        {/* 날짜 그리드 */}
        <div className="grid grid-cols-7 gap-y-1 mb-6">
          {cells.map((day, idx) => {
            if (day === null) {
              return <div key={`empty-${idx}`} />;
            }

            const selected = isSelectedDay(day);
            const isToday = isTodayDay(day);
            const past = isPastDay(day);

            return (
              <button
                key={`${viewYear}-${viewMonth}-${day}`}
                type="button"
                onClick={() => handleDayClick(day)}
                disabled={past}
                className={cn(
                  'relative mx-auto flex h-11 w-12.5 flex-col items-center justify-center rounded-small font-pretendard text-[18px] font-medium transition-colors',
                  selected
                    ? 'bg-primary-400 text-white'
                    : past
                      ? 'text-gray-200 cursor-not-allowed'
                      : isToday
                        ? 'bg-gray-100'
                        : 'text-gray-900',
                )}
              >
                {day}
              </button>
            );
          })}
        </div>

        {/* 확인 버튼 */}
        <div className="-mx-5 px-5 py-4 shadow-[0px_-2px_20px_0px_rgba(0,0,0,0.10)]">
          <Button
            fullWidth
            size="xl"
            className="text-white font-bold text-[16px] h-12 shadow-none"
            disabled={!tempSelected}
            onClick={handleConfirm}
          >
            {tempSelected ? '이때 픽업할래요!' : '픽업 날짜를 선택해주세요'}
          </Button>
        </div>
      </div>
    </BottomSheet>
  );
};
