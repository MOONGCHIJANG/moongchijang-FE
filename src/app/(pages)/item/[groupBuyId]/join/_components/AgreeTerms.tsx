import { Icon } from '@iconify/react';
import React from 'react';

const AgreeTerms = () => {
  return (
    <div className="pt-6 flex flex-col pb-16 gap-g5">
      <div className="flex flex-col gap-g2">
        <button className="flex justify-between px-p3 py-p4 border-b-border-subtle border-b">
          <p className="text-text-disabled caption-sm-medium">
            달성 후 취소 불가 동의
          </p>
          <Icon
            icon="lucide:chevron-right"
            className="w-3 h-3 text-icon-tertiary"
          />
        </button>
        <button className="flex justify-between px-p3 py-p4 border-b-border-subtle border-b">
          <p className="text-text-disabled caption-sm-medium">
            달성 전 이탈 시 전액 환불
          </p>
          <Icon
            icon="lucide:chevron-right"
            className="w-3 h-3 text-icon-tertiary"
          />
        </button>
        <button className="flex justify-between px-p3 py-p4 border-b-border-subtle border-b">
          <p className="text-text-disabled caption-sm-medium">
            미수령 환불 불가 동의
          </p>
          <Icon
            icon="lucide:chevron-right"
            className="w-3 h-3 text-icon-tertiary"
          />
        </button>
        <button className="flex justify-between px-p3 py-p4 border-b-border-subtle border-b">
          <p className="text-text-disabled caption-sm-medium">
            청약철회 불가 동의
          </p>
          <Icon
            icon="lucide:chevron-right"
            className="w-3 h-3 text-icon-tertiary"
          />
        </button>
      </div>
      <p className="text-center caption-sm-medium text-text-disabled">
        위 내용을 확인하였으며 결제에 동의합니다
      </p>
    </div>
  );
};

export default AgreeTerms;
