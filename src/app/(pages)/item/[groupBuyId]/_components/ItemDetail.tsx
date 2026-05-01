import React from 'react';
import DetailTab from './DetailTab';

const ItemDetail = () => {
  return (
    <>
      <DetailTab />
      <div className="pt-8 px-4">
        <div className="flex flex-col gap-g4">
          <div className="flex flex-col gap-1">
            <p className="">픽업 안내</p>
            <p className="text-text-brand">
              수령 일시를 꼭 확인해주세요. 미수령 시 환불이 불가해요.
            </p>
          </div>
          <div className="flex flex-col gap-g5">
            <p>지도</p>
            <div className="flex gap-g5 items-start">
              <div className="shrink-0 px-g3 py-g2 rounded-large bg-surface-brand-lighter text-text-brand">
                픽업 장소
              </div>
              <div className="flex flex-col gap-g2">
                <p className="">주소주소</p>
                <p className="text-text-tertiary">상세주소</p>
              </div>
            </div>
            <div className="flex gap-g5 items-center">
              <div className="shrink-0 px-g3 py-g2 rounded-large bg-surface-brand-lighter text-text-brand">
                픽업 일시
              </div>
              <p>2026년 4월 15일 14:00 ~ 18:00</p>
            </div>
          </div>
        </div>
        <div className="pt-g9 pb-g10">상세설명 텍스트 및 사진 구역</div>
      </div>
    </>
  );
};

export default ItemDetail;
