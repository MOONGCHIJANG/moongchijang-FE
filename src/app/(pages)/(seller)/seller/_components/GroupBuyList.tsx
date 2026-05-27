import type { ApiResponseOwnerGroupBuyListDataItem } from '@/api/generated/api.schemas';
import { GroupBuyItem } from './GroupBuyItem';

type Props = {
  groupBuys: ApiResponseOwnerGroupBuyListDataItem[];
};

export function GroupBuyList({ groupBuys }: Props) {
  return (
    <section className="flex flex-col gap-3">
      <h2 className="heading-sm-bold text-text-basic">진행 중 공구</h2>
      {groupBuys.length === 0 ? (
        <p className="body-sm-regular py-6 text-center text-text-secondary">
          진행 중인 공구가 없어요
        </p>
      ) : (
        groupBuys.map((item) => (
          <GroupBuyItem key={item.groupBuyId} item={item} />
        ))
      )}
    </section>
  );
}
