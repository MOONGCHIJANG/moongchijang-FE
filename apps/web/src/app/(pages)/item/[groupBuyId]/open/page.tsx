import Header from '@/components/Header';
import { getGroupBuyDetail } from '../_lib/getGroupBuyDetail';
import { getTodayKeyKST } from '../_lib/pickupDates';
import { parsePickupSelection } from '../_lib/pickupSelection';
import OpenPageClient from './_components/OpenPageClient';

interface Props {
  params: Promise<{ groupBuyId: string }>;
  searchParams: Promise<{ date?: string; time?: string; sheet?: string }>;
}

/**
 * 같이 사기 (내가 공구 방을 여는 흐름)
 * 픽업 날짜·시간 선택 → 결제 마감 안내 → 추가 선택 바텀시트
 *
 * ?date=&time= : 픽업 일시 미리 선택
 * &sheet=1     : 바텀시트까지 바로 열기 (혼자 사기 결제 화면 '뭉쳐서 사기')
 */
const page = async ({ params, searchParams }: Props) => {
  const { groupBuyId } = await params;
  const { date, time, sheet } = await searchParams;
  const groupBuy = await getGroupBuyDetail(groupBuyId);
  const todayKey = getTodayKeyKST();

  return (
    <>
      <Header text="픽업 일시" />
      <OpenPageClient
        groupBuy={groupBuy}
        todayKey={todayKey}
        initialSheetSelection={
          sheet === '1' ? parsePickupSelection(date, time, todayKey) : null
        }
      />
    </>
  );
};

export default page;
