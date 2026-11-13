'use client';

import { type ReactNode, useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Button } from '@moongchijang/ui';
import { ChipV2 } from '@/components/Chip-V2';
import type { DateKey } from '../../_lib/calendar';
import {
  formatMonthDay,
  getMockPickupDates,
  getMockPickupTimes,
} from '../../_lib/pickupDates';
import {
  type PickupSelection,
  parsePickupSelection,
  toPickupQuery,
} from '../../_lib/pickupSelection';
import PickupCalendar from './PickupCalendar';
import PickupTimeSelector from './PickupTimeSelector';

interface Props {
  storeName: string;
  /** KST 기준 오늘 (YYYY-MM-DD) */
  todayKey: DateKey;
  /** 날짜·시간을 모두 고른 뒤 하단 버튼을 눌렀을 때 — 혼자/같이 사기가 각자 동작을 넘긴다 */
  onConfirm: (selection: PickupSelection) => void;
  /** 날짜·시간을 모두 골랐을 때 시간 선택 아래에 보여줄 안내 */
  renderNotice?: (selection: PickupSelection) => ReactNode;
}

/**
 * 픽업 일시 선택 화면 (혼자 사기 / 같이 사기 공통)
 * - URL 쿼리(?date=&time=)가 있으면 그 값으로 미리 선택
 * - 선택할 때마다 쿼리를 갱신해, 다음 화면에서 뒤로 와도 선택이 유지된다
 */
const PickupStep = ({
  storeName,
  todayKey,
  onConfirm,
  renderNotice,
}: Props) => {
  const searchParams = useSearchParams();
  const [initial] = useState(() =>
    parsePickupSelection(
      searchParams.get('date'),
      searchParams.get('time'),
      todayKey,
    ),
  );
  const [selectedDate, setSelectedDate] = useState<DateKey | null>(
    initial?.date ?? null,
  );
  const [selectedTime, setSelectedTime] = useState<string | null>(
    initial?.time ?? null,
  );

  // TODO(API): 픽업 가능 날짜·시간 API 반영 시 교체
  const availableDates = useMemo(
    () => getMockPickupDates(todayKey),
    [todayKey],
  );
  const pickupTimes = getMockPickupTimes();

  const syncQuery = (date: DateKey, time: string | null) => {
    const query = time
      ? toPickupQuery({ date, time })
      : new URLSearchParams({ date }).toString();
    window.history.replaceState(null, '', `?${query}`);
  };

  // 날짜를 바꾸면 선택한 시간은 초기화
  const handleSelectDate = (date: DateKey) => {
    if (date === selectedDate) return;
    setSelectedDate(date);
    setSelectedTime(null);
    syncQuery(date, null);
  };

  const handleSelectTime = (time: string) => {
    if (!selectedDate) return;
    setSelectedTime(time);
    syncQuery(selectedDate, time);
  };

  const selection: PickupSelection | null =
    selectedDate && selectedTime
      ? { date: selectedDate, time: selectedTime }
      : null;

  return (
    <>
      <main className="flex flex-col gap-g4 px-4 pt-5 pb-24">
        <div className="flex flex-col gap-g5">
          <div className="flex items-center justify-center gap-g2">
            <ChipV2 label={storeName} size="m" />
            <p className="caption-sm-regular text-text-tertiary">
              에서 총대님이 픽업할 날을 골라주세요
            </p>
          </div>
          <PickupCalendar
            todayKey={todayKey}
            availableDates={availableDates}
            selectedDate={selectedDate}
            onSelect={handleSelectDate}
          />
        </div>

        {selectedDate && (
          <PickupTimeSelector
            times={pickupTimes}
            selectedTime={selectedTime}
            onSelect={handleSelectTime}
          />
        )}

        {selection && renderNotice?.(selection)}
      </main>

      <div className="fixed bottom-0 left-0 right-0 z-10 mx-auto w-full max-w-110 px-4 pb-4 bg-bg-white">
        <Button
          fullWidth
          size="lg"
          disabled={!selection}
          onClick={() => selection && onConfirm(selection)}
        >
          {selection
            ? `${formatMonthDay(selection.date)} ${selection.time}에 픽업할게요`
            : '픽업 일시 선택'}
        </Button>
      </div>
    </>
  );
};

export default PickupStep;
