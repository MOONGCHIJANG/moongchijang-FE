import { faker } from '@faker-js/faker';

const storeNames = [
  '오월제과',
  '밀랩',
  '브레드핸즈',
  '파티세리 르블랑',
  '소금빵연구소',
  '달콤제과점',
  '오월의 종',
  '풍년제과',
  '어니언 베이커리',
  '마라카나 빵집',
  '빵빵데이',
  '아침향기 베이커리',
  '르팽 드 파리',
  '몽슈슈',
  '크루아상공방',
  '브레드이발소',
  '성심당 분점',
  '태극당',
];

const productNames = [
  '명란 소금빵 5개입',
  '얼그레이 크림 스콘 4개입',
  '크림치즈 베이글 6개입',
  '말차 마들렌 12개입',
  '리코타 치즈 소금빵 4개입',
  '흑임자 크림 롤케이크',
  '버터 크루아상 3개입',
  '앙버터 식빵 1개',
  '시나몬 롤 2개입',
  '카망베르 치즈 베이글 4개입',
  '고구마 무스 케이크',
  '클래식 에그타르트 6개입',
  '더블 초콜릿 브라우니 8개입',
  '레몬 글레이즈 파운드케이크',
  '소금 버터 롤 4개입',
  '크림 단팥빵 5개입',
  '티라미수 컵케이크 4개입',
  '바스크 치즈케이크 1호',
];

const productDescriptions = [
  '매일 아침 직접 구워내는 신선한 재료만을 사용한 시그니처 제품입니다. 국내산 재료를 엄선하여 정성껏 만들었습니다.',
  '진한 풍미와 부드러운 식감이 특징인 인기 메뉴입니다. 오직 공구로만 만나볼 수 있는 한정 구성입니다.',
  '베이커리 대표 셰프가 직접 개발한 레시피로 만든 제품입니다. 선물용으로도 손색이 없는 정갈한 패키지로 제공됩니다.',
  '겉은 바삭하고 속은 촉촉한 완벽한 식감을 자랑합니다. 오전에 구워 당일 픽업으로만 만나볼 수 있는 신선한 맛입니다.',
  '국내산 유기농 밀가루와 무항생제 버터만을 사용한 프리미엄 제품입니다. 첨가물 없이 본연의 맛을 살렸습니다.',
];

const notices = [
  '픽업 당일 소비를 권장하며, 냉장 보관 시 2일 이내 섭취해주세요.\n밀(글루텐), 유제품, 계란이 포함되어 있습니다.\n취소는 마감일 24시간 전까지 가능합니다.',
  '당일 제조 제품으로 픽업 후 즉시 섭취를 권장합니다.\n알레르기 유발 성분: 밀, 계란, 유제품, 대두.\n공구 달성 실패 시 자동 환불 처리됩니다.',
  '서늘한 곳에 보관 시 제조일로부터 3일 이내 섭취해주세요.\n냉동 보관 후 해동하여 드실 수 있습니다.\n최소 수량 미달성 시 결제가 취소됩니다.',
];

const regions = [
  '강남',
  '홍대',
  '성수',
  '압구정',
  '서초',
  '잠실',
  '종로',
  '마포',
  '이태원',
  '송파',
  '여의도',
  '신촌',
  '건대',
  '합정',
  '망원',
];

const addresses = [
  '서울 강남구 역삼동 테헤란로 123',
  '서울 마포구 합정동 월드컵로 45',
  '서울 성동구 성수동2가 뚝섬로 67',
  '서울 강남구 압구정동 도산대로 89',
  '서울 서초구 방배동 방배로 12',
  '서울 송파구 잠실동 올림픽로 34',
  '서울 종로구 인사동 인사동길 56',
  '서울 마포구 서교동 어울마당로 78',
  '서울 영등포구 여의도동 여의나루로 90',
  '서울 서대문구 신촌동 신촌로 11',
];

