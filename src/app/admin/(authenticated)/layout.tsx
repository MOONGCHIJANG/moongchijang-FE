'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Icon } from '@iconify/react';
import { AdminSidebar } from '../_components/AdminSidebar';
import { tokenStorage } from '@/lib/token';
import { useAuthStore } from '@/store/authStore';
import { usePostApiV1AuthLogout } from '@/api/hooks/auth/auth';

export default function AdminAuthenticatedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const router = useRouter();
  const setIsLoggedIn = useAuthStore((s) => s.setIsLoggedIn);
  const { mutate: logout } = usePostApiV1AuthLogout();

  function handleLogout() {
    logout(undefined, {
      onSettled: () => {
        tokenStorage.remove();
        document.cookie = 'isAdmin=; path=/; SameSite=Strict; Max-Age=0';
        setIsLoggedIn(false);
        router.push('/admin/login');
      },
    });
  }

  return (
    <div className="flex h-full flex-col">
      <header className="flex h-12 shrink-0 items-center justify-between border-b border-gray-200 bg-white px-4">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setSidebarOpen((prev) => !prev)}
            className="flex h-8 w-8 items-center justify-center rounded hover:bg-gray-100"
          >
            <Icon
              icon={sidebarOpen ? 'lucide:chevron-left' : 'lucide:menu'}
              className="h-5 w-5 text-gray-600"
            />
          </button>
          <span className="text-sm font-semibold text-gray-800">
            뭉치장 어드민
          </span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-500">운영자</span>
          <button
            type="button"
            onClick={handleLogout}
            className="text-sm text-gray-400 hover:text-gray-700"
          >
            로그아웃
          </button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        <AdminSidebar open={sidebarOpen} />
        <main className="flex-1 overflow-auto bg-gray-50 p-6">{children}</main>
      </div>
    </div>
  );
}
