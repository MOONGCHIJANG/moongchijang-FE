export const dynamic = 'force-dynamic';

import Header from '@/components/Header';
import MyPageClient from './_components/MyPageClient';

type TabKey = 'active' | 'waiting' | 'completed' | 'refunded';

export default async function MyPage({
  searchParams,
}: {
  searchParams: Promise<{ tab?: string }>;
}) {
  const { tab } = await searchParams;
  const validTabs: TabKey[] = ['active', 'waiting', 'completed', 'refunded'];
  const activeTab: TabKey = validTabs.includes(tab as TabKey)
    ? (tab as TabKey)
    : 'active';

  return (
    <>
      <Header text="마이페이지" />
      <MyPageClient tab={activeTab} />
    </>
  );
}
