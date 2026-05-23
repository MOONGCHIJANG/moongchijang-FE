import React from 'react';
import NoticeClient from './_components/NoticeClient';
import { serverFetch } from '@/lib/fetcher';
import { ApiResponseNotificationPage } from '@/api/generated/api.schemas';
import { notFound } from 'next/navigation';
import { cookies } from 'next/headers';

const page = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get('accessToken')?.value;

  const responseData = await serverFetch<ApiResponseNotificationPage>(
    `/api/v1/notifications`,
    token,
  ).catch(() => notFound());

  const notifications = responseData?.data;

  return (
    <>
      <NoticeClient data={notifications} />
    </>
  );
};

export default page;
