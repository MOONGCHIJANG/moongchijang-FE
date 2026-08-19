/* /* eslint-disable *\/ */
/**
 * // 이 파일은 Orval이 자동 생성합니다. 직접 수정하지 마세요.
 */
import { faker } from '@faker-js/faker';

import { HttpResponse, http } from 'msw';
import type { RequestHandlerOptions } from 'msw';

import type {
  ApiResponseWishlistPage,
  SuccessNoDataResponse,
} from '../api.schemas';

export const getPostApiV1GroupBuysGroupBuyIdWishlistResponseMock = (
  overrideResponse: Partial<Extract<SuccessNoDataResponse, object>> = {},
): SuccessNoDataResponse => ({
  success: faker.datatype.boolean(),
  data: {},
  error: {},
  ...overrideResponse,
});

export const getDeleteApiV1GroupBuysGroupBuyIdWishlistResponseMock = (
  overrideResponse: Partial<Extract<SuccessNoDataResponse, object>> = {},
): SuccessNoDataResponse => ({
  success: faker.datatype.boolean(),
  data: {},
  error: {},
  ...overrideResponse,
});

export const getGetApiV1WishlistsResponseMock = (
  overrideResponse: Partial<Extract<ApiResponseWishlistPage, object>> = {},
): ApiResponseWishlistPage => ({
  success: faker.datatype.boolean(),
  data: {
    content: Array.from(
      { length: faker.number.int({ min: 1, max: 10 }) },
      (_, i) => i + 1,
    ).map(() => ({
      groupBuyId: faker.number.int(),
      thumbnailUrl: faker.helpers.arrayElement([
        faker.helpers.arrayElement([
          faker.string.alpha({ length: { min: 10, max: 20 } }),
          null,
        ]),
        null,
      ]),
      dDay: faker.number.int(),
      dDayLabel: faker.string.alpha({ length: { min: 10, max: 20 } }),
      storeName: faker.string.alpha({ length: { min: 10, max: 20 } }),
      regionLabel: faker.string.alpha({ length: { min: 10, max: 20 } }),
      productName: faker.string.alpha({ length: { min: 10, max: 20 } }),
      pickupDate: faker.date.past().toISOString().slice(0, 10),
      pickupDateLabel: faker.string.alpha({ length: { min: 10, max: 20 } }),
      deadline: faker.date.past().toISOString().slice(0, 19) + 'Z',
      deadlineLabel: faker.string.alpha({ length: { min: 10, max: 20 } }),
      achievementRate: faker.number.int(),
      price: faker.number.int(),
      currentParticipantCount: faker.number.int(),
      targetParticipantCount: faker.number.int(),
      isWishlisted: faker.datatype.boolean(),
    })),
    totalElements: faker.number.int(),
    totalPages: faker.number.int(),
    number: faker.number.int(),
    size: faker.number.int(),
    urgentCount: faker.number.int(),
  },
  error: {},
  ...overrideResponse,
});

export const getPostApiV1GroupBuysGroupBuyIdWishlistMockHandler = (
  overrideResponse?:
    | SuccessNoDataResponse
    | ((
        info: Parameters<Parameters<typeof http.post>[1]>[0],
      ) => Promise<SuccessNoDataResponse> | SuccessNoDataResponse),
  options?: RequestHandlerOptions,
) => {
  return http.post(
    '*/api/v1/group-buys/:groupBuyId/wishlist',
    async (info: Parameters<Parameters<typeof http.post>[1]>[0]) => {
      return HttpResponse.json(
        overrideResponse !== undefined
          ? typeof overrideResponse === 'function'
            ? await overrideResponse(info)
            : overrideResponse
          : getPostApiV1GroupBuysGroupBuyIdWishlistResponseMock(),
        { status: 201 },
      );
    },
    options,
  );
};

export const getDeleteApiV1GroupBuysGroupBuyIdWishlistMockHandler = (
  overrideResponse?:
    | SuccessNoDataResponse
    | ((
        info: Parameters<Parameters<typeof http.delete>[1]>[0],
      ) => Promise<SuccessNoDataResponse> | SuccessNoDataResponse),
  options?: RequestHandlerOptions,
) => {
  return http.delete(
    '*/api/v1/group-buys/:groupBuyId/wishlist',
    async (info: Parameters<Parameters<typeof http.delete>[1]>[0]) => {
      return HttpResponse.json(
        overrideResponse !== undefined
          ? typeof overrideResponse === 'function'
            ? await overrideResponse(info)
            : overrideResponse
          : getDeleteApiV1GroupBuysGroupBuyIdWishlistResponseMock(),
        { status: 200 },
      );
    },
    options,
  );
};

export const getGetApiV1WishlistsMockHandler = (
  overrideResponse?:
    | ApiResponseWishlistPage
    | ((
        info: Parameters<Parameters<typeof http.get>[1]>[0],
      ) => Promise<ApiResponseWishlistPage> | ApiResponseWishlistPage),
  options?: RequestHandlerOptions,
) => {
  return http.get(
    '*/api/v1/wishlists',
    async (info: Parameters<Parameters<typeof http.get>[1]>[0]) => {
      return HttpResponse.json(
        overrideResponse !== undefined
          ? typeof overrideResponse === 'function'
            ? await overrideResponse(info)
            : overrideResponse
          : getGetApiV1WishlistsResponseMock(),
        { status: 200 },
      );
    },
    options,
  );
};
export const getWishlistMock = () => [
  getPostApiV1GroupBuysGroupBuyIdWishlistMockHandler(),
  getDeleteApiV1GroupBuysGroupBuyIdWishlistMockHandler(),
  getGetApiV1WishlistsMockHandler(),
];
