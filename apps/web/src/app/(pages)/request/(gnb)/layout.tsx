import { GNB } from '@/components/GNB';

export default function RequestGnbLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative mx-auto flex h-dvh w-full min-w-[360px] max-w-[440px] flex-col overflow-x-hidden bg-bg-white-muted">
      <main className="gnb-content flex-1 overflow-y-auto overscroll-none">
        {children}
      </main>
      <GNB />
    </div>
  );
}
