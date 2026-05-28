/* /* eslint-disable *\/ */
/**
 * // 이 파일은 Orval이 자동 생성합니다. 직접 수정하지 마세요.
 */
import type {
  AdminCsTicketUpdateRequest,
  AdminGroupBuyRequestApprove,
  AdminGroupBuyRequestReject,
  AdminManualRefund,
  AdminRequestStatusUpdate,
  ApiResponseAdminCsTicketDetail,
  ApiResponseAdminCsTicketPage,
  ApiResponseAdminDashboardSummary,
  ApiResponseAdminDashboardUnconfirmedOrders,
  ApiResponseAdminGroupBuyRequestAction,
  ApiResponseAdminOrderDetail,
  ApiResponseAdminOrderPage,
  ApiResponseAdminRefundPage,
  ApiResponseAdminRequestDetail,
  ApiResponseAdminRequestPage,
  ApiResponseAdminSettlementDashboard,
  ApiResponseAdminSettlementDetail,
  ApiResponseAdminSettlementPage,
  ApiResponseGroupBuyRequestDetail,
  BadRequestResponse,
  ConflictResponse,
  ForbiddenResponse,
  GetApiV1AdminCsTicketsParams,
  GetApiV1AdminDashboardUnconfirmedOrdersParams,
  GetApiV1AdminGroupBuyRequestsParams,
  GetApiV1AdminOrdersParams,
  GetApiV1AdminRefundsParams,
  GetApiV1AdminSettlementsDashboardParams,
  GetApiV1AdminSettlementsParams,
  NotFoundResponse,
  SuccessNoDataResponse,
} from '../api.schemas';

import { customFetch } from '../../../lib/custom-fetch';

/**
 * 운영 관리 요약 영역에 노출되는 환불 금액, 개설승인 대기, 발주 미확정, 오늘 처리 완료 요약을 반환한다.
 * @summary 운영자 대시보드 요약 정보
 */
export type getApiV1AdminSummaryResponse200 = {
  data: ApiResponseAdminDashboardSummary;
  status: 200;
};

export type getApiV1AdminSummaryResponse403 = {
  data: ForbiddenResponse;
  status: 403;
};

export type getApiV1AdminSummaryResponseSuccess =
  getApiV1AdminSummaryResponse200 & {
    headers: Headers;
  };
export type getApiV1AdminSummaryResponseError =
  getApiV1AdminSummaryResponse403 & {
    headers: Headers;
  };

export type getApiV1AdminSummaryResponse =
  | getApiV1AdminSummaryResponseSuccess
  | getApiV1AdminSummaryResponseError;

export const getGetApiV1AdminSummaryUrl = () => {
  return `/api/v1/admin/summary`;
};

export const getApiV1AdminSummary = async (
  options?: RequestInit,
): Promise<getApiV1AdminSummaryResponse> => {
  return customFetch<getApiV1AdminSummaryResponse>(
    getGetApiV1AdminSummaryUrl(),
    {
      ...options,
      method: 'GET',
    },
  );
};

/**
 * 달성됐지만 발주 확정 전인 공구와 48시간 초과 여부를 조회한다.
 * @summary 대시보드 발주 미확정 모니터링 (운영자)
 */
export type getApiV1AdminDashboardUnconfirmedOrdersResponse200 = {
  data: ApiResponseAdminDashboardUnconfirmedOrders;
  status: 200;
};

export type getApiV1AdminDashboardUnconfirmedOrdersResponse403 = {
  data: ForbiddenResponse;
  status: 403;
};

export type getApiV1AdminDashboardUnconfirmedOrdersResponseSuccess =
  getApiV1AdminDashboardUnconfirmedOrdersResponse200 & {
    headers: Headers;
  };
export type getApiV1AdminDashboardUnconfirmedOrdersResponseError =
  getApiV1AdminDashboardUnconfirmedOrdersResponse403 & {
    headers: Headers;
  };

export type getApiV1AdminDashboardUnconfirmedOrdersResponse =
  | getApiV1AdminDashboardUnconfirmedOrdersResponseSuccess
  | getApiV1AdminDashboardUnconfirmedOrdersResponseError;

export const getGetApiV1AdminDashboardUnconfirmedOrdersUrl = (
  params?: GetApiV1AdminDashboardUnconfirmedOrdersParams,
) => {
  const normalizedParams = new URLSearchParams();

  Object.entries(params || {}).forEach(([key, value]) => {
    if (value !== undefined) {
      normalizedParams.append(key, value === null ? 'null' : value.toString());
    }
  });

  const stringifiedParams = normalizedParams.toString();

  return stringifiedParams.length > 0
    ? `/api/v1/admin/dashboard/unconfirmed-orders?${stringifiedParams}`
    : `/api/v1/admin/dashboard/unconfirmed-orders`;
};

