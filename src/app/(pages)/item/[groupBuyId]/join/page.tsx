import React from 'react';
import JoinPageClient from './_components/JoinPageClient';
import { serverFetch } from '@/lib/fetcher';
import type { ApiResponseGroupBuyDetailResponse } from '@/api/generated/api.schemas';
import { notFound } from 'next/navigation';
import Header from '@/components/Header';

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
      <Header text="참여하기" />
      <JoinPageClient groupBuyId={groupBuyId} groupBuy={data} />
    </>
  );
};

export default page;
