'use client';
import React, { useState } from 'react';
import NumStepper from './NumStepper';
import { Icon } from '@iconify/react';
import EditNumber from './EditNumber';

const JoinForm = () => {
  const [open, setOpen] = useState(false);
  // 실제 데이터로 변경
  const [phoneNumber, setPhoneNumber] = useState('010-0000-0000');

  return (
    <div className="flex flex-col gap-3 pt-3">
      {/* 상품 카드 */}
      <div className="rounded-2xlarge bg-surface-white border border-border-subtle p-p5 flex items-center justify-between">
        <div className="flex gap-g4 items-center">
          <div className="caption-sm-regular w-15 h-15 rounded-xlarge bg-gray-200">
            이미지로변경예정
          </div>
          <div className="flex flex-col gap-g2">
            <p className="body-md-bold">상품명</p>
            <p className="caption-sm-regular">가격</p>
          </div>
        </div>
        <NumStepper max={10} />
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
            setPhoneNumber(value);
            setOpen(false);
          }}
        />
      </div>
      {/* 결제 정보 */}
      <div className="rounded-2xlarge bg-surface-white border border-border-subtle p-p5 flex flex-col gap-g4">
        <p className="heading-md-bold">결제 금액</p>
        <div className="flex flex-col gap-g5">
          <div className="flex flex-col divide divide-y divide-dashed divide-border-subtle border-b border-b-border-focus body-md-semibold">
            <div className="flex justify-between py-p4">
              <p className="w-15">상품 금액</p>
              <p className="text-text-tertiary">10,000원</p>
            </div>
            <div className="flex justify-between py-p4">
              <div className="flex gap-g4 items-center">
                <p>수수료</p>
                <div className="px-g3 py-g1 rounded-small bg-surface-brand-lighter text-text-brand caption-xs-bold">
                  뭉치장은 수수료 0%
                </div>
              </div>
              <p className="text-text-tertiary">10,000원</p>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <p className="heading-sm-bold">최종 결제</p>
            <p className="heading-lg-bold text-text-brand">18,000원</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JoinForm;
