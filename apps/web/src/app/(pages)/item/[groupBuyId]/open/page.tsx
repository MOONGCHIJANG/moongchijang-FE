import { notFound } from 'next/navigation';
import { serverFetch } from '@moongchijang/api-client/fetcher';
import { getServerAccessToken } from '@moongchijang/api-client/server-auth';
import type { ApiResponseGroupBuyDetailResponse } from '@moongchijang/api-client/generated/api.schemas';
import Header from '@/components/Header';
import OpenPageClient from './_components/OpenPageClient';
import { getTodayKeyKST } from './_lib/pickupDates';

interface Props {
  params: Promise<{ groupBuyId: string }>;
}

/**
 * 같이 사기 (내가 공구 방을 여는 흐름)
 * 픽업 날짜·시간 선택 → 결제 마감 안내 → 추가 선택 바텀시트
 */
const page = async ({ params }: Props) => {
  const { groupBuyId } = await params;
  const token = await getServerAccessToken();
  const responseData = await serverFetch<ApiResponseGroupBuyDetailResponse>(
    `/api/v1/group-buys/${groupBuyId}`,
    token,
  ).catch(() => notFound());

  return (
    <>
      <Header text="픽업 일시" />
      <OpenPageClient
        groupBuy={responseData.data}
        todayKey={getTodayKeyKST()}
      />
    </>
  );
};

export default page;
