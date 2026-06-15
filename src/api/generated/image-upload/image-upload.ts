/* /* eslint-disable *\/ */
/**
 * // 이 파일은 Orval이 자동 생성합니다. 직접 수정하지 마세요.
 */
import type {
  ApiResponseImageDelete,
  ApiResponseImagePresignedUpload,
  BadRequestResponse,
  ImageDeleteRequest,
  ImagePresignedUploadRequest,
  UnauthorizedResponse,
} from '../api.schemas';

import { customFetch } from '../../../lib/custom-fetch';

/**
 * 인증된 사용자의 현재 역할이 BUYER, SELLER, ADMIN 중 하나이면 호출할 수 있다.
썸네일(최대 1장), 상품 이미지(최대 10장)에 대한 업로드 URL을 발급한다.

 * @summary S3 이미지 업로드용 Presigned URL 발급
 */
export type postApiV1ImagesPresignedUrlsResponse200 = {
  data: ApiResponseImagePresignedUpload;
  status: 200;
};

export type postApiV1ImagesPresignedUrlsResponse400 = {
  data: BadRequestResponse;
  status: 400;
};

export type postApiV1ImagesPresignedUrlsResponse401 = {
  data: UnauthorizedResponse;
  status: 401;
};

export type postApiV1ImagesPresignedUrlsResponseSuccess =
  postApiV1ImagesPresignedUrlsResponse200 & {
    headers: Headers;
  };
export type postApiV1ImagesPresignedUrlsResponseError = (
  | postApiV1ImagesPresignedUrlsResponse400
  | postApiV1ImagesPresignedUrlsResponse401
) & {
  headers: Headers;
};

export type postApiV1ImagesPresignedUrlsResponse =
  | postApiV1ImagesPresignedUrlsResponseSuccess
  | postApiV1ImagesPresignedUrlsResponseError;

export const getPostApiV1ImagesPresignedUrlsUrl = () => {
  return `/api/v1/images/presigned-urls`;
};

export const postApiV1ImagesPresignedUrls = async (
  imagePresignedUploadRequest: ImagePresignedUploadRequest,
  options?: RequestInit,
): Promise<postApiV1ImagesPresignedUrlsResponse> => {
  return customFetch<postApiV1ImagesPresignedUrlsResponse>(
    getPostApiV1ImagesPresignedUrlsUrl(),
    {
      ...options,
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...options?.headers },
      body: JSON.stringify(imagePresignedUploadRequest),
    },
  );
};

/**
 * 인증된 사용자의 현재 역할이 BUYER, SELLER, ADMIN 중 하나이면 호출할 수 있다.
요청한 S3 key 목록을 삭제한다. 허용된 prefix 범위의 key만 삭제 가능하다.

 * @summary S3 업로드 이미지 삭제
 */
export type deleteApiV1ImagesResponse200 = {
  data: ApiResponseImageDelete;
  status: 200;
};

export type deleteApiV1ImagesResponse400 = {
  data: BadRequestResponse;
  status: 400;
};

export type deleteApiV1ImagesResponse401 = {
  data: UnauthorizedResponse;
  status: 401;
};

export type deleteApiV1ImagesResponseSuccess = deleteApiV1ImagesResponse200 & {
  headers: Headers;
};
export type deleteApiV1ImagesResponseError = (
  | deleteApiV1ImagesResponse400
  | deleteApiV1ImagesResponse401
) & {
  headers: Headers;
};

export type deleteApiV1ImagesResponse =
  | deleteApiV1ImagesResponseSuccess
  | deleteApiV1ImagesResponseError;

export const getDeleteApiV1ImagesUrl = () => {
  return `/api/v1/images`;
};

export const deleteApiV1Images = async (
  imageDeleteRequest: ImageDeleteRequest,
  options?: RequestInit,
): Promise<deleteApiV1ImagesResponse> => {
  return customFetch<deleteApiV1ImagesResponse>(getDeleteApiV1ImagesUrl(), {
    ...options,
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json', ...options?.headers },
    body: JSON.stringify(imageDeleteRequest),
  });
};
