'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Icon } from '@iconify/react';

const MENU = [
  {
    label: '대시보드',
    icon: 'mage:dashboard',
    href: '/dashboard',
  },
  {
    label: '환불 요청',
    icon: 'iconoir:refresh',
    href: '/refunds',
  },
  {
    label: '공구 개설',
    icon: 'mynaui:store',
    href: '/group-buy-requests',
  },
  {
    label: 'CS 티켓',
    icon: 'mynaui:ticket',
    href: '/cs-tickets',
  },
  {
    label: '발주',
    icon: 'mynaui:truck',
    href: '/orders',
  },
  {
    label: '정산',
    icon: 'streamline-plump:wallet',
    href: '/settlements',
  },
];

interface AdminSidebarProps {
  open: boolean;
  onLogout: () => void;
}

export function AdminSidebar({ open, onLogout }: AdminSidebarProps) {
  const pathname = usePathname();

  return (
    <aside className="flex shrink-0 flex-col items-center justify-between border-r border-gray-100 bg-bg-white px-[22px] py-[50px] transition-all duration-200">
      <div className="flex flex-col items-center gap-g9">
        {/* next/image의 /_next/image 최적화 프록시는 기본적으로 svg를 허용하지 않아
            next start(프로덕션)에서 400을 반환한다 — 로컬 신뢰 자산이므로 img로 우회 */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/icons/sidebar-logo-mark.svg"
          alt="뭉치장 어드민"
          width={34}
          height={36}
          className="h-9 w-auto"
        />
        <nav className="flex flex-col items-center gap-g7">
          {MENU.map((item) => {
            const isActive = pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className="flex flex-col items-center gap-g2"
              >
                <span
                  className={`flex h-[50px] w-[50px] items-center justify-center rounded-large transition-colors ${
                    isActive ? 'bg-primary-50' : 'hover:bg-gray-50'
                  }`}
                >
                  <Icon
                    icon={item.icon}
                    className={`h-6 w-6 shrink-0 ${isActive ? 'text-primary-400' : 'text-gray-500'}`}
                  />
                </span>
                {open && (
                  <span className="caption-sm-regular whitespace-nowrap text-text-subtle">
                    {item.label}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>
      </div>
      <button type="button" onClick={onLogout} aria-label="로그아웃">
        <Icon
          icon="solar:logout-2-linear"
          className="h-[30px] w-[30px] text-gray-500"
        />
      </button>
    </aside>
  );
}
