import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import JoinPageClient from '@/app/(pages)/item/[groupBuyId]/join/_components/JoinPageClient';
import type { ApiResponseGroupBuyDetailResponseData } from '@/api/generated/api.schemas';
import * as PortOne from '@portone/browser-sdk/v2';
import type { PaymentResponse } from '@portone/browser-sdk/v2';
import { http, HttpResponse } from 'msw';
import { server } from 'tests/setup';

const mockGroupBuy: ApiResponseGroupBuyDetailResponseData = {
  id: 1,
  storeName: '테스트 상점',
  regionType: 'SEOUL',
  regionLabel: '서울',
  districtType: 'SEOUL_ALL',
  districtLabel: '서울 전체',
  productName: '맛있는 쿠키',
  productDescription: '테스트 상품 설명',
  thumbnailUrl: '/test.jpg',
  imageUrls: ['/test.jpg'],
  price: 10000,
  achievementRate: 50,
  currentQuantity: 5,
  targetQuantity: 10,
  maxQuantity: 10,
  deadline: '2025-12-31T23:59:59',
  pickupDate: '2026-01-05',
  pickupTimeStart: '10:00',
  pickupTimeEnd: '18:00',
  pickupDateLabel: '2026년 1월 5일',
  pickupDateTimeLabel: '2026년 1월 5일 10:00~18:00',
  deadlineDateTimeLabel: '2025년 12월 31일 23:59',
  pickupLocation: '서울 강남구 테스트로 1',
  pickupLatitude: 37.5,
  pickupLongitude: 127.0,
  dDay: 5,
  dDayLabel: 'D-5',
  isWishlisted: false,
  isClosed: false,
  isParticipated: false,
  canParticipate: true,
};

const checkoutResponse = (quantity = 1) =>
  HttpResponse.json({
    success: true,
    data: {
      groupBuyId: 1,
      storeName: '테스트 상점',
      productName: '맛있는 쿠키',
      thumbnailUrl: '/test.jpg',
      pickupDate: '2026-01-05',
      pickupTimeStart: '10:00',
      pickupTimeEnd: '18:00',
      unitPrice: 10000,
      quantity,
      productAmount: 10000 * quantity,
      feeAmount: 0,
      totalAmount: 10000 * quantity,
      remainingQuantity: 10,
    },
    error: null,
  });

const ordersResponse = (quantity = 1) =>
  HttpResponse.json({
    success: true,
    data: {
      paymentId: 'MOCK-pay-123',
      storeId: process.env.NEXT_PUBLIC_PORTONE_STORE_ID ?? 'test-store-id',
      channelKey:
        process.env.NEXT_PUBLIC_PORTONE_CHANNEL_KEY ?? 'test-channel-key',
      orderName: `맛있는 쿠키 외 ${quantity - 1}건`,
      amount: 10000 * quantity,
      customerName: null,
    },
    error: null,
  });

const completeResponse = (participationId = 123) =>
  HttpResponse.json({
    success: true,
    data: {
      paymentId: 'MOCK-pay-123',
      participationId,
      participationStatus: 'PAID_WAITING_GOAL',
      displayStatus: '참여중',
      amount: 10000,
      method: 'card',
      approvedAt: '2026-01-01T00:00:00Z',
    },
    error: null,
  });

// 성공 경로 3개 API 핸들러 일괄 설정
function useSuccessHandlers(participationId = 123) {
  server.use(
    http.get('*/api/v1/group-buys/:groupBuyId/checkout', ({ request }) => {
      const qty = parseInt(
        new URL(request.url).searchParams.get('quantity') ?? '1',
      );
      return checkoutResponse(qty);
    }),
    http.post(
      '*/api/v1/group-buys/:groupBuyId/payment-orders',
      ({ request }) => {
        void request;
        return ordersResponse();
      },
    ),
    http.post('*/api/v1/payments/portone/complete', () =>
      completeResponse(participationId),
    ),
  );
}

