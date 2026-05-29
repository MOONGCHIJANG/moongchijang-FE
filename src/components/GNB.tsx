'use client';

import { Icon } from '@iconify/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface GNBProps {
  className?: string;
}

const TABS = [
  { id: 'feed', label: '피드', icon: 'fa7-solid:home', href: '/feed' },
  {
    id: 'request',
    label: '공구요청',
    icon: 'bi:bag-plus-fill',
    href: '/request',
  },
  { id: 'favorite', label: '찜', icon: 'solar:heart-bold', href: '/favorite' },
  {
    id: 'mypage',
    label: '마이페이지',
    icon: 'fluent:person-20-filled',
    href: '/mypage',
  },
] as const;

export const GNB = ({ className = '' }: GNBProps) => {
  const pathname = usePathname();

  return (
    <nav
      className={`flex flex-col w-full min-w-[360px] max-w-[440px] rounded-t-2xl bg-white shadow-[0_-6px_8px_rgba(0,0,0,0.05)] ${className}`}
    >
      <div className="flex h-[58px] items-center justify-around px-4">
        {TABS.map((tab) => {
          const isActive =
            pathname === tab.href ||
            (pathname?.startsWith(`${tab.href}/`) ?? false);
          const colorClass = isActive
            ? 'text-icon-basic'
            : 'text-icon-disabled';

          return (
            <Link
              key={tab.id}
              href={tab.href}
              className={`inline-flex min-w-[56px] flex-col items-center justify-center gap-0.5 ${colorClass} transition-colors`}
            >
              <div className="relative flex h-6 w-6 items-center justify-center overflow-hidden">
                <Icon icon={tab.icon} className="h-6 w-6" />
              </div>
              <div className="whitespace-nowrap text-center body-sm-medium">
                {tab.label}
              </div>
            </Link>
          );
        })}
      </div>
      <div style={{ height: 'env(safe-area-inset-bottom, 0px)' }} />
    </nav>
  );
};
