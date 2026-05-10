import { redirect } from 'next/navigation';
import PaymentFailClient from './_components/PaymentFailClient';

interface Props {
  searchParams: Promise<{ errorCode?: string; groupBuyId?: string }>;
}

const page = async ({ searchParams }: Props) => {
  const { errorCode, groupBuyId } = await searchParams;

  if (!errorCode) redirect('/feed');
  if (!groupBuyId) redirect('/feed');

  return <PaymentFailClient errorCode={errorCode} groupBuyId={groupBuyId} />;
};

export default page;
