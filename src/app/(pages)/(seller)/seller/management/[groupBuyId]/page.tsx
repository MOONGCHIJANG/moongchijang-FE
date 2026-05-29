import Header from '@/components/Header';
import { ManageDetailClient } from './_components/ManageDetailClient';

type Props = {
  params: Promise<{ groupBuyId: string }>;
  searchParams: Promise<{ name?: string; price?: string }>;
};

export default async function SellerManagementDetailPage({
  params,
  searchParams,
}: Props) {
  const { groupBuyId } = await params;
  const { name, price } = await searchParams;

  return (
    <div className="flex min-h-full flex-col">
      <Header text={name ?? '공구 상세'} />
      <ManageDetailClient
        groupBuyId={Number(groupBuyId)}
        unitPrice={price ? Number(price) : undefined}
      />
    </div>
  );
}
