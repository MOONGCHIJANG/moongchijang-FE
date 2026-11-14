'use client';

import { useRouter } from 'next/navigation';
import type { ApiResponseGroupBuyDetailResponseData } from '@moongchijang/api-client/generated/api.schemas';
import type { DateKey } from '../../_lib/calendar';
import {
  type PickupSelection,
  toPickupQuery,
} from '../../_lib/pickupSelection';
import PickupStep from '../../_components/pickup/PickupStep';

interface Props {
  groupBuy: ApiResponseGroupBuyDetailResponseData;
  todayKey: DateKey;
}

/** 혼자 사기 — 픽업 일시를 고르면 바로 결제 화면으로 이동 */
const SoloPageClient = ({ groupBuy, todayKey }: Props) => {
  const router = useRouter();

  const handleConfirm = (selection: PickupSelection) => {
    router.push(
      `/item/${groupBuy.id}/solo/checkout?${toPickupQuery(selection)}`,
    );
  };

  return (
    <PickupStep
      storeName={groupBuy.storeName}
      todayKey={todayKey}
      onConfirm={handleConfirm}
    />
  );
};

export default SoloPageClient;
