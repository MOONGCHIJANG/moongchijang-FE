import React from 'react';
import BackHeader from './_components/BackHeader';
import JoinPageClient from './_components/JoinPageClient';

interface Props {
  params: Promise<{ groupBuyId: string }>;
}

const page = async ({ params }: Props) => {
  const { groupBuyId } = await params;

  return (
    <>
      <BackHeader text="참여하기" />
      <JoinPageClient />
    </>
  );
};

export default page;
