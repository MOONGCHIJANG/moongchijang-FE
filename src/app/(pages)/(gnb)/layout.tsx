import { GNB } from '@/components/GNB';

export default function GnbLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="relative mx-auto w-full min-w-[360px] max-w-[440px] overflow-x-hidden bg-bg-white-muted"
      style={{ paddingTop: 'env(safe-area-inset-top, 0px)' }}
    >
      <main
        className="min-h-dvh overscroll-none"
        style={{ paddingBottom: '58px' }}
      >
        {children}
      </main>
      <GNB />
    </div>
  );
}
