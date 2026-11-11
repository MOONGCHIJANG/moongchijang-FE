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
import { cn } from '@/lib/utils';
import { getOrderAvailability } from '../_lib/orderAvailability';
import InfoTable, { type InfoRow } from './InfoTable';
import StoreClosedCard from './StoreClosedCard';
import ReopenNotifyCard from './ReopenNotifyCard';

interface Props {
  data: ApiResponseGroupBuyDetailResponseData;
}

const TopInfo = ({ data }: Props) => {
  const [isShared, setIsShared] = React.useState(false);
  const availability = getOrderAvailability(data);
  const { isOrderable } = availability;

  const infoRows: InfoRow[] = isOrderable
    ? [
        { label: '픽업 가능 일자', value: formatPickupDate(data.pickupDate) },
        {
          label: '픽업 가능 시간',
          value: `${formatPickupTime(data.pickupTimeStart)}~${formatPickupTime(data.pickupTimeEnd)}`,
        },
        { label: '픽업 장소', value: data.pickupLocation },
        { label: '매장명', value: data.storeName },
        { label: '매장 휴무일', value: '매주 월요일 · 9/24(목) 임시휴무' },
      ]
    : [
        { label: '주문 가능일', value: availability.nextOrderableLabel },
        { label: '최소 수량', value: availability.minQuantityLabel },
        { label: '픽업 장소', value: data.pickupLocation },
      ];

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
            <div
              className={cn(
                'flex gap-g2 items-baseline',
                isOrderable ? 'text-text-basic' : 'text-text-disabled',
              )}
            >
              <p className="heading-1xl-bold">{data.price.toLocaleString()}</p>
              <p className="py-p2 body-md-semibold">/ 1개</p>
            </div>
          </div>
        </div>
      </div>

      {/* TODO(함께사기): 1.2.1 픽업 가능 기간·시간대·매장 휴무 안내로 교체 */}

      {!isOrderable && (
        <StoreClosedCard periodLabel={availability.closedPeriodLabel} />
      )}

      <InfoTable rows={infoRows} />

      {!isOrderable && (
        <div className="pt-1">
          <ReopenNotifyCard data={data} />
        </div>
      )}
    </div>
  );
};

export default TopInfo;
