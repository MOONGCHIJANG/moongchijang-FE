import { render, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { http, HttpResponse } from 'msw';
import { server } from 'tests/setup';
import PaymentRedirectClient from '@/app/(pages)/payment/redirect/_components/PaymentRedirectClient';

describe('PaymentRedirectClient', () => {
  describe('code 파라미터 있음 — 결제 실패·취소 경로', () => {
    it('fail API를 올바른 파라미터로 호출하고 sessionStorage에 저장 후 /payment/fail로 리다이렉트한다', async () => {
      const failSpy = vi.fn();
      server.use(
        http.post('*/api/v1/payments/fail', async ({ request }) => {
          failSpy(await request.json());
          return HttpResponse.json({ success: true, data: {}, error: null });
        }),
      );

      render(
        <PaymentRedirectClient
          paymentId="pay-123"
          participationId="456"
          groupBuyId="1"
          code="USER_CANCEL"
          message="사용자 취소"
        />,
      );

      await waitFor(() => {
        expect(failSpy).toHaveBeenCalledWith({
          paymentId: 'pay-123',
          participationId: 456,
          errorCode: 'USER_CANCEL',
          message: '사용자 취소',
        });
      });
      expect(sessionStorage.getItem('paymentFail')).toBe('USER_CANCEL');
      expect(window.location.replace).toHaveBeenCalledWith(
        '/payment/fail?errorCode=USER_CANCEL&groupBuyId=1',
      );
    });

    // fail API 자체가 실패해도 sessionStorage 저장과 리다이렉트는 .catch(() => {})로 보장됨
    it('fail API가 네트워크 에러를 반환해도 sessionStorage 저장 및 /payment/fail 리다이렉트는 실행된다', async () => {
      server.use(
        http.post('*/api/v1/payments/fail', () => HttpResponse.error()),
      );

      render(
        <PaymentRedirectClient
          paymentId="pay-123"
          participationId="456"
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
      server.use(
        http.post('*/api/v1/payments/fail', () =>
          HttpResponse.json({ success: true, data: {}, error: null }),
        ),
      );

      render(
        <PaymentRedirectClient
          paymentId="pay-123"
          participationId="456"
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
      server.use(
        http.post('*/api/v1/payments/fail', () =>
          HttpResponse.json({ success: true, data: {}, error: null }),
        ),
      );

      render(
        <PaymentRedirectClient
          paymentId="pay-123"
          participationId="456"
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
    it('confirm API를 올바른 파라미터로 호출하고 sessionStorage에 저장 후 /payment/complete로 리다이렉트한다', async () => {
      const confirmSpy = vi.fn();
      server.use(
        http.post('*/api/v1/payments/confirm', async ({ request }) => {
          confirmSpy(await request.json());
          return HttpResponse.json({ success: true, data: {}, error: null });
        }),
      );

      render(
        <PaymentRedirectClient
          paymentId="pay-123"
          participationId="456"
          amount="10000"
          groupBuyId="1"
        />,
      );

      await waitFor(() => {
        expect(confirmSpy).toHaveBeenCalledWith({
          paymentId: 'pay-123',
          participationId: 456,
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

    it('confirm 네트워크 에러 시 fail API 호출, sessionStorage paymentFail 저장, /payment/fail 리다이렉트', async () => {
      const failSpy = vi.fn();
      server.use(
        http.post('*/api/v1/payments/confirm', () => {
          return HttpResponse.error();
        }),
        http.post('*/api/v1/payments/fail', async ({ request }) => {
          failSpy(await request.json());
          return HttpResponse.json({ success: true, data: {}, error: null });
        }),
      );

      render(
        <PaymentRedirectClient
          paymentId="pay-123"
          participationId="456"
          amount="10000"
          groupBuyId="1"
        />,
      );

      await waitFor(() => {
        expect(failSpy).toHaveBeenCalled();
      });
      await waitFor(() => {
        expect(sessionStorage.getItem('paymentFail')).not.toBeNull();
      });
      await waitFor(() => {
        expect(window.location.replace).toHaveBeenCalledWith(
          expect.stringContaining('/payment/fail'),
        );
      });
    });

    it('confirm 응답 Zod 파싱 실패(success: false) 시 /payment/fail로 리다이렉트한다', async () => {
      const failSpy = vi.fn();
      server.use(
        http.post('*/api/v1/payments/confirm', () => {
          return HttpResponse.json({
            success: false,
            data: null,
            error: 'invalid',
          });
        }),
        http.post('*/api/v1/payments/fail', async ({ request }) => {
          failSpy(await request.json());
          return HttpResponse.json({ success: true, data: {}, error: null });
        }),
      );

      render(
        <PaymentRedirectClient
          paymentId="pay-123"
          participationId="456"
          amount="10000"
          groupBuyId="1"
        />,
      );

      await waitFor(() => {
        expect(failSpy).toHaveBeenCalled();
        expect(window.location.replace).toHaveBeenCalledWith(
          expect.stringContaining('/payment/fail'),
        );
      });
      expect(sessionStorage.getItem('paymentFail')).toBe('결제 확인 실패');
    });

    it('confirm 응답 status 500 시 /payment/fail로 리다이렉트한다', async () => {
      const failSpy = vi.fn();
      server.use(
        http.post('*/api/v1/payments/confirm', () => {
          return HttpResponse.json(
            { success: true, data: {}, error: null },
            { status: 500 },
          );
        }),
        http.post('*/api/v1/payments/fail', async ({ request }) => {
          failSpy(await request.json());
          return HttpResponse.json({ success: true, data: {}, error: null });
        }),
      );

      render(
        <PaymentRedirectClient
          paymentId="pay-123"
          participationId="456"
          amount="10000"
          groupBuyId="1"
        />,
      );

      await waitFor(() => {
        expect(failSpy).toHaveBeenCalled();
        expect(window.location.replace).toHaveBeenCalledWith(
          expect.stringContaining('/payment/fail'),
        );
      });
      expect(sessionStorage.getItem('paymentFail')).toBe('결제 확인 실패');
    });

    // confirm + fail 둘 다 실패해도 .catch(() => {})로 fail API 에러를 삼키고,
    // sessionStorage 저장 및 리다이렉트는 반드시 실행됨
    it('confirm과 fail API 모두 실패해도 sessionStorage에 errorCode를 저장하고 /payment/fail로 리다이렉트한다', async () => {
      server.use(
        http.post('*/api/v1/payments/confirm', () => HttpResponse.error()),
        http.post('*/api/v1/payments/fail', () => HttpResponse.error()),
      );

      render(
        <PaymentRedirectClient
          paymentId="pay-123"
          participationId="456"
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

    it('amount가 숫자로 변환되지 않는 문자열이면 confirm API에 null로 전달되고 실패 처리된다', async () => {
      const confirmSpy = vi.fn();
      const failSpy = vi.fn();

      server.use(
        http.post('*/api/v1/payments/confirm', async ({ request }) => {
          confirmSpy(await request.json());
          return HttpResponse.json({
            success: false,
            data: null,
            error: 'invalid amount',
          });
        }),
        http.post('*/api/v1/payments/fail', async ({ request }) => {
          failSpy(await request.json());
          return HttpResponse.json({ success: true, data: {}, error: null });
        }),
      );

      render(
        <PaymentRedirectClient
          paymentId="pay-123"
          participationId="456"
          amount="abc"
          groupBuyId="1"
        />,
      );

      await waitFor(() => {
        // NaN은 JSON 직렬화 시 null이 된다
        expect(confirmSpy).toHaveBeenCalledWith(
          expect.objectContaining({ amount: null }),
        );
        expect(window.location.replace).toHaveBeenCalledWith(
          expect.stringContaining('/payment/fail'),
        );
      });
    });
  });
});
