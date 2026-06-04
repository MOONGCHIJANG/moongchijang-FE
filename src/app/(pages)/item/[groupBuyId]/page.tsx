import React from 'react';
import type { Metadata } from 'next';
import TopInfo from './_components/TopInfo';
import ItemDetail from './_components/ItemDetail';
import BottomJoin from './_components/BottomJoin';
import { serverFetch } from '@/lib/fetcher';
import type { ApiResponseGroupBuyDetailResponse } from '@/api/generated/api.schemas';
import { notFound } from 'next/navigation';
import ViewerToast from './_components/ViewerToast';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { cookies } from 'next/headers';

interface Props {
  params: Promise<{ groupBuyId: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { groupBuyId } = await params;
  try {
    const responseData = await serverFetch<ApiResponseGroupBuyDetailResponse>(
      `/api/v1/group-buys/${groupBuyId}`,
    );
    const data = responseData.data;
    const title = `[뭉치장] ${data.productName} 공구 같이 뭉쳐서 구매하자!`;
    const description = `${data.deadlineDateTimeLabel}까지 · ${data.storeName}`;
    const ogImage = data.thumbnailUrl
      ? { url: data.thumbnailUrl, alt: data.productName }
      : {
          url: '/og/og-1200x630.png',
          width: 1200,
          height: 630,
          alt: data.productName,
        };

    const twitterImage = data.thumbnailUrl
      ? { url: data.thumbnailUrl, alt: data.productName }
      : {
          url: '/og/og-1600x800.png',
          width: 1600,
          height: 800,
          alt: data.productName,
        };

    return {
      title: data.productName,
      openGraph: {
        title,
        description,
        siteName: '뭉치장',
        type: 'website',
        locale: 'ko_KR',
        url: `/item/${groupBuyId}`,
        images: [ogImage],
      },
      twitter: {
        card: 'summary_large_image',
        title,
        description,
        images: [twitterImage],
      },
    };
  } catch {
    return {};
  }
}

const page = async ({ params }: Props) => {
  const { groupBuyId } = await params;
  const token = (await cookies()).get('accessToken')?.value;
  const responseData = await serverFetch<ApiResponseGroupBuyDetailResponse>(
    `/api/v1/group-buys/${groupBuyId}`,
    token,
  ).catch(() => notFound());

  const { data } = responseData;

  return (
    <div>
      <Header />
      <ViewerToast groupBuyId={Number(groupBuyId)} />
      <TopInfo data={data} />
      <ItemDetail data={data} />
      <BottomJoin data={data} />
      <Footer />
    </div>
  );
};

export default page;
