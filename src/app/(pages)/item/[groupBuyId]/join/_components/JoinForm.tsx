'use client';
import React, { useState } from 'react';
import NumStepper from './NumStepper';
import { Icon } from '@iconify/react';
import EditNumber from './EditNumber';
import Image from 'next/image';

type Props = {
  quantity: number;
  onQuantityChange: (value: number) => void;
  maxQuantity: number | null;
  productName: string;
  productAmount: number;
  feeAmount: number;
  totalAmount: number;
  phoneNumber: string;
  onPhoneNumberChange: (value: string) => void;
  productImage: string;
};

const JoinForm = ({
  quantity,
  onQuantityChange,
  maxQuantity,
  productName,
  productAmount,
  feeAmount,
  totalAmount,
  phoneNumber,
  onPhoneNumberChange,
  productImage,
}: Props) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex flex-col gap-3 pt-3">
      {/* 상품 카드 */}
      <div className="rounded-2xlarge bg-surface-white border border-border-subtle p-p5 flex items-center justify-between">
        <div className="flex gap-g4 items-center">
          <Image
            src={productImage}
            alt="상품 이미지"
            width={60}
            height={60}
            className="w-15 h-15 rounded-xlarge bg-gray-200 object-cover"
          />
          <div className="flex flex-col gap-g2">
            <p className="body-md-bold">{productName}</p>
            <p className="caption-sm-regular">
              {(productAmount / quantity).toLocaleString()}원
            </p>
          </div>
        </div>
        <NumStepper
          max={maxQuantity}
          value={quantity}
          onChange={onQuantityChange}
        />
      </div>
      {/* 전화번호 */}
      <div className="rounded-2xlarge bg-surface-white border border-border-subtle p-p5 flex flex-col gap-g4">
        <p className="heading-md-bold">전화번호</p>
        <div className="flex justify-between items-center">
          <p className="body-md-regular">{phoneNumber}</p>
          <button type="button" onClick={() => setOpen(true)}>
            <Icon
              icon="lucide:chevron-right"
              className="w-6 h-6 text-icon-subtle"
            />
          </button>
        </div>
        <EditNumber
          open={open}
          initialValue={phoneNumber}
          onClose={() => setOpen(false)}
          onConfirm={(value) => {
            onPhoneNumberChange(value);
            setOpen(false);
          }}
        />
      </div>

      {/* 결제 금액 */}
      <div className="rounded-2xlarge bg-surface-white border border-border-subtle p-p5 flex flex-col gap-g4">
        <p className="heading-md-bold">결제 금액</p>
        <div className="flex flex-col gap-g5">
          <div className="flex flex-col divide-y divide-dashed divide-border-subtle border-b border-b-border-focus body-md-semibold">
            <div className="flex justify-between py-p4">
              <p className="w-15">상품 금액</p>
              <p className="text-text-tertiary">
                {productAmount.toLocaleString()}원
              </p>
            </div>
            <div className="flex justify-between py-p4">
              <div className="flex gap-g4 items-center">
                <p>수수료</p>
                <div className="px-g3 py-g1 rounded-small bg-surface-brand-lighter text-text-brand caption-xs-bold">
                  뭉치장은 수수료 0%
                </div>
              </div>
              <p className="text-text-tertiary">
                {(feeAmount * quantity).toLocaleString()}원
              </p>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <p className="heading-sm-bold">최종 결제</p>
            <p className="heading-lg-bold text-text-brand">
              {totalAmount.toLocaleString()}원
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JoinForm;
