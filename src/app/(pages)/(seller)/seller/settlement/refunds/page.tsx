import Header from '@/components/Header';
import { RefundRequestsClient } from './_components/RefundRequestsClient';

export default function RefundRequestsPage() {
  return (
    <div className="flex min-h-full flex-col bg-bg-white-muted">
      <Header text="환불 요청 확인" />
      <RefundRequestsClient />
    </div>
  );
}
