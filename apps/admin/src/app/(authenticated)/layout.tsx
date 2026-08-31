'use client';

import { useRouter } from 'next/navigation';
import { AdminSidebar } from '../_components/AdminSidebar';
import { tokenStorage } from '@moongchijang/api-client/token';
import { useAuthStore } from '@moongchijang/api-client/authStore';

export default function AdminAuthenticatedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const setIsLoggedIn = useAuthStore((s) => s.setIsLoggedIn);

  async function handleLogout() {
    await fetch('/api/v1/auth/logout', { method: 'POST' }).catch(() => {});
    tokenStorage.remove();
    setIsLoggedIn(false);
    router.push('/login');
  }

  return (
    <div className="flex h-screen">
      <AdminSidebar onLogout={handleLogout} />
      <main className="flex-1 overflow-auto bg-bg-white-muted p-6">
        {children}
      </main>
    </div>
  );
}
