/* /* eslint-disable *\/ */
/**
 * // 이 파일은 Orval이 자동 생성합니다. 직접 수정하지 마세요.
 */
import * as zod from 'zod';

/**
 * @summary 픽업 안내 정보 조회
 */
export const GetApiV1ParticipationsParticipationIdPickupParams = zod.object({
  participationId: zod.number(),
});

export const GetApiV1ParticipationsParticipationIdPickupResponse = zod.object({
  success: zod.boolean(),
  data: zod.object({
    participationId: zod.number(),
    storeName: zod.string(),
    storePhone: zod.string(),
    storeAddress: zod.string(),
    latitude: zod.number().nullable(),
    longitude: zod.number().nullable(),
    transitInfo: zod
      .string()
      .nullable()
      .describe('대중교통 안내 텍스트. 예) 2호선 성수역 3번 출구에서 도보 5분'),
    pickupDate: zod.iso.date(),
    pickupTimeStart: zod.iso.time({}),
    pickupTimeEnd: zod.iso.time({}),
    productName: zod.string(),
    quantity: zod.number(),
    remainingMinutes: zod
      .number()
      .nullable()
      .describe('픽업 종료까지 남은 분 (당일만)'),
  }),
  error: zod.unknown().nullable(),
});

/**
 * @summary QR 픽업 코드 조회
 */
export const GetApiV1ParticipationsParticipationIdQrParams = zod.object({
  participationId: zod.number(),
});

export const GetApiV1ParticipationsParticipationIdQrResponse = zod.object({
  success: zod.boolean(),
  data: zod.object({
    qrCode: zod.uuid(),
    nickname: zod.string(),
    productName: zod.string(),
    quantity: zod.number(),
    isUsed: zod.boolean(),
    storeName: zod.string(),
    pickupDate: zod.iso.date(),
    pickupTimeStart: zod.iso.time({}).describe('픽업 시작 시각. 예) 13:00'),
    pickupTimeEnd: zod.iso.time({}).describe('픽업 종료 시각. 예) 17:00'),
  }),
  error: zod.unknown().nullable(),
});

/**
 * 소비자 QR을 매장(사장님)이 스캔하면 대기 → 완료로 자동 전환된다.
 * @summary QR 코드 스캔 검증 및 수령 처리
 */
export const PostApiV1PickupsQrCodeVerifyParams = zod.object({
  qrCode: zod.uuid(),
});

export const PostApiV1PickupsQrCodeVerifyResponse = zod.object({
  success: zod.boolean(),
  data: zod.object({
    participationId: zod.number(),
    userName: zod.string(),
    productName: zod.string(),
    quantity: zod.number(),
    pickupDate: zod.iso.date(),
    pickupTimeStart: zod.iso.time({}),
    pickupTimeEnd: zod.iso.time({}),
    pickupStatus: zod.enum(['WAITING', 'COMPLETED']),
  }),
  error: zod.unknown().nullable(),
});
