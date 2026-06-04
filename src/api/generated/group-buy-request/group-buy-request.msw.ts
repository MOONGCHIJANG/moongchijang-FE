/* /* eslint-disable *\/ */
/**
 * // 이 파일은 Orval이 자동 생성합니다. 직접 수정하지 마세요.
 */
import { faker } from '@faker-js/faker';

import { HttpResponse, http } from 'msw';
import type { RequestHandlerOptions } from 'msw';

import type {
  ApiResponseGroupBuyRequestDetail,
  ApiResponseGroupBuyRequestList,
  ApiResponseRequestId,
  ApiResponseStoreRecommendation,
  ApiResponseStoreSearchList,
  SuccessNoDataResponse,
} from '../api.schemas';

export const getGetApiV1StoresSearchResponseMock = (
  overrideResponse: Partial<Extract<ApiResponseStoreSearchList, object>> = {},
): ApiResponseStoreSearchList => ({
  success: faker.helpers.arrayElement([faker.datatype.boolean(), undefined]),
  data: faker.helpers.arrayElement([
    {
      stores: faker.helpers.arrayElement([
        Array.from(
          { length: faker.number.int({ min: 1, max: 10 }) },
          (_, i) => i + 1,
        ).map(() => ({
          placeId: faker.helpers.arrayElement([
            faker.string.alpha({ length: { min: 10, max: 20 } }),
            undefined,
          ]),
          storeName: faker.helpers.arrayElement([
            faker.string.alpha({ length: { min: 10, max: 20 } }),
            undefined,
          ]),
          roadAddress: faker.helpers.arrayElement([
            faker.string.alpha({ length: { min: 10, max: 20 } }),
            undefined,
          ]),
          lotAddress: faker.helpers.arrayElement([
            faker.helpers.arrayElement([
              faker.string.alpha({ length: { min: 10, max: 20 } }),
              null,
            ]),
            undefined,
          ]),
          latitude: faker.helpers.arrayElement([
            faker.number.float({ fractionDigits: 2 }),
            undefined,
          ]),
          longitude: faker.helpers.arrayElement([
            faker.number.float({ fractionDigits: 2 }),
            undefined,
          ]),
          imageUrl: faker.helpers.arrayElement([
            faker.helpers.arrayElement([
              faker.string.alpha({ length: { min: 10, max: 20 } }),
              null,
            ]),
            undefined,
          ]),
        })),
        undefined,
      ]),
    },
    undefined,
  ]),
  error: faker.helpers.arrayElement([{}, null]),
  ...overrideResponse,
});

export const getPostApiV1GroupBuyRequestsResponseMock = (
  overrideResponse: Partial<Extract<ApiResponseRequestId, object>> = {},
): ApiResponseRequestId => ({
  success: faker.datatype.boolean(),
  data: { requestId: faker.number.int() },
  error: {},
  ...overrideResponse,
});