export const getApiV1AdminDashboardUnconfirmedOrders = async (
  params?: GetApiV1AdminDashboardUnconfirmedOrdersParams,
  options?: RequestInit,
): Promise<getApiV1AdminDashboardUnconfirmedOrdersResponse> => {
  return customFetch<getApiV1AdminDashboardUnconfirmedOrdersResponse>(
    getGetApiV1AdminDashboardUnconfirmedOrdersUrl(params),
    {
      ...options,
      method: 'GET',
    },
  );
};

/**
 * 달성된 공구의 발주 확정 대기, 48시간 초과, 확정 완료, 전체 목록을 조회한다.
 * @summary 발주 관리 목록 조회 (운영자)
 */
export type getApiV1AdminOrdersResponse200 = {
  data: ApiResponseAdminOrderPage;
  status: 200;
};

export type getApiV1AdminOrdersResponse403 = {
  data: ForbiddenResponse;
  status: 403;
};

export type getApiV1AdminOrdersResponseSuccess =
  getApiV1AdminOrdersResponse200 & {
    headers: Headers;
  };
export type getApiV1AdminOrdersResponseError =
  getApiV1AdminOrdersResponse403 & {
    headers: Headers;
  };

export type getApiV1AdminOrdersResponse =
  | getApiV1AdminOrdersResponseSuccess
  | getApiV1AdminOrdersResponseError;

export const getGetApiV1AdminOrdersUrl = (
  params?: GetApiV1AdminOrdersParams,
) => {
  const normalizedParams = new URLSearchParams();

  Object.entries(params || {}).forEach(([key, value]) => {
    if (value !== undefined) {
      normalizedParams.append(key, value === null ? 'null' : value.toString());
    }
  });

  const stringifiedParams = normalizedParams.toString();

  return stringifiedParams.length > 0
    ? `/api/v1/admin/orders?${stringifiedParams}`
    : `/api/v1/admin/orders`;
};

export const getApiV1AdminOrders = async (
  params?: GetApiV1AdminOrdersParams,
  options?: RequestInit,
): Promise<getApiV1AdminOrdersResponse> => {
  return customFetch<getApiV1AdminOrdersResponse>(
    getGetApiV1AdminOrdersUrl(params),
    {
      ...options,
      method: 'GET',
    },
  );
};

/**
 * 발주 관리 목록에서 선택한 달성 공구의 상세 정보와 처리 상태를 조회한다.
 * @summary 발주 관리 상세 조회 (운영자)
 */
export type getApiV1AdminOrdersOrderIdResponse200 = {
  data: ApiResponseAdminOrderDetail;
  status: 200;
};

export type getApiV1AdminOrdersOrderIdResponse403 = {
  data: ForbiddenResponse;
  status: 403;
};

export type getApiV1AdminOrdersOrderIdResponse404 = {
  data: NotFoundResponse;
  status: 404;
};

export type getApiV1AdminOrdersOrderIdResponse409 = {
  data: ConflictResponse;
  status: 409;
};

export type getApiV1AdminOrdersOrderIdResponseSuccess =
  getApiV1AdminOrdersOrderIdResponse200 & {
    headers: Headers;
  };
export type getApiV1AdminOrdersOrderIdResponseError = (
  | getApiV1AdminOrdersOrderIdResponse403
  | getApiV1AdminOrdersOrderIdResponse404
  | getApiV1AdminOrdersOrderIdResponse409
) & {
  headers: Headers;
};

export type getApiV1AdminOrdersOrderIdResponse =
  | getApiV1AdminOrdersOrderIdResponseSuccess
  | getApiV1AdminOrdersOrderIdResponseError;

export const getGetApiV1AdminOrdersOrderIdUrl = (orderId: number) => {
  return `/api/v1/admin/orders/${orderId}`;
};

export const getApiV1AdminOrdersOrderId = async (
  orderId: number,
  options?: RequestInit,
): Promise<getApiV1AdminOrdersOrderIdResponse> => {
  return customFetch<getApiV1AdminOrdersOrderIdResponse>(
    getGetApiV1AdminOrdersOrderIdUrl(orderId),
    {
      ...options,
      method: 'GET',
    },
  );
};

/**
 * 확정 대기 발주 건에 사장님 연락 완료 시각을 기록한다.
 * @summary 발주 사장님 연락 완료 기록 (운영자)
 */
export type postApiV1AdminOrdersOrderIdOwnerContactResponse200 = {
  data: ApiResponseAdminOrderDetail;
  status: 200;
};

export type postApiV1AdminOrdersOrderIdOwnerContactResponse403 = {
  data: ForbiddenResponse;
  status: 403;
};

export type postApiV1AdminOrdersOrderIdOwnerContactResponse404 = {
  data: NotFoundResponse;
  status: 404;
};

export type postApiV1AdminOrdersOrderIdOwnerContactResponse409 = {
  data: ConflictResponse;
  status: 409;
};

export type postApiV1AdminOrdersOrderIdOwnerContactResponseSuccess =
  postApiV1AdminOrdersOrderIdOwnerContactResponse200 & {
    headers: Headers;
  };
