'use client';
import ShareBtn from '@/components/ShareBtn';
import { Icon } from '@iconify/react';
import Image from 'next/image';
import React from 'react';
import BottomShare from './BottomShare';

const TopInfo = () => {
  const [isShared, setIsShared] = React.useState(false);
  const onShareClick = () => {
    setIsShared(!isShared);
  };

  return (
    <div className="flex flex-col gap-g3 p-4">
      <div className="flex flex-col gap-g5">
        <Image
          src={''}
          alt="상품 이미지"
          width={400}
          height={260}
          className="w-full h-65 rounded-3xlarge bg-gray-100"
        />
        <div className="flex flex-col gap-g2">
          <div className="flex flex-col gap-g1">
            <div className="flex gap-g2 text-text-tertiary items-center">
              <Icon
                icon="teenyicons:pin-alt-solid"
                className="h-3 w-3 text-primary-400"
              />
              <p>성수동</p>
              <p>・</p>
              <p>픽업4/15(화)</p>
            </div>
            <div className="flex justify-between items-center">
              <p className="">이름이름</p>
              <ShareBtn onClick={onShareClick}>공유하기</ShareBtn>
              {isShared && (
                <BottomShare
                  open={isShared}
                  onClose={() => setIsShared(false)}
                />
              )}
            </div>
          </div>
          <p className="">18,000원</p>
        </div>
      </div>
      <div className="px-p6 py-p5 rounded-2xlarge flex flex-col gap-g3 bg-bg-white-muted">
        <div className="flex gap-g1 items-center">
          <p>달성까지</p>
          <p className="text-text-tertiary">・</p>
          <p className="text-text-tertiary">마감일 4월 10일</p>
        </div>
        <div className="flex gap-g4 items-center">
          <div className="flex gap-g2 items-center">
            <Icon
              icon="mynaui:ticket-solid"
              className="text-primary-400 w-4 h-4"
            />
            <p className="text-text-brand">36/50</p>
          </div>
          <div className="h-5 w-px bg-border-subtle"></div>
          <div className="flex gap-g3 w-full items-center">
            <div className="relative flex-1 h-2 rounded-full bg-[#D9D9D9]">
              <div
                className="absolute left-0 top-0 h-full rounded-full bg-primary-400"
                style={{ width: '72%' }}
              />
            </div>
            <p className="text-text-brand">72%</p>
          </div>
        </div>
      </div>
      <div className="p-p2 divide-y divide-dashed divide-border-default">
        <div className="flex justify-between p-p3">
          <p className="text-text-disabled">픽업 일시</p>
          <p>4/15(화) 14:00~18:00</p>
        </div>
        <div className="flex justify-between p-p3">
          <p className="text-text-disabled">픽업 장소</p>
          <p>성동구 성수동 00번지</p>
        </div>
        <div className="flex justify-between p-p3">
          <p className="text-text-disabled">매장명</p>
          <p>사이드템포</p>
        </div>
        <div className="flex justify-between p-p3">
          <p className="text-text-disabled">최대 구매 가능 수량</p>
          <p>15개</p>
        </div>
      </div>
    </div>
  );
};

export default TopInfo;
