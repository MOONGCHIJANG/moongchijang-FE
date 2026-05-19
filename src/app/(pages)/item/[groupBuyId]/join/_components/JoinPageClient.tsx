'use client';
import React, { useState } from 'react';
import * as PortOne from '@portone/browser-sdk/v2';
import ItemSummary from './ItemSummary';
import JoinForm from './JoinForm';
import AgreeTerms from './AgreeTerms';
import PaymentButton from './PaymentButton';
import type { ApiResponseGroupBuyDetailResponseData } from '@/api/generated/api.schemas';
import {
  getApiV1GroupBuysGroupBuyIdCheckout,
  postApiV1GroupBuysGroupBuyIdPaymentOrders,
  postApiV1PaymentsPortoneComplete,
} from '@/api/generated/participation/participation';

type Props = {
  groupBuyId: string;
  groupBuy: ApiResponseGroupBuyDetailResponseData;
};

// 수수료 변경 시 해당 값 수정 → 30% 라면 30
const FEE_RATE = 0;

const JoinPageClient = ({ groupBuyId, groupBuy }: Props) => {
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const payMethod = 'CARD' as const;
  const isPayable = !isLoading;

  const handlePayment = async () => {
    if (isLoading) return;
    setIsLoading(true);

    let paymentId: string = '';
    let participationId: number = 0;

    try {
      // [1] checkout 조회 — totalAmount 확정
      const checkoutRes = await getApiV1GroupBuysGroupBuyIdCheckout(
        Number(groupBuyId),
        { quantity },
      );
      if (checkoutRes.status !== 200) throw new Error('checkout 조회 실패');
      const { totalAmount } = checkoutRes.data.data;

      // [2] payment-orders 생성 — PortOne SDK 파라미터 받아옴
      const orderRes = await postApiV1GroupBuysGroupBuyIdPaymentOrders(
        Number(groupBuyId),
        {
          quantity,
          agreedNoCancelAfterGoal: true,
          agreedRefundBeforeGoal: true,
          agreedNoRefundAfterNoShow: true,
          agreedNoWithdrawal: true,
        },
      );
      if (orderRes.status !== 200) throw new Error('결제 주문 생성 실패');

      const {
        paymentId: serverPaymentId,
        storeId,
        channelKey,
        orderName,
        amount,
        customerName,
      } = orderRes.data.data;

      paymentId = serverPaymentId;

      // [3] PortOne SDK 호출

      const result = await PortOne.requestPayment({
        storeId,
        channelKey,
        paymentId,
        orderName,
        totalAmount: amount,
        currency: 'CURRENCY_KRW' as const,
        payMethod,
        card: {},
        customer: customerName ? { fullName: customerName } : undefined,
        windowType: {
          pc: 'IFRAME' as const,
          mobile: 'REDIRECTION' as const,
        },
        redirectUrl: `${window.location.origin}/payment/redirect?paymentId=${paymentId}&amount=${totalAmount}&groupBuyId=${groupBuyId}`,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } as any);

      if (result?.code) throw new Error(result.code);

      // [4] 결제 완료 검증
      const completeRes = await postApiV1PaymentsPortoneComplete({
        paymentId,
        amount,
      });

      if (completeRes.status !== 200) throw new Error('결제 확인 실패');

      participationId = completeRes.data.data.participationId;

      // [5] 완료 페이지 이동
      sessionStorage.setItem('paymentSuccess', participationId.toString());
      await new Promise((resolve) => setTimeout(resolve, 50));
      window.location.replace(
        `/payment/complete?participationId=${participationId}&groupBuyId=${groupBuyId}`,
      );
    } catch (error) {
      const errorCode = error instanceof Error ? error.message : 'UNKNOWN';
      sessionStorage.setItem('paymentFail', errorCode);
      window.location.replace(
        `/payment/fail?errorCode=${encodeURIComponent(errorCode)}&groupBuyId=${groupBuyId}`,
      );
    } finally {
      setIsLoading(false);
    }
  };

  // 표시용 금액은 groupBuy.price 기반으로 유지 (checkout 응답 전)
  const productAmount = groupBuy.price * quantity;
  const totalAmount = productAmount;
  const feeAmount = Math.floor((totalAmount * FEE_RATE) / 100);

  return (
    <div className="relative bg-bg-white-muted p-4 pb-24">
      {isLoading && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center" />
      )}
      <ItemSummary groupBuy={groupBuy} />
      <JoinForm
        quantity={quantity}
        onQuantityChange={setQuantity}
        maxQuantity={groupBuy.maxQuantity ?? null}
        productName={groupBuy.productName}
        productAmount={productAmount}
        feeAmount={feeAmount}
        totalAmount={totalAmount}
        productImage={groupBuy.imageUrls[0] || ''}
      />
      <AgreeTerms />
      <PaymentButton
        price={totalAmount}
        disabled={!isPayable}
        onClick={handlePayment}
      />
    </div>
  );
};

export default JoinPageClient;
