import Header from '@/components/Header';
import { getGroupBuyDetail } from '../_lib/getGroupBuyDetail';
import { getTodayKeyKST } from '../_lib/pickupDates';
import SoloPageClient from './_components/SoloPageClient';

interface Props {
  params: Promise<{ groupBuyId: string }>;
}

/**
 * 혼자 사기 — 픽업 일시 선택 → 결제(/solo/checkout)
 * ?date=&time= 이 있으면 미리 선택 (결제 화면에서 '변경'으로 돌아온 경우)
 */
const page = async ({ params }: Props) => {
  const { groupBuyId } = await params;
  const groupBuy = await getGroupBuyDetail(groupBuyId);

  return (
    <>
      <Header text="픽업 일시" />
      <SoloPageClient groupBuy={groupBuy} todayKey={getTodayKeyKST()} />
    </>
  );
};

export default page;
