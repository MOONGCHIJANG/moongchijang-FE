import { Icon } from '@iconify/react';
import type { ApiResponseGroupBuyDetailResponseData } from '@/api/generated/api.schemas';
import { formatPickupDateTimeRange } from '@/lib/date';

type Props = {
  groupBuy: ApiResponseGroupBuyDetailResponseData;
};

const ItemSummary = ({ groupBuy }: Props) => {
  return (
    <div className="p-p5 flex flex-col gap-1 rounded-2xlarge bg-surface-white border border-border-subtle">
      <p className="heading-md-bold">픽업 안내</p>
      <div className="flex flex-col divide-y divide-dashed divide-border-subtle">
        <div className="pt-g3 pb-p5 flex justify-between gap-g3">
          <div className="flex shrink-0 gap-g3 items-center">
            <Icon
              icon="teenyicons:pin-alt-solid"
              className="w-4 h-4 text-icon-primary"
            />
            <p className="text-text-brand body-md-bold">픽업 장소</p>
          </div>
          <p className="min-w-0 flex-1 text-right body-md-regular wrap-break-word line-clamp-2">
            {groupBuy.pickupLocation}
          </p>
        </div>
        <div className="pt-g3 pb-p5 flex justify-between gap-g3">
          <div className="flex shrink-0 gap-g3 items-center">
            <Icon
              icon="mingcute:time-fill"
              className="w-4 h-4 text-icon-primary"
            />
            <p className="text-text-brand body-md-bold">픽업 일시</p>
          </div>
          <p className="min-w-0 flex-1 text-right body-md-regular wrap-break-word">
            {formatPickupDateTimeRange(
              groupBuy.pickupDate,
              groupBuy.pickupTimeStart,
              groupBuy.pickupTimeEnd,
            )}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ItemSummary;
