import { redirect } from 'next/navigation';
import PaymentFailClient from './_components/PaymentFailClient';

interface Props {
  searchParams: Promise<{ errorCode?: string }>;
}

const page = async ({ searchParams }: Props) => {
  const { errorCode } = await searchParams;

  if (!errorCode) redirect('/feed');

  return <PaymentFailClient errorCode={errorCode} />;
};

export default page;
