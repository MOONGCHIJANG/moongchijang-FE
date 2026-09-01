/**
 * MSW 핸들러 목록 (Express mock 서버용, apps/web/mocks/handlers.ts와 동일한 구조)
 *
 * - overrideHandlers: 기존 정적 목업(대시보드) 값과 동일하게 고정한 핸들러
 *   → generatedHandlers보다 앞에 위치해야 first-match로 우선 적용됨
 * - generatedHandlers: Orval이 swagger 기반으로 자동 생성한 핸들러
 *   → 커스텀이 필요 없는 엔드포인트는 여기서 자동 처리됨
 */

import { http, HttpResponse, delay } from 'msw';
import { generatedHandlers } from '@moongchijang/api-client/generated/index.msw';
import { AdminDashboardUrgentRefundItemCaseFilter } from '@moongchijang/api-client/generated/api.schemas';

const MOCK_ADMIN_ACCOUNT = {
  email: 'admin@test.com',
  password: 'Admin1234!',
  nickname: '운영자',
  accessToken: 'mock-admin-access-token',
  refreshToken: 'mock-refresh-token-admin',
};

const REFRESH_COOKIE = `refreshToken=${MOCK_ADMIN_ACCOUNT.refreshToken}; Path=/; SameSite=Strict; Max-Age=1209600`;

const overrideHandlers = [
  http.post('*/api/v1/auth/admin/email/login', async ({ request }) => {
    await delay(500);
    const body = (await request.json()) as { email: string; password: string };

    if (
      body.email !== MOCK_ADMIN_ACCOUNT.email ||
      body.password !== MOCK_ADMIN_ACCOUNT.password
    ) {
      return HttpResponse.json(
        {
          success: false,
          data: null,
          error: { message: '이메일 또는 비밀번호가 올바르지 않습니다.' },
        },
        { status: 401 },
      );
    }

    return HttpResponse.json(
      {
        success: true,
        data: {
          accessToken: MOCK_ADMIN_ACCOUNT.accessToken,
          tokenType: 'Bearer',
          expiresIn: 3600,
          isNewUser: false,
          user: {
            id: 1,
            provider: 'EMAIL',
            email: MOCK_ADMIN_ACCOUNT.email,
            nickname: MOCK_ADMIN_ACCOUNT.nickname,
            role: 'ADMIN',
            signupCompleted: true,
            sellerSignupCompleted: false,
            hasBuyerRole: false,
            hasSellerRole: false,
            canSwitchToBuyer: false,
            canSwitchToSeller: false,
            deletedAt: null,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          },
        },
        error: null,
      },
      { status: 200, headers: { 'set-cookie': REFRESH_COOKIE } },
    );
  }),

  http.post('*/api/v1/auth/refresh', async ({ request }) => {
    await delay(200);
    const cookieHeader = request.headers.get('Cookie') ?? '';
    const match = cookieHeader.match(/refreshToken=([^;]+)/);
    if (match?.[1] !== MOCK_ADMIN_ACCOUNT.refreshToken) {
      return HttpResponse.json(
        { success: false, data: null, error: null },
        { status: 401 },
      );
    }

    return HttpResponse.json(
      {
        success: true,
        data: { accessToken: MOCK_ADMIN_ACCOUNT.accessToken, expiresIn: 3600 },
        error: null,
      },
      { status: 200, headers: { 'set-cookie': REFRESH_COOKIE } },
    );
  }),

  http.get('*/api/v1/admin/summary', async () => {
    await delay(300);
    return HttpResponse.json({
      success: true,
      data: {
        pendingRefundAmount: 1240000,
        pendingRefundAmountChangeRate: -15,
        pendingApprovalCount: 5,
        averageReviewMinutes: 138,
        pendingApprovalChangeRate: 8,
        unconfirmedOrderCount: 12,
        unconfirmedOrderOver48hCount: 1,
        todayCompletedRefundCount: 18,
        todayCompletedApprovalCount: 10,
        hasOrderOver48h: true,
      },
      error: null,
    });
  }),

  http.get('*/api/v1/admin/dashboard/urgent-refunds', async () => {
    await delay(300);
    return HttpResponse.json({
      success: true,
      data: {
        totalUrgentCount: 3,
        hasUrgentRefunds: true,
        content: [
          {
            requestId: 2401,
            caseFilter: AdminDashboardUrgentRefundItemCaseFilter.POST_ACHIEVEMENT_CANCEL,
            consumerName: '김**',
            groupBuyName: '베이글 10개 세트',
            refundAmount: 27000,
            requestedAt: '2026-05-13T14:30:00',
            slaElapsedHours: 26,
          },
          {
            requestId: 2398,
            caseFilter: AdminDashboardUrgentRefundItemCaseFilter.DISPUTE_OR_DROPOUT_REFUND,
            consumerName: '이**',
            groupBuyName: '마카롱 박스',
            refundAmount: 35000,
            requestedAt: '2026-05-13T16:45:00',
            slaElapsedHours: 1,
          },
          {
            requestId: 2395,
            caseFilter: AdminDashboardUrgentRefundItemCaseFilter.PICKUP_PERIOD_NO_SHOW,
            consumerName: '박**',
            groupBuyName: '크루아상 세트',
            refundAmount: 18000,
            requestedAt: '2026-05-13T09:15:00',
            slaElapsedHours: 30,
          },
        ],
        totalElements: 3,
        totalPages: 1,
        number: 0,
        size: 20,
      },
      error: null,
    });
  }),

  http.get('*/api/v1/admin/dashboard/unconfirmed-orders', async () => {
    await delay(300);
    return HttpResponse.json({
      success: true,
      data: {
        totalUnconfirmedCount: 2,
        overdueCount: 1,
        hasOverdue: true,
        content: [
          {
            orderId: 1523,
            groupBuyId: 1523,
            productName: '식빵 세트',
            storeName: '행복한빵집',
            achievedAt: '2026-05-12T00:00:00',
            finalQuantity: 30,
            pendingRefundCount: 0,
            pickupDate: '2026-05-14',
            elapsedHours: 48,
            overdue: true,
            progressRate: 100,
            ownerContacted: false,
          },
          {
            orderId: 1519,
            groupBuyId: 1519,
            productName: '도넛 박스',
            storeName: '달콤한아침',
            achievedAt: '2026-05-13T00:00:00',
            finalQuantity: 20,
            pendingRefundCount: 0,
            pickupDate: '2026-05-15',
            elapsedHours: 24,
            overdue: false,
            progressRate: 100,
            ownerContacted: false,
          },
        ],
        totalElements: 2,
        totalPages: 1,
        number: 0,
        size: 20,
      },
      error: null,
    });
  }),

  // 대시보드의 "검토 대기 환불" 건수(totalElements)만 확인하는 용도라 content는 비워뒀다.
  // 환불 목록 화면(/refunds)을 이 핸들러로 개발하려면 totalElements에 맞는 content도 채워야 한다.
  http.get('*/api/v1/admin/refunds', async ({ request }) => {
    await delay(300);
    const status = new URL(request.url).searchParams.get('status');
    return HttpResponse.json({
      success: true,
      data: {
        content: [],
        totalElements: status === 'WAITING' ? 12 : 30,
        totalPages: 1,
      },
      error: null,
    });
  }),
];

export const handlers = [...overrideHandlers, ...generatedHandlers];
