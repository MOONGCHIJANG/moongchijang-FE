'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Icon } from '@iconify/react';
import { Button } from '@moongchijang/ui';
import { useEffect, useRef, useState } from 'react';
import { useAdminIdentityStore } from '@/store/adminIdentityStore';

const MENU = [
  {
    label: '대시보드',
    icon: 'mage:dashboard',
    href: '/dashboard',
  },
  {
    label: '환불 요청',
    icon: 'figma:refund-refresh',
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
  onLogout: () => void;
}

export function AdminSidebar({ onLogout }: AdminSidebarProps) {
  const pathname = usePathname();
  const adminName = useAdminIdentityStore((s) => s.name);
  const [isAccountMenuOpen, setIsAccountMenuOpen] = useState(false);
  const accountMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isAccountMenuOpen) return;

    function handlePointerDown(event: MouseEvent) {
      if (!accountMenuRef.current?.contains(event.target as Node)) {
        setIsAccountMenuOpen(false);
      }
    }
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') setIsAccountMenuOpen(false);
    }

    document.addEventListener('mousedown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isAccountMenuOpen]);

  return (
    <aside className="flex shrink-0 flex-col items-center justify-between border-r border-gray-100 bg-bg-white px-[22px] py-[50px]">
      <div className="flex flex-col items-center gap-g9">
        {/* next/image의 /_next/image 최적화 프록시는 기본적으로 svg를 허용하지 않아
            next start(프로덕션)에서 400을 반환한다 — 로컬 신뢰 자산이므로 img로 우회 */}
        <div className="flex h-[50px] w-[50px] items-center justify-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/icons/sidebar-logo-mark.svg"
            alt="뭉치장 어드민"
            width={34}
            height={36}
            className="h-9 w-auto"
          />
        </div>
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
                <span className="caption-sm-regular whitespace-nowrap text-text-subtle">
                  {item.label}
                </span>
              </Link>
            );
          })}
        </nav>
      </div>
      <div ref={accountMenuRef} className="relative">
        <button
          type="button"
          onClick={() => setIsAccountMenuOpen((prev) => !prev)}
          aria-haspopup="menu"
          aria-expanded={isAccountMenuOpen}
          aria-label="계정 메뉴"
        >
          <Icon
            icon={
              isAccountMenuOpen
                ? 'figma:account-circle'
                : 'figma:account-circle-outline'
            }
            className="h-[30px] w-[30px] text-gray-500"
          />
        </button>
        {isAccountMenuOpen && (
          <div
            role="menu"
            className="absolute bottom-0 left-full z-50 ml-3 flex w-40 flex-col gap-g3 rounded-large bg-bg-white p-p4 shadow-[1px_2px_10px_0px_rgba(0,0,0,0.1)]"
          >
            <span className="heading-sm-medium px-g2 py-g1 text-text-basic">
              {adminName ? `${adminName}님` : '관리자'}
            </span>
            <Button
              type="button"
              role="menuitem"
              variant="primary"
              size="admin"
              fullWidth
              onClick={() => {
                setIsAccountMenuOpen(false);
                onLogout();
              }}
            >
              로그아웃
            </Button>
          </div>
        )}
      </div>
    </aside>
  );
}
