import { Icon } from '@iconify/react';
import React from 'react';

const ItemSummary = () => {
  return (
    <div className="p-p5 flex flex-col gap-1 rounded-2xlarge bg-surface-white border border-border-subtle">
      <p className="heading-md-bold">픽업 안내</p>
      <div className="flex flex-col divide-y divide-dashed divide-border-subtle">
        <div className="pt-g3 pb-p5 flex justify-between">
          <div className="flex gap-g3 items-center">
            <Icon
              icon="teenyicons:pin-alt-solid"
              className="w-4 h-4 text-icon-primary"
            />
            <p className="text-text-brand body-md-bold">픽업 장소</p>
          </div>
          <p className="body-md-regular">서울특별시 강남구 테헤란로 123</p>
        </div>
        <div className="pt-g3 pb-p5 flex justify-between">
          <div className="flex gap-g3 items-center">
            <Icon
              icon="mingcute:time-fill"
              className="w-4 h-4 text-icon-primary"
            />
            <p className="text-text-brand body-md-bold">픽업 일시</p>
          </div>
          <p className="body-md-regular">4월 15일(화) 14:00 ~ 18:00</p>
        </div>
      </div>
    </div>
  );
};

export default ItemSummary;
