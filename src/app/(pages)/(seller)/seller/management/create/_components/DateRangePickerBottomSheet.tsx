'use client';

import { useEffect, useState } from 'react';
import { Icon } from '@iconify/react';
import { BottomSheet } from '@/components/BottomSheet';
import { Button } from '@/components/Button';
import { cn } from '@/lib/utils';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  startDate: string;
  endDate: string;
  onSelect: (start: string, end: string) => void;
}

const DAYS = ['일', '월', '화', '수', '목', '금', '토'];

function toKey(y: number, m: number, d: number) {
  return `${y}-${String(m + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
}

function daysInMonth(y: number, m: number) {
  return new Date(y, m + 1, 0).getDate();
}

function firstDay(y: number, m: number) {
  return new Date(y, m, 1).getDay();
}

export function DateRangePickerBottomSheet({
  isOpen,
  onClose,
  startDate,
  endDate,
  onSelect,
}: Props) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const initView = () =>
    startDate
      ? {
          year: Number(startDate.split('-')[0]),
          month: Number(startDate.split('-')[1]) - 1,
        }
      : { year: today.getFullYear(), month: today.getMonth() };

  const [view, setView] = useState(initView);
  const [tempStart, setTempStart] = useState(startDate);
  const [tempEnd, setTempEnd] = useState(endDate);

  useEffect(() => {
    if (isOpen) {
      setTempStart(startDate);
      setTempEnd(endDate);
      setView(initView());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  const prevDisabled =
    view.year < today.getFullYear() ||
    (view.year === today.getFullYear() && view.month <= today.getMonth());

  const handlePrev = () =>
    view.month === 0
      ? setView({ year: view.year - 1, month: 11 })
      : setView((v) => ({ ...v, month: v.month - 1 }));

  const handleNext = () =>
    view.month === 11
      ? setView({ year: view.year + 1, month: 0 })
      : setView((v) => ({ ...v, month: v.month + 1 }));

  const handleDayClick = (day: number) => {
    const date = new Date(view.year, view.month, day);
    if (date < today) return;
    const key = toKey(view.year, view.month, day);

    if (!tempStart || (tempStart && tempEnd)) {
      setTempStart(key);
      setTempEnd('');
    } else {
      if (key < tempStart) {
        setTempEnd(tempStart);
        setTempStart(key);
      } else {
        setTempEnd(key);
      }
    }
  };

  const isInRange = (day: number) => {
    if (!tempStart || !tempEnd) return false;
    const key = toKey(view.year, view.month, day);
    return key > tempStart && key < tempEnd;
  };

  const isStart = (day: number) =>
    toKey(view.year, view.month, day) === tempStart;
  const isEnd = (day: number) => toKey(view.year, view.month, day) === tempEnd;

  const total = daysInMonth(view.year, view.month);
  const offset = firstDay(view.year, view.month);
  const cells: (number | null)[] = [
    ...Array<null>(offset).fill(null),
    ...Array.from({ length: total }, (_, i) => i + 1),
  ];
  while (cells.length % 7 !== 0) cells.push(null);

  const canConfirm = !!tempStart && !!tempEnd;

  return (
    <BottomSheet
      isOpen={isOpen}
      onClose={onClose}
      className="pb-0 overflow-hidden"
    >
      <div className="px-5 pt-5">
        {/* 월 네비게이터 */}
        <div className="mb-4.5 flex items-center justify-between">
          <button
            type="button"
            onClick={handlePrev}
            disabled={prevDisabled}
            className={cn(
              'rounded-full p-1.5 transition-colors',
              prevDisabled
                ? 'cursor-not-allowed text-icon-disabled'
                : 'text-icon-basic',
            )}
          >
            <Icon icon="lucide:chevron-left" className="h-6 w-6" />
          </button>
          <span className="heading-sm-semibold text-text-basic">
            {view.year}년 {view.month + 1}월
          </span>
          <button
            type="button"
            onClick={handleNext}
            className="p-1.5 text-icon-basic"
          >
            <Icon icon="lucide:chevron-right" className="h-6 w-6" />
          </button>
        </div>

        {/* 요일 헤더 */}
        <div className="mb-1 grid grid-cols-7">
          {DAYS.map((d) => (
            <div
              key={d}
              className="py-4 text-center heading-md-medium text-text-basic"
            >
              {d}
            </div>
          ))}
        </div>

        {/* 날짜 그리드 */}
        <div className="mb-6 grid grid-cols-7 gap-y-1">
          {cells.map((day, idx) => {
            if (day === null) return <div key={`e-${idx}`} />;
            const past = new Date(view.year, view.month, day) < today;
            const start = isStart(day);
            const end = isEnd(day);
            const inRange = isInRange(day);

            return (
              <button
                key={`${view.year}-${view.month}-${day}`}
                type="button"
                onClick={() => handleDayClick(day)}
                disabled={past}
                className={cn(
                  'relative mx-auto flex h-11 w-12.5 flex-col items-center justify-center rounded-small heading-md-medium transition-colors',
                  start || end
                    ? 'bg-surface-brand text-text-basic-inverse'
                    : inRange
                      ? 'bg-surface-brand-lighter text-text-brand'
                      : past
                        ? 'cursor-not-allowed text-text-subtle-inverse'
                        : 'text-text-basic',
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
            size="lg"
            className="text-text-basic-inverse"
            disabled={!canConfirm}
            onClick={() => {
              if (canConfirm) {
                onSelect(tempStart, tempEnd);
                onClose();
              }
            }}
          >
            {canConfirm ? '이 기간으로 할래요!' : '기간을 설정해주세요'}
          </Button>
        </div>
      </div>
    </BottomSheet>
  );
}
