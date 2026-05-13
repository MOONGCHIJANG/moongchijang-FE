import React from 'react';
import TopInfo from './_components/TopInfo';
import ItemDetail from './_components/ItemDetail';
import BottomJoin from './_components/BottomJoin';
import { serverFetch } from '@/lib/fetcher';
import type { ApiResponseGroupBuyDetailResponse } from '@/api/generated/api.schemas';
import { notFound } from 'next/navigation';
import ViewerToast from './_components/ViewerToast';
import Footer from '@/components/Footer';

interface Props {
  params: Promise<{ groupBuyId: string }>;
}

const page = async ({ params }: Props) => {
  const { groupBuyId } = await params;
  const responseData = await serverFetch<ApiResponseGroupBuyDetailResponse>(
    `/api/v1/group-buys/${groupBuyId}`,
  ).catch(() => notFound());

  const { data } = responseData;

  return (
    <div>
      <ViewerToast />
      <TopInfo data={data} />
      <ItemDetail data={data} />
      <BottomJoin data={data} />
      <Footer />
    </div>
  );
};

export default page;
