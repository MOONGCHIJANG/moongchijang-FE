import type { Metadata } from 'next';
import './globals.css';
import IconsSetup from '@/components/IconsSetup';
import { QueryProvider } from '@/providers/QueryProvider';

export const metadata: Metadata = {
  title: '뭉치장 어드민',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body>
        <IconsSetup />
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}
