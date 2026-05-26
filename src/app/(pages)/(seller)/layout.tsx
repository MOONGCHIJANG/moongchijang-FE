import { SellerGNB } from '@/components/SellerGNB';

export default function SellerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative mx-auto flex h-dvh w-full min-w-[360px] max-w-[440px] flex-col overflow-hidden bg-bg-white-muted">
      <main className="flex-1 overflow-y-auto">{children}</main>
      <footer className="w-full">
        <SellerGNB />
      </footer>
    </div>
  );
}
