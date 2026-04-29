/**
 * faker.js 커스텀 mock 데이터 생성 함수
 *
 * Orval이 생성한 mock 함수(getGet...ResponseMock)는 타입만 맞추고
 * 값 범위 제한이 없어서 UI가 깨질 수 있음.
 * 여기서 스프레드로 덮어써 UI 한계치에 맞는 값을 보장함.
 *
 * 새 엔드포인트 추가 예시:
 *   export function createSomethingMock() {
 *     const base = getGetApiV1SomethingResponseMock();
 *     return { ...base, data: { ...base.data, name: faker.string.alpha({ length: { min: 2, max: 10 } }) } };
 *   }
 */

import { faker } from '@faker-js/faker';
import { getGetApiV1GroupBuysResponseMock } from '../src/api/generated/group-buy/group-buy.msw';

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
        price: faker.number.int({ min: 1_000, max: 1_000_000_000 }),
        achievementRate: faker.number.int({ min: 0, max: 100 }),
        currentQuantity: faker.number.int({ min: 1, max: 999 }),
        targetQuantity: faker.number.int({ min: 1, max: 999 }),
        maxQuantity:
          faker.helpers.maybe(() => faker.number.int({ min: 1, max: 999 }), {
            probability: 0.5,
          }) ?? null,
        dDay: faker.number.int({ min: 0, max: 30 }),
      })),
    },
  };
}