export const getGetApiV1GroupBuyRequestsResponseMock = (
  overrideResponse: Partial<
    Extract<ApiResponseGroupBuyRequestList, object>
  > = {},
): ApiResponseGroupBuyRequestList => ({
  success: faker.datatype.boolean(),
  data: Array.from(
    { length: faker.number.int({ min: 1, max: 10 }) },
    (_, i) => i + 1,
  ).map(() => ({
    requestId: faker.number.int(),
    storeName: faker.string.alpha({ length: { min: 10, max: 20 } }),
    storeAddress: faker.helpers.arrayElement([
      faker.helpers.arrayElement([
        faker.string.alpha({ length: { min: 10, max: 20 } }),
        null,
      ]),
      undefined,
    ]),
    placeId: faker.helpers.arrayElement([
      faker.helpers.arrayElement([
        faker.string.alpha({ length: { min: 10, max: 20 } }),
        null,
      ]),
      undefined,
    ]),
    roadAddress: faker.helpers.arrayElement([
      faker.helpers.arrayElement([
        faker.string.alpha({ length: { min: 10, max: 20 } }),
        null,
      ]),
      undefined,
    ]),
    lotAddress: faker.helpers.arrayElement([
      faker.helpers.arrayElement([
        faker.string.alpha({ length: { min: 10, max: 20 } }),
        null,
      ]),
      undefined,
    ]),
    latitude: faker.helpers.arrayElement([
      faker.helpers.arrayElement([
        faker.number.float({ fractionDigits: 2 }),
        null,
      ]),
      undefined,
    ]),
    longitude: faker.helpers.arrayElement([
      faker.helpers.arrayElement([
        faker.number.float({ fractionDigits: 2 }),
        null,
      ]),
      undefined,
    ]),
    productName: faker.string.alpha({ length: { min: 10, max: 20 } }),
    desiredQuantity: faker.number.int(),
    desiredPickupDate: faker.date.past().toISOString().slice(0, 10),
    additionalNote: faker.helpers.arrayElement([
      faker.helpers.arrayElement([
        faker.string.alpha({ length: { min: 10, max: 20 } }),
        null,
      ]),
      undefined,
    ]),
    status: faker.helpers.arrayElement([
      'IN_REVIEW',
      'IN_CONTACT',
      'OPENED',
      'REJECTED',
    ] as const),
    rejectionReason: faker.helpers.arrayElement([
      faker.helpers.arrayElement([
        faker.string.alpha({ length: { min: 10, max: 20 } }),
        null,
      ]),
      null,
    ]),
    openedGroupBuyId: faker.helpers.arrayElement([
      faker.helpers.arrayElement([faker.number.int(), null]),
      null,
    ]),
    statusHistory: Array.from(
      { length: faker.number.int({ min: 1, max: 10 }) },
      (_, i) => i + 1,
    ).map(() => ({
      status: faker.helpers.arrayElement([
        'IN_REVIEW',
        'IN_CONTACT',
        'OPENED',
        'REJECTED',
      ] as const),
      changedAt: faker.date.past().toISOString().slice(0, 19) + 'Z',
    })),
    createdAt: faker.date.past().toISOString().slice(0, 19) + 'Z',
  })),
  error: {},
  ...overrideResponse,
});

export const getGetApiV1GroupBuyRequestsRequestIdResponseMock = (
  overrideResponse: Partial<
    Extract<ApiResponseGroupBuyRequestDetail, object>
  > = {},
): ApiResponseGroupBuyRequestDetail => ({
  success: faker.datatype.boolean(),
  data: {
    requestId: faker.number.int(),
    storeName: faker.string.alpha({ length: { min: 10, max: 20 } }),
    storeAddress: faker.helpers.arrayElement([
      faker.helpers.arrayElement([
        faker.string.alpha({ length: { min: 10, max: 20 } }),
        null,
      ]),
      undefined,
    ]),
    placeId: faker.helpers.arrayElement([
      faker.helpers.arrayElement([
        faker.string.alpha({ length: { min: 10, max: 20 } }),
        null,
      ]),
      undefined,
    ]),
    roadAddress: faker.helpers.arrayElement([
      faker.helpers.arrayElement([
        faker.string.alpha({ length: { min: 10, max: 20 } }),
        null,
      ]),
      undefined,
    ]),
    lotAddress: faker.helpers.arrayElement([
      faker.helpers.arrayElement([
        faker.string.alpha({ length: { min: 10, max: 20 } }),
        null,
      ]),
      undefined,
    ]),
    latitude: faker.helpers.arrayElement([
      faker.helpers.arrayElement([
        faker.number.float({ fractionDigits: 2 }),
        null,
      ]),
      undefined,
    ]),
    longitude: faker.helpers.arrayElement([
      faker.helpers.arrayElement([
        faker.number.float({ fractionDigits: 2 }),
        null,
      ]),
      undefined,
    ]),
    productName: faker.string.alpha({ length: { min: 10, max: 20 } }),
    desiredQuantity: faker.number.int(),
    desiredPickupDate: faker.date.past().toISOString().slice(0, 10),
    additionalNote: faker.helpers.arrayElement([
      faker.helpers.arrayElement([
        faker.string.alpha({ length: { min: 10, max: 20 } }),
        null,
      ]),
      undefined,
    ]),
    status: faker.helpers.arrayElement([
      'IN_REVIEW',
      'IN_CONTACT',
      'OPENED',
      'REJECTED',
    ] as const),
    rejectionReason: faker.helpers.arrayElement([
      faker.helpers.arrayElement([
        faker.string.alpha({ length: { min: 10, max: 20 } }),
        null,
      ]),
      null,
    ]),
    openedGroupBuyId: faker.helpers.arrayElement([
      faker.helpers.arrayElement([faker.number.int(), null]),
      null,
    ]),
    statusHistory: Array.from(
      { length: faker.number.int({ min: 1, max: 10 }) },
      (_, i) => i + 1,
    ).map(() => ({
      status: faker.helpers.arrayElement([
        'IN_REVIEW',
        'IN_CONTACT',
        'OPENED',
        'REJECTED',
      ] as const),
      changedAt: faker.date.past().toISOString().slice(0, 19) + 'Z',
    })),
    createdAt: faker.date.past().toISOString().slice(0, 19) + 'Z',
  },
  error: {},
  ...overrideResponse,
});

