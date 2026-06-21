'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Icon } from '@iconify/react';

const MENU = [
  {
    label: '대시보드',
    icon: 'lucide:layout-dashboard',
    href: '/admin/dashboard',
  },
  {
    label: '환불 요청 관리',
    icon: 'lucide:refresh-ccw',
    href: '/admin/refunds',
  },
  {
    label: '공구 개설 요청',
    icon: 'lucide:shopping-bag',
    href: '/admin/group-buy-requests',
  },
  {
    label: 'CS 티켓 관리',
    icon: 'lucide:headphones',
    href: '/admin/cs-tickets',
  },
  {
    label: '발주 관리',
    icon: 'lucide:package',
    href: '/admin/orders',
  },
  {
    label: '정산 현황',
    icon: 'lucide:bar-chart-2',
    href: '/admin/settlements',
  },
];

export function AdminSidebar({ open }: { open: boolean }) {
  const pathname = usePathname();

  return (
    <aside
      className={`${open ? 'w-52' : 'w-14'} shrink-0 overflow-hidden border-r border-gray-200 bg-white transition-all duration-200`}
    >
      <nav className="flex flex-col py-2">
        {MENU.map((item) => {
          const isActive = pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 transition-colors ${
                isActive
                  ? 'bg-blue-50 text-blue-600'
                  : 'text-gray-500 hover:bg-gray-50 hover:text-gray-800'
              }`}
            >
              <Icon icon={item.icon} className="h-5 w-5 shrink-0" />
              {open && (
                <span className="whitespace-nowrap text-sm font-medium">
                  {item.label}
                </span>
              )}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
