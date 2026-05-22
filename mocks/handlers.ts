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
      data: { keywords: recentKeywords },
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
        // case 1: 베이커리 인식, 동네 미인식
        // searchCase: 1,
        // detectedBakery: '두쫀쿠',
        // detectedNeighborhood: null,
        // case 2: 동네 인식, 베이커리 미인식
        // searchCase: 2,
        // detectedBakery: null,
        // detectedNeighborhood: '성수',
        // case 3: 동네 + 베이커리 모두 인식
        // searchCase: 3,
        // detectedBakery: '두쫀쿠',
        // detectedNeighborhood: '분당',
        // case 4: 모두 인식 불가 (현재 활성)
        searchCase: 4,
        detectedBakery: null,
        detectedNeighborhood: null,
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
      ALL: [-1, 0, 1, 3, 7],        // 마감(-1), D-0, D-1, D-3, D-7 혼합
      OPEN: [5, 7, 10, 14, 20],     // 여유 있는 모집중
      CLOSING_SOON: [0, 1, 2, 3],   // D-0 ~ D-3 마감임박
    };
    const rawDDays = dDayByFilter[filter] ?? dDayByFilter['ALL'];
    const dDays = excludeClosed ? rawDDays.filter((d) => d >= 0) : rawDDays;

    const content = dDays.map((dDay, i) => {
      const { id, currentQuantity, targetQuantity, ...rest } = createFeedItem(i + 1);
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
    const urgentCount = content.filter((item) => item.dDay >= 0 && item.dDay <= 2).length;
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
    return HttpResponse.json({ success: true, data: null, error: null }, { status: 201 });
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

    if (body.email !== 'test@test.com' || body.password !== 'Test1234!') {
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
          accessToken: 'mock-access-token',
          tokenType: 'Bearer',
          expiresIn: 3600,
          isNewUser: false,
          user: {
            id: 1,
            provider: 'EMAIL',
            email: 'test@test.com',
            nickname: '테스트유저',
            role: 'BUYER',
            signupCompleted: true,
            deletedAt: null,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          },
        },
        error: null,
      },
      { status: 200 },
    );
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
];

export const handlers = [...overrideHandlers, ...generatedHandlers];