export const getPostApiV1GroupBuyOpenRequestsResponseMock = (
  overrideResponse: Partial<Extract<SuccessNoDataResponse, object>> = {},
): SuccessNoDataResponse => ({
  success: faker.datatype.boolean(),
  data: {},
  error: {},
  ...overrideResponse,
});

export const getPostApiV1GroupBuyOpenRequestsStoreRecommendationsResponseMock =
  (
    overrideResponse: Partial<
      Extract<ApiResponseStoreRecommendation, object>
    > = {},
  ): ApiResponseStoreRecommendation => ({
    success: faker.helpers.arrayElement([faker.datatype.boolean(), undefined]),
    data: faker.helpers.arrayElement([
      {
        region: faker.string.alpha({ length: { min: 10, max: 20 } }),
        productName: faker.string.alpha({ length: { min: 10, max: 20 } }),
        stores: Array.from(
          { length: faker.number.int({ min: 1, max: 10 }) },
          (_, i) => i + 1,
        ).map(() => ({
          placeId: faker.string.alpha({ length: { min: 10, max: 20 } }),
          storeName: faker.string.alpha({ length: { min: 10, max: 20 } }),
          roadAddress: faker.string.alpha({ length: { min: 10, max: 20 } }),
          lotAddress: faker.helpers.arrayElement([
            faker.helpers.arrayElement([
              faker.string.alpha({ length: { min: 10, max: 20 } }),
              null,
            ]),
            undefined,
          ]),
          latitude: faker.number.float({ fractionDigits: 2 }),
          longitude: faker.number.float({ fractionDigits: 2 }),
          imageUrl: faker.helpers.arrayElement([
            faker.helpers.arrayElement([
              faker.string.alpha({ length: { min: 10, max: 20 } }),
              null,
            ]),
            undefined,
          ]),
          category: faker.string.alpha({ length: { min: 10, max: 20 } }),
          addressMatched: faker.datatype.boolean(),
          categoryMatched: faker.datatype.boolean(),
          registeredStore: faker.datatype.boolean(),
          previousGroupBuyStore: faker.datatype.boolean(),
        })),
      },
      undefined,
    ]),
    error: faker.helpers.arrayElement([{}, null]),
    ...overrideResponse,
  });

export const getGetApiV1StoresSearchMockHandler = (
  overrideResponse?:
    | ApiResponseStoreSearchList
    | ((
        info: Parameters<Parameters<typeof http.get>[1]>[0],
      ) => Promise<ApiResponseStoreSearchList> | ApiResponseStoreSearchList),
  options?: RequestHandlerOptions,
) => {
  return http.get(
    '*/api/v1/stores/search',
    async (info: Parameters<Parameters<typeof http.get>[1]>[0]) => {
      return HttpResponse.json(
        overrideResponse !== undefined
          ? typeof overrideResponse === 'function'
            ? await overrideResponse(info)
            : overrideResponse
          : getGetApiV1StoresSearchResponseMock(),
        { status: 200 },
      );
    },
    options,
  );
};

export const getPostApiV1GroupBuyRequestsMockHandler = (
  overrideResponse?:
    | ApiResponseRequestId
    | ((
        info: Parameters<Parameters<typeof http.post>[1]>[0],
      ) => Promise<ApiResponseRequestId> | ApiResponseRequestId),
  options?: RequestHandlerOptions,
) => {
  return http.post(
    '*/api/v1/group-buy-requests',
    async (info: Parameters<Parameters<typeof http.post>[1]>[0]) => {
      return HttpResponse.json(
        overrideResponse !== undefined
          ? typeof overrideResponse === 'function'
            ? await overrideResponse(info)
            : overrideResponse
          : getPostApiV1GroupBuyRequestsResponseMock(),
        { status: 201 },
      );
    },
    options,
  );
};

