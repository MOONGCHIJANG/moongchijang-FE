import { redirect } from 'next/navigation';
import { SellerGNB } from '@/components/SellerGNB';
import { getServerUserRole } from '@/lib/server-auth';
import { AuthUserRole } from '@/api/generated/api.schemas';

export default async function SellerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const role = await getServerUserRole();

  if (!role) redirect('/login');
  if (role !== AuthUserRole.SELLER) redirect('/feed');

  return (
    <div className="relative mx-auto flex h-dvh w-full min-w-[360px] max-w-[440px] flex-col overflow-hidden bg-bg-white-muted">
      <main className="flex-1 overflow-y-auto">{children}</main>
      <footer className="w-full">
        <SellerGNB />
      </footer>
    </div>
  );
}
