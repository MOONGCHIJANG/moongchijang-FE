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
import { createGroupBuysFeedMock } from './mock-helpers';

const overrideHandlers = [
  http.get('*/api/v1/group-buys', async () => {
    await delay(800);
    return HttpResponse.json(createGroupBuysFeedMock());
  }),
];

export const handlers = [...overrideHandlers, ...generatedHandlers];
