/* /* eslint-disable *\/ */
/**
 * // 이 파일은 Orval이 자동 생성합니다. 직접 수정하지 마세요.
 */
import * as zod from 'zod';

/**
 * @summary 홈 피드 상품 목록 조회
 */
export const getApiV1ProductsQueryPickupThisWeekDefault = false;
export const getApiV1ProductsQuerySmallQuantityDefault = false;
export const getApiV1ProductsQueryNewOnlyDefault = false;
export const getApiV1ProductsQuerySortDefault = `LATEST`;
export const getApiV1ProductsQueryLimitDefault = 20;
export const getApiV1ProductsQueryLimitMax = 100;

export const GetApiV1ProductsQueryParams = zod.object({
  categoryCodes: zod.array(zod.string()).optional(),
  districts: zod.array(zod.string()).optional(),
  pickupThisWeek: zod
    .boolean()
    .default(getApiV1ProductsQueryPickupThisWeekDefault),
  smallQuantity: zod
    .boolean()
    .default(getApiV1ProductsQuerySmallQuantityDefault),
  newOnly: zod.boolean().default(getApiV1ProductsQueryNewOnlyDefault),
  sort: zod
    .enum(['LATEST', 'PRICE_LOW', 'MIN_QUANTITY', 'TOGETHER_POPULAR'])
    .default(getApiV1ProductsQuerySortDefault),
  cursor: zod.string().nullish(),
  limit: zod
    .number()
    .min(1)
    .max(getApiV1ProductsQueryLimitMax)
    .default(getApiV1ProductsQueryLimitDefault),
});

export const GetApiV1ProductsResponse = zod.object({
  success: zod.boolean(),
  data: zod.object({
    items: zod.array(
      zod.object({
        productId: zod.number(),
        categoryCode: zod.string(),
        name: zod.string(),
        thumbnailUrl: zod.string().nullish(),
        unitPrice: zod.number(),
        minQuantity: zod.number(),
        maxQuantity: zod.number(),
        storageType: zod.enum(['ROOM_TEMPERATURE', 'REFRIGERATED', 'FROZEN']),
        store: zod.object({
          storeId: zod.number(),
          name: zod.string(),
          region: zod.string(),
          district: zod.string(),
        }),
        earliestPickupDate: zod.iso.date().nullish(),
        holidaySummary: zod.string().nullish(),
        isNew: zod.boolean(),
        isWishlisted: zod.boolean(),
        canPurchase: zod.boolean(),
        unavailableReason: zod
          .enum([
            'PRODUCT_NOT_FOR_SALE',
            'STORE_NOT_FOR_SALE',
            'NO_AVAILABLE_PICKUP_DATE',
          ])
          .nullish(),
        activeTogetherRoomCount: zod.number(),
      }),
    ),
    nextCursor: zod.string().nullish(),
    hasNext: zod.boolean(),
  }),
  error: zod.unknown().nullable(),
});

/**
 * @summary 상품 상세 조회
 */
export const GetApiV1ProductsProductIdParams = zod.object({
  productId: zod.number(),
});

export const GetApiV1ProductsProductIdResponse = zod.object({
  success: zod.boolean(),
  data: zod.object({
    productId: zod.number(),
    categoryCode: zod.string(),
    name: zod.string(),
    description: zod.string(),
    thumbnailUrl: zod.string().nullish(),
    imageUrls: zod.array(zod.string()),
    unitPrice: zod.number(),
    minQuantity: zod.number(),
    maxQuantity: zod.number(),
    storageType: zod.enum(['ROOM_TEMPERATURE', 'REFRIGERATED', 'FROZEN']),
    store: zod.object({
      storeId: zod.number(),
      name: zod.string(),
      region: zod.string(),
      district: zod.string(),
      address: zod.string(),
      phoneNumber: zod.string().nullish(),
      placeId: zod.string().nullish(),
    }),
    pickup: zod.object({
      preparationDays: zod.number(),
      availableFrom: zod.iso.date(),
      availableUntil: zod.iso.date(),
      availableDates: zod.array(
        zod.object({
          date: zod.iso.date(),
          timeSlots: zod.array(
            zod.object({
              startTime: zod.iso.time({}),
              endTime: zod.iso.time({}),
            }),
          ),
        }),
      ),
      holidays: zod.array(
        zod.object({
          type: zod.enum(['REGULAR', 'TEMPORARY']),
          dayOfWeek: zod.number().nullish(),
          date: zod.iso.date().nullish(),
          reason: zod.string().nullish(),
        }),
      ),
    }),
    isWishlisted: zod.boolean(),
    canPurchase: zod.boolean(),
    unavailableReason: zod
      .enum([
        'PRODUCT_NOT_FOR_SALE',
        'STORE_NOT_FOR_SALE',
        'NO_AVAILABLE_PICKUP_DATE',
      ])
      .nullish(),
  }),
  error: zod.unknown().nullable(),
});

/**
 * @summary 상품 공유 메타데이터 조회
 */
export const GetApiV1ProductsProductIdShareParams = zod.object({
  productId: zod.number(),
});

export const GetApiV1ProductsProductIdShareResponse = zod.object({
  success: zod.boolean(),
  data: zod.object({
    productId: zod.number(),
    productName: zod.string(),
    storeName: zod.string(),
    imageUrl: zod.string().nullish(),
    shareUrl: zod.string(),
  }),
  error: zod.unknown().nullable(),
});
