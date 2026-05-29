import type { TermKey } from '@/store/termsSheetStore';

export interface TermItem {
  key: TermKey;
  label: string;
  routeKey?: string;
}

export const TERM_ITEMS: TermItem[] = [
  {
    key: 'orderConfirm',
    label: '주문 내용을 확인했으며 결제에 동의합니다.',
  },
  {
    key: 'cancelAfterGoal',
    label: '공구 달성 확정 후에는 취소 및 환불이 불가합니다.',
    routeKey: 'cancel-after-goal',
  },
  {
    key: 'noRefundAfterNoShow',
    label: '픽업 시간 내 미수령 시 환불이 불가합니다.',
    routeKey: 'no-refund-after-no-show',
  },
  {
    key: 'personalInfo',
    label: '개인정보 수집·이용에 동의합니다.',
    routeKey: 'personal-info',
  },
  {
    key: 'intermediary',
    label:
      '뭉치장은 통신판매중개업자로, 상품·픽업 운영 등의 책임은 각 매장에 있습니다.',
    routeKey: 'intermediary',
  },
];

export const ROUTE_TO_TERM_KEY: Record<string, TermKey> = Object.fromEntries(
  TERM_ITEMS.filter(
    (item): item is TermItem & { routeKey: string } => !!item.routeKey,
  ).map((item) => [item.routeKey, item.key]),
);

const REFUND_LEGAL_TEXT = `제1조 (환불 가능 사유) 다음 각 호에 해당하는 경우 결제 금액 전액을 환불합니다.
  1. 공구 최소 수량 달성 전 이용자가 참여를 취소한 경우
  2. 지정된 마감일까지 최소 달성 수량이 충족되지 않아 공구가 자동 취소된 경우
  3. 사장님 회원의 귀책 사유(공구 취소, 품질 불량 등)로 인해 공구가 취소된 경우
  4. 달성 확정 전 공구에 참여 중인 상태에서 회원 탈퇴를 신청한 경우
제2조 (환불 불가 사유) 다음 각 호에 해당하는 경우 환불이 불가합니다.
  1. 공구 달성 확정(발주 확정) 이후 단순 변심에 의한 취소 요청
  2. 이용자의 귀책 사유(픽업 일시 미준수, QR 픽업 코드 미사용 등)로 인해 상품을 수령하지 못한 경우
  3. 「전자상거래 등에서의 소비자보호에 관한 법률」 제17조 제2항에 따라 식품류 특성상 청약철회가 제한되는 경우
제3조 (교환 및 반품) ① 상품 특성상 교환 및 반품은 원칙적으로 불가합니다. ② 단, 수령한 상품이 주문 내용과 상이하거나 품질 불량이 확인된 경우에는 고객센터(카카오채널 '뭉치장')를 통해 신청할 수 있으며, 회사는 이를 검토하여 처리 결과를 안내합니다.
제4조 (환불 처리) ① 환불은 원결제 수단으로 처리됩니다. ② 환불 처리 기간은 카드사 및 결제 수단에 따라 승인 취소 기준 영업일 3~5일이 소요될 수 있습니다. ③ 환불 처리 과정에서 발생하는 수수료는 환불 사유에 따라 귀책 당사자가 부담합니다.`;

export const TERMS_CONTENT: Record<
  string,
  { title: string; bullets: string[]; legalText?: string }
> = {
  'cancel-after-goal': {
    title: '공구 달성 확정 후에는 취소 및 환불이 불가합니다.',
    bullets: [
      '공구 최소 수량 달성 전에는 언제든지 자유롭게 취소 및 전액 환불이 가능합니다.',
      '단, 공구 달성 확정(발주 확정) 이후에는 단순 변심에 의한 취소 및 환불이 불가합니다. 이는 달성 확정 시점부터 매장의 제조가 시작되는 베이커리·디저트 상품의 특성에 따른 것입니다.',
      '단, 매장 귀책 사유(공구 취소, 품질 불량 등)로 인한 경우는 예외적으로 환불이 가능합니다.',
    ],
    legalText: REFUND_LEGAL_TEXT,
  },
  'no-refund-after-no-show': {
    title: '픽업 시간 내 미수령 시 환불이 불가합니다.',
    bullets: [
      '공구 달성 확정 후 안내된 픽업 일시와 장소를 반드시 확인해 주세요.',
      '픽업 당일 지정된 시간 내에 QR 픽업 코드를 사용하지 않아 상품을 수령하지 못한 경우, 이용자 귀책 사유로 간주되어 환불이 불가합니다.',
      '픽업 당일 알림을 통해 픽업 시간과 장소를 다시 안내해 드립니다.',
    ],
    legalText: REFUND_LEGAL_TEXT,
  },
  'personal-info': {
    title: '개인정보 수집·이용에 동의합니다.',
    bullets: [
      '수집 항목: 결제 정보, 주문 내역',
      '이용 목적: 결제 처리, 공구 참여 내역 관리, QR 픽업 코드 발급, 환불 처리',
      '보유 기간: 전자상거래법 의거 회원 탈퇴 혹은 5년간 보관',
      '위 개인정보 수집·이용에 동의하지 않을 수 있으나, 거부 시 결제 및 공구 참여가 불가합니다.',
    ],
  },
  intermediary: {
    title:
      '뭉치장은 통신판매중개업자로, 상품·픽업 운영 등의 책임은 각 매장에 있습니다.',
    bullets: [
      '뭉치장은 소비자와 베이커리 매장을 연결하는 통신판매중개업자로, 통신판매의 당사자가 아닙니다.',
      '공구 상품의 품질, 수량, 픽업 운영 등 거래와 관련한 의무와 책임은 각 매장(판매자)에 있으며, 뭉치장은 이에 대해 직접적인 책임을 지지 않습니다.',
      '단, 결제 대금은 에스크로 방식으로 안전하게 보호되며, 매장 귀책 사유로 인한 공구 취소 시 전액 환불됩니다.',
      "거래 관련 분쟁은 고객센터(카카오채널 '뭉치장')를 통해 접수하실 수 있습니다.",
    ],
  },
};
