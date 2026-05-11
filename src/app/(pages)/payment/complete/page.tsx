import { redirect } from 'next/navigation';
import PaymentCompleteClient from './_components/PaymentCompleteClient';

interface Props {
  searchParams: Promise<{ participationId?: string; groupBuyId?: string }>;
}

const page = async ({ searchParams }: Props) => {
  const { participationId, groupBuyId } = await searchParams;

  if (!participationId) redirect('/feed');
  if (!groupBuyId) redirect('/feed');

  return (
    <PaymentCompleteClient
      participationId={participationId}
      groupBuyId={groupBuyId}
    />
  );
};

export default page;
