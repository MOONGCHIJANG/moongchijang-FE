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
  getGetApiV1OwnerGroupBuysResponseMock,
  getGetApiV1OwnerGroupBuysSummaryResponseMock,
  getGetApiV1OwnerGroupBuysManageResponseMock,
  getGetApiV1OwnerGroupBuysGroupBuyIdManageInProgressResponseMock,
  getGetApiV1OwnerSettlementsMonthlySummaryResponseMock,
  getGetApiV1OwnerSettlementsMonthChipsResponseMock,
  getGetApiV1OwnerSettlementsRefundRequestsResponseMock,
  getGetApiV1OwnerSettlementsRefundRequestsParticipationIdResponseMock,
} from '../src/api/generated/owner/owner.msw';
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
import {
  GroupBuyRequestDetail,
  GroupBuyRequestDetailStatus,
} from '../src/api/generated/api.schemas';
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

// 목록·상세·현황 공통 픽스처 (requestId → 고정 데이터)
// 분기 확인: items 배열 항목 수/순서 조절, 빈 배열이면 empty state
const REQUEST_FIXTURES: Record<number, GroupBuyRequestDetail> = {
  1: {
    requestId: 1,
    storeName: '모모양과',
    storeAddress: '서울 성북구 화랑로11길 23',
    placeId: 'ChIJmockplace001',
    roadAddress: '서울 성북구 화랑로11길 23',
    lotAddress: '서울 성북구 월곡동 48-3',
    latitude: 37.601234,
    longitude: 127.052345,
    productName: '두쫀쿠키',
    desiredQuantity: 3,
    desiredPickupDate: '2026-06-10',
    additionalNote: '견과류 알레르기 있어요. 없는 버전으로 부탁드려요!',
    status: GroupBuyRequestDetailStatus.IN_REVIEW,
    rejectionReason: null,
    openedGroupBuyId: null,
    statusHistory: [
      {
        status: GroupBuyRequestDetailStatus.IN_REVIEW,
        changedAt: '2026-05-25T10:00:00Z',
      },
    ],
    createdAt: '2026-05-25T10:00:00Z',
  },
  2: {
    requestId: 2,
    storeName: '르뱅쿠키',
    storeAddress: '서울 마포구 양화로 165',
    placeId: 'ChIJmockplace002',
    roadAddress: '서울 마포구 양화로 165',
    lotAddress: '서울 마포구 서교동 395-166',
    latitude: 37.554321,
    longitude: 126.921234,
    productName: '크림치즈베이글',
    desiredQuantity: 5,
    desiredPickupDate: '2026-06-15',
    additionalNote: null,
    status: GroupBuyRequestDetailStatus.IN_CONTACT,
    rejectionReason: null,
    openedGroupBuyId: null,
    statusHistory: [
      {
        status: GroupBuyRequestDetailStatus.IN_REVIEW,
        changedAt: '2026-05-22T09:00:00Z',
      },
      {
        status: GroupBuyRequestDetailStatus.IN_CONTACT,
        changedAt: '2026-05-24T14:30:00Z',
      },
    ],
    createdAt: '2026-05-22T09:00:00Z',
  },
  3: {
    requestId: 3,
    storeName: '밀도',
    storeAddress: '서울 강남구 테헤란로 152',
    placeId: 'ChIJmockplace003',
    roadAddress: '서울 강남구 테헤란로 152',
    lotAddress: '서울 강남구 역삼동 823-5',
    latitude: 37.498765,
    longitude: 127.028901,
    productName: '소금빵',
    desiredQuantity: 2,
    desiredPickupDate: '2026-06-05',
    additionalNote: '포장 꼼꼼히 부탁드립니다.',
    status: GroupBuyRequestDetailStatus.OPENED,
    rejectionReason: null,
    openedGroupBuyId: 42,
    statusHistory: [
      {
        status: GroupBuyRequestDetailStatus.IN_REVIEW,
        changedAt: '2026-05-18T10:00:00Z',
      },
      {
        status: GroupBuyRequestDetailStatus.IN_CONTACT,
        changedAt: '2026-05-20T11:00:00Z',
      },
      {
        status: GroupBuyRequestDetailStatus.OPENED,
        changedAt: '2026-05-23T15:00:00Z',
      },
    ],
    createdAt: '2026-05-18T10:00:00Z',
  },
  4: {
    requestId: 4,
    storeName: '나폴레옹제과',
    storeAddress: '서울 종로구 인사동10길 11',
    placeId: 'ChIJmockplace004',
    roadAddress: '서울 종로구 인사동10길 11',
    lotAddress: '서울 종로구 관훈동 14-2',
    latitude: 37.572345,
    longitude: 126.987654,
    productName: '말차케이크',
    desiredQuantity: 1,
    desiredPickupDate: '2026-05-30',
    additionalNote: null,
    status: GroupBuyRequestDetailStatus.REJECTED,
    rejectionReason:
      '해당 상품은 매장 사정으로 공구 진행이 어렵습니다. 추후 재오픈 시 안내드릴게요.',
    openedGroupBuyId: null,
    statusHistory: [
      {
        status: GroupBuyRequestDetailStatus.IN_REVIEW,
        changedAt: '2026-05-11T10:00:00Z',
      },
      {
        status: GroupBuyRequestDetailStatus.IN_CONTACT,
        changedAt: '2026-05-13T09:00:00Z',
      },
      {
        status: GroupBuyRequestDetailStatus.REJECTED,
        changedAt: '2026-05-15T16:00:00Z',
      },
    ],
    createdAt: '2026-05-11T10:00:00Z',
  },
};

