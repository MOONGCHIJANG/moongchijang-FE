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
    availabilityStatus: zod.enum(['LOCKED', 'AVAILABLE', 'PICKED_UP']),
    pickupStatus: zod.enum(['NOT_READY', 'READY', 'PICKED_UP', 'NO_SHOW']),
    storeName: zod.string(),
    storeAddress: zod.string(),
    storePhone: zod.string().nullish(),
    latitude: zod.number().nullish(),
    longitude: zod.number().nullish(),
    transitInfo: zod
      .string()
      .nullish()
      .describe('대중교통 안내. 현재 저장 원천이 없으면 null'),
    thumbnailUrl: zod
      .string()
      .nullable()
      .describe('픽업 안내 상단 카드 이미지 URL'),
    productName: zod.string(),
    quantity: zod.number(),
    pickupDate: zod.iso.date(),
    pickupTimeStart: zod.iso.time({}),
    pickupTimeEnd: zod.iso.time({}),
    pickupLocation: zod.string(),
    remainingMinutes: zod
      .number()
      .nullish()
      .describe('당일 픽업 종료까지 남은 분. 당일이 아니면 null'),
    pickedUpAt: zod.iso.datetime({ offset: true }).nullish(),
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
    participationId: zod.number(),
    reservationNumber: zod
      .string()
      .describe('예약 번호. 참여 id 기반 표시값. 예) MCJ-P000123'),
    availabilityStatus: zod.enum(['LOCKED', 'AVAILABLE', 'PICKED_UP']),
    pickupStatus: zod.enum(['NOT_READY', 'READY', 'PICKED_UP', 'NO_SHOW']),
    userName: zod.string().nullish().describe('참여자 닉네임'),
    productName: zod.string(),
    quantity: zod.number(),
    storeName: zod.string(),
    storeAddress: zod.string(),
    pickupLocation: zod.string(),
    qrCode: zod.uuid().nullish(),
    pickupDate: zod.iso.date(),
    pickupTimeStart: zod.iso.time({}).describe('픽업 시작 시각. 예) 13:00'),
    pickupTimeEnd: zod.iso.time({}).describe('픽업 종료 시각. 예) 17:00'),
    dDay: zod
      .number()
      .describe(
        'KST 기준 픽업일까지 남은 날짜. 당일이면 0, 지난 픽업일이면 음수',
      ),
    pickedUpAt: zod.iso.datetime({ offset: true }).nullish(),
  }),
  error: zod.unknown().nullable(),
});

/**
 * 피드 진입 시 사용자의 가장 가까운 픽업 QR 후보를 조회한다.
당일 픽업 예정 건이 있으면 픽업 시작 시간이 가장 빠른 건을 반환하고,
당일 건이 여러 개면 hasMultipleToday=true로 내려준다.
당일 픽업 건이 없고 향후 픽업 예정 건만 있으면 LOCKED 상태와 qrCode=null로 반환한다.

 * @summary 피드용 가장 가까운 픽업 QR 조회
 */
export const GetApiV1PickupsMeNearestQrResponse = zod.object({
  success: zod.boolean(),
  data: zod.object({
    hasCandidate: zod.boolean().describe('표시 가능한 픽업 후보가 있으면 true'),
    hasMultipleToday: zod
      .boolean()
      .describe('당일 픽업 예정 건이 2개 이상이면 true'),
    reason: zod
      .enum(['NO_AVAILABLE_PICKUP', 'ONLY_FUTURE_PICKUP'])
      .nullish()
      .describe('후보가 없거나 QR이 잠긴 사유'),
    item: zod
      .object({
        participationId: zod.number(),
        reservationNumber: zod
          .string()
          .describe('예약 번호. 참여 id 기반 표시값. 예) MCJ-P000123'),
        availabilityStatus: zod
          .enum(['LOCKED', 'AVAILABLE', 'PICKED_UP'])
          .describe('당일 00시 이후 QR 사용 가능 시 AVAILABLE'),
        pickupStatus: zod.enum(['NOT_READY', 'READY', 'PICKED_UP', 'NO_SHOW']),
        userName: zod.string().nullish().describe('참여자 닉네임'),
        productName: zod.string(),
        quantity: zod.number(),
        storeName: zod.string(),
        storeAddress: zod.string(),
        pickupLocation: zod.string(),
        qrCode: zod.uuid().nullish().describe('LOCKED 상태에서는 null'),
        pickupDate: zod.iso.date(),
        pickupTimeStart: zod.iso.time({}).describe('픽업 시작 시각. 예) 13:00'),
        pickupTimeEnd: zod.iso.time({}).describe('픽업 종료 시각. 예) 17:00'),
        dDay: zod
          .number()
          .describe(
            'KST 기준 픽업일까지 남은 날짜. 당일이면 0, 지난 픽업일이면 음수',
          ),
        pickedUpAt: zod.iso.datetime({ offset: true }).nullish(),
      })
      .nullable(),
  }),
  error: zod.unknown().nullable(),
});

/**
 * 현재 활성 역할이 SELLER 또는 ADMIN일 때만 호출할 수 있다.
SELLER 역할 사용자가 본인 매장 공구의 소비자 QR을 스캔하면 READY → PICKED_UP으로 자동 전환한다.
ADMIN 역할 사용자는 운영 대리 처리 용도로 매장 소속 검증 없이 처리할 수 있다.
응답에는 사장님 스캔 결과 화면에 필요한 유저이름, 상품명, 수량, 픽업 상태를 포함한다.

 * @summary QR 코드 스캔 검증 및 수령 처리
 */
export const PostApiV1PickupsQrCodeVerifyParams = zod.object({
  qrCode: zod.uuid(),
});

export const PostApiV1PickupsQrCodeVerifyResponse = zod.object({
  success: zod.boolean(),
  data: zod.object({
    participationId: zod.number(),
    pickupStatus: zod.enum(['NOT_READY', 'READY', 'PICKED_UP', 'NO_SHOW']),
    userName: zod.string().nullish(),
    productName: zod.string(),
    quantity: zod.number(),
    pickedUpAt: zod.iso.datetime({ offset: true }),
    pickupProcessedByUserId: zod.number().nullish(),
  }),
  error: zod.unknown().nullable(),
});
