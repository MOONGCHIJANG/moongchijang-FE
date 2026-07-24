import posthog from 'posthog-js';

export type EventParams = {
  screen_view: {
    screen_name: string;
    previous_screen?: string;
    entry_source?: string;
  };

  // 공구요청 플로우
  group_request_start: { source: 'search_empty' | 'gnb' | 'mypage' };
  group_request_step: { step: number; step_name: string };
  group_request_submit: Record<string, never>;
  group_request_submit_success: { store_name: string; product_name: string };
  group_request_submit_fail: { reason: string };
  group_request_history_view: Record<string, never>;
  group_request_status_view: { status: '매장협의중' | '공구결과안내' };
  groupbuy_request_search_start: { entry_source?: string };
  groupbuy_request_search: { query_length: number; result_count: number };
  groupbuy_request_store_select: {
    store_id: string;
    result_position: number;
    has_address: boolean;
  };
  groupbuy_request_store_confirm: { store_id: string };
  groupbuy_request_form_start: { store_id?: string; entry_source?: string };
  groupbuy_request_field_complete: { field_name: string; value_type?: string };
  groupbuy_request_submit_click: {
    filled_field_count: number;
    has_memo: boolean;
    quantity: number;
  };
  groupbuy_request_confirm_view: {
    store_id: string;
    quantity: number;
    has_memo: boolean;
  };
  groupbuy_request_confirm_close: { close_method: 'backdrop' | 'button' };
  groupbuy_request_submit_attempt: { store_id: string; quantity: number };
  groupbuy_request_submit_success: {
    request_id: number;
    store_id: string;
    quantity: number;
  };
  groupbuy_request_submit_fail: {
    error_code?: string;
    error_message_group?: string;
  };
  groupbuy_request_detail_view: { request_id: number; request_status: string };

  // 로그인/회원가입
  login: { method: 'email' };
  login_fail: { reason: 'wrong_password' | 'unregistered' };
  sign_up_step: { step: number; step_name: string };
  sign_up: { method: 'email' };
  sign_up_abandon: { step: number; step_name: string };

  // 홈/피드
  region_change: { region_before: string; region_after: string };
  feed_item_click: {
    item_id: number;
    item_name: string;
    store_name: string;
    position: number;
  };

  // 검색
  search_filter_apply: { filter_type: 'region'; filter_value: string };
  search_chip_select: { chip_name: string };
  group_request_cta_click: { search_term: string; source: 'search_empty' };

  // 상세페이지
  view_item: {
    item_id: number;
    item_name: string;
    store_name: string;
    item_status: 'open' | 'closed';
  };
  add_to_wishlist: { item_id: number; item_name: string; store_name: string };
  product_share: { item_id: number; share_method: 'link' | 'kakao' };
  group_buy_join_click: { item_id: number; item_name: string };

  // 공구참여/결제
  begin_checkout: {
    item_id: number;
    item_name: string;
    price: number;
    currency: 'KRW';
  };
  purchase: {
    transaction_id: string;
    value: number;
    currency: 'KRW';
    item_id: number;
    item_name: string;
    quantity: number;
  };

  // QR/픽업
  qr_view: { pickup_status: 'before_pickup' | 'pickup_day' };
  qr_enlarge: Record<string, never>;

  // 마이페이지/찜/알림
  mypage_view: Record<string, never>;
  wishlist_view: { item_count: number };
  wishlist_item_click: { item_id: number; item_name: string };
  notification_view: { unread_count?: number };
  notification_click: {
    notification_type: 'group_open' | 'pickup_reminder' | 'request_result';
  };

  // 에러/비로그인
  unauthorized_access: { target_screen: string };
  error_view: { error_type: string; screen_name?: string };
};

export const logEvent = <K extends keyof EventParams>(
  eventName: K,
  params?: EventParams[K],
): void => {
  if (process.env.NODE_ENV === 'development') {
    // console.log('[analytics]', eventName, params);
    return;
  }

  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, params as Record<string, unknown>);
  }

  if (typeof window !== 'undefined') {
    posthog.capture(eventName, params);
  }
};