export type postApiV1AdminOrdersOrderIdOwnerContactResponseError = (
  | postApiV1AdminOrdersOrderIdOwnerContactResponse403
  | postApiV1AdminOrdersOrderIdOwnerContactResponse404
  | postApiV1AdminOrdersOrderIdOwnerContactResponse409
) & {
  headers: Headers;
};

export type postApiV1AdminOrdersOrderIdOwnerContactResponse =
  | postApiV1AdminOrdersOrderIdOwnerContactResponseSuccess
  | postApiV1AdminOrdersOrderIdOwnerContactResponseError;

export const getPostApiV1AdminOrdersOrderIdOwnerContactUrl = (
  orderId: number,
) => {
  return `/api/v1/admin/orders/${orderId}/owner-contact`;
};

export const postApiV1AdminOrdersOrderIdOwnerContact = async (
  orderId: number,
  options?: RequestInit,
): Promise<postApiV1AdminOrdersOrderIdOwnerContactResponse> => {
  return customFetch<postApiV1AdminOrdersOrderIdOwnerContactResponse>(
    getPostApiV1AdminOrdersOrderIdOwnerContactUrl(orderId),
    {
      ...options,
      method: 'POST',
    },
  );
};

/**
 * 확정 대기 발주 건을 확정 완료 상태로 변경한다.
 * @summary 발주 확정 처리 (운영자)
 */
export type postApiV1AdminOrdersOrderIdConfirmResponse200 = {
  data: ApiResponseAdminOrderDetail;
  status: 200;
};

export type postApiV1AdminOrdersOrderIdConfirmResponse403 = {
  data: ForbiddenResponse;
  status: 403;
};

export type postApiV1AdminOrdersOrderIdConfirmResponse404 = {
  data: NotFoundResponse;
  status: 404;
};

export type postApiV1AdminOrdersOrderIdConfirmResponse409 = {
  data: ConflictResponse;
  status: 409;
};

export type postApiV1AdminOrdersOrderIdConfirmResponseSuccess =
  postApiV1AdminOrdersOrderIdConfirmResponse200 & {
    headers: Headers;
  };
export type postApiV1AdminOrdersOrderIdConfirmResponseError = (
  | postApiV1AdminOrdersOrderIdConfirmResponse403
  | postApiV1AdminOrdersOrderIdConfirmResponse404
  | postApiV1AdminOrdersOrderIdConfirmResponse409
) & {
  headers: Headers;
};

export type postApiV1AdminOrdersOrderIdConfirmResponse =
  | postApiV1AdminOrdersOrderIdConfirmResponseSuccess
  | postApiV1AdminOrdersOrderIdConfirmResponseError;

export const getPostApiV1AdminOrdersOrderIdConfirmUrl = (orderId: number) => {
  return `/api/v1/admin/orders/${orderId}/confirm`;
};

export const postApiV1AdminOrdersOrderIdConfirm = async (
  orderId: number,
  options?: RequestInit,
): Promise<postApiV1AdminOrdersOrderIdConfirmResponse> => {
  return customFetch<postApiV1AdminOrdersOrderIdConfirmResponse>(
    getPostApiV1AdminOrdersOrderIdConfirmUrl(orderId),
    {
      ...options,
      method: 'POST',
    },
  );
};

/**
 * 확정 대기 발주 건을 취소 상태로 변경한다.
 * @summary 발주 취소 처리 (운영자)
 */
export type postApiV1AdminOrdersOrderIdCancelResponse200 = {
  data: ApiResponseAdminOrderDetail;
  status: 200;
};

export type postApiV1AdminOrdersOrderIdCancelResponse403 = {
  data: ForbiddenResponse;
  status: 403;
};

export type postApiV1AdminOrdersOrderIdCancelResponse404 = {
  data: NotFoundResponse;
  status: 404;
};

export type postApiV1AdminOrdersOrderIdCancelResponse409 = {
  data: ConflictResponse;
  status: 409;
};

export type postApiV1AdminOrdersOrderIdCancelResponseSuccess =
  postApiV1AdminOrdersOrderIdCancelResponse200 & {
    headers: Headers;
  };
export type postApiV1AdminOrdersOrderIdCancelResponseError = (
  | postApiV1AdminOrdersOrderIdCancelResponse403
  | postApiV1AdminOrdersOrderIdCancelResponse404
  | postApiV1AdminOrdersOrderIdCancelResponse409
) & {
  headers: Headers;
};

export type postApiV1AdminOrdersOrderIdCancelResponse =
  | postApiV1AdminOrdersOrderIdCancelResponseSuccess
  | postApiV1AdminOrdersOrderIdCancelResponseError;

export const getPostApiV1AdminOrdersOrderIdCancelUrl = (orderId: number) => {
  return `/api/v1/admin/orders/${orderId}/cancel`;
};

