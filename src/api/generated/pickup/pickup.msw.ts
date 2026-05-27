/* /* eslint-disable *\/ */
/**
 * // 이 파일은 Orval이 자동 생성합니다. 직접 수정하지 마세요.
 */
import { faker } from '@faker-js/faker';

import { HttpResponse, http } from 'msw';
import type { RequestHandlerOptions } from 'msw';

import type {
  ApiResponseNearestPickupQr,
  ApiResponsePickupInfo,
  ApiResponsePickupVerify,
  ApiResponseQrCode,
} from '../api.schemas';

export const getGetApiV1ParticipationsParticipationIdPickupResponseMock = (
  overrideResponse: Partial<Extract<ApiResponsePickupInfo, object>> = {},
): ApiResponsePickupInfo => ({
  success: faker.datatype.boolean(),
  data: {
    participationId: faker.number.int(),
    availabilityStatus: faker.helpers.arrayElement([
      'LOCKED',
      'AVAILABLE',
      'PICKED_UP',
    ] as const),
    pickupStatus: faker.helpers.arrayElement([
      'NOT_READY',
      'READY',
      'PICKED_UP',
      'NO_SHOW',
    ] as const),
    storeName: faker.string.alpha({ length: { min: 10, max: 20 } }),
    storeAddress: faker.string.alpha({ length: { min: 10, max: 20 } }),
    storePhone: faker.helpers.arrayElement([
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
    transitInfo: faker.helpers.arrayElement([
      faker.helpers.arrayElement([
        faker.string.alpha({ length: { min: 10, max: 20 } }),
        null,
      ]),
      undefined,
    ]),
    thumbnailUrl: faker.helpers.arrayElement([
      faker.helpers.arrayElement([
        faker.string.alpha({ length: { min: 10, max: 20 } }),
        null,
      ]),
      null,
    ]),
    productName: faker.string.alpha({ length: { min: 10, max: 20 } }),
    quantity: faker.number.int(),
    pickupDate: faker.date.past().toISOString().slice(0, 10),
    pickupTimeStart: faker.string.alpha({ length: { min: 10, max: 20 } }),
    pickupTimeEnd: faker.string.alpha({ length: { min: 10, max: 20 } }),
    pickupLocation: faker.string.alpha({ length: { min: 10, max: 20 } }),
    remainingMinutes: faker.helpers.arrayElement([
      faker.helpers.arrayElement([faker.number.int(), null]),
      undefined,
    ]),
    pickedUpAt: faker.helpers.arrayElement([
      faker.helpers.arrayElement([
        faker.date.past().toISOString().slice(0, 19) + 'Z',
        null,
      ]),
      undefined,
    ]),
  },
  error: {},
  ...overrideResponse,
});

export const getGetApiV1ParticipationsParticipationIdQrResponseMock = (
  overrideResponse: Partial<Extract<ApiResponseQrCode, object>> = {},
): ApiResponseQrCode => ({
  success: faker.datatype.boolean(),
  data: {
    participationId: faker.number.int(),
    reservationNumber: faker.string.alpha({ length: { min: 10, max: 20 } }),
    availabilityStatus: faker.helpers.arrayElement([
      'LOCKED',
      'AVAILABLE',
      'PICKED_UP',
    ] as const),
    pickupStatus: faker.helpers.arrayElement([
      'NOT_READY',
      'READY',
      'PICKED_UP',
      'NO_SHOW',
    ] as const),
    userName: faker.helpers.arrayElement([
      faker.helpers.arrayElement([
        faker.string.alpha({ length: { min: 10, max: 20 } }),
        null,
      ]),
      undefined,
    ]),
    productName: faker.string.alpha({ length: { min: 10, max: 20 } }),
    quantity: faker.number.int(),
    storeName: faker.string.alpha({ length: { min: 10, max: 20 } }),
    storeAddress: faker.string.alpha({ length: { min: 10, max: 20 } }),
    pickupLocation: faker.string.alpha({ length: { min: 10, max: 20 } }),
    qrCode: faker.helpers.arrayElement([
      faker.helpers.arrayElement([faker.string.uuid(), null]),
      undefined,
    ]),
    pickupDate: faker.date.past().toISOString().slice(0, 10),
    pickupTimeStart: faker.string.alpha({ length: { min: 10, max: 20 } }),
    pickupTimeEnd: faker.string.alpha({ length: { min: 10, max: 20 } }),
    dDay: faker.number.int(),
    pickedUpAt: faker.helpers.arrayElement([
      faker.helpers.arrayElement([
        faker.date.past().toISOString().slice(0, 19) + 'Z',
        null,
      ]),
      undefined,
    ]),
  },
  error: {},
  ...overrideResponse,
});

export const getGetApiV1PickupsMeNearestQrResponseMock = (
  overrideResponse: Partial<Extract<ApiResponseNearestPickupQr, object>> = {},
): ApiResponseNearestPickupQr => ({
  success: faker.datatype.boolean(),
  data: {
    hasCandidate: faker.datatype.boolean(),
    hasMultipleToday: faker.datatype.boolean(),
    reason: faker.helpers.arrayElement([
      faker.helpers.arrayElement([
        faker.helpers.arrayElement([
          'NO_AVAILABLE_PICKUP',
          'ONLY_FUTURE_PICKUP',
        ] as const),
        null,
      ]),
      undefined,
    ]),
    item: faker.helpers.arrayElement([
      faker.helpers.arrayElement([
        {
          participationId: faker.number.int(),
          reservationNumber: faker.string.alpha({
            length: { min: 10, max: 20 },
          }),
          availabilityStatus: faker.helpers.arrayElement([
            'LOCKED',
            'AVAILABLE',
            'PICKED_UP',
          ] as const),
          pickupStatus: faker.helpers.arrayElement([
            'NOT_READY',
            'READY',
            'PICKED_UP',
            'NO_SHOW',
          ] as const),
          userName: faker.helpers.arrayElement([
            faker.helpers.arrayElement([
              faker.string.alpha({ length: { min: 10, max: 20 } }),
              null,
            ]),
            undefined,
          ]),
          productName: faker.string.alpha({ length: { min: 10, max: 20 } }),
          quantity: faker.number.int(),
          storeName: faker.string.alpha({ length: { min: 10, max: 20 } }),
          storeAddress: faker.string.alpha({ length: { min: 10, max: 20 } }),
          pickupLocation: faker.string.alpha({ length: { min: 10, max: 20 } }),
          qrCode: faker.helpers.arrayElement([
            faker.helpers.arrayElement([faker.string.uuid(), null]),
            undefined,
          ]),
          pickupDate: faker.date.past().toISOString().slice(0, 10),
          pickupTimeStart: faker.string.alpha({ length: { min: 10, max: 20 } }),
          pickupTimeEnd: faker.string.alpha({ length: { min: 10, max: 20 } }),
          dDay: faker.number.int(),
          pickedUpAt: faker.helpers.arrayElement([
            faker.helpers.arrayElement([
              faker.date.past().toISOString().slice(0, 19) + 'Z',
              null,
            ]),
            undefined,
          ]),
        },
        null,
      ]),
      null,
    ]),
  },
  error: {},
  ...overrideResponse,
});

export const getPostApiV1PickupsQrCodeVerifyResponseMock = (
  overrideResponse: Partial<Extract<ApiResponsePickupVerify, object>> = {},
): ApiResponsePickupVerify => ({
  success: faker.datatype.boolean(),
  data: {
    participationId: faker.number.int(),
    pickupStatus: faker.helpers.arrayElement([
      'NOT_READY',
      'READY',
      'PICKED_UP',
      'NO_SHOW',
    ] as const),
    userName: faker.helpers.arrayElement([
      faker.helpers.arrayElement([
        faker.string.alpha({ length: { min: 10, max: 20 } }),
        null,
      ]),
      undefined,
    ]),
    productName: faker.string.alpha({ length: { min: 10, max: 20 } }),
    quantity: faker.number.int(),
    pickedUpAt: faker.date.past().toISOString().slice(0, 19) + 'Z',
    pickupProcessedByUserId: faker.helpers.arrayElement([
      faker.helpers.arrayElement([faker.number.int(), null]),
      undefined,
    ]),
  },
  error: {},
  ...overrideResponse,
});

export const getGetApiV1ParticipationsParticipationIdPickupMockHandler = (
  overrideResponse?:
    | ApiResponsePickupInfo
    | ((
        info: Parameters<Parameters<typeof http.get>[1]>[0],
      ) => Promise<ApiResponsePickupInfo> | ApiResponsePickupInfo),
  options?: RequestHandlerOptions,
) => {
  return http.get(
    '*/api/v1/participations/:participationId/pickup',
    async (info: Parameters<Parameters<typeof http.get>[1]>[0]) => {
      return HttpResponse.json(
        overrideResponse !== undefined
          ? typeof overrideResponse === 'function'
            ? await overrideResponse(info)
            : overrideResponse
          : getGetApiV1ParticipationsParticipationIdPickupResponseMock(),
        { status: 200 },
      );
    },
    options,
  );
};

export const getGetApiV1ParticipationsParticipationIdQrMockHandler = (
  overrideResponse?:
    | ApiResponseQrCode
    | ((
        info: Parameters<Parameters<typeof http.get>[1]>[0],
      ) => Promise<ApiResponseQrCode> | ApiResponseQrCode),
  options?: RequestHandlerOptions,
) => {
  return http.get(
    '*/api/v1/participations/:participationId/qr',
    async (info: Parameters<Parameters<typeof http.get>[1]>[0]) => {
      return HttpResponse.json(
        overrideResponse !== undefined
          ? typeof overrideResponse === 'function'
            ? await overrideResponse(info)
            : overrideResponse
          : getGetApiV1ParticipationsParticipationIdQrResponseMock(),
        { status: 200 },
      );
    },
    options,
  );
};

export const getGetApiV1PickupsMeNearestQrMockHandler = (
  overrideResponse?:
    | ApiResponseNearestPickupQr
    | ((
        info: Parameters<Parameters<typeof http.get>[1]>[0],
      ) => Promise<ApiResponseNearestPickupQr> | ApiResponseNearestPickupQr),
  options?: RequestHandlerOptions,
) => {
  return http.get(
    '*/api/v1/pickups/me/nearest-qr',
    async (info: Parameters<Parameters<typeof http.get>[1]>[0]) => {
      return HttpResponse.json(
        overrideResponse !== undefined
          ? typeof overrideResponse === 'function'
            ? await overrideResponse(info)
            : overrideResponse
          : getGetApiV1PickupsMeNearestQrResponseMock(),
        { status: 200 },
      );
    },
    options,
  );
};

export const getPostApiV1PickupsQrCodeVerifyMockHandler = (
  overrideResponse?:
    | ApiResponsePickupVerify
    | ((
        info: Parameters<Parameters<typeof http.post>[1]>[0],
      ) => Promise<ApiResponsePickupVerify> | ApiResponsePickupVerify),
  options?: RequestHandlerOptions,
) => {
  return http.post(
    '*/api/v1/pickups/:qrCode/verify',
    async (info: Parameters<Parameters<typeof http.post>[1]>[0]) => {
      return HttpResponse.json(
        overrideResponse !== undefined
          ? typeof overrideResponse === 'function'
            ? await overrideResponse(info)
            : overrideResponse
          : getPostApiV1PickupsQrCodeVerifyResponseMock(),
        { status: 200 },
      );
    },
    options,
  );
};
export const getPickupMock = () => [
  getGetApiV1ParticipationsParticipationIdPickupMockHandler(),
  getGetApiV1ParticipationsParticipationIdQrMockHandler(),
  getGetApiV1PickupsMeNearestQrMockHandler(),
  getPostApiV1PickupsQrCodeVerifyMockHandler(),
];
