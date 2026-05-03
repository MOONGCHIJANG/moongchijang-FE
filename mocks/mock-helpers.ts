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

export { koFaker } from './ko-faker';

export function createStoreSearchMock() {
  const base = getGetApiV1StoresSearchResponseMock();
  const count = faker.number.int({ min: 3, max: 5 });
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
