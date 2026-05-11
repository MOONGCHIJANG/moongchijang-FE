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
  return {
    id,
    storeName: koFaker.store.name(),
    region: koFaker.location.region(),
    productName: koFaker.product.name(),
    thumbnailUrl: MOCK_IMAGES[(id - 1) % MOCK_IMAGES.length],
    price: koFaker.product.price(),
    achievementRate,
    currentQuantity,
    targetQuantity,
    maxQuantity: Math.random() > 0.5 ? targetQuantity * 2 : null,
    deadline: koFaker.groupBuy.deadline(),
    pickupDate: koFaker.groupBuy.pickupDate(),
    pickupTimeStart: koFaker.groupBuy.pickupTime(),
    pickupTimeEnd: koFaker.groupBuy.pickupTime(),
    dDay: koFaker.groupBuy.dDay(),
    isWishlisted: faker.datatype.boolean(),
    isClosed: false,
    canParticipate: true,
  };
}

const overrideHandlers = [
  http.get('*/api/v1/group-buys', async () => {
    await delay(800);
    return HttpResponse.json({
      success: true,
      data: {
        content: Array.from({ length: 10 }, (_, i) => createFeedItem(i + 1)),
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
];

export const handlers = [...overrideHandlers, ...generatedHandlers];
