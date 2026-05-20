import { render, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { http, HttpResponse } from 'msw';
import { server } from 'tests/setup';
import PaymentRedirectClient from '@/app/(pages)/payment/redirect/_components/PaymentRedirectClient';

const successData = {
  paymentId: 'pay-123',
  participationId: 456,
  participationStatus: 'PAID_WAITING_GOAL' as const,
  displayStatus: '참여중',
  amount: 10000,
  method: 'card',
  approvedAt: '2026-01-01T00:00:00Z',
};

describe('PaymentRedirectClient', () => {
  describe('code 파라미터 있음 — 결제 실패·취소 경로', () => {
    it('sessionStorage에 errorCode를 저장하고 /payment/fail로 리다이렉트한다', async () => {
      render(
        <PaymentRedirectClient
          paymentId="pay-123"
          groupBuyId="1"
          code="USER_CANCEL"
          message="사용자 취소"
        />,
      );

      await waitFor(() => {
        expect(sessionStorage.getItem('paymentFail')).toBe('USER_CANCEL');
        expect(window.location.replace).toHaveBeenCalledWith(
          '/payment/fail?errorCode=USER_CANCEL&groupBuyId=1',
        );
      });
    });

    it('code에 특수문자가 포함되면 encodeURIComponent가 적용된 URL로 리다이렉트한다', async () => {
      render(
        <PaymentRedirectClient
          paymentId="pay-123"
          groupBuyId="1"
          code="PAY/CANCEL+ERROR"
          message="특수문자 에러"
        />,
      );

      await waitFor(() => {
        expect(window.location.replace).toHaveBeenCalledWith(
          `/payment/fail?errorCode=${encodeURIComponent('PAY/CANCEL+ERROR')}&groupBuyId=1`,
        );
      });
    });

    it('groupBuyId가 없으면 groupBuyId가 빈 문자열인 URL로 리다이렉트한다', async () => {
      render(
        <PaymentRedirectClient
          paymentId="pay-123"
          code="USER_CANCEL"
          message="사용자 취소"
        />,
      );

      await waitFor(() => {
        expect(window.location.replace).toHaveBeenCalledWith(
          '/payment/fail?errorCode=USER_CANCEL&groupBuyId=',
        );
      });
    });
  });

  describe('code 파라미터 없음 — 결제 성공 경로', () => {
    it('portone/complete API를 올바른 파라미터로 호출하고 sessionStorage에 저장 후 /payment/complete로 리다이렉트한다', async () => {
      const completeSpy = vi.fn();
      server.use(
        http.post('*/api/v1/payments/portone/complete', async ({ request }) => {
          completeSpy(await request.json());
          return HttpResponse.json({
            success: true,
            data: successData,
            error: null,
          });
        }),
      );

      render(
        <PaymentRedirectClient
          paymentId="pay-123"
          amount="10000"
          groupBuyId="1"
        />,
      );

      await waitFor(() => {
        expect(completeSpy).toHaveBeenCalledWith({
          paymentId: 'pay-123',
          amount: 10000,
        });
      });
      await waitFor(() => {
        expect(sessionStorage.getItem('paymentSuccess')).toBe('456');
      });
      await waitFor(() => {
        expect(window.location.replace).toHaveBeenCalledWith(
          '/payment/complete?participationId=456&groupBuyId=1',
        );
      });
    });

    it('portone/complete 네트워크 에러 시 sessionStorage paymentFail 저장 및 /payment/fail 리다이렉트', async () => {
      server.use(
        http.post('*/api/v1/payments/portone/complete', () =>
          HttpResponse.error(),
        ),
      );

      render(
        <PaymentRedirectClient
          paymentId="pay-123"
          amount="10000"
          groupBuyId="1"
        />,
      );

      await waitFor(() => {
        expect(sessionStorage.getItem('paymentFail')).not.toBeNull();
        expect(window.location.replace).toHaveBeenCalledWith(
          expect.stringContaining('/payment/fail'),
        );
      });
    });

    it('portone/complete 응답 Zod 파싱 실패(success: false) 시 /payment/fail로 리다이렉트한다', async () => {
      server.use(
        http.post('*/api/v1/payments/portone/complete', () =>
          HttpResponse.json({ success: false, data: null, error: 'invalid' }),
        ),
      );

      render(
        <PaymentRedirectClient
          paymentId="pay-123"
          amount="10000"
          groupBuyId="1"
        />,
      );

      await waitFor(() => {
        expect(sessionStorage.getItem('paymentFail')).toBe(
          '결제 확인 응답 형식 오류',
        );
        expect(window.location.replace).toHaveBeenCalledWith(
          expect.stringContaining('/payment/fail'),
        );
      });
    });

    it('portone/complete 응답 status 500 시 /payment/fail로 리다이렉트한다', async () => {
      server.use(
        http.post('*/api/v1/payments/portone/complete', () =>
          HttpResponse.json(
            { success: true, data: {}, error: null },
            { status: 500 },
          ),
        ),
      );

      render(
        <PaymentRedirectClient
          paymentId="pay-123"
          amount="10000"
          groupBuyId="1"
        />,
      );

      await waitFor(() => {
        expect(sessionStorage.getItem('paymentFail')).toBe('결제 확인 실패');
        expect(window.location.replace).toHaveBeenCalledWith(
          expect.stringContaining('/payment/fail'),
        );
      });
    });

    it('amount가 숫자로 변환되지 않는 문자열이면 portone/complete API에 null로 전달되고 실패 처리된다', async () => {
      // A. MSW API 모킹 — complete spy, Zod 파싱 실패 응답
      const completeSpy = vi.fn();
      server.use(
        http.post(
          '*/api/v1/payments/portone/complete',
          async ({ request }) => {
            completeSpy(await request.json());
            return HttpResponse.json({
              success: false,
              data: null,
              error: 'invalid amount',
            });
          },
        ),
      );

      // amount="abc" → Number('abc') = NaN → JSON 직렬화 시 null
      render(
        <PaymentRedirectClient
          paymentId="pay-123"
          amount="abc"
          groupBuyId="1"
        />,
      );

      // 검증: portone/complete API에 amount: null로 전달, 파싱 실패 → fail 처리
      await waitFor(() => {
        expect(completeSpy).toHaveBeenCalledWith(
          expect.objectContaining({ amount: null }),
        );
        expect(window.location.replace).toHaveBeenCalledWith(
          expect.stringContaining('/payment/fail'),
        );
      });
    });
  });
});
