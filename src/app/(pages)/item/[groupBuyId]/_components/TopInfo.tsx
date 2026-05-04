'use client';
import ShareBtn from '@/components/ShareBtn';
import { Icon } from '@iconify/react';
import React from 'react';
import BottomShare from './BottomShare';
import { ApiResponseGroupBuyDetailData } from '@/api/generated/api.schemas';
import { formatDeadline, formatPickupDate, formatPickupTime } from '@/lib/date';

interface Props {
  data: ApiResponseGroupBuyDetailData;
}

const TopInfo = ({ data }: Props) => {
  const [isShared, setIsShared] = React.useState(false);

  const pickupText = `픽업 ${formatPickupDate(data.pickupDate)}`;

  return (
    <div className="flex flex-col gap-g3 p-4">
      <div className="flex flex-col gap-g5">
        {/* TODO: 추후 이미지로 연동 */}
        {/* <Image
          src={data.imageUrls[0] ?? ''}
          alt="상품 이미지"
          width={400}
          height={260}
          className="w-full h-65 rounded-3xlarge bg-gray-100"
        /> */}
        <div className="w-full h-65 rounded-3xlarge bg-gray-100 flex items-center justify-center">
          <p className="text-gray-400">상품 이미지</p>
        </div>
        <div className="flex flex-col gap-g2">
          <div className="flex flex-col gap-g1">
            <div className="flex gap-g2 text-text-tertiary items-center caption-sm-medium">
              <Icon
                icon="teenyicons:pin-alt-solid"
                className="h-3 w-3 text-primary-400"
              />
              <p>{data.region}</p>
              <p>・</p>
              <p>{pickupText}</p>
            </div>
            <div className="flex justify-between items-center">
              <p className="heading-lg-bold">{data.productName}</p>
              <ShareBtn onClick={() => setIsShared(!isShared)}>
                공유하기
              </ShareBtn>
              <BottomShare open={isShared} onClose={() => setIsShared(false)} />
            </div>
          </div>
          <p className="heading-1xl-bold">{data.price.toLocaleString()}원</p>
        </div>
      </div>

      <div className="px-p6 py-p5 rounded-2xlarge flex flex-col gap-g3 bg-bg-white-muted">
        <div className="flex gap-g1 items-center">
          <p className="body-md-semibold">달성까지</p>
          <p className="text-text-tertiary caption-sm-medium">・</p>
          <p className="text-text-tertiary caption-sm-medium">
            마감일 {formatDeadline(data.deadline)}
          </p>
        </div>
        <div className="flex gap-g4 items-center">
          <div className="flex gap-g2 items-center">
            <Icon
              icon="mynaui:ticket-solid"
              className="text-primary-400 w-4 h-4"
            />
            <p className="text-text-brand body-md-bold">
              {data.currentQuantity}/{data.targetQuantity}
            </p>
          </div>
          <div className="h-5 w-px bg-border-subtle" />
          <div className="flex gap-g3 w-full items-center">
            <div className="relative flex-1 h-2 rounded-full bg-[#D9D9D9]">
              <div
                className="absolute left-0 top-0 h-full rounded-full bg-primary-400"
                style={{ width: `${Math.min(data.achievementRate, 100)}%` }}
              />
            </div>
            <p className="text-text-brand heading-sm-bold">
              {data.achievementRate}%
            </p>
          </div>
        </div>
      </div>

      <div className="p-p2 divide-y divide-dashed divide-border-default">
        <div className="flex justify-between p-p3">
          <p className="text-text-disabled caption-sm-bold">픽업 일시</p>
          <p className="caption-sm-medium">
            {formatPickupDate(data.pickupDate)}
            {formatPickupTime(data.pickupTimeStart)}~
            {formatPickupTime(data.pickupTimeEnd)}
          </p>
        </div>
        <div className="flex justify-between p-p3">
          <p className="text-text-disabled caption-sm-bold">픽업 장소</p>
          <p className="caption-sm-medium">{data.pickupLocation}</p>
        </div>
        <div className="flex justify-between p-p3">
          <p className="text-text-disabled caption-sm-bold">매장명</p>
          <p className="caption-sm-medium">{data.storeName}</p>
        </div>
        <div className="flex justify-between p-p3">
          <p className="text-text-disabled caption-sm-bold">
            최대 구매 가능 수량
          </p>
          <p className="caption-sm-medium">{data.maxQuantity}개</p>
        </div>
      </div>
    </div>
  );
};

export default TopInfo;
