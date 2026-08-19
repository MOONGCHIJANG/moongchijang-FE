import { Suspense } from 'react';
import { SellerHomeClient } from './_components/SellerHomeClient';

export default function SellerHomePage() {
  return (
    <Suspense fallback={<div className="flex-1 bg-bg-white-muted" />}>
      <SellerHomeClient />
    </Suspense>
  );
}
