import { redirect } from 'next/navigation';
import PaymentRedirectClient from './_components/PaymentRedirectClient';

interface Props {
  searchParams: Promise<{
    paymentId?: string;
    participationId?: string;
    amount?: string;
    groupBuyId?: string;
    code?: string;
    message?: string;
  }>;
}

const page = async ({ searchParams }: Props) => {
  const params = await searchParams;

  if (!params.paymentId) redirect('/feed');

  return <PaymentRedirectClient {...params} />;
};

export default page;
