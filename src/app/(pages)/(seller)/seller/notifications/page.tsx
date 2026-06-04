import { notFound } from 'next/navigation';
import { serverFetch } from '@/lib/fetcher';
import { ApiResponseNotificationListResponse } from '@/api/generated/api.schemas';
import { getServerAccessToken } from '@/lib/server-auth';
import { SellerNoticeClient } from './_components/SellerNoticeClient';

export default async function SellerNotificationsPage() {
  const token = await getServerAccessToken();

  const responseData = await serverFetch<ApiResponseNotificationListResponse>(
    `/api/v1/notifications`,
    token,
  ).catch(() => notFound());

  if (!responseData.data) return notFound();

  return <SellerNoticeClient initialData={responseData.data} />;
}
