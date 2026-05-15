import { render, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { http, HttpResponse } from 'msw';
import { server } from 'tests/setup';
import PaymentRedirectClient from '@/app/(pages)/payment/redirect/_components/PaymentRedirectClient';

describe('PaymentRedirectClient', () => {
  // 조건: PG사(포트원)가 결제 실패/취소 시 code 쿼리 파라미터를 붙여 리다이렉트한 경우
  // 검증: fail API 호출 → sessionStorage에 errorCode 저장 → /payment/fail로 이동
  it('code 파라미터가 있을 때 fail API를 올바른 파라미터로 호출하고 sessionStorage에 저장 후 /payment/fail로 리다이렉트한다', async () => {
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

  // 조건: PG사 결제 성공 후 code 없이 리다이렉트된 경우 (정상 결제 완료)
  // 검증: confirm API 호출 → sessionStorage에 participationId 저장 → /payment/complete로 이동
  it('code 없을 때(성공): confirm API를 올바른 파라미터로 호출하고 sessionStorage에 저장 후 /payment/complete로 리다이렉트한다', async () => {
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

  // 조건: confirm API 호출 중 인터넷 연결 끊김 등 네트워크 에러 발생 (HttpResponse.error() 시뮬레이션)
  // 검증: catch에서 fail API 호출 → sessionStorage에 errorCode 저장 → /payment/fail로 이동
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

  // 조건: confirm API가 200을 반환했지만 응답 본문이 { success: false }로 Zod 스키마 검증 실패
  // 검증: 파싱 실패를 에러로 처리 → fail API 호출 → /payment/fail로 이동
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

  // 조건: confirm API가 status 500을 반환한 경우 (서버 내부 에러)
  // 검증: status !== 200 조건으로 에러 처리 → fail API 호출 → /payment/fail로 이동
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
});
