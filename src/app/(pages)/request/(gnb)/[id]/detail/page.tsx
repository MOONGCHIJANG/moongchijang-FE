import { RequestDetailClient } from '../../../_components/RequestDetailClient';

interface Props {
  params: Promise<{ id: string }>;
}

export default async function RequestDetailPage({ params }: Props) {
  const { id } = await params;
  return <RequestDetailClient requestId={Number(id)} />;
}
