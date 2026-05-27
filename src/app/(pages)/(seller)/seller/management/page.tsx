import Link from 'next/link';
import { ManagementClient } from './_components/ManagementClient';

export default function SellerManagementPage() {
  return (
    <div className="flex min-h-full flex-col bg-bg-white-muted">
      {/* 헤더 */}
      <header className="sticky top-0 z-10 flex items-center justify-between bg-surface-white px-5 py-4">
        <h1 className="heading-sm-bold text-text-basic">공구 관리</h1>
        <Link
          href="/seller/management/create"
          className="flex items-center gap-1 rounded-lg bg-brand-primary px-3 py-2 caption-sm-bold text-text-basic-inverse"
        >
          + 공구 개설
        </Link>
      </header>

      <ManagementClient />
    </div>
  );
}
