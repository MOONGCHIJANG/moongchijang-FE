import { Suspense } from 'react';
import { SettlementClient } from './_components/SettlementClient';

export default function SellerSettlementPage() {
  return (
    <Suspense
      fallback={<div className="flex min-h-full flex-col bg-bg-white-muted" />}
    >
      <SettlementClient />
    </Suspense>
  );
}
