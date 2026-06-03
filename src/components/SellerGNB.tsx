'use client';

import { Icon } from '@iconify/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const TABS = [
  { id: 'home', label: '홈', icon: 'fa7-solid:home', href: '/seller' },
  {
    id: 'management',
    label: '공구관리',
    icon: 'bi:bag-plus-fill',
    href: '/seller/management',
  },
  {
    id: 'settlement',
    label: '정산',
    icon: 'material-symbols:money-bag-rounded',
    href: '/seller/settlement',
  },
  {
    id: 'mypage',
    label: '마이페이지',
    icon: 'fluent:person-20-filled',
    href: '/seller/mypage',
  },
] as const;

type Tab = (typeof TABS)[number];

const HIDDEN_PATHS = [/^\/seller\/management\/[^/]+/];

export const SellerGNB = () => {
  const pathname = usePathname();

  if (HIDDEN_PATHS.some((pattern) => pattern.test(pathname))) return null;

  const renderTab = (tab: Tab) => {
    const isActive =
      tab.href === '/seller'
        ? pathname === '/seller'
        : pathname.startsWith(tab.href);
    const colorClass = isActive ? 'text-icon-basic' : 'text-icon-disabled';

    return (
      <Link
        key={tab.id}
        href={tab.href}
        className={`inline-flex min-w-[56px] flex-col items-center justify-center gap-0.5 ${colorClass} transition-colors`}
      >
        <div className="relative flex h-6 w-6 items-center justify-center">
          <Icon icon={tab.icon} className="h-6 w-6" />
        </div>
        <div className="whitespace-nowrap text-center body-sm-medium">
          {tab.label}
        </div>
      </Link>
    );
  };

  return (
    <nav className="inline-flex w-full min-w-[360px] max-w-[440px] h-[58px] items-center justify-around px-4 rounded-t-2xl bg-white py-1 shadow-[0_-6px_8px_rgba(0,0,0,0.05)]">
      {TABS.map(renderTab)}
    </nav>
  );
};
