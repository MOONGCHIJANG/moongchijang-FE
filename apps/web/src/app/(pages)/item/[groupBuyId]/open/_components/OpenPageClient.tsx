'use client';

import { useState } from 'react';
import type { ApiResponseGroupBuyDetailResponseData } from '@moongchijang/api-client/generated/api.schemas';
import { AlertBanner } from '@/components/AlertBanner';
import type { DateKey } from '../../_lib/calendar';
import { getMockPaymentDeadlineLabel } from '../../_lib/pickupDates';
import {
  type PickupSelection,
  formatPickupLabel,
} from '../../_lib/pickupSelection';
import PickupStep from '../../_components/pickup/PickupStep';
import MakeGroupSheet from './MakeGroupSheet';

interface Props {
  groupBuy: ApiResponseGroupBuyDetailResponseData;
  /** KST 기준 오늘 (YYYY-MM-DD) */
  todayKey: DateKey;
  /** 혼자 사기 결제 화면의 '뭉쳐서 사기'로 들어온 경우 — 이 일시로 바텀시트를 바로 연다 */
  initialSheetSelection: PickupSelection | null;
}

const PAYMENT_NOTICE = [
  '구매 가능한 최소 수량이 모이면 총대님이 결제해야 해요.',
  '결제 마감 일시까지 수량이 모이지 않으면 방이 자동으로 닫혀요.',
  '지금은 결제 전이라 나가는 돈은 없어요.',
].join('\n');

/** 같이 사기 — 픽업 일시 선택 → '함께 사기 방' 바텀시트 */
const OpenPageClient = ({
  groupBuy,
  todayKey,
  initialSheetSelection,
}: Props) => {
  const [sheetSelection, setSheetSelection] = useState(initialSheetSelection);
  const [isSheetOpen, setIsSheetOpen] = useState(
    initialSheetSelection !== null,
  );

  const handleConfirm = (selection: PickupSelection) => {
    setSheetSelection(selection);
    setIsSheetOpen(true);
  };

  return (
    <>
      <PickupStep
        storeName={groupBuy.storeName}
        todayKey={todayKey}
        onConfirm={handleConfirm}
        renderNotice={({ date }) => (
          <AlertBanner
            variant="yellowL"
            headline={`결제 마감 일시는 ${getMockPaymentDeadlineLabel(date)}`}
            text={PAYMENT_NOTICE}
          />
        )}
      />

      {sheetSelection && (
        <MakeGroupSheet
          // 다른 일시로 다시 열면 수량·동의 상태 초기화
          key={formatPickupLabel(sheetSelection)}
          isOpen={isSheetOpen}
          onClose={() => setIsSheetOpen(false)}
          pickupLabel={formatPickupLabel(sheetSelection)}
          paymentDeadlineLabel={getMockPaymentDeadlineLabel(
            sheetSelection.date,
          )}
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
