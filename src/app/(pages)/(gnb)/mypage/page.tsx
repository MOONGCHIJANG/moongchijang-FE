import { cookies } from 'next/headers';
import Header from '@/components/Header';
import MyPageClient from './_components/MyPageClient';

type TabKey = 'active' | 'waiting' | 'completed' | 'refunded';

export default async function MyPage({
  searchParams,
}: {
  searchParams: Promise<{ tab?: string }>;
}) {
  const [{ tab }, cookieStore] = await Promise.all([searchParams, cookies()]);
  const isLoggedIn = !!cookieStore.get('accessToken')?.value;
  const validTabs: TabKey[] = ['active', 'waiting', 'completed', 'refunded'];
  const activeTab: TabKey = validTabs.includes(tab as TabKey)
    ? (tab as TabKey)
    : 'active';

  return (
    <>
      <Header text="마이페이지" showBackButton={false} />
      <MyPageClient tab={activeTab} isLoggedIn={isLoggedIn} />
    </>
  );
}
