'use client';
import Image from 'next/image';
import ShareBtn from '@/components/ShareBtn';
import { Icon } from '@iconify/react';
import React, { useEffect } from 'react';
import BottomShare from './BottomShare';
import { ApiResponseGroupBuyDetailResponseData } from '@moongchijang/api-client/generated/api.schemas';
import { formatPickupDate, formatPickupTime } from '@/lib/date';
import { logEvent } from '@/lib/analytics';
import { ChipV2 } from '@/components/Chip-V2';

interface Props {
  data: ApiResponseGroupBuyDetailResponseData;
}

const TopInfo = ({ data }: Props) => {
  const [isShared, setIsShared] = React.useState(false);

  useEffect(() => {
    logEvent('view_item', {
      item_id: data.id,
      item_name: data.productName,
      store_name: data.storeName,
    });
  }, []);

  return (
    <div className="flex flex-col gap-g3 p-4">
      <div className="flex flex-col gap-g5">
        {data.thumbnailUrl ? (
          <Image
            src={data.thumbnailUrl}
            alt="상품 이미지"
            width={400}
            height={260}
            className="h-65 w-auto rounded-3xlarge bg-gray-100 object-cover"
            style={{ width: 'auto' }}
            loading="eager"
          />
        ) : (
          <div className="w-full h-65 rounded-3xlarge bg-gray-100" />
        )}
        <div className="flex flex-col gap-g4">
          <div className="flex flex-col gap-g1">
            <div className="flex gap-g2 text-text-tertiary items-center caption-sm-medium">
              <Icon
                icon="teenyicons:pin-alt-solid"
                className="h-3 w-3 text-primary-400"
              />
              <p>{data.regionLabel}</p>
            </div>
            <div className="flex justify-between items-center">
              <p className="heading-lg-bold">{data.productName}</p>
              <ShareBtn onClick={() => setIsShared(!isShared)}>
                공유하기
              </ShareBtn>
              <BottomShare
                open={isShared}
                onClose={() => setIsShared(false)}
                groupBuyId={data.id}
                productName={data.productName}
                imageUrl={data.thumbnailUrl ?? undefined}
                description={`${data.regionLabel} · ${data.storeName}`}
              />
            </div>
          </div>
          <div className="flex justify-between items-center">
            <div className="flex gap-g2">
              <ChipV2
                label="최소 00개부터 주문"
                size="m"
                variant="brandLighter"
              />
              <ChipV2 label="최대 00개" size="m" variant="yellow" />
            </div>
            <div className="flex gap-g2 items-baseline">
              <p className="heading-1xl-bold">{data.price.toLocaleString()}</p>
              <p className="py-p2 body-md-semibold text-text-basic">/ 1개</p>
            </div>
          </div>
        </div>
      </div>

      {/* TODO(함께사기): 1.2.1 픽업 가능 기간·시간대·매장 휴무 안내로 교체 */}

      <div className="p-p3 divide-y divide-dashed caption-sm-medium divide-border-default rounded-xlarge border-border-subtle border ">
        <div className="flex justify-between p-p3">
          <p className="text-text-disabled">픽업 가능 일자</p>
          <p>{formatPickupDate(data.pickupDate)}</p>
        </div>
        <div className="flex justify-between p-p3">
          <p className="text-text-disabled">픽업 가능 시간</p>
          <p>
            {formatPickupTime(data.pickupTimeStart)}~
            {formatPickupTime(data.pickupTimeEnd)}
          </p>
        </div>
        <div className="flex justify-between p-p3">
          <p className="text-text-disabled">픽업 장소</p>
          <p>{data.pickupLocation}</p>
        </div>
        <div className="flex justify-between p-p3">
          <p className="text-text-disabled">매장명</p>
          <p>{data.storeName}</p>
        </div>
        <div className="flex justify-between p-p3">
          <p className="text-text-disabled">매장 휴무일</p>
          <p>매주 월요일 · 9/24(목) 임시휴무</p>
        </div>
      </div>
    </div>
  );
};

export default TopInfo;
