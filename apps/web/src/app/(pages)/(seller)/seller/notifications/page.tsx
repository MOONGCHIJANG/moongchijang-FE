import { notFound } from 'next/navigation';
import { serverFetch } from '@moongchijang/api-client/fetcher';
import { ApiResponseNotificationListResponse } from '@moongchijang/api-client/generated/api.schemas';
import { getServerAccessToken } from '@moongchijang/api-client/server-auth';
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
