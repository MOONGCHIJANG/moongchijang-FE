'use client';
import React, { useState } from 'react';
import * as PortOne from '@portone/browser-sdk/v2';
import ItemSummary from './ItemSummary';
import JoinForm from './JoinForm';
import AgreeTerms from './AgreeTerms';
import PaymentButton from './PaymentButton';
import PayMethodSelector, { type PayMethod } from './PayMethodSelector';
import { ParticipationCreateAgreedTermsItem } from '@/api/generated/api.schemas';
import type { ApiResponseGroupBuyDetailData } from '@/api/generated/api.schemas';
import {
  postApiV1GroupBuysGroupBuyIdParticipations,
  postApiV1PaymentsConfirm,
  postApiV1PaymentsFail,
} from '@/api/generated/participation/participation';

const ALL_AGREED_TERMS = Object.values(ParticipationCreateAgreedTermsItem);

type Props = {
  groupBuyId: string;
  groupBuy: ApiResponseGroupBuyDetailData;
};

const JoinPageClient = ({ groupBuyId, groupBuy }: Props) => {
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const totalAmount = groupBuy.price * quantity;

  const [payMethod, setPayMethod] = useState<PayMethod | null>(null);
  const isPayable = payMethod !== null && !isLoading;

  const handlePayment = async () => {
    if (isLoading || !payMethod) return;
    setIsLoading(true);

    const safePayMethod = payMethod as PayMethod;

    let participationId: number = 0;
    let paymentId: string = crypto.randomUUID();

    console.log('[결제 시작]', {
      groupBuyId,
      quantity,
      totalAmount,
      payMethod,
    });

    try {
      // TODO: 개발용 console.log 제거
      // [1] 결제 요청 생성
      console.log('[1] participations POST 요청', {
        quantity,
        agreedTerms: ALL_AGREED_TERMS,
      });
      const participationRes = await postApiV1GroupBuysGroupBuyIdParticipations(
        Number(groupBuyId),
        { quantity, agreedTerms: ALL_AGREED_TERMS },
      );
      console.log('[1] participations 응답', participationRes);

      if (participationRes.status !== 201 || !participationRes.data.success) {
        throw new Error('결제 요청 생성 실패');
      }

      // [1] 성공 시 participationId, paymentId 확정
      const { orderName, totalAmount: confirmedAmount } =
        participationRes.data.data;
      participationId = participationRes.data.data.participationId;
      paymentId = crypto.randomUUID();

      // [2] 포트원 SDK requestPayment() 호출
      console.log('[2] 포트원 SDK 호출', {
        paymentId,
        orderName,
        confirmedAmount,
        payMethod,
      });
      // [2] 포트원 SDK requestPayment() 호출
      const paymentRequest = {
        storeId: process.env.NEXT_PUBLIC_PORTONE_STORE_ID!,
        channelKey: process.env.NEXT_PUBLIC_PORTONE_CHANNEL_KEY!,
        paymentId,
        orderName,
        totalAmount: confirmedAmount,
        currency: 'CURRENCY_KRW' as const,
        payMethod: safePayMethod,
        card: safePayMethod === 'CARD' ? {} : undefined,
        transfer: safePayMethod === 'TRANSFER' ? {} : undefined,
        windowType: {
          pc: 'IFRAME' as const,
          mobile: 'REDIRECTION' as const,
        },
        redirectUrl: `${window.location.origin}/payment/redirect?participationId=${participationId}&amount=${confirmedAmount}&groupBuyId=${groupBuyId}`,
      };

      console.log(
        '[2] 포트원 SDK 실제 요청 데이터',
        JSON.stringify(paymentRequest),
      );

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const result = await PortOne.requestPayment(paymentRequest as any);

      console.log('[2] 포트원 SDK 응답', result);

      if (result?.code) {
        throw new Error(result.code);
      }

      // [3] confirm POST
      console.log('[3] payments/confirm POST 요청', {
        paymentId,
        participationId,
        amount: confirmedAmount,
      });
      const confirmRes = await postApiV1PaymentsConfirm({
        paymentId,
        participationId,
        amount: confirmedAmount,
      });
      console.log('[3] confirm 응답', confirmRes);

      if (confirmRes.status !== 200 || !confirmRes.data.success) {
        throw new Error('결제 확인 실패');
      }

      console.log('[4] 결제 완료 → 완료 페이지 이동', { participationId });
      sessionStorage.setItem('paymentSuccess', participationId.toString());
      await new Promise((resolve) => setTimeout(resolve, 50));
      window.location.replace(
        `/payment/complete?participationId=${participationId}&groupBuyId=${groupBuyId}`,
      );
    } catch (error) {
      console.error('[결제 실패]', error);

      const errorCode = error instanceof Error ? error.message : 'UNKNOWN';

      await postApiV1PaymentsFail({
        paymentId, // [1] 이후 실패면 실제 paymentId, [1] 실패면 초기 UUID
        participationId, // [1] 이후 실패면 실제 ID, [1] 실패면 0
        errorCode,
        message: error instanceof Error ? error.message : null,
      }).catch((e) => console.error('[fail POST 실패]', e));

      sessionStorage.setItem('paymentFail', errorCode);
      window.location.replace(
        `/payment/fail?errorCode=${encodeURIComponent(errorCode)}&groupBuyId=${groupBuyId}`,
      );
    } finally {
      setIsLoading(false);
      console.log('[결제 종료]');
    }
  };

  return (
    <div className="relative bg-bg-white-muted p-4 pb-24">
      {/* 결제 진행 중 오버레이 */}
      {isLoading && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center"></div>
      )}
      <ItemSummary groupBuy={groupBuy} />
      <JoinForm
        quantity={quantity}
        onQuantityChange={setQuantity}
        maxQuantity={groupBuy.maxQuantity}
        productName={groupBuy.productName}
        productAmount={groupBuy.price * quantity}
        feeAmount={0}
        totalAmount={totalAmount}
        productImage={groupBuy.imageUrls[0] || ''}
      />
      <PayMethodSelector value={payMethod} onChange={setPayMethod} />
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
