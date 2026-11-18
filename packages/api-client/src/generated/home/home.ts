/* /* eslint-disable *\/ */
/**
 * // 이 파일은 Orval이 자동 생성합니다. 직접 수정하지 마세요.
 */
import type {
  ApiResponseHomeTogetherStatus
} from '../api.schemas';

import { customFetch } from '../../custom-fetch';

/**
 * @summary 홈 함께 사기 현황 조회
 */
export type getApiV1HomeTogetherResponse200 = {
  data: ApiResponseHomeTogetherStatus
  status: 200
}

export type getApiV1HomeTogetherResponseSuccess = (getApiV1HomeTogetherResponse200) & {
  headers: Headers;
};
;

export type getApiV1HomeTogetherResponse = (getApiV1HomeTogetherResponseSuccess)

export const getGetApiV1HomeTogetherUrl = () => {




  return `/api/v1/home/together`
}

export const getApiV1HomeTogether = async ( options?: RequestInit): Promise<getApiV1HomeTogetherResponse> => {

  return customFetch<getApiV1HomeTogetherResponse>(getGetApiV1HomeTogetherUrl(),
  {
    ...options,
    method: 'GET'


  }
);}