export const getGetApiV1GroupBuyRequestsMockHandler = (
  overrideResponse?:
    | ApiResponseGroupBuyRequestList
    | ((
        info: Parameters<Parameters<typeof http.get>[1]>[0],
      ) =>
        | Promise<ApiResponseGroupBuyRequestList>
        | ApiResponseGroupBuyRequestList),
  options?: RequestHandlerOptions,
) => {
  return http.get(
    '*/api/v1/group-buy-requests',
    async (info: Parameters<Parameters<typeof http.get>[1]>[0]) => {
      return HttpResponse.json(
        overrideResponse !== undefined
          ? typeof overrideResponse === 'function'
            ? await overrideResponse(info)
            : overrideResponse
          : getGetApiV1GroupBuyRequestsResponseMock(),
        { status: 200 },
      );
    },
    options,
  );
};

export const getGetApiV1GroupBuyRequestsRequestIdMockHandler = (
  overrideResponse?:
    | ApiResponseGroupBuyRequestDetail
    | ((
        info: Parameters<Parameters<typeof http.get>[1]>[0],
      ) =>
        | Promise<ApiResponseGroupBuyRequestDetail>
        | ApiResponseGroupBuyRequestDetail),
  options?: RequestHandlerOptions,
) => {
  return http.get(
    '*/api/v1/group-buy-requests/:requestId',
    async (info: Parameters<Parameters<typeof http.get>[1]>[0]) => {
      return HttpResponse.json(
        overrideResponse !== undefined
          ? typeof overrideResponse === 'function'
            ? await overrideResponse(info)
            : overrideResponse
          : getGetApiV1GroupBuyRequestsRequestIdResponseMock(),
        { status: 200 },
      );
    },
    options,
  );
};

export const getPostApiV1GroupBuyOpenRequestsMockHandler = (
  overrideResponse?:
    | SuccessNoDataResponse
    | ((
        info: Parameters<Parameters<typeof http.post>[1]>[0],
      ) => Promise<SuccessNoDataResponse> | SuccessNoDataResponse),
  options?: RequestHandlerOptions,
) => {
  return http.post(
    '*/api/v1/group-buy-open-requests',
    async (info: Parameters<Parameters<typeof http.post>[1]>[0]) => {
      return HttpResponse.json(
        overrideResponse !== undefined
          ? typeof overrideResponse === 'function'
            ? await overrideResponse(info)
            : overrideResponse
          : getPostApiV1GroupBuyOpenRequestsResponseMock(),
        { status: 201 },
      );
    },
    options,
  );
};

export const getPostApiV1GroupBuyOpenRequestsStoreRecommendationsMockHandler = (
  overrideResponse?:
    | ApiResponseStoreRecommendation
    | ((
        info: Parameters<Parameters<typeof http.post>[1]>[0],
      ) =>
        | Promise<ApiResponseStoreRecommendation>
        | ApiResponseStoreRecommendation),
  options?: RequestHandlerOptions,
) => {
  return http.post(
    '*/api/v1/group-buy-open-requests/store-recommendations',
    async (info: Parameters<Parameters<typeof http.post>[1]>[0]) => {
      return HttpResponse.json(
        overrideResponse !== undefined
          ? typeof overrideResponse === 'function'
            ? await overrideResponse(info)
            : overrideResponse
          : getPostApiV1GroupBuyOpenRequestsStoreRecommendationsResponseMock(),
        { status: 200 },
      );
    },
    options,
  );
};
export const getGroupBuyRequestMock = () => [
  getGetApiV1StoresSearchMockHandler(),
  getPostApiV1GroupBuyRequestsMockHandler(),
  getGetApiV1GroupBuyRequestsMockHandler(),
  getGetApiV1GroupBuyRequestsRequestIdMockHandler(),
  getPostApiV1GroupBuyOpenRequestsMockHandler(),
  getPostApiV1GroupBuyOpenRequestsStoreRecommendationsMockHandler(),
];
