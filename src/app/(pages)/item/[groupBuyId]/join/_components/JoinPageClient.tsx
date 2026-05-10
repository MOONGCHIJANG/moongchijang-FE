'use client';
import React, { useState } from 'react';
import ItemSummary from './ItemSummary';
import JoinForm from './JoinForm';
import AgreeTerms from './AgreeTerms';
import PaymentButton from './PaymentButton';
import type { ApiResponseGroupBuyDetailResponseData } from '@/api/generated/api.schemas';

type Props = {
  groupBuyId: string;
  groupBuy: ApiResponseGroupBuyDetailResponseData;
};

const JoinPageClient = ({ groupBuyId, groupBuy }: Props) => {
  const [quantity, setQuantity] = useState(1);
  // TODO: 추후 사용자 실제 전화번호 정보 불러오는 로직
  const [phoneNumber, setPhoneNumber] = useState('010-0000-0000');
  const [isLoading, setIsLoading] = useState(false);

  const totalAmount = groupBuy.price * quantity;

  const handlePayment = async () => {
    // 완료 페이지로 이동
    window.location.href = `/payment/complete?participationId=12345`;
  };

  return (
    <div className="bg-bg-white-muted p-4 pb-24">
      <ItemSummary groupBuy={groupBuy} />
      <JoinForm
        quantity={quantity}
        onQuantityChange={setQuantity}
        maxQuantity={groupBuy.maxQuantity ?? null}
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
