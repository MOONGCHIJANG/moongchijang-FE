'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import type { ApiResponseGroupBuyDetailResponseData } from '@moongchijang/api-client/generated/api.schemas';
import {
  type PickupSelection,
  formatPickupLabel,
  toPickupQuery,
} from '../../../_lib/pickupSelection';
import { getPaymentAmounts } from '../../../_lib/paymentAmount';
import PickupSummaryCard from '../../../_components/pickup/PickupSummaryCard';
import CheckoutForm from '../../../_components/checkout/CheckoutForm';
import PaymentButton from '../../../_components/checkout/PaymentButton';
import SplitPurchaseBanner from './SplitPurchaseBanner';

interface Props {
  groupBuy: ApiResponseGroupBuyDetailResponseData;
  selection: PickupSelection;
}

/** 혼자 사기 결제 — 전체 최소 수량부터 시작, '뭉쳐서 사기'로 같이 사기 전환 가능 */
const SoloCheckoutClient = ({ groupBuy, selection }: Props) => {
  const router = useRouter();
  const maxQuantity = groupBuy.maxQuantity ?? null;
  // 혼자 사기는 공구 전체 최소 수량을 혼자 채워야 함
  // TODO(API): 혼자 사기 최소·최대 수량 기준 확정 시 교체
  const minQuantity =
    maxQuantity != null
      ? Math.min(groupBuy.targetQuantity, maxQuantity)
      : groupBuy.targetQuantity;
  const [quantity, setQuantity] = useState(minQuantity);

  const { productAmount, feeAmount, totalAmount } = getPaymentAmounts(
    groupBuy.price,
    quantity,
  );
  const pickupQuery = toPickupQuery(selection);

  // 픽업 일시 선택 화면으로 돌아가기 — 선택값은 쿼리로 유지됨
  const handleChangePickup = () => {
    if (window.history.length > 1) {
      router.back();
    } else {
      router.replace(`/item/${groupBuy.id}/solo?${pickupQuery}`);
    }
  };

  // 같은 픽업 일시로 같이 사기 바텀시트 열기
  const handleSwitchToGroup = () => {
    router.push(`/item/${groupBuy.id}/open?${pickupQuery}&sheet=1`);
  };

  // TODO(API): 혼자 사기 결제 API 확정 시 연결 (약관 동의 → 결제 흐름은 join 과 동일 예정)
  const handlePayment = () => {};

  return (
    <div className="relative flex flex-col gap-g4 min-h-dvh p-4 pb-24 bg-bg-white-muted">
      <div className="flex flex-col">
        <PickupSummaryCard
          pickupLabel={formatPickupLabel(selection)}
          onChange={handleChangePickup}
          className="p-p5"
        />
        <CheckoutForm
          quantity={quantity}
          onQuantityChange={setQuantity}
          minQuantity={minQuantity}
          maxQuantity={maxQuantity}
          quantityNotice="최소 구매 수량으로 자동 설정되었어요"
          productName={groupBuy.productName}
          productAmount={productAmount}
          feeAmount={feeAmount}
          totalAmount={totalAmount}
          productImage={groupBuy.thumbnailUrl}
        />
      </div>
      <SplitPurchaseBanner onClick={handleSwitchToGroup} />
      <PaymentButton
        price={totalAmount}
        variant="black"
        className="rounded-2xlarge"
        onClick={handlePayment}
      />
    </div>
  );
};

export default SoloCheckoutClient;
