import Header from '@/components/Header';
import { RefundDetailClient } from './_components/RefundDetailClient';

type Props = {
  params: Promise<{ participationId: string }>;
};

export default async function RefundDetailPage({ params }: Props) {
  const { participationId } = await params;

  return (
    <div className="flex min-h-full flex-col bg-bg-white-muted">
      <Header text="환불 요청 상세" />
      <RefundDetailClient participationId={Number(participationId)} />
    </div>
  );
}