export const postApiV1AdminOrdersOrderIdCancel = async (
  orderId: number,
  options?: RequestInit,
): Promise<postApiV1AdminOrdersOrderIdCancelResponse> => {
  return customFetch<postApiV1AdminOrdersOrderIdCancelResponse>(
    getPostApiV1AdminOrdersOrderIdCancelUrl(orderId),
    {
      ...options,
      method: 'POST',
    },
  );
};

/**
 * 접수, 처리중, 완료, 전체 CS 티켓을 상태와 키워드로 조회한다.
 * @summary CS 티켓 목록 조회 (운영자)
 */
export type getApiV1AdminCsTicketsResponse200 = {
  data: ApiResponseAdminCsTicketPage;
  status: 200;
};

export type getApiV1AdminCsTicketsResponse403 = {
  data: ForbiddenResponse;
  status: 403;
};

export type getApiV1AdminCsTicketsResponseSuccess =
  getApiV1AdminCsTicketsResponse200 & {
    headers: Headers;
  };
export type getApiV1AdminCsTicketsResponseError =
  getApiV1AdminCsTicketsResponse403 & {
    headers: Headers;
  };

export type getApiV1AdminCsTicketsResponse =
  | getApiV1AdminCsTicketsResponseSuccess
  | getApiV1AdminCsTicketsResponseError;

export const getGetApiV1AdminCsTicketsUrl = (
  params?: GetApiV1AdminCsTicketsParams,
) => {
  const normalizedParams = new URLSearchParams();

  Object.entries(params || {}).forEach(([key, value]) => {
    if (value !== undefined) {
      normalizedParams.append(key, value === null ? 'null' : value.toString());
    }
  });

  const stringifiedParams = normalizedParams.toString();

  return stringifiedParams.length > 0
    ? `/api/v1/admin/cs-tickets?${stringifiedParams}`
    : `/api/v1/admin/cs-tickets`;
};

export const getApiV1AdminCsTickets = async (
  params?: GetApiV1AdminCsTicketsParams,
  options?: RequestInit,
): Promise<getApiV1AdminCsTicketsResponse> => {
  return customFetch<getApiV1AdminCsTicketsResponse>(
    getGetApiV1AdminCsTicketsUrl(params),
    {
      ...options,
      method: 'GET',
    },
  );
};

/**
 * 선택한 CS 티켓의 문제 설명, 관련 사용자/공구/환불, 처리 정보를 조회한다.
 * @summary CS 티켓 상세 조회 (운영자)
 */
export type getApiV1AdminCsTicketsTicketIdResponse200 = {
  data: ApiResponseAdminCsTicketDetail;
  status: 200;
};

export type getApiV1AdminCsTicketsTicketIdResponse403 = {
  data: ForbiddenResponse;
  status: 403;
};

export type getApiV1AdminCsTicketsTicketIdResponse404 = {
  data: NotFoundResponse;
  status: 404;
};

export type getApiV1AdminCsTicketsTicketIdResponseSuccess =
  getApiV1AdminCsTicketsTicketIdResponse200 & {
    headers: Headers;
  };
export type getApiV1AdminCsTicketsTicketIdResponseError = (
  | getApiV1AdminCsTicketsTicketIdResponse403
  | getApiV1AdminCsTicketsTicketIdResponse404
) & {
  headers: Headers;
};

export type getApiV1AdminCsTicketsTicketIdResponse =
  | getApiV1AdminCsTicketsTicketIdResponseSuccess
  | getApiV1AdminCsTicketsTicketIdResponseError;

export const getGetApiV1AdminCsTicketsTicketIdUrl = (ticketId: number) => {
  return `/api/v1/admin/cs-tickets/${ticketId}`;
};

export const getApiV1AdminCsTicketsTicketId = async (
  ticketId: number,
  options?: RequestInit,
): Promise<getApiV1AdminCsTicketsTicketIdResponse> => {
  return customFetch<getApiV1AdminCsTicketsTicketIdResponse>(
    getGetApiV1AdminCsTicketsTicketIdUrl(ticketId),
    {
      ...options,
      method: 'GET',
    },
  );
};

/**
 * CS 티켓의 상태, 담당자, 처리 메모를 변경한다.
 * @summary CS 티켓 처리 정보 변경 (운영자)
 */
export type patchApiV1AdminCsTicketsTicketIdResponse200 = {
  data: ApiResponseAdminCsTicketDetail;
  status: 200;
};

export type patchApiV1AdminCsTicketsTicketIdResponse400 = {
  data: BadRequestResponse;
  status: 400;
};

export type patchApiV1AdminCsTicketsTicketIdResponse403 = {
  data: ForbiddenResponse;
  status: 403;
};

export type patchApiV1AdminCsTicketsTicketIdResponse404 = {
  data: NotFoundResponse;
  status: 404;
};

export type patchApiV1AdminCsTicketsTicketIdResponseSuccess =
  patchApiV1AdminCsTicketsTicketIdResponse200 & {
    headers: Headers;
  };
