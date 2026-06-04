/**
 * MSW 핸들러 목록 (Express mock 서버용)
 *
 * - overrideHandlers: faker 값을 UI 한계치에 맞게 커스텀한 핸들러
 *   → generatedHandlers보다 앞에 위치해야 first-match로 우선 적용됨
 *   → delay(ms) | delay('real') | delay('infinite') 로 응답 지연 조절 가능
 *
 * - generatedHandlers: Orval이 swagger 기반으로 자동 생성한 핸들러
 *   → 커스텀이 필요 없는 엔드포인트는 여기서 자동 처리됨
 *
 * 새 API를 faker로 커스텀하려면:
 *   1. mock-helpers.ts에 createXxxMock() 추가
 *   2. overrideHandlers에 http.get/post 등록
 */

import { http, HttpResponse, delay } from 'msw';
import { faker } from '@faker-js/faker';
import { generatedHandlers } from '@/api/generated/index.msw';
import { koFaker } from './ko-faker';
import {
  createGroupBuyDetailMock,
  createStoreSearchMock,
  createGroupBuyRequestMock,
  createMyPageUserMeMock,
  createMyPageTabCountsMock,
  createMyPageParticipationsMock,
  createMyPageRefundsMock,
  createMyPagePickupInfoMock,
  createMyPagePickupWaitingMock,
  createMyPageQrMock,
  MOCK_HAS_PICKUP_WAITING,
  createGroupBuyRequestListMock,
  createGroupBuyRequestDetailMock,
  createOwnerGroupBuysMock,
  createOwnerGroupBuysSummaryMock,
  createOwnerGroupBuysManageMock,
  createOwnerGroupBuyManageDetailMock,
  createOwnerGroupBuyCloseMock,
  createOwnerGroupBuyExtensionMock,
  createOwnerGroupBuyRequestCreatedMock,
  createOwnerGroupBuyRequestDetailMock,
  MOCK_SELLER_HOME_EMPTY,
  createOwnerSettlementMonthChipsMock,
  createOwnerSettlementMonthlySummaryMock,
  createOwnerRefundRequestsMock,
  createOwnerRefundDetailMock,
} from './mock-helpers';
import { formatDeadline } from '@/lib/date';

// 최근 검색어 인메모리 저장소
let recentKeywords: { keyword: string; searchedAt: string }[] = [];

function addToRecent(keyword: string) {
  const now = new Date().toISOString().slice(0, 19) + 'Z';
  recentKeywords = [
    { keyword, searchedAt: now },
    ...recentKeywords.filter((k) => k.keyword !== keyword),
  ].slice(0, 10);
}

const MOCK_IMAGES = [
  '/images/img1.jpg',
  '/images/img2.jpg',
  '/images/img3.webp',
  '/images/img4.jpg',
  '/images/img5.jpg',
];

function createFeedItem(id: number) {
  const targetQuantity = koFaker.groupBuy.quantity();
  const achievementRate = koFaker.groupBuy.achievementRate();
  const currentQuantity = Math.floor(targetQuantity * (achievementRate / 100));
  const dDay = koFaker.groupBuy.dDay();
  const district = koFaker.location.district();
  const pickupDateRaw = koFaker.groupBuy.pickupDate();
  const pickupDateLabel = formatDeadline(pickupDateRaw);

  return {
    id,
    storeName: koFaker.store.name(),
    ...district,
    productName: koFaker.product.name(),
    thumbnailUrl: MOCK_IMAGES[(id - 1) % MOCK_IMAGES.length],
    price: 18000, // koFaker.product.price(),
    achievementRate,
    currentQuantity,
    targetQuantity,
    deadline: koFaker.groupBuy.deadline(),
    pickupDateLabel,
    dDay,
    dDayLabel: dDay === 0 ? 'D-day' : `D-${dDay}`,
  };
}

const TOTAL_ITEMS = 2;