describe('JoinPageClient 결제 로직 테스트', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('결제 버튼 클릭 시 checkout → payment-orders → SDK → portone/complete → 성공 페이지 이동이 순차적으로 일어나야 한다', async () => {
    const user = userEvent.setup();

    // 3단계 API 핸들러 + SDK 성공 응답으로 정상 플로우 전체 시뮬레이션
    useSuccessHandlers(123);
    vi.mocked(PortOne.requestPayment).mockResolvedValue(undefined);

    render(<JoinPageClient groupBuyId="1" groupBuy={mockGroupBuy} />);
    await user.click(screen.getByRole('button', { name: /결제하기/i }));

    // 검증: SDK 호출 파라미터(totalAmount, orderName), 완료 페이지 리다이렉트, sessionStorage 저장
    await waitFor(() => {
      expect(PortOne.requestPayment).toHaveBeenCalledWith(
        expect.objectContaining({
          totalAmount: 10000,
          orderName: '맛있는 쿠키 외 0건',
        }),
      );
    });
    await waitFor(() => {
      expect(window.location.replace).toHaveBeenCalledWith(
        expect.stringContaining('/payment/complete?participationId=123'),
      );
    });
    expect(sessionStorage.getItem('paymentSuccess')).toBe('123');
  });

  it('SDK 결제 실패 시 실패 페이지로 이동해야 한다', async () => {
    const user = userEvent.setup();

    // code 필드가 있는 응답 → SDK 실패로 간주, portone/complete API 호출 없음
    useSuccessHandlers();
    vi.mocked(PortOne.requestPayment).mockResolvedValue({
      code: 'USER_CANCEL',
      message: '사용자가 결제창을 닫았습니다',
    } as unknown as PaymentResponse);

    render(<JoinPageClient groupBuyId="1" groupBuy={mockGroupBuy} />);
    await user.click(screen.getByRole('button', { name: /결제하기/i }));

    // 검증: SDK 반환 code 값이 errorCode로 전달되고 sessionStorage에도 동일하게 저장
    await waitFor(() => {
      expect(window.location.replace).toHaveBeenCalledWith(
        expect.stringContaining('/payment/fail?errorCode=USER_CANCEL'),
      );
    });
    expect(sessionStorage.getItem('paymentFail')).toBe('USER_CANCEL');
  });

  it('checkout API 실패 시 실패 페이지로 이동해야 한다', async () => {
    const user = userEvent.setup();

    // checkout 400 → 결제 플로우 첫 단계 실패, 이후 단계(payment-orders, SDK) 실행 없음
    server.use(
      http.get('*/api/v1/group-buys/:groupBuyId/checkout', () =>
        HttpResponse.json(
          { success: false, data: null, error: 'bad request' },
          { status: 400 },
        ),
      ),
    );

    render(<JoinPageClient groupBuyId="1" groupBuy={mockGroupBuy} />);
    await user.click(screen.getByRole('button', { name: /결제하기/i }));

    // 검증: 'checkout 조회 실패' 고정 메시지 저장 및 /payment/fail 리다이렉트
    await waitFor(() => {
      expect(window.location.replace).toHaveBeenCalledWith(
        expect.stringContaining('/payment/fail'),
      );
    });
    expect(sessionStorage.getItem('paymentFail')).toBe('checkout 조회 실패');
  });

  it('payment-orders API 실패 시 실패 페이지로 이동해야 한다', async () => {
    const user = userEvent.setup();

    // checkout 성공 후 payment-orders 500 → paymentId 없이 SDK 호출 불가
    server.use(
      http.get('*/api/v1/group-buys/:groupBuyId/checkout', () =>
        checkoutResponse(),
      ),
      http.post('*/api/v1/group-buys/:groupBuyId/payment-orders', () =>
        HttpResponse.json(
          { success: true, data: {}, error: null },
          { status: 500 },
        ),
      ),
    );

    render(<JoinPageClient groupBuyId="1" groupBuy={mockGroupBuy} />);
    await user.click(screen.getByRole('button', { name: /결제하기/i }));

    // 검증: '결제 주문 생성 실패' 메시지 저장 및 /payment/fail 리다이렉트
    await waitFor(() => {
      expect(window.location.replace).toHaveBeenCalledWith(
        expect.stringContaining('/payment/fail'),
      );
    });
    expect(sessionStorage.getItem('paymentFail')).toBe('결제 주문 생성 실패');
  });

  it('결제 버튼을 연속으로 두 번 클릭해도 결제 요청은 한 번만 발생해야 한다', async () => {
    const user = userEvent.setup();

    // 결제 진행 중 버튼 비활성화 여부 검증 — 중복 결제 방지 핵심 케이스
    useSuccessHandlers();
    vi.mocked(PortOne.requestPayment).mockResolvedValue(undefined);

    render(<JoinPageClient groupBuyId="1" groupBuy={mockGroupBuy} />);
    const payButton = screen.getByRole('button', { name: /결제하기/i });

    // 연속 두 번 클릭
    await user.click(payButton);
    await user.click(payButton);

    // 검증: SDK requestPayment 호출 횟수 정확히 1회
    await waitFor(() => {
      expect(PortOne.requestPayment).toHaveBeenCalledTimes(1);
    });
  });

  it('수량을 변경한 후 결제하면 변경된 수량이 payment-orders API에 전달되어야 한다', async () => {
    const user = userEvent.setup();

    // ordersSpy로 payment-orders 요청 바디의 quantity 필드 캡처
    const ordersSpy = vi.fn();
    server.use(
      http.get('*/api/v1/group-buys/:groupBuyId/checkout', ({ request }) => {
        const qty = parseInt(
          new URL(request.url).searchParams.get('quantity') ?? '1',
        );
        return checkoutResponse(qty);
      }),
      http.post(
        '*/api/v1/group-buys/:groupBuyId/payment-orders',
        async ({ request }) => {
          ordersSpy(await request.json());
          return ordersResponse(3);
        },
      ),
      http.post('*/api/v1/payments/portone/complete', () => completeResponse()),
    );
    vi.mocked(PortOne.requestPayment).mockResolvedValue(undefined);

    render(<JoinPageClient groupBuyId="1" groupBuy={mockGroupBuy} />);

    // spinbutton(수량 입력) 값을 3으로 직접 변경 후 결제
    const quantityInput = screen.getByRole('spinbutton');
    fireEvent.change(quantityInput, { target: { value: '3' } });

    await user.click(screen.getByRole('button', { name: /결제하기/i }));

    // 검증: payment-orders 요청 바디에 quantity: 3 포함
    await waitFor(() => {
      expect(ordersSpy).toHaveBeenCalledWith(
        expect.objectContaining({ quantity: 3 }),
      );
    });
  });

  it('portone/complete API 실패 시 실패 페이지로 이동해야 한다', async () => {
    const user = userEvent.setup();

    // 성공 핸들러 이후 portone/complete만 500으로 덮어쓰기 — 마지막 단계 실패 케이스
    useSuccessHandlers();
    server.use(
      http.post('*/api/v1/payments/portone/complete', () =>
        HttpResponse.json(
          { success: true, data: {}, error: null },
          { status: 500 },
        ),
      ),
    );
    vi.mocked(PortOne.requestPayment).mockResolvedValue(undefined);

    render(<JoinPageClient groupBuyId="1" groupBuy={mockGroupBuy} />);
    await user.click(screen.getByRole('button', { name: /결제하기/i }));

    // 검증: '결제 확인 실패' 메시지 저장 및 /payment/fail 리다이렉트
    await waitFor(() => {
      expect(window.location.replace).toHaveBeenCalledWith(
        expect.stringContaining('/payment/fail'),
      );
    });
    expect(sessionStorage.getItem('paymentFail')).toBe('결제 확인 실패');
  });

  it('SDK가 예외를 throw하면(네트워크 단절 등) 실패 페이지로 이동해야 한다', async () => {
    const user = userEvent.setup();

    // mockRejectedValue → SDK가 Promise를 reject하는 상황 (결제창 자체 오류, code 없음)
    useSuccessHandlers();
    vi.mocked(PortOne.requestPayment).mockRejectedValue(
      new Error('네트워크 오류'),
    );

    render(<JoinPageClient groupBuyId="1" groupBuy={mockGroupBuy} />);
    await user.click(screen.getByRole('button', { name: /결제하기/i }));

    // 검증: Error.message가 그대로 paymentFail에 저장되고 /payment/fail 리다이렉트
    await waitFor(() => {
      expect(window.location.replace).toHaveBeenCalledWith(
        expect.stringContaining('/payment/fail'),
      );
    });
    expect(sessionStorage.getItem('paymentFail')).toBe('네트워크 오류');
  });

  it('checkout 응답이 예상과 다른 형식이면 실패 처리해야 한다', async () => {
    const user = userEvent.setup();

    // data: null로 Zod 필수 필드 부재 → 파싱 실패 경로 재현
    server.use(
      http.get('*/api/v1/group-buys/:groupBuyId/checkout', () =>
        // totalAmount 누락 → Zod 파싱 실패
        HttpResponse.json({ success: true, data: null, error: null }),
      ),
    );

    render(<JoinPageClient groupBuyId="1" groupBuy={mockGroupBuy} />);
    await user.click(screen.getByRole('button', { name: /결제하기/i }));

    // 검증: 'checkout 응답 형식 오류' 저장 및 /payment/fail 리다이렉트
    await waitFor(() => {
      expect(window.location.replace).toHaveBeenCalledWith(
        expect.stringContaining('/payment/fail'),
      );
    });
    expect(sessionStorage.getItem('paymentFail')).toBe(
      'checkout 응답 형식 오류',
    );
  });

  it('payment-orders 응답이 예상과 다른 형식이면 실패 처리해야 한다', async () => {
    const user = userEvent.setup();

    // checkout 성공 후 payment-orders에서 data: null → paymentId 누락으로 파싱 실패
    server.use(
      http.get('*/api/v1/group-buys/:groupBuyId/checkout', () =>
        checkoutResponse(),
      ),
      http.post('*/api/v1/group-buys/:groupBuyId/payment-orders', () =>
        // paymentId 누락 → Zod 파싱 실패
        HttpResponse.json({ success: true, data: null, error: null }),
      ),
    );

    render(<JoinPageClient groupBuyId="1" groupBuy={mockGroupBuy} />);
    await user.click(screen.getByRole('button', { name: /결제하기/i }));

    // 검증: '결제 주문 응답 형식 오류' 저장 및 /payment/fail 리다이렉트
    await waitFor(() => {
      expect(window.location.replace).toHaveBeenCalledWith(
        expect.stringContaining('/payment/fail'),
      );
    });
    expect(sessionStorage.getItem('paymentFail')).toBe(
      '결제 주문 응답 형식 오류',
    );
  });
});
