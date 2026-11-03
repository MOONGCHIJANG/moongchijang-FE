// 피드 v2 화면용 임시 데이터. 서버 API가 나오면 Orval 훅으로 교체하고 이 파일을 삭제합니다.
// 운영 빌드에서 가짜 데이터가 노출되지 않도록 개발 환경에서만 값을 채웁니다.

export type TodayPickup = {
  pickupAtLabel: string;
  productName: string;
  storeName: string;
  participantCount: number;
};

export type MyGroupBuy = {
  id: number;
  title: string;
  isHost: boolean;
  hasTodo: boolean;
  deadlineLabel?: string;
} & (
  | { status: 'transfer'; amount: number }
  | { status: 'collecting'; currentQuantity: number; targetQuantity: number }
);

export type FeedCardExtra = {
  isNew?: boolean;
  minQuantity?: number;
  closedDayLabel?: string;
  teamCount?: number;
  unitQuantity?: number;
};

const isDev = process.env.NODE_ENV !== 'production';

const TODAY_PICKUP: TodayPickup = {
  pickupAtLabel: '9/23(수) 15:00',
  productName: '버터떡 플레인',
  storeName: '모모양과',
  participantCount: 4,
};

const MY_GROUP_BUYS: MyGroupBuy[] = [
  {
    id: 1,
    title: '버터떡 플레인 · 모모양과',
    isHost: false,
    hasTodo: true,
    status: 'transfer',
    amount: 13000,
  },
  {
    id: 2,
    title: '딸기 생크림 케이크 · 모모양과',
    isHost: false,
    hasTodo: false,
    deadlineLabel: '결제 마감 D-2',
    status: 'collecting',
    currentQuantity: 5,
    targetQuantity: 8,
  },
  {
    id: 3,
    title: '두쫀쿠 오리지널 · 후와후와',
    isHost: true,
    hasTodo: false,
    status: 'collecting',
    currentQuantity: 9,
    targetQuantity: 15,
  },
];

const FEED_CARD_EXTRA: FeedCardExtra = {
  isNew: true,
  minQuantity: 15,
  closedDayLabel: '월 휴무',
  teamCount: 3,
  unitQuantity: 1,
};

export function useFeedHomePlaceholder() {
  return {
    todayPickup: isDev ? TODAY_PICKUP : null,
    myGroupBuys: isDev ? MY_GROUP_BUYS : [],
    feedCardExtra: isDev ? FEED_CARD_EXTRA : {},
  };
}
