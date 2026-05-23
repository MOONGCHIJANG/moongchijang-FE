/**
 * MSW 핸들러에서 사용할 커스텀 mock 데이터 생성 함수 모음.
 *
 * koFaker를 사용해 서비스에 맞는 한글 데이터를 생성합니다.
 * Orval 자동 생성 핸들러(generatedHandlers)를 덮어써야 할 때 여기에 추가하세요.
 *
 * 추가 예시:
 *   export function createSomethingMock() {
 *     return {
 *       success: true,
 *       data: {
 *         storeName: koFaker.store.name(),
 *         ...
 *       },
 *       error: null,
 *     };
 *   }
 */

import { faker } from '@faker-js/faker';
import {
  getGetApiV1GroupBuysGroupBuyIdResponseMock,
  getGetApiV1GroupBuysResponseMock,
} from '../src/api/generated/group-buy/group-buy.msw';
import {
  getGetApiV1StoresSearchResponseMock,
  getPostApiV1GroupBuyRequestsResponseMock,
} from '../src/api/generated/group-buy-request/group-buy-request.msw';
import { getGetApiV1UsersMeResponseMock } from '../src/api/generated/auth/auth.msw';
import {
  getGetApiV1UsersMeTabsCountsResponseMock,
  getGetApiV1UsersMeParticipationsResponseMock,
  getGetApiV1UsersMeParticipationsPickupWaitingResponseMock,
  getGetApiV1UsersMeRefundsResponseMock,
} from '../src/api/generated/my-page/my-page.msw';
import {
  getGetApiV1ParticipationsParticipationIdPickupResponseMock,
  getGetApiV1ParticipationsParticipationIdQrResponseMock,
} from '../src/api/generated/pickup/pickup.msw';
import { koFaker } from './ko-faker';

const MOCK_IMAGES = [
  '/images/img1.jpg',
  '/images/img2.jpg',
  '/images/img3.webp',
  '/images/img4.jpg',
  '/images/img5.jpg',
];

const BAKERY_NAMES = [
  '모모양과',
  '나폴레옹제과',
  '성심당 본점',
  '빵굽는오빠',
  '브레드런던',
  '밀도',
  '르뱅쿠키',
  '나무그늘제과점',
  '달달빵집',
  '파란하늘베이커리',
];

const ROAD_ADDRESSES = [
  '서울 성북구 화랑로11길 23',
  '서울 마포구 양화로 165',
  '서울 강남구 테헤란로 152',
  '서울 종로구 인사동10길 11',
  '서울 서초구 반포대로 201',
  '서울 용산구 이태원로 177',
  '서울 송파구 올림픽로 300',
  '서울 노원구 상계로 135',
];

const LOT_ADDRESSES = [
  '서울 성북구 월곡동 48-3',
  '서울 마포구 서교동 395-166',
  '서울 강남구 역삼동 823-5',
  '서울 종로구 관훈동 14-2',
  '서울 서초구 서초동 1580-1',
  null,
  null,
];

function pastDate(minDays: number, maxDays: number): string {
  const date = new Date();
  date.setDate(
    date.getDate() - faker.number.int({ min: minDays, max: maxDays }),
  );
  return date.toISOString().slice(0, 10);
}

export { koFaker } from './ko-faker';

export function createStoreSearchMock() {
  const base = getGetApiV1StoresSearchResponseMock();
  const count = 3;
  return {
    ...base,
    success: true,
    data: {
      stores: Array.from({ length: count }, () => ({
        placeId: faker.string.alphanumeric({ length: 12 }),
        storeName: faker.helpers.arrayElement(BAKERY_NAMES),
        roadAddress: faker.helpers.arrayElement(ROAD_ADDRESSES),
        lotAddress: faker.helpers.arrayElement(LOT_ADDRESSES),
        latitude: faker.number.float({
          min: 37.4,
          max: 37.7,
          fractionDigits: 6,
        }),
        longitude: faker.number.float({
          min: 126.8,
          max: 127.2,
          fractionDigits: 6,
        }),
        thumbnailUrl: faker.helpers.arrayElement(MOCK_IMAGES),
      })),
    },
    error: null,
  };
}

export function createGroupBuyRequestMock() {
  const base = getPostApiV1GroupBuyRequestsResponseMock();
  return {
    ...base,
    success: true,
    data: null,
    error: null,
  };
}

