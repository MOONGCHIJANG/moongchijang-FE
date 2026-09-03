/**
 * `_mock/refundMockData.ts`(디스포저블 목업)와 `_components/*`(재사용 전제 컴포넌트) 양쪽이
 * 이 표시용 타입에 의존한다. 컴포넌트가 목업 파일에서 타입을 가져오면 실 API 연동 시
 * `_mock/refundMockData.ts`를 지우는 순간 컴포넌트 쪽 import가 깨지므로, 타입은 이 파일에
 * 독립적으로 두고 목업 쪽에서 가져다 쓴다.
 */
export type RefundStatus = '검토대기' | '처리중' | '승인완료' | '거절';

export interface RefundHistoryEntry {
  title: string;
  datetime: string;
  description: string;
  tone: 'default' | 'warning';
}

/**
 * 환불 요청 상세 모달(Figma node-id=6402-28543) 전용 필드.
 * 목록 카드(RefundMockRow)에 없는 소비자·공구·결제·매장 의견·처리 이력 정보를 담는다.
 */
export interface RefundDetailMock {
  customerEmail: string;
  customerJoinMethod: string;
  achieved: boolean;
  pickupDate: string;
  pickupLocation: string;
  refundReason: string;
  refundDescription: string;
  paymentMethod: string;
  approvalNumber: string;
  paidAt: string;
  storeOpinionSubmittedAt: string | null;
  storeOpinionContent: string | null;
  csTicketId: string | null;
  history: RefundHistoryEntry[];
}

export interface RefundMockRow {
  requestId: string;
  caseLabel: string;
  caseDescription: string;
  customerName: string;
  customerPhone: string;
  productName: string;
  storeName: string;
  storePhone: string;
  paymentAmount: number;
  refundAmount: number;
  penaltyLabel: string;
  storeOpinion: '미제출' | '동의' | '의의제기';
  requestedAt: string;
  slaLabel: string | null;
  status: RefundStatus;
  detail: RefundDetailMock;
}
