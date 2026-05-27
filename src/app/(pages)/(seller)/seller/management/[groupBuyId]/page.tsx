type Props = {
  params: Promise<{ groupBuyId: string }>;
};

export default async function SellerManagementDetailPage({ params }: Props) {
  const { groupBuyId } = await params;

  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-2 px-5 pt-20 text-center">
      <p className="heading-sm-bold text-text-basic">공구 관리 상세</p>
      <p className="body-sm-regular text-text-secondary">{groupBuyId}</p>
    </div>
  );
}
