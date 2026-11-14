import { notFound } from 'next/navigation';
import { serverFetch } from '@moongchijang/api-client/fetcher';
import { getServerAccessToken } from '@moongchijang/api-client/server-auth';
import type { ApiResponseGroupBuyDetailResponse } from '@moongchijang/api-client/generated/api.schemas';

/** 서버 컴포넌트(page.tsx)용 공구 상세 조회. 실패 시 404 */
export const getGroupBuyDetail = async (groupBuyId: string) => {
  const token = await getServerAccessToken();
  const response = await serverFetch<ApiResponseGroupBuyDetailResponse>(
    `/api/v1/group-buys/${groupBuyId}`,
    token,
  ).catch(() => notFound());
  return response.data;
};
