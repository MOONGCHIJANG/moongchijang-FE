import { redirect } from 'next/navigation';
import PaymentCompleteClient from './_components/PaymentCompleteClient';

interface Props {
  searchParams: Promise<{ participationId?: string }>;
}

const page = async ({ searchParams }: Props) => {
  const { participationId } = await searchParams;

  if (!participationId) redirect('/feed');

  return <PaymentCompleteClient participationId={participationId} />;
};

export default page;
