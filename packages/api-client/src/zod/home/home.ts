/* /* eslint-disable *\/ */
/**
 * // 이 파일은 Orval이 자동 생성합니다. 직접 수정하지 마세요.
 */
import * as zod from 'zod';

/**
 * @summary 홈 함께 사기 현황 조회
 */
export const GetApiV1HomeTogetherResponse = zod.object({
  success: zod.boolean(),
  data: zod.object({
    hasActiveRooms: zod.boolean(),
    showTogetherRoomModule: zod.boolean(),
    showFirstVisitGuide: zod.boolean(),
    togetherTabBadgeCount: zod.number(),
    isTodayPickupLeader: zod.boolean(),
    todayPickups: zod.array(
      zod.object({
        roomId: zod.number(),
        role: zod.enum(['ORGANIZER', 'PARTICIPANT']),
        productName: zod.string(),
        quantity: zod.number(),
        storeName: zod.string(),
        pickupDate: zod.iso.date(),
        pickupTimeStart: zod.iso.time({}),
        pickupTimeEnd: zod.iso.time({}),
        canOpenQr: zod.boolean(),
      }),
    ),
    rooms: zod.array(
      zod.object({
        roomId: zod.number(),
        role: zod.enum(['ORGANIZER', 'PARTICIPANT']),
        productId: zod.number().nullish(),
        productName: zod.string(),
        storeName: zod.string(),
        currentQuantity: zod.number(),
        minQuantity: zod.number(),
        maxQuantity: zod.number(),
        paymentDeadlineAt: zod.iso.datetime({ offset: true }),
        nextAction: zod.enum(['NONE', 'PAY', 'TRANSFER', 'PICKUP']),
      }),
    ),
  }),
  error: zod.unknown().nullable(),
});
