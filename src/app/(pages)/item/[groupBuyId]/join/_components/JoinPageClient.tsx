'use client';
import React, { useState } from 'react';
import ItemSummary from './ItemSummary';
import JoinForm from './JoinForm';
import AgreeTerms from './AgreeTerms';
import PaymentButton from './PaymentButton';
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
  // TODO: 추후 사용자 실제 전화번호 정보 불러오는 로직
  const [phoneNumber, setPhoneNumber] = useState('010-0000-0000');
  const [isLoading, setIsLoading] = useState(false);

  const totalAmount = groupBuy.price * quantity;

  const handlePayment = async () => {
    if (isLoading) return;
    setIsLoading(true);
    console.log('[결제 시작]', { groupBuyId, quantity, totalAmount });

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

      const { participationId, totalAmount: confirmedAmount } =
        participationRes.data.data;
      const paymentId = crypto.randomUUID();
      console.log('[1] 완료', { participationId, confirmedAmount, paymentId });

      // [2] TODO: 포트원 SDK requestPayment() 호출
      console.log('[2] 포트원 SDK - TODO (현재 MSW 개발 모드로 스킵)');

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

      // 결제 로직 상 여기는 href 로 유지
      sessionStorage.setItem('paymentSuccess', participationId.toString());
      await new Promise((resolve) => setTimeout(resolve, 50));
      window.location.href = `/payment/complete?participationId=${participationId}`;
    } catch (error) {
      console.error('[결제 실패]', error);

      const paymentId = crypto.randomUUID();
      const errorCode = error instanceof Error ? error.message : 'UNKNOWN';

      await postApiV1PaymentsFail({
        paymentId,
        participationId: 0,
        errorCode,
        message: error instanceof Error ? error.message : null,
      }).catch((e) => console.error('[fail POST 실패]', e));

      sessionStorage.setItem('paymentFail', errorCode);
      window.location.href = `/payment/fail?errorCode=${encodeURIComponent(errorCode)}`;
    }
  };

  return (
    <div className="bg-bg-white-muted p-4 pb-24">
      <ItemSummary groupBuy={groupBuy} />
      <JoinForm
        quantity={quantity}
        onQuantityChange={setQuantity}
        maxQuantity={groupBuy.maxQuantity}
        productName={groupBuy.productName}
        productAmount={groupBuy.price * quantity}
        feeAmount={0}
        totalAmount={totalAmount}
        phoneNumber={phoneNumber}
        onPhoneNumberChange={setPhoneNumber}
        productImage={groupBuy.imageUrls[0] || ''}
      />
      <AgreeTerms />
      <PaymentButton
        price={totalAmount}
        disabled={isLoading}
        onClick={handlePayment}
      />
    </div>
  );
};

export default JoinPageClient;
