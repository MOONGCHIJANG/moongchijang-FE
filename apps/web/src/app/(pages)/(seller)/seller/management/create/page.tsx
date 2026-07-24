import Header from '@/components/Header';
import { CreateGroupBuyClient } from './_components/CreateGroupBuyClient';

export default function SellerManagementCreatePage() {
  return (
    <div className="flex min-h-full flex-col bg-white">
      <Header text="공구 개설" showBackButton />
      <CreateGroupBuyClient />
    </div>
  );
}