export type patchApiV1AdminCsTicketsTicketIdResponseError = (
  | patchApiV1AdminCsTicketsTicketIdResponse400
  | patchApiV1AdminCsTicketsTicketIdResponse403
  | patchApiV1AdminCsTicketsTicketIdResponse404
) & {
  headers: Headers;
};

export type patchApiV1AdminCsTicketsTicketIdResponse =
  | patchApiV1AdminCsTicketsTicketIdResponseSuccess
  | patchApiV1AdminCsTicketsTicketIdResponseError;

export const getPatchApiV1AdminCsTicketsTicketIdUrl = (ticketId: number) => {
  return `/api/v1/admin/cs-tickets/${ticketId}`;
};

export const patchApiV1AdminCsTicketsTicketId = async (
  ticketId: number,
  adminCsTicketUpdateRequest: AdminCsTicketUpdateRequest,
  options?: RequestInit,
): Promise<patchApiV1AdminCsTicketsTicketIdResponse> => {
  return customFetch<patchApiV1AdminCsTicketsTicketIdResponse>(
    getPatchApiV1AdminCsTicketsTicketIdUrl(ticketId),
    {
      ...options,
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json', ...options?.headers },
      body: JSON.stringify(adminCsTicketUpdateRequest),
    },
  );
};

/**
 * @summary 공구 요청 목록 조회 (운영자)
 */
export type getApiV1AdminGroupBuyRequestsResponse200 = {
  data: ApiResponseAdminRequestPage;
  status: 200;
};

export type getApiV1AdminGroupBuyRequestsResponse403 = {
  data: ForbiddenResponse;
  status: 403;
};

export type getApiV1AdminGroupBuyRequestsResponseSuccess =
  getApiV1AdminGroupBuyRequestsResponse200 & {
    headers: Headers;
  };
export type getApiV1AdminGroupBuyRequestsResponseError =
  getApiV1AdminGroupBuyRequestsResponse403 & {
    headers: Headers;
  };

export type getApiV1AdminGroupBuyRequestsResponse =
  | getApiV1AdminGroupBuyRequestsResponseSuccess
  | getApiV1AdminGroupBuyRequestsResponseError;

export const getGetApiV1AdminGroupBuyRequestsUrl = (
  params?: GetApiV1AdminGroupBuyRequestsParams,
) => {
  const normalizedParams = new URLSearchParams();

  Object.entries(params || {}).forEach(([key, value]) => {
    if (value !== undefined) {
      normalizedParams.append(key, value === null ? 'null' : value.toString());
    }
  });

  const stringifiedParams = normalizedParams.toString();

  return stringifiedParams.length > 0
    ? `/api/v1/admin/group-buy-requests?${stringifiedParams}`
    : `/api/v1/admin/group-buy-requests`;
};

export const getApiV1AdminGroupBuyRequests = async (
  params?: GetApiV1AdminGroupBuyRequestsParams,
  options?: RequestInit,
): Promise<getApiV1AdminGroupBuyRequestsResponse> => {
  return customFetch<getApiV1AdminGroupBuyRequestsResponse>(
    getGetApiV1AdminGroupBuyRequestsUrl(params),
    {
      ...options,
      method: 'GET',
    },
  );
};

/**
 * @summary 공구 요청 상세 조회 (운영자)
 */
export type getApiV1AdminGroupBuyRequestsRequestIdResponse200 = {
  data: ApiResponseAdminRequestDetail;
  status: 200;
};

export type getApiV1AdminGroupBuyRequestsRequestIdResponseSuccess =
  getApiV1AdminGroupBuyRequestsRequestIdResponse200 & {
    headers: Headers;
  };
export type getApiV1AdminGroupBuyRequestsRequestIdResponse =
  getApiV1AdminGroupBuyRequestsRequestIdResponseSuccess;

export const getGetApiV1AdminGroupBuyRequestsRequestIdUrl = (
  requestId: number,
) => {
  return `/api/v1/admin/group-buy-requests/${requestId}`;
};

export const getApiV1AdminGroupBuyRequestsRequestId = async (
  requestId: number,
  options?: RequestInit,
): Promise<getApiV1AdminGroupBuyRequestsRequestIdResponse> => {
  return customFetch<getApiV1AdminGroupBuyRequestsRequestIdResponse>(
    getGetApiV1AdminGroupBuyRequestsRequestIdUrl(requestId),
    {
      ...options,
      method: 'GET',
    },
  );
};

/**
 * @summary 공구 요청 상태 변경
 */
export type patchApiV1AdminGroupBuyRequestsRequestIdStatusResponse200 = {
  data: ApiResponseGroupBuyRequestDetail;
  status: 200;
};

export type patchApiV1AdminGroupBuyRequestsRequestIdStatusResponse400 = {
  data: BadRequestResponse;
  status: 400;
};

export type patchApiV1AdminGroupBuyRequestsRequestIdStatusResponseSuccess =
  patchApiV1AdminGroupBuyRequestsRequestIdStatusResponse200 & {
    headers: Headers;
  };