export function createGroupBuyDetailMock() {
  const base = getGetApiV1GroupBuysGroupBuyIdResponseMock();
  const targetQuantity = koFaker.groupBuy.quantity();
  const achievementRate = koFaker.groupBuy.achievementRate();
  const currentQuantity = Math.floor(targetQuantity * (achievementRate / 100));

  return {
    ...base,
    success: true,
    data: {
      ...base.data,
      imageUrls: [faker.helpers.arrayElement(MOCK_IMAGES)],
      storeName: koFaker.store.name(),
      productName: koFaker.product.name(),
      productDescription: koFaker.product.description(),
      notice: koFaker.product.notice(),
      region: koFaker.location.region(),
      pickupLocation: koFaker.location.address(),
      pickupLatitude: koFaker.location.lat(),
      pickupLongitude: koFaker.location.lng(),
      price: 18000, // koFaker.product.price(),
      achievementRate,
      currentQuantity,
      targetQuantity,
      maxQuantity: 1, // Math.random() > 0.5 ? targetQuantity * 2 : null,
      deadline: koFaker.groupBuy.deadline(),
      pickupDate: koFaker.groupBuy.pickupDate(),
      pickupTimeStart: koFaker.groupBuy.pickupTime(),
      pickupTimeEnd: koFaker.groupBuy.pickupTime(),
      dDay: koFaker.groupBuy.dDay(),
    },
  };
}

export function createMyPageUserMeMock() {
  const base = getGetApiV1UsersMeResponseMock();
  return {
    ...base,
    success: true,
    data: {
      ...base.data,
      provider: 'EMAIL' as const,
      email: koFaker.user.email(),
      nickname: koFaker.user.nickname(),
      role: 'BUYER' as const,
      signupCompleted: true,
      deletedAt: null,
    },
    error: null,
  };
}

export function createMyPageTabCountsMock() {
  const base = getGetApiV1UsersMeTabsCountsResponseMock();
  return {
    ...base,
    success: true,
    data: {
      activeCount: 3,
      completedCount: 2,
      refundedCount: 2,
      requestCount: 1,
    },
    error: null,
  };
}

function participationBase(id: number, pickupDate: string) {
  return {
    participationId: id,
    groupBuyId: id,
    productName: koFaker.product.name(),
    storeName: koFaker.store.name(),
    pickupDate,
    pickupTimeStart: koFaker.groupBuy.pickupTime(),
    pickupTimeEnd: koFaker.groupBuy.pickupTime(),
    paymentAmount: 18000,
    quantity: 1,
  };
}

export function createMyPageParticipationsMock(status: 'ACTIVE' | 'COMPLETED') {
  const base = getGetApiV1UsersMeParticipationsResponseMock();

  const activeContent = [
    {
      ...participationBase(1, koFaker.groupBuy.pickupDate()),
      achievementRate: koFaker.groupBuy.achievementRate(),
      achievementStatus: 'BEFORE_ACHIEVED' as const,
      dDay: koFaker.groupBuy.dDay(),
      canCancel: true,
      canViewPickup: false,
      canViewQr: false,
    },
    {
      ...participationBase(2, koFaker.groupBuy.pickupDate()),
      achievementRate: koFaker.groupBuy.achievementRate(),
      achievementStatus: 'BEFORE_ACHIEVED' as const,
      dDay: koFaker.groupBuy.dDay(),
      canCancel: false,
      canViewPickup: false,
      canViewQr: false,
    },
    {
      ...participationBase(3, koFaker.groupBuy.pickupDate()),
      achievementRate: 100,
      achievementStatus: 'ACHIEVED' as const,
      dDay: koFaker.groupBuy.dDay(),
      canCancel: false,
      canViewPickup: true,
      canViewQr: true,
    },
  ];

  const completedContent = [
    {
      ...participationBase(4, pastDate(1, 30)),
      achievementRate: 100,
      achievementStatus: 'ACHIEVED' as const,
      dDay: 0,
      canCancel: false,
      canViewPickup: true,
      canViewQr: true,
    },
    {
      ...participationBase(5, pastDate(1, 30)),
      achievementRate: 100,
      achievementStatus: 'ACHIEVED' as const,
      dDay: 0,
      canCancel: false,
      canViewPickup: true,
      canViewQr: true,
    },
  ];

  const content = status === 'ACTIVE' ? activeContent : completedContent;

  return {
    ...base,
    success: true,
    data: content,
    error: null,
  };
}

