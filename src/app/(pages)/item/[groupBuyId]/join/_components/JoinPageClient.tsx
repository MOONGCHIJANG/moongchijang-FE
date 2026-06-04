'use client';
import React, { useState, useEffect } from 'react';
import * as PortOne from '@portone/browser-sdk/v2';
import { useTermsSheetStore } from '@/store/termsSheetStore';

import ItemSummary from './ItemSummary';
import JoinForm from './JoinForm';
import AgreeTermsSheet from './AgreeTermsSheet';
import PaymentButton from './PaymentButton';
import type { ApiResponseGroupBuyDetailResponseData } from '@/api/generated/api.schemas';
import {
  getApiV1GroupBuysGroupBuyIdCheckout,
  postApiV1GroupBuysGroupBuyIdPaymentOrders,
  postApiV1PaymentsPortoneComplete,
} from '@/api/generated/participation/participation';
import {
  CheckoutInfoResponse,
  PaymentOrderCreatedResponse,
  PaymentConfirmedResponse,
} from '@/api/schemas/participation';
import { logEvent } from '@/lib/analytics';

type Props = {
  groupBuyId: string;
  groupBuy: ApiResponseGroupBuyDetailResponseData;
};

// 수수료 변경 시 해당 값 수정 → 30% 라면 30
const FEE_RATE = 0;

const JoinPageClient = ({ groupBuyId, groupBuy }: Props) => {
  // TODO: 마감됨 페이지 접근 시 처리
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const {
    isOpen: isTermsSheetOpen,
    open: openTermsSheet,
    close: closeTermsSheet,
  } = useTermsSheetStore();
  const payMethod = 'CARD' as const;
  const isPayable = !isLoading;

  useEffect(() => {
    logEvent('begin_checkout', {
      item_id: parseInt(groupBuyId),
      item_name: groupBuy.productName,
      price: groupBuy.price,
      currency: 'KRW',
    });
  }, []);

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

      const checkoutParsed = CheckoutInfoResponse.safeParse(checkoutRes.data);
      if (!checkoutParsed.success) {
        console.error('[1] checkout 응답 파싱 실패', checkoutParsed.error);
        throw new Error('checkout 응답 형식 오류');
      }
      const { totalAmount } = checkoutParsed.data.data;

      // [2] payment-orders 생성 — PortOne SDK 파라미터 받아옴
      // TODO: 추후 동의 관련 로직 추가
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
      if (orderRes.status === 409) {
        throw new Error('이미 참여한 공구입니다.');
      }
      if (orderRes.status !== 200) throw new Error('결제 주문 생성 실패');

      const orderParsed = PaymentOrderCreatedResponse.safeParse(orderRes.data);
      if (!orderParsed.success) {
        console.error('[2] payment-orders 응답 파싱 실패', orderParsed.error);
        throw new Error('결제 주문 응답 형식 오류');
      }

      const {
        paymentId: serverPaymentId,
        storeId,
        channelKey,
        orderName,
        amount,
        customerName,
      } = orderParsed.data.data;

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

      const completeParsed = PaymentConfirmedResponse.safeParse(
        completeRes.data,
      );
      if (!completeParsed.success) {
        console.error('[4] complete 응답 파싱 실패', completeParsed.error);
        throw new Error('결제 확인 응답 형식 오류');
      }

      participationId = completeParsed.data.data.participationId;

      // [5] 완료 페이지 이동
      logEvent('purchase', {
        transaction_id: participationId.toString(),
        value: totalAmount,
        currency: 'KRW',
        item_id: parseInt(groupBuyId),
        item_name: groupBuy.productName,
        quantity,
      });
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
  const feeAmount = Math.floor((productAmount * FEE_RATE) / 100);
  const totalAmount = productAmount + feeAmount;

  return (
    <div className="relative bg-bg-white-muted p-4 pb-24 min-h-dvh">
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
        productImage={groupBuy.thumbnailUrl || ''}
      />
      <AgreeTermsSheet
        isOpen={isTermsSheetOpen}
        onClose={closeTermsSheet}
        onConfirm={() => {
          closeTermsSheet();
          handlePayment();
        }}
        groupBuyId={groupBuyId}
      />
      <PaymentButton
        price={totalAmount}
        disabled={!isPayable}
        onClick={openTermsSheet}
      />
    </div>
  );
};

export default JoinPageClient;
