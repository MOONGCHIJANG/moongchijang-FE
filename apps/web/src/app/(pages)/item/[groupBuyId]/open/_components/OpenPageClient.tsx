'use client';

import { useMemo, useState } from 'react';
import { Button } from '@moongchijang/ui';
import type { ApiResponseGroupBuyDetailResponseData } from '@moongchijang/api-client/generated/api.schemas';
import { ChipV2 } from '@/components/Chip-V2';
import type { DateKey } from '../_lib/calendar';
import { getMockPickupDates } from '../_lib/pickupDates';
import PickupCalendar from './PickupCalendar';

interface Props {
  groupBuy: ApiResponseGroupBuyDetailResponseData;
  /** KST 기준 오늘 (YYYY-MM-DD) */
  todayKey: DateKey;
}

/**
 * TODO(같이사기): 이후 단계
 * 2. 날짜 선택 시 픽업 시간 목록
 * 3. 시간 선택 시 결제 마감 일시 안내 + 하단 버튼 활성화
 * 4. 버튼 클릭 시 추가 선택 바텀시트
 */
const OpenPageClient = ({ groupBuy, todayKey }: Props) => {
  const [selectedDate, setSelectedDate] = useState<DateKey | null>(null);

  // TODO(API): 픽업 가능 날짜 목록 API 반영 시 교체
  const availableDates = useMemo(
    () => getMockPickupDates(todayKey),
    [todayKey],
  );

  return (
    <>
      <main className="flex flex-col gap-g5 px-4 pt-5 pb-24">
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
          onSelect={setSelectedDate}
        />
      </main>

      <div className="fixed bottom-0 left-0 right-0 z-10 mx-auto w-full max-w-110 px-4 pb-4 bg-bg-white">
        <Button fullWidth disabled size="lg" aria-label="픽업 일시 선택">
          픽업 일시 선택
        </Button>
      </div>
    </>
  );
};

export default OpenPageClient;
