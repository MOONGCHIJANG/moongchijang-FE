import React from 'react';
import BackHeader from './_components/BackHeader';
import JoinPageClient from './_components/JoinPageClient';
import { serverFetch } from '@/lib/fetcher';
import type { ApiResponseGroupBuyDetailResponse } from '@/api/generated/api.schemas';
import { notFound } from 'next/navigation';

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
    <>
      <BackHeader text="참여하기" />
      <JoinPageClient groupBuyId={groupBuyId} groupBuy={data} />
    </>
  );
};

export default page;
