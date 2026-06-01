import type { Metadata, Viewport } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { QueryProvider } from '@/providers/QueryProvider';
import IconsSetup from '@/components/IconsSetup';
import AuthInitializer from '@/components/AuthInitializer';
import IOSScrollReset from '@/components/IOSScrollReset';
import Script from 'next/script';
import { PostHogProvider } from './_components/PostHogProvider';
import { Analytics } from './_components/Analytics';
import KakaoInit from '@/components/KakaoInit';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: 'cover',
  themeColor: '#ffffff',
};

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? 'https://moongchijang.com',
  ),
  title: {
    default: '뭉치장',
    template: '%s | 뭉치장',
  },
  description: '동네 공구 플랫폼 뭉치장에서 주변 공구를 찾아보세요.',
  icons: {
    icon: [
      { url: '/favicon/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon/favicon-96x96.png', sizes: '96x96', type: 'image/png' },
    ],
  },
  openGraph: {
    title: '뭉치장',
    description: '동네 공구 플랫폼 뭉치장에서 주변 공구를 찾아보세요.',
    siteName: '뭉치장',
    type: 'website',
    locale: 'ko_KR',
    url: '/',
    images: [
      {
        url: '/og/og-1200x630.png',
        width: 1200,
        height: 630,
        alt: '뭉치장 - 동네 공구 플랫폼',
      },
      {
        url: '/og/og-1200x675.png',
        width: 1200,
        height: 675,
        alt: '뭉치장 - 동네 공구 플랫폼',
      },
      {
        url: '/og/og-1600x800.png',
        width: 1600,
        height: 800,
        alt: '뭉치장 - 동네 공구 플랫폼',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '뭉치장',
    description: '동네 공구 플랫폼 뭉치장에서 주변 공구를 찾아보세요.',
    images: [
      {
        url: '/og/og-1600x800.png',
        width: 1600,
        height: 800,
        alt: '뭉치장 - 동네 공구 플랫폼',
      },
    ],
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: '뭉치장',
  },
  formatDetection: {
    telephone: false,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ko"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased bg-bg-white-muted`}
      suppressHydrationWarning
    >
      <script
        dangerouslySetInnerHTML={{
          __html: `try{if(window.matchMedia('(display-mode:standalone)').matches||navigator.standalone){document.documentElement.classList.add('pwa');}}catch(e){}`,
        }}
      />
      <body className="min-h-dvh flex flex-col mx-auto max-w-110">
        {process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID &&
          process.env.NODE_ENV !== 'development' && (
            <>
              <Script
                src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}`}
                strategy="afterInteractive"
              />
              <Script id="google-analytics" strategy="afterInteractive">
                {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}');
              `}
              </Script>
            </>
          )}
        <IOSScrollReset />
        <IconsSetup />
        <KakaoInit />
        <PostHogProvider>
          <Analytics />
          <QueryProvider>
            <AuthInitializer />
            {children}
          </QueryProvider>
        </PostHogProvider>
      </body>
    </html>
  );
}
