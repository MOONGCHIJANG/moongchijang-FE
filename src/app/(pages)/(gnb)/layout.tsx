import { GNB } from '@/components/GNB';

export default function GnbLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative mx-auto flex h-dvh w-full min-w-[360px] max-w-[440px] flex-col overflow-hidden bg-surface-default">
      <main className="flex-1 overflow-y-auto">{children}</main>
      <footer className="w-full">
        <GNB />
      </footer>
    </div>
  );
}