export type patchApiV1AdminGroupBuyRequestsRequestIdStatusResponseError =
  patchApiV1AdminGroupBuyRequestsRequestIdStatusResponse400 & {
    headers: Headers;
  };

export type patchApiV1AdminGroupBuyRequestsRequestIdStatusResponse =
  | patchApiV1AdminGroupBuyRequestsRequestIdStatusResponseSuccess
  | patchApiV1AdminGroupBuyRequestsRequestIdStatusResponseError;

export const getPatchApiV1AdminGroupBuyRequestsRequestIdStatusUrl = (
  requestId: number,
) => {
  return `/api/v1/admin/group-buy-requests/${requestId}/status`;
};

export const patchApiV1AdminGroupBuyRequestsRequestIdStatus = async (
  requestId: number,
  adminRequestStatusUpdate: AdminRequestStatusUpdate,
  options?: RequestInit,
): Promise<patchApiV1AdminGroupBuyRequestsRequestIdStatusResponse> => {
  return customFetch<patchApiV1AdminGroupBuyRequestsRequestIdStatusResponse>(
    getPatchApiV1AdminGroupBuyRequestsRequestIdStatusUrl(requestId),
    {
      ...options,
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json', ...options?.headers },
      body: JSON.stringify(adminRequestStatusUpdate),
    },
  );
};

/**
 * @summary 소비자 공구 개설 요청 승인 및 공구 생성
 */
export type postApiV1AdminGroupBuyRequestsRequestIdApproveResponse201 = {
  data: ApiResponseAdminGroupBuyRequestAction;
  status: 201;
};

export type postApiV1AdminGroupBuyRequestsRequestIdApproveResponse400 = {
  data: BadRequestResponse;
  status: 400;
};

export type postApiV1AdminGroupBuyRequestsRequestIdApproveResponse404 = {
  data: NotFoundResponse;
  status: 404;
};

export type postApiV1AdminGroupBuyRequestsRequestIdApproveResponseSuccess =
  postApiV1AdminGroupBuyRequestsRequestIdApproveResponse201 & {
    headers: Headers;
  };
export type postApiV1AdminGroupBuyRequestsRequestIdApproveResponseError = (
  | postApiV1AdminGroupBuyRequestsRequestIdApproveResponse400
  | postApiV1AdminGroupBuyRequestsRequestIdApproveResponse404
) & {
  headers: Headers;
};

export type postApiV1AdminGroupBuyRequestsRequestIdApproveResponse =
  | postApiV1AdminGroupBuyRequestsRequestIdApproveResponseSuccess
  | postApiV1AdminGroupBuyRequestsRequestIdApproveResponseError;

export const getPostApiV1AdminGroupBuyRequestsRequestIdApproveUrl = (
  requestId: number,
) => {
  return `/api/v1/admin/group-buy-requests/${requestId}/approve`;
};

export const postApiV1AdminGroupBuyRequestsRequestIdApprove = async (
  requestId: number,
  adminGroupBuyRequestApprove: AdminGroupBuyRequestApprove,
  options?: RequestInit,
): Promise<postApiV1AdminGroupBuyRequestsRequestIdApproveResponse> => {
  return customFetch<postApiV1AdminGroupBuyRequestsRequestIdApproveResponse>(
    getPostApiV1AdminGroupBuyRequestsRequestIdApproveUrl(requestId),
    {
      ...options,
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...options?.headers },
      body: JSON.stringify(adminGroupBuyRequestApprove),
    },
  );
};

/**
 * @summary 소비자 공구 개설 요청 반려
 */
export type postApiV1AdminGroupBuyRequestsRequestIdRejectResponse200 = {
  data: ApiResponseAdminGroupBuyRequestAction;
  status: 200;
};

export type postApiV1AdminGroupBuyRequestsRequestIdRejectResponse400 = {
  data: BadRequestResponse;
  status: 400;
};

export type postApiV1AdminGroupBuyRequestsRequestIdRejectResponse404 = {
  data: NotFoundResponse;
  status: 404;
};

export type postApiV1AdminGroupBuyRequestsRequestIdRejectResponseSuccess =
  postApiV1AdminGroupBuyRequestsRequestIdRejectResponse200 & {
    headers: Headers;
  };
export type postApiV1AdminGroupBuyRequestsRequestIdRejectResponseError = (
  | postApiV1AdminGroupBuyRequestsRequestIdRejectResponse400
  | postApiV1AdminGroupBuyRequestsRequestIdRejectResponse404
) & {
  headers: Headers;
};

export type postApiV1AdminGroupBuyRequestsRequestIdRejectResponse =
  | postApiV1AdminGroupBuyRequestsRequestIdRejectResponseSuccess
  | postApiV1AdminGroupBuyRequestsRequestIdRejectResponseError;