export function createGroupBuyRequestListMock() {
  return {
    success: true,
    data: Object.values(REQUEST_FIXTURES),
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

export function createGroupBuyRequestDetailMock(requestId: number) {
  const fixture =
    REQUEST_FIXTURES[requestId] ?? REQUEST_FIXTURES[((requestId - 1) % 4) + 1];
  return {
    success: true,
    data: fixture,
    error: null,
  };
}

// 전체 관리 목록 픽스처 — 필터별로 잘라 쓴다
const MANAGE_ALL_ITEMS = [
  {
    groupBuyId: 1,
    productName: '버터 크루아상 3개입',
    price: 18_000,
    pickupDate: '2026-06-10',
    deadlineDday: 3,
    achievementRate: 72,
    currentQuantity: 7,
    targetQuantity: 10,
    status: 'IN_PROGRESS' as const,
  },
  {
    groupBuyId: 2,
    productName: '소금빵 5개입',
    price: 14_500,
    pickupDate: '2026-06-15',
    deadlineDday: 0,
    achievementRate: 45,
    currentQuantity: 4,
    targetQuantity: 9,
    status: 'IN_PROGRESS' as const,
  },
  {
    groupBuyId: 3,
    productName: '말차 라떼 케이크',
    price: 32_000,
    pickupDate: '2026-06-05',
    deadlineDday: 2,
    achievementRate: 100,
    currentQuantity: 12,
    targetQuantity: 12,
    status: 'ACHIEVED' as const,
  },
  {
    groupBuyId: null,
    requestId: 10,
    productName: '르뱅 초코칩쿠키 세트',
    price: 22_000,
    pickupDate: '2026-06-20',
    deadlineDday: null,
    achievementRate: null,
    currentQuantity: null,
    targetQuantity: null,
    status: 'PENDING_APPROVAL' as const,
  },
  {
    groupBuyId: 5,
    productName: '두쫀 쌀쿠키 박스',
    price: 16_000,
    pickupDate: '2026-05-10',
    deadlineDday: null,
    achievementRate: null,
    currentQuantity: null,
    targetQuantity: null,
    status: 'ENDED' as const,
  },
];

export function createOwnerGroupBuysManageMock(filter = 'ALL') {
  const base = getGetApiV1OwnerGroupBuysManageResponseMock();
  const data =
    filter === 'ALL'
      ? MANAGE_ALL_ITEMS
      : MANAGE_ALL_ITEMS.filter((i) => i.status === filter);
  return { ...base, success: true, data, error: null };
}

export function createOwnerGroupBuyRequestDetailMock(requestId: number) {
  return {
    success: true,
    data: {
      requestId,
      storeId: 3,
      storeName: '르뱅쿠키 홍대점',
      productName: '르뱅 초코칩쿠키 세트',
      productDescription: '버터 듬뿍 수제 초코칩쿠키 5개입 세트입니다.',
      price: 22_000,
      targetQuantity: 20,
      maxQuantity: 30,
      thumbnailUrl: '',
      imageUrls: [],
      deadline: '2026-06-30T23:59:59',
      pickupDate: '2026-07-05',
      pickupTimeStart: '10:00',
      pickupTimeEnd: '18:00',
      pickupLocation: '서울 마포구 양화로 165',
      status: 'PENDING' as const,
      rejectionReason: null,
      approvedGroupBuyId: null,
      reviewedAt: null,
      requestedAt: '2026-06-10T09:00:00Z',
    },
    error: null,
  };
}

export function createOwnerGroupBuyCloseMock() {
  return { success: true, data: {}, error: null };
}

export function createOwnerGroupBuyExtensionMock() {
  return { success: true, data: {}, error: null };
}

export function createOwnerGroupBuyRequestCreatedMock() {
  return {
    success: true,
    data: {
      requestId: faker.number.int({ min: 100, max: 999 }),
      status: 'PENDING' as const,
    },
    error: null,
  };
}

export function createOwnerGroupBuysMock() {
  const base = getGetApiV1OwnerGroupBuysResponseMock();
  return {
    ...base,
    success: true,
    data: Array.from({ length: 3 }, (_, i) => {
      const targetQuantity = koFaker.groupBuy.quantity();
      const achievementRate = koFaker.groupBuy.achievementRate();
      return {
        groupBuyId: i + 1,
        productName: koFaker.product.name(),
        achievementRate,
        currentQuantity: Math.floor(targetQuantity * (achievementRate / 100)),
        targetQuantity,
        price: koFaker.product.price(),
        deadline: koFaker.groupBuy.deadline(),
        status: 'IN_PROGRESS' as const,
      };
    }),
    error: null,
  };
}

// ── 분기 확인용: true(빈 상태) / false(데이터 있음, 기본값) ──────────
export const MOCK_SELLER_HOME_EMPTY = false;

export function createOwnerGroupBuysSummaryMock() {
  const base = getGetApiV1OwnerGroupBuysSummaryResponseMock();
  if (MOCK_SELLER_HOME_EMPTY) {
    return {
      ...base,
      success: true,
      data: {
        ongoingCount: 0,
        achievedCount: 0,
        todayPickupUserCount: 0,
        settlementExpectedAmount: 0,
        isEmpty: true,
      },
      error: null,
    };
  }
  return {
    ...base,
    success: true,
    data: {
      ongoingCount: 2,
      achievedCount: 1,
      todayPickupUserCount: 12,
      settlementExpectedAmount: 1_280_000,
      isEmpty: false,
    },
    error: null,
  };
}

const KOREAN_NAMES = [
  '김민지',
  '이지현',
  '박서연',
  '최수민',
  '정다은',
  '이준서',
  '김태양',
  '박지훈',
  '한소희',
  '윤서준',
];
const PAYMENT_METHODS = ['카드', '카카오페이', '네이버페이', '토스페이'];

function koreanPhone(): string {
  return `010-${faker.string.numeric(4)}-${faker.string.numeric(4)}`;
}

export function createOwnerGroupBuyManageDetailMock(
  status: 'IN_PROGRESS' | 'ACHIEVED' = 'IN_PROGRESS',
) {
  const base =
    getGetApiV1OwnerGroupBuysGroupBuyIdManageInProgressResponseMock();
  const productName = koFaker.product.name();
  const pickupTime = koFaker.groupBuy.pickupTime();

  const participants = [
    {
      name: faker.helpers.arrayElement(KOREAN_NAMES),
      phoneNumber: koreanPhone(),
      productName,
      quantity: 2,
      paymentMethod: faker.helpers.arrayElement(PAYMENT_METHODS),
      paymentStatus: 'PAYMENT_COMPLETED',
      pickupTime,
    },
    {
      name: faker.helpers.arrayElement(KOREAN_NAMES),
      phoneNumber: koreanPhone(),
      productName,
      quantity: 1,
      paymentMethod: faker.helpers.arrayElement(PAYMENT_METHODS),
      paymentStatus: 'PAYMENT_COMPLETED',
      pickupTime,
    },
    {
      name: faker.helpers.arrayElement(KOREAN_NAMES),
      phoneNumber: koreanPhone(),
      productName,
      quantity: 3,
      paymentMethod: faker.helpers.arrayElement(PAYMENT_METHODS),
      paymentStatus: 'REFUND_REQUESTED',
      pickupTime,
    },
    {
      name: faker.helpers.arrayElement(KOREAN_NAMES),
      phoneNumber: koreanPhone(),
      productName,
      quantity: 1,
      paymentMethod: faker.helpers.arrayElement(PAYMENT_METHODS),
      paymentStatus: 'PAYMENT_COMPLETED',
      pickupTime,
    },
  ];

  const completedCount = participants.filter(
    (p) => p.paymentStatus === 'PAYMENT_COMPLETED',
  ).length;
  const waitingCount = participants.length - completedCount;

  const today = new Date();
  const sevenDaysAgo = new Date(today);
  sevenDaysAgo.setDate(today.getDate() - 7);

  return {
    ...base,
    success: true,
    data: {
      groupBuyId: 1,
      status,
      recruitmentStartDate: sevenDaysAgo.toISOString().slice(0, 10),
      recruitmentEndDate: today.toISOString().slice(0, 10),
      participantSummary: {
        totalCount: participants.length,
        completedCount,
        waitingCount,
      },
      participants,
    },
    error: null,
  };
}

// ── 정산 ─────────────────────────────────────────────────────────────────

export function createOwnerSettlementMonthChipsMock() {
  const base = getGetApiV1OwnerSettlementsMonthChipsResponseMock();
  return {
    ...base,
    success: true,
    data: {
      chips: [
        { year: 2026, month: 5, label: '2026년 5월' },
        { year: 2026, month: 4, label: '2026년 4월' },
        { year: 2026, month: 3, label: '2026년 3월' },
      ],
    },
    error: null,
  };
}

export function createOwnerSettlementMonthlySummaryMock(year: number, month: number) {
  const base = getGetApiV1OwnerSettlementsMonthlySummaryResponseMock();
  const summaries: Record<string, { gross: number; fee: number }> = {
    '2026-5': { gross: 1_328_000, fee: 304_000 },
    '2026-4': { gross: 980_000, fee: 120_000 },
    '2026-3': { gross: 540_000, fee: 0 },
  };
  const key = `${year}-${month}`;
  const { gross, fee } = summaries[key] ?? { gross: 0, fee: 0 };
  return {
    ...base,
    success: true,
    data: {
      year,
      month,
      grossRevenueAmount: gross,
      refundFeeAmount: fee,
      settlementExpectedAmount: gross - fee,
    },
    error: null,
  };
}

// ── 환불 요청 목록 픽스처 ─────────────────────────────────────────────────

const REFUND_ITEMS = [
  {
    participationId: 101,
    groupBuyId: 3,
    productName: '초코 크루아상&소금빵 세트',
    paymentAmount: 24_000,
    requesterName: '김민지',
    requesterCode: 'P001',
    refundReasonLabel: '단순 변심',
    requestedDate: '2026-05-02',
    status: 'PENDING' as const,
    exceeded24Hours: true,
  },
  {
    participationId: 102,
    groupBuyId: 3,
    productName: '딸기 타르트',
    paymentAmount: 18_000,
    requesterName: '이준서',
    requesterCode: 'P002',
    refundReasonLabel: '상품 불만족',
    requestedDate: '2026-05-02',
    status: 'COMPLETED' as const,
    exceeded24Hours: false,
  },
  {
    participationId: 103,
    groupBuyId: 1,
    productName: '말차 라떼 케이크',
    paymentAmount: 32_000,
    requesterName: '박서연',
    requesterCode: 'P003',
    refundReasonLabel: '픽업 불가',
    requestedDate: '2026-05-03',
    status: 'COMPLETED' as const,
    exceeded24Hours: false,
  },
];

export function createOwnerRefundRequestsMock(tab = 'ALL') {
  const base = getGetApiV1OwnerSettlementsRefundRequestsResponseMock();
  const items =
    tab === 'ALL'
      ? REFUND_ITEMS
      : REFUND_ITEMS.filter((i) => i.status === tab);
  const pendingCount = REFUND_ITEMS.filter((i) => i.status === 'PENDING').length;
  const completedCount = REFUND_ITEMS.filter((i) => i.status === 'COMPLETED').length;
  return {
    ...base,
    success: true,
    data: {
      pendingCount,
      completedCount,
      hasPendingItems: pendingCount > 0,
      items,
    },
    error: null,
  };
}

const REFUND_DETAIL_FIXTURES: Record<number, object> = {
  101: {
    participationId: 101,
    groupBuyId: 3,
    productName: '초코 크루아상&소금빵 세트',
    requesterName: '김민지',
    requestedDate: '2026-05-02',
    paymentAmount: 24_000,
    penaltyAmount: 2_400,
    refundExpectedAmount: 21_600,
    refundReasonLabel: '단순 변심',
    refundReasonDetail: '일정 변경으로 픽업이 어려워졌어요. 변경 부탁드립니다.',
    status: 'PENDING' as const,
  },
  102: {
    participationId: 102,
    groupBuyId: 3,
    productName: '딸기 타르트',
    requesterName: '이준서',
    requestedDate: '2026-05-02',
    paymentAmount: 18_000,
    penaltyAmount: 0,
    refundExpectedAmount: 18_000,
    refundReasonLabel: '상품 불만족',
    refundReasonDetail: null,
    status: 'COMPLETED' as const,
  },
  103: {
    participationId: 103,
    groupBuyId: 1,
    productName: '말차 라떼 케이크',
    requesterName: '박서연',
    requestedDate: '2026-05-03',
    paymentAmount: 32_000,
    penaltyAmount: 3_200,
    refundExpectedAmount: 28_800,
    refundReasonLabel: '픽업 불가',
    refundReasonDetail: '개인 사정으로 픽업이 불가능해졌습니다.',
    status: 'COMPLETED' as const,
  },
};

export function createOwnerRefundDetailMock(participationId: number) {
  const base = getGetApiV1OwnerSettlementsRefundRequestsParticipationIdResponseMock();
  const fixture =
    REFUND_DETAIL_FIXTURES[participationId] ??
    REFUND_DETAIL_FIXTURES[101];
  return { ...base, success: true, data: fixture, error: null };
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
