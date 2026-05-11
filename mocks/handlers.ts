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
import { generatedHandlers } from '@/api/generated/index.msw';
import { koFaker } from './ko-faker';
import { createGroupBuyDetailMock } from './mock-helpers';
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
    price: koFaker.product.price(),
    achievementRate,
    currentQuantity,
    targetQuantity,
    deadline: koFaker.groupBuy.deadline(),
    pickupDateLabel,
    dDay,
    dDayLabel: dDay === 0 ? 'D-day' : `D-${dDay}`,
  };
}

const TOTAL_ITEMS = 35;

const overrideHandlers = [
  http.get('*/api/v1/group-buys', async ({ request }) => {
    await delay(800);
    const url = new URL(request.url);
    const page = parseInt(url.searchParams.get('page') ?? '1', 10);
    const size = parseInt(url.searchParams.get('size') ?? '10', 10);
    const districts = url.searchParams.getAll('districts');
    // 경기 지역 선택 시 hasSearchResult: false + 인기 공구(백엔드 정렬) content 반환
    const hasSearchResult = !districts.some((d) => d.startsWith('GYEONGGI'));
    const startId = (page - 1) * size + 1;
    const itemCount = Math.min(size, Math.max(0, TOTAL_ITEMS - (page - 1) * size));
    const content = Array.from({ length: itemCount }, (_, i) => createFeedItem(startId + i));
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
        hasSearchResult,
      },
      error: null,
    });
  }),
  http.get('*/api/v1/group-buys/:groupBuyId', async () => {
    await delay(800);
    return HttpResponse.json(createGroupBuyDetailMock());
  }),
  http.get('*/api/v1/search/recent', async () => {
    return HttpResponse.json({
      success: true,
      data: { keywords: recentKeywords },
      error: null,
    });
  }),
  http.post('*/api/v1/search', async ({ request }) => {
    const body = await request.json() as { keyword?: string };
    if (body.keyword) addToRecent(body.keyword);
    return HttpResponse.json({
      success: true,
      data: { keyword: body.keyword },
      error: null,
    });
  }),
  http.delete('*/api/v1/search/recent', async () => {
    recentKeywords = [];
    return HttpResponse.json({ success: true, data: {}, error: null });
  }),
  http.delete('*/api/v1/search/recent/:keyword', async ({ params }) => {
    const keyword = decodeURIComponent(params.keyword as string);
    recentKeywords = recentKeywords.filter((k) => k.keyword !== keyword);
    return HttpResponse.json({ success: true, data: {}, error: null });
  }),
];

export const handlers = [...overrideHandlers, ...generatedHandlers];
