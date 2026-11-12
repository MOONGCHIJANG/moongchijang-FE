'use client';

import { useMemo, useState } from 'react';
import { Button } from '@moongchijang/ui';
import type { ApiResponseGroupBuyDetailResponseData } from '@moongchijang/api-client/generated/api.schemas';
import { ChipV2 } from '@/components/Chip-V2';
import { AlertBanner } from '@/components/AlertBanner';
import type { DateKey } from '../_lib/calendar';
import {
  formatMonthDay,
  formatMonthDayWeekday,
  getMockPaymentDeadlineLabel,
  getMockPickupDates,
  getMockPickupTimes,
} from '../_lib/pickupDates';
import PickupCalendar from './PickupCalendar';
import PickupTimeSelector from './PickupTimeSelector';
import MakeGroupSheet from './MakeGroupSheet';

interface Props {
  groupBuy: ApiResponseGroupBuyDetailResponseData;
  /** KST 기준 오늘 (YYYY-MM-DD) */
  todayKey: DateKey;
}

const PAYMENT_NOTICE = [
  '구매 가능한 최소 수량이 모이면 총대님이 결제해야 해요.',
  '결제 마감 일시까지 수량이 모이지 않으면 방이 자동으로 닫혀요.',
  '지금은 결제 전이라 나가는 돈은 없어요.',
].join('\n');

const OpenPageClient = ({ groupBuy, todayKey }: Props) => {
  const [selectedDate, setSelectedDate] = useState<DateKey | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  // TODO(API): 픽업 가능 날짜·시간 API 반영 시 교체
  const availableDates = useMemo(
    () => getMockPickupDates(todayKey),
    [todayKey],
  );
  const pickupTimes = getMockPickupTimes();

  // 날짜를 바꾸면 선택한 시간은 초기화
  const handleSelectDate = (date: DateKey) => {
    if (date === selectedDate) return;
    setSelectedDate(date);
    setSelectedTime(null);
  };

  const isComplete = selectedDate !== null && selectedTime !== null;

  return (
    <>
      <main className="flex flex-col gap-g4 px-4 pt-5 pb-24">
        <div className="flex flex-col gap-g5">
          <div className="flex items-center justify-center gap-g2">
            <ChipV2 label={groupBuy.storeName} size="m" />
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
            onSelect={setSelectedTime}
          />
        )}

        {isComplete && (
          <AlertBanner
            variant="yellowL"
            headline={`결제 마감 일시는 ${getMockPaymentDeadlineLabel(selectedDate)}`}
            text={PAYMENT_NOTICE}
          />
        )}
      </main>

      <div className="fixed bottom-0 left-0 right-0 z-10 mx-auto w-full max-w-110 px-4 pb-4 bg-bg-white">
        <Button
          fullWidth
          size="lg"
          disabled={!isComplete}
          onClick={() => setIsSheetOpen(true)}
        >
          {isComplete
            ? `${formatMonthDay(selectedDate)} ${selectedTime}에 픽업할게요`
            : '픽업 일시 선택'}
        </Button>
      </div>

      {isComplete && (
        <MakeGroupSheet
          isOpen={isSheetOpen}
          onClose={() => setIsSheetOpen(false)}
          pickupLabel={`${formatMonthDayWeekday(selectedDate)} ${selectedTime}`}
          paymentDeadlineLabel={getMockPaymentDeadlineLabel(selectedDate)}
          productName={groupBuy.productName}
          price={groupBuy.price}
          // TODO(API): 총대 구매 수량 제한 기준(전체 최대 / 남은 수량 / 1인 제한) 확정 시 교체
          maxQuantity={groupBuy.maxQuantity ?? null}
        />
      )}
    </>
  );
};

export default OpenPageClient;
