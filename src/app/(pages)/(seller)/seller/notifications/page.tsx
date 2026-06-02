import { cookies } from 'next/headers';
import { notFound } from 'next/navigation';
import { serverFetch } from '@/lib/fetcher';
import { ApiResponseNotificationListResponse } from '@/api/generated/api.schemas';
import { SellerNoticeClient } from './_components/SellerNoticeClient';

export default async function SellerNotificationsPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get('accessToken')?.value;

  const responseData = await serverFetch<ApiResponseNotificationListResponse>(
    `/api/v1/notifications`,
    token,
  ).catch(() => notFound());

  if (!responseData.data) return notFound();

  return <SellerNoticeClient initialData={responseData.data} />;
}
