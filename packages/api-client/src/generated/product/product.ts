/* /* eslint-disable *\/ */
/**
 * // 이 파일은 Orval이 자동 생성합니다. 직접 수정하지 마세요.
 */
import type {
  ApiResponseProductDetail,
  ApiResponseProductFeed,
  ApiResponseProductShare,
  BadRequestResponse,
  GetApiV1ProductsParams,
  NotFoundResponse
} from '../api.schemas';

import { customFetch } from '../../custom-fetch';

/**
 * @summary 홈 피드 상품 목록 조회
 */
export type getApiV1ProductsResponse200 = {
  data: ApiResponseProductFeed
  status: 200
}

export type getApiV1ProductsResponse400 = {
  data: BadRequestResponse
  status: 400
}

export type getApiV1ProductsResponseSuccess = (getApiV1ProductsResponse200) & {
  headers: Headers;
};
export type getApiV1ProductsResponseError = (getApiV1ProductsResponse400) & {
  headers: Headers;
};

export type getApiV1ProductsResponse = (getApiV1ProductsResponseSuccess | getApiV1ProductsResponseError)

export const getGetApiV1ProductsUrl = (params?: GetApiV1ProductsParams,) => {
  const normalizedParams = new URLSearchParams();

  Object.entries(params || {}).forEach(([key, value]) => {
    const explodeParameters = ["categoryCodes","districts"];

    if (Array.isArray(value) && explodeParameters.includes(key)) {
      value.forEach((v) => {
        normalizedParams.append(key, v === null ? 'null' : v.toString());
      });
      return;
    }

    if (value !== undefined) {
      normalizedParams.append(key, value === null ? 'null' : value.toString())
    }
  });

  const stringifiedParams = normalizedParams.toString();

  return stringifiedParams.length > 0 ? `/api/v1/products?${stringifiedParams}` : `/api/v1/products`
}

export const getApiV1Products = async (params?: GetApiV1ProductsParams, options?: RequestInit): Promise<getApiV1ProductsResponse> => {

  return customFetch<getApiV1ProductsResponse>(getGetApiV1ProductsUrl(params),
  {
    ...options,
    method: 'GET'


  }
);}


/**
 * @summary 상품 상세 조회
 */
export type getApiV1ProductsProductIdResponse200 = {
  data: ApiResponseProductDetail
  status: 200
}

export type getApiV1ProductsProductIdResponse404 = {
  data: NotFoundResponse
  status: 404
}

export type getApiV1ProductsProductIdResponseSuccess = (getApiV1ProductsProductIdResponse200) & {
  headers: Headers;
};
export type getApiV1ProductsProductIdResponseError = (getApiV1ProductsProductIdResponse404) & {
  headers: Headers;
};

export type getApiV1ProductsProductIdResponse = (getApiV1ProductsProductIdResponseSuccess | getApiV1ProductsProductIdResponseError)

export const getGetApiV1ProductsProductIdUrl = (productId: number,) => {




  return `/api/v1/products/${productId}`
}

export const getApiV1ProductsProductId = async (productId: number, options?: RequestInit): Promise<getApiV1ProductsProductIdResponse> => {

  return customFetch<getApiV1ProductsProductIdResponse>(getGetApiV1ProductsProductIdUrl(productId),
  {
    ...options,
    method: 'GET'


  }
);}


/**
 * @summary 상품 공유 메타데이터 조회
 */
export type getApiV1ProductsProductIdShareResponse200 = {
  data: ApiResponseProductShare
  status: 200
}

export type getApiV1ProductsProductIdShareResponse404 = {
  data: NotFoundResponse
  status: 404
}

export type getApiV1ProductsProductIdShareResponseSuccess = (getApiV1ProductsProductIdShareResponse200) & {
  headers: Headers;
};
export type getApiV1ProductsProductIdShareResponseError = (getApiV1ProductsProductIdShareResponse404) & {
  headers: Headers;
};

export type getApiV1ProductsProductIdShareResponse = (getApiV1ProductsProductIdShareResponseSuccess | getApiV1ProductsProductIdShareResponseError)

export const getGetApiV1ProductsProductIdShareUrl = (productId: number,) => {




  return `/api/v1/products/${productId}/share`
}

export const getApiV1ProductsProductIdShare = async (productId: number, options?: RequestInit): Promise<getApiV1ProductsProductIdShareResponse> => {

  return customFetch<getApiV1ProductsProductIdShareResponse>(getGetApiV1ProductsProductIdShareUrl(productId),
  {
    ...options,
    method: 'GET'


  }
);}