const overrideHandlers = [
  http.get('*/api/v1/group-buys', async ({ request }) => {
    await delay(800);
    const url = new URL(request.url);
    const page = parseInt(url.searchParams.get('page') ?? '1', 10);
    const size = parseInt(url.searchParams.get('size') ?? '10', 10);
    const districts = url.searchParams.getAll('districts');

    // ── 분기 확인용: 하나만 주석 해제해서 확인 ───────────────────────
    // 검색 결과 있음 (현재 활성)
    // const hasSearchResult = true;

    // 검색 결과 없음 — 찾는 지역에 공구 없고 인기 공구 표시
    // const hasSearchResult = false;

    // 경기 지역 선택 시 자동 분기 (districts 기반)
    const hasSearchResult = !districts.some((d) => d.startsWith('GYEONGGI'));
    // ─────────────────────────────────────────────────────────────────

    void districts;
    const startId = (page - 1) * size + 1;
    const itemCount = Math.min(
      size,
      Math.max(0, TOTAL_ITEMS - (page - 1) * size),
    );
    const content = Array.from({ length: itemCount }, (_, i) =>
      createFeedItem(startId + i),
    );
    const totalPages = Math.ceil(TOTAL_ITEMS / size);
    return HttpResponse.json({
      success: true,
      data: {
        content,
        page,
        size,
        totalPages,
        totalElements: TOTAL_ITEMS,
        hasNext: page < totalPages,
        hasRegionalResult: hasSearchResult,
      },
      error: null,
    });
  }),
  http.get('*/api/v1/group-buys/:groupBuyId', async () => {
    await delay(800);
    return HttpResponse.json(createGroupBuyDetailMock());
  }),
  http.get('*/api/v1/stores/search', async () => {
    await delay(800);
    return HttpResponse.json(createStoreSearchMock());
  }),
  http.get('*/api/v1/group-buy-requests', async () => {
    await delay(600);
    return HttpResponse.json(createGroupBuyRequestListMock());
  }),
  http.get('*/api/v1/group-buy-requests/:requestId', async ({ params }) => {
    await delay(600);
    const requestId = Number(params.requestId);
    return HttpResponse.json(createGroupBuyRequestDetailMock(requestId));
  }),
  http.post('*/api/v1/group-buy-requests', async () => {
    await delay(800);
    return HttpResponse.json(createGroupBuyRequestMock(), { status: 201 });
  }),

  // 참여 페이지 — success 고정
  http.post('*/api/v1/group-buys/:groupBuyId/participations', async () => {
    await delay(500);
    return HttpResponse.json(
      {
        success: true,
        data: {
          participationId: faker.number.int({ min: 1, max: 999 }),
          orderName: `${koFaker.product.name()} 1개`,
          totalAmount: 18000,
          productAmount: 18000,
          feeAmount: 0,
        },
        error: null,
      },
      { status: 201 },
    );
  }),
  http.post('*/api/v1/payments/confirm', async () => {
    await delay(300);
    return HttpResponse.json({ success: true, data: {}, error: null });
  }),
  http.post('*/api/v1/payments/fail', async () => {
    return HttpResponse.json({ success: true, data: {}, error: null });
  }),
  http.get('*/api/v1/search/recent', async () => {
    return HttpResponse.json({
      success: true,
      data: recentKeywords.map((k) => k.keyword),
      error: null,
    });
  }),
  http.post('*/api/v1/search', async ({ request }) => {
    const body = (await request.json()) as { keyword?: string };
    if (body.keyword) addToRecent(body.keyword);
    return HttpResponse.json({
      success: true,
      data: {
        // ── 분기 확인용: 하나만 주석 해제해서 확인 ───────────────────────
        // case 1: 상품 인식, 동네 미인식
        searchCase: 'PRODUCT_ONLY',
        detectedProduct: '두쫀쿠',
        detectedRegion: null,
        uiState: 'EMPTY_CAN_REQUEST',
        results: [],
        // case 2: 동네 인식, 상품 미인식
        // searchCase: 'NEIGHBORHOOD_ONLY',
        // detectedProduct: null,
        // detectedRegion: '성수',
        // uiState: 'EMPTY_CAN_REQUEST',
        // results: [],
        // case 3: 동네 + 상품 모두 인식
        // searchCase: 'BOTH_DETECTED',
        // detectedProduct: '두쫀쿠',
        // detectedRegion: '분당',
        // uiState: 'EMPTY_CAN_REQUEST',
        // results: [],
        // case 4: 모두 인식 불가 (현재 활성)
        // searchCase: 'NONE_DETECTED',
        // detectedProduct: null,
        // detectedRegion: null,
        // uiState: 'EMPTY_CAN_REQUEST',
        // results: [],
        // totalCount: 0,
        // confidence: 0,
        // ─────────────────────────────────────────────────────────────────
      },
      error: null,
    });
  }),
  http.delete('*/api/v1/search/recent', async () => {
    recentKeywords = [];
    return HttpResponse.json({ success: true, data: {}, error: null });
  }),
  http.get('*/api/v1/wishlists', async ({ request }) => {
    await delay(600);
    const url = new URL(request.url);
    const filter = url.searchParams.get('filter') ?? 'ALL';
    const excludeClosed = url.searchParams.get('excludeClosed') === 'true';

    // filter별 dDay 세트: ALL=전 상태 혼합, OPEN=마감 여유, CLOSING_SOON=마감임박
    const dDayByFilter: Record<string, number[]> = {
      ALL: [-1, 0, 1, 3, 7], // 마감(-1), D-0, D-1, D-3, D-7 혼합
      OPEN: [5, 7, 10, 14, 20], // 여유 있는 모집중
      CLOSING_SOON: [0, 1, 2, 3], // D-0 ~ D-3 마감임박
    };
    const rawDDays = dDayByFilter[filter] ?? dDayByFilter['ALL'];
    const dDays = excludeClosed ? rawDDays.filter((d) => d >= 0) : rawDDays;

    const content = dDays.map((dDay, i) => {
      const { id, currentQuantity, targetQuantity, ...rest } = createFeedItem(
        i + 1,
      );
      const dDayLabel = dDay === 0 ? 'D-day' : dDay < 0 ? '마감' : `D-${dDay}`;
      return {
        ...rest,
        groupBuyId: id,
        currentParticipantCount: currentQuantity,
        targetParticipantCount: targetQuantity,
        pickupDate: rest.deadline,
        dDay,
        dDayLabel,
        deadlineLabel: dDayLabel,
        isWishlisted: true,
      };
    });
    const urgentCount = content.filter(
      (item) => item.dDay >= 0 && item.dDay <= 2,
    ).length;
    return HttpResponse.json({
      success: true,
      data: {
        content,
        totalElements: content.length,
        totalPages: 1,
        number: 0,
        size: 20,
        urgentCount,
      },
      error: null,
    });
  }),
  http.post('*/api/v1/group-buys/:groupBuyId/wishlist', async () => {
    await delay(200);
    return HttpResponse.json(
      { success: true, data: null, error: null },
      { status: 201 },
    );
  }),
  http.delete('*/api/v1/group-buys/:groupBuyId/wishlist', async () => {
    await delay(200);
    return HttpResponse.json({ success: true, data: null, error: null });
  }),
  http.delete('*/api/v1/search/recent/:keyword', async ({ params }) => {
    const keyword = decodeURIComponent(params.keyword as string);
    recentKeywords = recentKeywords.filter((k) => k.keyword !== keyword);
    return HttpResponse.json({ success: true, data: {}, error: null });
  }),
  http.post('*/api/v1/auth/email/login', async ({ request }) => {
    await delay(500);
    const body = (await request.json()) as { email: string; password: string };

    const ACCOUNTS = {
      'test@test.com': {
        password: 'Test1234!',
        id: 1,
        nickname: '테스트유저',
        role: 'BUYER',
        accessToken: 'mock-access-token',
      },
      'admin@test.com': {
        password: 'Admin1234!',
        id: 2,
        nickname: '운영자',
        role: 'ADMIN',
        accessToken: 'mock-admin-access-token',
      },
      'seller@test.com': {
        password: 'Seller1234!',
        id: 3,
        nickname: '테스트사장님',
        role: 'SELLER',
        accessToken: 'mock-seller-access-token',
      },
    } as const;

    const account = ACCOUNTS[body.email as keyof typeof ACCOUNTS];
    if (!account || account.password !== body.password) {
      return HttpResponse.json(
        {
          success: false,
          data: null,
          error: { message: '이메일 또는 비밀번호가 올바르지 않습니다.' },
        },
        { status: 401 },
      );
    }
    return HttpResponse.json(
      {
        success: true,
        data: {
          accessToken: account.accessToken,
          tokenType: 'Bearer',
          expiresIn: 3600,
          isNewUser: false,
          user: {
            id: account.id,
            provider: 'EMAIL',
            email: body.email,
            nickname: account.nickname,
            role: account.role,
            signupCompleted: true,
            deletedAt: null,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          },
        },
        error: null,
      },
      {
        status: 200,
        headers: {
          'set-cookie':
            'refreshToken=mock-refresh-token; Path=/; SameSite=Strict; Max-Age=1209600',
        },
      },
    );
  }),
  // 피드용 가장 가까운 픽업 QR 조회
  http.get('*/api/v1/pickups/me/nearest-qr', async () => {
    await delay(300);
    return HttpResponse.json({
      success: true,
      data: {
        // ── 분기 확인용: 하나만 주석 해제해서 확인 ───────────────────────
        // 후보 없음
        // hasCandidate: false,
        // hasMultipleToday: false,
        // reason: 'NO_AVAILABLE_PICKUP',
        // item: null,

        // 향후 픽업 예정 (LOCKED)
        hasCandidate: false,
        hasMultipleToday: false,
        reason: 'ONLY_FUTURE_PICKUP',
        item: {
          participationId: 1,
          reservationNumber: 'MCJ-P000001',
          availabilityStatus: 'LOCKED',
          pickupStatus: 'READY',
          productName: '밤티 말빵',
          quantity: 2,
          storeName: '밤티',
          storeAddress: '서울 성동구 성동로 32길',
          pickupLocation: '서울 성동구 성동로 32길, 사이드템포',
          qrCode: null,
          pickupDate: '2026-06-01',
          pickupTimeStart: '14:00',
          pickupTimeEnd: '18:00',
          dDay: 8,
          pickedUpAt: null,
        },

        // 당일 픽업 (AVAILABLE, 현재 활성)
        // hasCandidate: true,
        // hasMultipleToday: false,
        // reason: null,
        // item: {
        //   participationId: 1,
        //   reservationNumber: 'MCJ-P000001',
        //   availabilityStatus: 'AVAILABLE',
        //   pickupStatus: 'READY',
        //   productName: '밤티 말빵',
        //   quantity: 2,
        //   storeName: '밤티',
        //   storeAddress: '서울 성동구 성동로 32길',
        //   pickupLocation: '서울 성동구 성동로 32길, 사이드템포',
        //   qrCode: 'https://moongchijang.com/verify/MCJ-P000001',
        //   pickupDate: '2026-05-24',
        //   pickupTimeStart: '14:00',
        //   pickupTimeEnd: '18:00',
        //   dDay: 0,
        //   pickedUpAt: null,
        // },
        // ─────────────────────────────────────────────────────────────────
      },
      error: null,
    });
  }),

  // checkout
  http.get('*/api/v1/group-buys/:groupBuyId/checkout', async ({ request }) => {
    await delay(300);
    const url = new URL(request.url);
    const quantity = parseInt(url.searchParams.get('quantity') ?? '1', 10);
    const unitPrice = 18000;
    const productAmount = unitPrice * quantity;
    return HttpResponse.json({
      success: true,
      data: {
        groupBuyId: 1,
        storeName: koFaker.store.name(),
        productName: koFaker.product.name(),
        thumbnailUrl: '/images/img1.jpg',
        pickupDate: '2026-05-30',
        pickupTimeStart: '14:00',
        pickupTimeEnd: '18:00',
        unitPrice,
        quantity,
        productAmount,
        feeAmount: 0,
        totalAmount: productAmount,
        remainingQuantity: 10,
      },
      error: null,
    });
  }),

  // payment-orders
  http.post(
    '*/api/v1/group-buys/:groupBuyId/payment-orders',
    async ({ request }) => {
      await delay(500);
      const body = (await request.json()) as { quantity?: number };
      const quantity = body.quantity ?? 1;
      return HttpResponse.json({
        success: true,
        data: {
          paymentId: `MOCK-${crypto.randomUUID()}`,
          storeId: process.env.NEXT_PUBLIC_PORTONE_STORE_ID ?? 'mock-store-id',
          channelKey:
            process.env.NEXT_PUBLIC_PORTONE_CHANNEL_KEY ?? 'mock-channel-key',
          orderName: `${koFaker.product.name()} ${quantity}개`,
          amount: 18000 * quantity,
          customerName: null,
        },
        error: null,
      });
    },
  ),

  // portone/complete
  http.post('*/api/v1/payments/portone/complete', async () => {
    await delay(300);
    return HttpResponse.json({
      success: true,
      data: {
        paymentId: `MOCK-${crypto.randomUUID()}`,
        participationId: faker.number.int({ min: 1, max: 999 }),
        participationStatus: 'PAID_WAITING_GOAL',
        displayStatus: '참여중',
        amount: 18000,
        method: 'card',
        approvedAt: new Date().toISOString(),
      },
      error: null,
    });
  }),

  // 마이페이지
  http.get('*/api/v1/users/me', async () => {
    await delay(300);
    return HttpResponse.json(createMyPageUserMeMock());
  }),
  http.get('*/api/v1/users/me/tabs/counts', async () => {
    await delay(300);
    return HttpResponse.json(createMyPageTabCountsMock());
  }),
  http.get('*/api/v1/users/me/participations', async ({ request }) => {
    await delay(500);
    const url = new URL(request.url);
    const status = (url.searchParams.get('status') ?? 'ACTIVE') as
      | 'ACTIVE'
      | 'COMPLETED';
    return HttpResponse.json(createMyPageParticipationsMock(status));
  }),
  http.get('*/api/v1/users/me/refunds', async () => {
    await delay(300);
    return HttpResponse.json(createMyPageRefundsMock());
  }),
  http.post('*/api/v1/participations/:participationId/cancel', async () => {
    await delay(500);
    return HttpResponse.json({ success: true, data: {}, error: null });
  }),
  http.get('*/api/v1/users/me/participations/pickup-waiting', async () => {
    await delay(300);
    return HttpResponse.json(createMyPagePickupWaitingMock());
  }),
  http.get('*/api/v1/participations/:participationId/pickup', async () => {
    await delay(300);
    return HttpResponse.json(createMyPagePickupInfoMock());
  }),
  http.get('*/api/v1/participations/:participationId/qr', async () => {
    await delay(300);
    return HttpResponse.json(createMyPageQrMock());
  }),
  // 닉네임 중복 확인 — available: true 고정 (false로 바꿔 중복 케이스 확인 가능)
  http.get('*/api/v1/users/nickname/availability', async () => {
    await delay(300);
    return HttpResponse.json({
      success: true,
      data: { available: true },
      error: null,
    });
  }),
  // 프로필(닉네임) 업데이트
  http.patch('*/api/v1/users/me/profile', async () => {
    await delay(400);
    return HttpResponse.json(
      { success: true, data: {}, error: null },
      { status: 200 },
    );
  }),
  http.post('*/api/v1/auth/logout', async () => {
    await delay(300);
    return HttpResponse.json({ success: true, data: {}, error: null });
  }),
  http.delete('*/api/v1/users/me', async () => {
    await delay(500);
    if (MOCK_HAS_PICKUP_WAITING) {
      return HttpResponse.json(
        {
          success: false,
          data: null,
          error: { message: '수령 예정인 공구가 있어요.' },
        },
        { status: 400 },
      );
    }
    return HttpResponse.json(
      { success: true, data: {}, error: null },
      { status: 200 },
    );
  }),

  http.post('*/api/v1/users/me/phone/verification-codes', async () => {
    await delay(500);
    return HttpResponse.json(
      {
        success: true,
        data: { expiresInSeconds: 180, resendAvailableInSeconds: 60 },
        error: null,
      },
      { status: 200 },
    );
  }),

  http.post('*/api/v1/users/me/phone/verification-codes/verify', async () => {
    await delay(500);
    return HttpResponse.json(
      { success: true, data: null, error: null },
      { status: 200 },
    );
  }),

  // ── 사장님 홈 ─────────────────────────────────────────────────────────
  // ── 사장님 홈 ─────────────────────────────────────────────────────────
  // 분기 확인: mock-helpers.ts 의 MOCK_SELLER_HOME_EMPTY 를 true/false 로 토글
  http.get('*/api/v1/owner/group-buys/summary', async () => {
    await delay(500);
    return HttpResponse.json(createOwnerGroupBuysSummaryMock(), {
      status: 200,
    });
  }),

  http.get('*/api/v1/owner/group-buys', async () => {
    await delay(500);
    // 빈 상태일 때는 빈 배열 반환
    if (MOCK_SELLER_HOME_EMPTY) {
      return HttpResponse.json(
        { success: true, data: [], error: null },
        { status: 200 },
      );
    }
    return HttpResponse.json(createOwnerGroupBuysMock(), { status: 200 });
  }),

  // ── 공구 관리 목록 (탭 필터 반영) ──────────────────────────────────────
  http.get('*/api/v1/owner/group-buys/manage', async ({ request }) => {
    await delay(500);
    const url = new URL(request.url);
    const filter = url.searchParams.get('filter') ?? 'ALL';
    return HttpResponse.json(createOwnerGroupBuysManageMock(filter), {
      status: 200,
    });
  }),

  // ── 공구 마감 / 기간 연장 요청 ────────────────────────────────────────
  http.post(
    '*/api/v1/owner/group-buys/:groupBuyId/close-requests',
    async () => {
      await delay(500);
      return HttpResponse.json(createOwnerGroupBuyCloseMock(), { status: 200 });
    },
  ),

  http.post(
    '*/api/v1/owner/group-buys/:groupBuyId/extension-requests',
    async () => {
      await delay(500);
      return HttpResponse.json(createOwnerGroupBuyExtensionMock(), {
        status: 200,
      });
    },
  ),

  // ── 공구 개설 요청 상세 조회 (승인대기) ───────────────────────────────
  http.get(
    '*/api/v1/owner/group-buy-requests/:requestId',
    async ({ params }) => {
      await delay(400);
      const requestId = Number(params.requestId);
      return HttpResponse.json(
        createOwnerGroupBuyRequestDetailMock(requestId),
        { status: 200 },
      );
    },
  ),

  // ── 공구 개설 요청 제출 ────────────────────────────────────────────────
  http.post('*/api/v1/owner/group-buy-requests', async () => {
    await delay(800);
    return HttpResponse.json(createOwnerGroupBuyRequestCreatedMock(), {
      status: 201,
    });
  }),

  http.get(
    '*/api/v1/owner/group-buys/:groupBuyId/manage/in-progress',
    async () => {
      await delay(500);
      return HttpResponse.json(
        createOwnerGroupBuyManageDetailMock('IN_PROGRESS'),
        { status: 200 },
      );
    },
  ),

  http.get(
    '*/api/v1/owner/group-buys/:groupBuyId/manage/achieved',
    async () => {
      await delay(500);
      return HttpResponse.json(
        createOwnerGroupBuyManageDetailMock('ACHIEVED'),
        { status: 200 },
      );
    },
  ),

  // ── 정산 ─────────────────────────────────────────────────────────────
  http.get('*/api/v1/owner/settlements/month-chips', async () => {
    await delay(300);
    return HttpResponse.json(createOwnerSettlementMonthChipsMock(), { status: 200 });
  }),

  http.get('*/api/v1/owner/settlements/monthly-summary', async ({ request }) => {
    await delay(400);
    const url = new URL(request.url);
    const year = parseInt(url.searchParams.get('year') ?? '2026', 10);
    const month = parseInt(url.searchParams.get('month') ?? '5', 10);
    return HttpResponse.json(
      createOwnerSettlementMonthlySummaryMock(year, month),
      { status: 200 },
    );
  }),

  http.get('*/api/v1/owner/settlements/refund-requests', async ({ request }) => {
    await delay(400);
    const url = new URL(request.url);
    const tab = url.searchParams.get('tab') ?? 'ALL';
    return HttpResponse.json(createOwnerRefundRequestsMock(tab), { status: 200 });
  }),

  http.get(
    '*/api/v1/owner/settlements/refund-requests/:participationId',
    async ({ params }) => {
      await delay(300);
      const participationId = Number(params.participationId);
      return HttpResponse.json(
        createOwnerRefundDetailMock(participationId),
        { status: 200 },
      );
    },
  ),

  http.post(
    '*/api/v1/owner/settlements/refund-requests/:participationId/review-submissions',
    async () => {
      await delay(500);
      return HttpResponse.json(
        { success: true, data: { participationId: 101, processed: true }, error: null },
        { status: 200 },
      );
    },
  ),

  // ── 알림 (사장님용 픽스처) ─────────────────────────────────────────────
  http.get('*/api/v1/notifications', async () => {
    await delay(300);
    const hoursAgo = (h: number) =>
      new Date(Date.now() - h * 3_600_000).toISOString();
    return HttpResponse.json({
      success: true,
      data: {
        items: [
          {
            id: 1,
            type: 'PICKUP',
            title: '오늘 픽업일이에요!',
            body: '소금빵 45개 / 14:00~16:00',
            isRead: false,
            occurredAt: hoursAgo(3),
            triggerType: 'OWNER_PICKUP_SAME_DAY_MORNING',
            deeplinkType: 'GROUPBUY_DETAIL',
            deeplinkParams: { groupBuyId: '1' },
            section: 'TODAY',
            targetId: 1,
          },
          {
            id: 2,
            type: 'PICKUP',
            title: '내일 픽업 안내드려요',
            body: '크루아상 30개 / 14:00~16:00',
            isRead: false,
            occurredAt: hoursAgo(8),
            triggerType: 'OWNER_PICKUP_DAY_BEFORE_MORNING',
            deeplinkType: 'GROUPBUY_DETAIL',
            deeplinkParams: { groupBuyId: '2' },
            section: 'TODAY',
            targetId: 2,
          },
          {
            id: 3,
            type: 'REQUEST',
            title: '공구가 달성됐어요! 🎉',
            body: '마카롱 25개 주문이 달성됐습니다.',
            isRead: true,
            occurredAt: hoursAgo(12),
            triggerType: 'OWNER_GROUPBUY_ACHIEVED_IMMEDIATE',
            deeplinkType: 'GROUPBUY_DETAIL',
            deeplinkParams: { groupBuyId: '3' },
            section: 'YESTERDAY',
            targetId: 3,
          },
          {
            id: 4,
            type: 'REQUEST',
            title: '공구가 미달됐어요',
            body: '유기농 통밀 베이글 6개 세트 공구가 목표 미달로 종료됐어요.',
            isRead: true,
            occurredAt: '2026-05-13T08:00:00Z',
            triggerType: 'OWNER_GROUPBUY_FAILED_IMMEDIATE',
            deeplinkType: 'GROUPBUY_DETAIL',
            deeplinkParams: { groupBuyId: '4' },
            section: 'OLDER',
            targetId: 4,
          },
          {
            id: 5,
            type: 'REQUEST',
            title: '공구 조기 마감 요청이 수락됐어요',
            body: '유기농 통밀 베이글 6개 세트 조기 마감 요청이 승인됐어요.',
            isRead: true,
            occurredAt: '2026-05-13T09:00:00Z',
            triggerType: 'OWNER_CLOSE_REQUEST_APPROVED_IMMEDIATE',
            deeplinkType: 'GROUPBUY_DETAIL',
            deeplinkParams: { groupBuyId: '4' },
            section: 'OLDER',
            targetId: 4,
          },
          {
            id: 6,
            type: 'REQUEST',
            title: '공구 조기 마감 요청이 거절됐어요',
            body: '곡선 밀 앙금 단팥빵 10개 조기 마감 요청이 거절됐어요.',
            isRead: true,
            occurredAt: '2026-04-07T10:00:00Z',
            triggerType: 'OWNER_CLOSE_REQUEST_REJECTED_IMMEDIATE',
            deeplinkType: 'GROUPBUY_DETAIL',
            deeplinkParams: { groupBuyId: '5' },
            section: 'OLDER',
            targetId: 5,
          },
          {
            id: 7,
            type: 'REQUEST',
            title: '공구 개설 요청이 승인됐어요',
            body: '두쫀쿠키 공구 개설 요청이 승인됐어요.',
            isRead: true,
            occurredAt: '2026-04-06T10:00:00Z',
            triggerType: 'OWNER_OPEN_REQUEST_APPROVED_IMMEDIATE',
            deeplinkType: 'GROUPBUY_DETAIL',
            deeplinkParams: { groupBuyId: '6' },
            section: 'OLDER',
            targetId: 6,
          },
          {
            id: 8,
            type: 'REQUEST',
            title: '공구 개설 요청이 거절됐어요',
            body: '크림치즈베이글 공구 개설 요청이 거절됐어요.',
            isRead: true,
            occurredAt: '2026-04-05T10:00:00Z',
            triggerType: 'OWNER_OPEN_REQUEST_REJECTED_IMMEDIATE',
            deeplinkType: 'GROUPBUY_DETAIL',
            deeplinkParams: { groupBuyId: '7' },
            section: 'OLDER',
            targetId: 7,
          },
          {
            id: 9,
            type: 'REQUEST',
            title: '주문 확인이 필요해요',
            body: '말차 라떼 케이크 주문을 확인해 주세요.',
            isRead: true,
            occurredAt: '2026-04-04T10:00:00Z',
            triggerType: 'OWNER_ORDER_CONFIRM_REQUIRED_IMMEDIATE',
            deeplinkType: 'GROUPBUY_DETAIL',
            deeplinkParams: { groupBuyId: '8' },
            section: 'OLDER',
            targetId: 8,
          },
          {
            id: 10,
            type: 'REQUEST',
            title: '주문이 취소됐어요',
            body: '소금빵 5개입 주문이 취소됐어요.',
            isRead: true,
            occurredAt: '2026-04-03T10:00:00Z',
            triggerType: 'OWNER_ORDER_CANCELLED_IMMEDIATE',
            deeplinkType: 'GROUPBUY_DETAIL',
            deeplinkParams: { groupBuyId: '9' },
            section: 'OLDER',
            targetId: 9,
          },
        ],
        nextCursor: null,
        hasNext: false,
      },
      error: null,
    });
  }),
];

export const handlers = [...overrideHandlers, ...generatedHandlers];
