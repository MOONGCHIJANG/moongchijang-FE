import { redirect } from 'next/navigation';
import Header from '@/components/Header';
import { getGroupBuyDetail } from '../../_lib/getGroupBuyDetail';
import { getTodayKeyKST } from '../../_lib/pickupDates';
import { parsePickupSelection } from '../../_lib/pickupSelection';
import SoloCheckoutClient from './_components/SoloCheckoutClient';

interface Props {
  params: Promise<{ groupBuyId: string }>;
  searchParams: Promise<{ date?: string; time?: string }>;
}

/** 혼자 사기 결제 — ?date=&time= 필수, 없거나 선택 불가한 일시면 픽업 일시 선택으로 */
const page = async ({ params, searchParams }: Props) => {
  const { groupBuyId } = await params;
  const { date, time } = await searchParams;

  const selection = parsePickupSelection(date, time, getTodayKeyKST());
  if (!selection) redirect(`/item/${groupBuyId}/solo`);

  const groupBuy = await getGroupBuyDetail(groupBuyId);

  return (
    <>
      <Header text="결제하기" />
      <SoloCheckoutClient groupBuy={groupBuy} selection={selection} />
    </>
  );
};

export default page;