const nicknames = [
  '빵순이',
  '베이글러',
  '소금빵마니아',
  '크루아상러버',
  '달달한하루',
  '밀가루요정',
  '빵집탐방러',
  '디저트헌터',
  '카페인중독자',
  '맛집탐험가',
];

const notificationMessages = [
  '참여하신 공구가 목표 수량을 달성했습니다.',
  '공구 마감까지 24시간 남았습니다.',
  '픽업일이 내일로 다가왔습니다. 픽업 장소를 확인해주세요.',
  '새로운 공구가 등록되었습니다. 지금 바로 확인해보세요.',
  '위시리스트에 담은 공구가 곧 마감됩니다.',
];

const districts = [
  {
    regionType: 'SEOUL',
    regionLabel: '서울',
    districtType: 'SEOUL_GANGNAM_YEOKSAM_SAMSEONG',
    districtLabel: '강남/역삼/삼성',
  },
  {
    regionType: 'SEOUL',
    regionLabel: '서울',
    districtType: 'SEOUL_HONGDAE_HAPJEONG_SANGSU_MAPO',
    districtLabel: '홍대/합정/상수',
  },
  {
    regionType: 'SEOUL',
    regionLabel: '서울',
    districtType: 'SEOUL_SEONGSU_GEONDAE_GWANGJIN',
    districtLabel: '성수/건대/광진',
  },
  {
    regionType: 'SEOUL',
    regionLabel: '서울',
    districtType: 'SEOUL_SINSA_APGUJEONG_CHEONGDAM',
    districtLabel: '신사/압구정/청담',
  },
  {
    regionType: 'SEOUL',
    regionLabel: '서울',
    districtType: 'SEOUL_SEOCHO_BANGBAE_GYODAE',
    districtLabel: '서초/방배/교대',
  },
  {
    regionType: 'SEOUL',
    regionLabel: '서울',
    districtType: 'SEOUL_JAMSIL_SINCHEON_SONGPA',
    districtLabel: '잠실/신천/송파',
  },
  {
    regionType: 'SEOUL',
    regionLabel: '서울',
    districtType: 'SEOUL_ITAEWON_HANNAM_YONGSAN',
    districtLabel: '이태원/한남/용산',
  },
];

const pick = <T>(arr: T[]): T => faker.helpers.arrayElement(arr);

const koreanPrice = () =>
  Math.round(faker.number.int({ min: 8, max: 90 }) * 500);

const pickupTime = (): string => {
  const hour = faker.number.int({ min: 10, max: 19 });
  return `${String(hour).padStart(2, '0')}:00`;
};

const futureDate = (minDays: number, maxDays: number): string => {
  const date = new Date();
  date.setDate(
    date.getDate() + faker.number.int({ min: minDays, max: maxDays }),
  );
  return date.toISOString().slice(0, 10);
};

export const koFaker = {
  store: {
    name: () => pick(storeNames),
  },
  product: {
    name: () => pick(productNames),
    description: () => pick(productDescriptions),
    notice: () => pick(notices),
    price: koreanPrice,
  },
  location: {
    region: () => pick(regions),
    district: () => pick(districts),
    address: () => pick(addresses),
    lat: () =>
      faker.number.float({ min: 37.45, max: 37.65, fractionDigits: 4 }),
    lng: () =>
      faker.number.float({ min: 126.85, max: 127.15, fractionDigits: 4 }),
  },
  groupBuy: {
    achievementRate: () => faker.number.int({ min: 10, max: 95 }),
    quantity: () => faker.number.int({ min: 1, max: 100 }),
    dDay: () => faker.number.int({ min: 1, max: 21 }),
    deadline: () => `${futureDate(3, 14)}T23:59:00`,
    pickupDate: () => futureDate(5, 16),
    pickupTime,
  },
  user: {
    nickname: () => pick(nicknames),
    email: () => `${faker.internet.username()}@gmail.com`,
  },
  notification: {
    message: () => pick(notificationMessages),
  },
};
