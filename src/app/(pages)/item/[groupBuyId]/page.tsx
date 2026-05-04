import React from 'react';
import TopInfo from './_components/TopInfo';
import ItemDetail from './_components/ItemDetail';
import BottomJoin from './_components/BottomJoin';
import { getApiV1GroupBuysGroupBuyId } from '@/api/generated/group-buy/group-buy';
import { notFound } from 'next/navigation';
import Footer from '@/components/Footer';

interface Props {
  params: Promise<{ groupBuyId: string }>;
}

const page = async ({ params }: Props) => {
  const { groupBuyId } = await params;
  const response = await getApiV1GroupBuysGroupBuyId(Number(groupBuyId));

  if (response.status === 404) {
    notFound();
  }

  const { data } = response.data;

  return (
    <div>
      <TopInfo data={data} />
      <ItemDetail data={data} />
      <BottomJoin data={data} />
      <Footer />
    </div>
  );
};

export default page;