export const getPostApiV1AdminGroupBuyRequestsRequestIdRejectUrl = (
  requestId: number,
) => {
  return `/api/v1/admin/group-buy-requests/${requestId}/reject`;
};

export const postApiV1AdminGroupBuyRequestsRequestIdReject = async (
  requestId: number,
  adminGroupBuyRequestReject: AdminGroupBuyRequestReject,
  options?: RequestInit,
): Promise<postApiV1AdminGroupBuyRequestsRequestIdRejectResponse> => {
  return customFetch<postApiV1AdminGroupBuyRequestsRequestIdRejectResponse>(
    getPostApiV1AdminGroupBuyRequestsRequestIdRejectUrl(requestId),
    {
      ...options,
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...options?.headers },
      body: JSON.stringify(adminGroupBuyRequestReject),
    },
  );
};

/**
 * @summary 환불 처리 현황 목록 (운영자)
 */
export type getApiV1AdminRefundsResponse200 = {
  data: ApiResponseAdminRefundPage;
  status: 200;
};

export type getApiV1AdminRefundsResponseSuccess =
  getApiV1AdminRefundsResponse200 & {
    headers: Headers;
  };
export type getApiV1AdminRefundsResponse = getApiV1AdminRefundsResponseSuccess;

export const getGetApiV1AdminRefundsUrl = (
  params?: GetApiV1AdminRefundsParams,
) => {
  const normalizedParams = new URLSearchParams();

  Object.entries(params || {}).forEach(([key, value]) => {
    if (value !== undefined) {
      normalizedParams.append(key, value === null ? 'null' : value.toString());
    }
  });

  const stringifiedParams = normalizedParams.toString();

  return stringifiedParams.length > 0
    ? `/api/v1/admin/refunds?${stringifiedParams}`
    : `/api/v1/admin/refunds`;
};

export const getApiV1AdminRefunds = async (
  params?: GetApiV1AdminRefundsParams,
  options?: RequestInit,
): Promise<getApiV1AdminRefundsResponse> => {
  return customFetch<getApiV1AdminRefundsResponse>(
    getGetApiV1AdminRefundsUrl(params),
    {
      ...options,
      method: 'GET',
    },
  );
};

/**
 * @summary 수동 환불 처리
 */
export type postApiV1AdminRefundsParticipationIdManualResponse200 = {
  data: SuccessNoDataResponse;
  status: 200;
};

export type postApiV1AdminRefundsParticipationIdManualResponse409 = {
  data: ConflictResponse;
  status: 409;
};

export type postApiV1AdminRefundsParticipationIdManualResponseSuccess =
  postApiV1AdminRefundsParticipationIdManualResponse200 & {
    headers: Headers;
  };
export type postApiV1AdminRefundsParticipationIdManualResponseError =
  postApiV1AdminRefundsParticipationIdManualResponse409 & {
    headers: Headers;
  };

export type postApiV1AdminRefundsParticipationIdManualResponse =
  | postApiV1AdminRefundsParticipationIdManualResponseSuccess
  | postApiV1AdminRefundsParticipationIdManualResponseError;

export const getPostApiV1AdminRefundsParticipationIdManualUrl = (
  participationId: number,
) => {
  return `/api/v1/admin/refunds/${participationId}/manual`;
};

export const postApiV1AdminRefundsParticipationIdManual = async (
  participationId: number,
  adminManualRefund: AdminManualRefund,
  options?: RequestInit,
): Promise<postApiV1AdminRefundsParticipationIdManualResponse> => {
  return customFetch<postApiV1AdminRefundsParticipationIdManualResponse>(
    getPostApiV1AdminRefundsParticipationIdManualUrl(participationId),
    {
      ...options,
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...options?.headers },
      body: JSON.stringify(adminManualRefund),
    },
  );
};

/**
 * 선택한 연월의 정산 완료 금액, 정산 예정 금액, 서비스 수수료, 총 거래액을 조회한다. 현재 서비스 수수료 정책은 0원이다.
 * @summary 정산 현황 대시보드 조회 (운영자)
 */
export type getApiV1AdminSettlementsDashboardResponse200 = {
  data: ApiResponseAdminSettlementDashboard;
  status: 200;
};

export type getApiV1AdminSettlementsDashboardResponse400 = {
  data: BadRequestResponse;
  status: 400;
};

export type getApiV1AdminSettlementsDashboardResponse403 = {
  data: ForbiddenResponse;
  status: 403;
};

export type getApiV1AdminSettlementsDashboardResponseSuccess =
  getApiV1AdminSettlementsDashboardResponse200 & {
    headers: Headers;
  };
export type getApiV1AdminSettlementsDashboardResponseError = (
  | getApiV1AdminSettlementsDashboardResponse400
  | getApiV1AdminSettlementsDashboardResponse403
) & {
  headers: Headers;
};

export type getApiV1AdminSettlementsDashboardResponse =
  | getApiV1AdminSettlementsDashboardResponseSuccess
  | getApiV1AdminSettlementsDashboardResponseError;

