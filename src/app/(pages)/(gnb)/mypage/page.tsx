import Header from '@/components/Header';
import MyPageClient from './_components/MyPageClient';

export default function MyPage() {
  return (
    <>
      <Header text="마이페이지" showBackButton={false} />
      <MyPageClient />
    </>
  );
}
