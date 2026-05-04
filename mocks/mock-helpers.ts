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

import { getGetApiV1GroupBuysGroupBuyIdResponseMock } from '../src/api/generated/group-buy/group-buy.msw';
import { koFaker } from './ko-faker';

export { koFaker } from './ko-faker';

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
      storeName: koFaker.store.name(),
      productName: koFaker.product.name(),
      productDescription: koFaker.product.description(),
      notice: koFaker.product.notice(),
      region: koFaker.location.region(),
      pickupLocation: koFaker.location.address(),
      pickupLatitude: koFaker.location.lat(),
      pickupLongitude: koFaker.location.lng(),
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
    },
  };
}