export const getGetApiV1AdminSettlementsDashboardUrl = (
  params: GetApiV1AdminSettlementsDashboardParams,
) => {
  const normalizedParams = new URLSearchParams();

  Object.entries(params || {}).forEach(([key, value]) => {
    if (value !== undefined) {
      normalizedParams.append(key, value === null ? 'null' : value.toString());
    }
  });

  const stringifiedParams = normalizedParams.toString();

  return stringifiedParams.length > 0
    ? `/api/v1/admin/settlements/dashboard?${stringifiedParams}`
    : `/api/v1/admin/settlements/dashboard`;
};

export const getApiV1AdminSettlementsDashboard = async (
  params: GetApiV1AdminSettlementsDashboardParams,
  options?: RequestInit,
): Promise<getApiV1AdminSettlementsDashboardResponse> => {
  return customFetch<getApiV1AdminSettlementsDashboardResponse>(
    getGetApiV1AdminSettlementsDashboardUrl(params),
    {
      ...options,
      method: 'GET',
    },
  );
};

/**
 * 선택한 연월의 정산 예정, 정산 완료, 전체 목록을 조회한다. 현재 settlementId는 groupBuyId와 동일하다.
 * @summary 정산 현황 목록 조회 (운영자)
 */
export type getApiV1AdminSettlementsResponse200 = {
  data: ApiResponseAdminSettlementPage;
  status: 200;
};

export type getApiV1AdminSettlementsResponse400 = {
  data: BadRequestResponse;
  status: 400;
};

export type getApiV1AdminSettlementsResponse403 = {
  data: ForbiddenResponse;
  status: 403;
};

export type getApiV1AdminSettlementsResponseSuccess =
  getApiV1AdminSettlementsResponse200 & {
    headers: Headers;
  };
export type getApiV1AdminSettlementsResponseError = (
  | getApiV1AdminSettlementsResponse400
  | getApiV1AdminSettlementsResponse403
) & {
  headers: Headers;
};

export type getApiV1AdminSettlementsResponse =
  | getApiV1AdminSettlementsResponseSuccess
  | getApiV1AdminSettlementsResponseError;

export const getGetApiV1AdminSettlementsUrl = (
  params: GetApiV1AdminSettlementsParams,
) => {
  const normalizedParams = new URLSearchParams();

  Object.entries(params || {}).forEach(([key, value]) => {
    if (value !== undefined) {
      normalizedParams.append(key, value === null ? 'null' : value.toString());
    }
  });

  const stringifiedParams = normalizedParams.toString();

  return stringifiedParams.length > 0
    ? `/api/v1/admin/settlements?${stringifiedParams}`
    : `/api/v1/admin/settlements`;
};

export const getApiV1AdminSettlements = async (
  params: GetApiV1AdminSettlementsParams,
  options?: RequestInit,
): Promise<getApiV1AdminSettlementsResponse> => {
  return customFetch<getApiV1AdminSettlementsResponse>(
    getGetApiV1AdminSettlementsUrl(params),
    {
      ...options,
      method: 'GET',
    },
  );
};

/**
 * 목록에서 선택한 정산 건의 상세 팝업용 정보를 조회한다. 현재 settlementId는 groupBuyId와 동일하다.
 * @summary 정산 현황 상세 조회 (운영자)
 */
export type getApiV1AdminSettlementsSettlementIdResponse200 = {
  data: ApiResponseAdminSettlementDetail;
  status: 200;
};

export type getApiV1AdminSettlementsSettlementIdResponse403 = {
  data: ForbiddenResponse;
  status: 403;
};

export type getApiV1AdminSettlementsSettlementIdResponse404 = {
  data: NotFoundResponse;
  status: 404;
};

export type getApiV1AdminSettlementsSettlementIdResponseSuccess =
  getApiV1AdminSettlementsSettlementIdResponse200 & {
    headers: Headers;
  };
export type getApiV1AdminSettlementsSettlementIdResponseError = (
  | getApiV1AdminSettlementsSettlementIdResponse403
  | getApiV1AdminSettlementsSettlementIdResponse404
) & {
  headers: Headers;
};

export type getApiV1AdminSettlementsSettlementIdResponse =
  | getApiV1AdminSettlementsSettlementIdResponseSuccess
  | getApiV1AdminSettlementsSettlementIdResponseError;

export const getGetApiV1AdminSettlementsSettlementIdUrl = (
  settlementId: number,
) => {
  return `/api/v1/admin/settlements/${settlementId}`;
};

export const getApiV1AdminSettlementsSettlementId = async (
  settlementId: number,
  options?: RequestInit,
): Promise<getApiV1AdminSettlementsSettlementIdResponse> => {
  return customFetch<getApiV1AdminSettlementsSettlementIdResponse>(
    getGetApiV1AdminSettlementsSettlementIdUrl(settlementId),
    {
      ...options,
      method: 'GET',
    },
  );
};
