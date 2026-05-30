import { GNB } from '@/components/GNB';

export default function GnbLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="relative mx-auto w-full min-w-[360px] max-w-[440px] overflow-x-hidden bg-bg-white-muted"
    >
      <main className="gnb-content min-h-dvh overscroll-none">
        {children}
      </main>
      <GNB />
    </div>
  );
}