export function createMyPageRefundsMock() {
  const base = getGetApiV1UsersMeRefundsResponseMock();
  return {
    ...base,
    success: true,
    data: [
      {
        participationId: 6,
        productName: koFaker.product.name(),
        storeName: koFaker.store.name(),
        pickupDate: pastDate(1, 30),
        pickupTimeStart: koFaker.groupBuy.pickupTime(),
        pickupTimeEnd: koFaker.groupBuy.pickupTime(),
        paymentAmount: 18000,
        quantity: 1,
        refundStatus: 'PENDING' as const,
        cancelReason: 'NOT_ACHIEVED' as const,
      },
      {
        participationId: 7,
        productName: koFaker.product.name(),
        storeName: koFaker.store.name(),
        pickupDate: pastDate(1, 30),
        pickupTimeStart: koFaker.groupBuy.pickupTime(),
        pickupTimeEnd: koFaker.groupBuy.pickupTime(),
        paymentAmount: 18000,
        quantity: 1,
        refundStatus: 'COMPLETED' as const,
        cancelReason: 'EARLY_EXIT' as const,
      },
    ],
    error: null,
  };
}

export function createMyPagePickupInfoMock() {
  const base = getGetApiV1ParticipationsParticipationIdPickupResponseMock();
  return {
    ...base,
    success: true,
    data: {
      ...base.data,
      participationId: 3,
      storeName: koFaker.store.name(),
      storePhone: '02-1234-5678',
      storeAddress: koFaker.location.address(),
      latitude: koFaker.location.lat(),
      longitude: koFaker.location.lng(),
      transitInfo: null,
      pickupDate: koFaker.groupBuy.pickupDate(),
      pickupTimeStart: koFaker.groupBuy.pickupTime(),
      pickupTimeEnd: koFaker.groupBuy.pickupTime(),
      productName: koFaker.product.name(),
      quantity: 1,
      remainingMinutes: faker.number.int({ min: 10, max: 120 }),
    },
    error: null,
  };
}

// ── 분기 확인용: true(탈퇴 불가) / false(탈퇴 가능) 로 전환 ──────────
export const MOCK_HAS_PICKUP_WAITING = false;

export function createMyPagePickupWaitingMock() {
  const base = getGetApiV1UsersMeParticipationsPickupWaitingResponseMock();
  const content = MOCK_HAS_PICKUP_WAITING
    ? [
        {
          participationId: 3,
          groupBuyId: 3,
          productName: koFaker.product.name(),
          storeName: koFaker.store.name(),
          pickupAt: koFaker.groupBuy.pickupDate(),
          paidAmount: 18000,
          quantity: 1,
          isClosed: false,
          participatedAt: new Date().toISOString(),
        },
      ]
    : [];
  return {
    ...base,
    success: true,
    data: {
      content,
      totalElements: content.length,
      totalPages: content.length > 0 ? 1 : 0,
    },
    error: null,
  };
}

export function createMyPageQrMock() {
  const base = getGetApiV1ParticipationsParticipationIdQrResponseMock();
  return {
    ...base,
    success: true,
    data: {
      ...base.data,
      qrCode: faker.string.uuid(),
      nickname: koFaker.user.nickname(),
      productName: koFaker.product.name(),
      quantity: 1,
      isUsed: false,
      storeName: koFaker.store.name(),
      pickupDate: koFaker.groupBuy.pickupDate(),
      pickupTimeStart: koFaker.groupBuy.pickupTime(),
      pickupTimeEnd: koFaker.groupBuy.pickupTime(),
    },
    error: null,
  };
}

export function createGroupBuysFeedMock() {
  const base = getGetApiV1GroupBuysResponseMock();

  return {
    ...base,
    success: true,
    data: {
      ...base.data,
      content: base.data.content.map((item) => ({
        ...item,
        storeName: faker.string.alpha({ length: { min: 4, max: 15 } }),
        productName: faker.string.alpha({ length: { min: 6, max: 22 } }),
        region: faker.string.alpha({ length: { min: 3, max: 12 } }),
        price: 18000, // faker.number.int({ min: 1_000, max: 1_000_000_000 }),
        achievementRate: faker.number.int({ min: 0, max: 100 }),
        currentQuantity: faker.number.int({ min: 1, max: 999 }),
        targetQuantity: faker.number.int({ min: 1, max: 999 }),
        maxQuantity: 1,
        // faker.helpers.maybe(() => faker.number.int({ min: 1, max: 999 }), {
        //   probability: 0.5,
        // }) ?? null,
        dDay: faker.number.int({ min: 0, max: 30 }),
      })),
    },
  };
}
