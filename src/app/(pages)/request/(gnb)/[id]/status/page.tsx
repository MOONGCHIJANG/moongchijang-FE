import { RequestStatusClient } from '../../../_components/RequestStatusClient';

interface Props {
  params: Promise<{ id: string }>;
}

export default async function RequestStatusPage({ params }: Props) {
  const { id } = await params;
  return <RequestStatusClient requestId={Number(id)} />;
}
