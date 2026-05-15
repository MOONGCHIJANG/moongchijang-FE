import { render, screen, waitFor } from '@testing-library/react';
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

describe('JoinPageClient 결제 로직 테스트', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('결제 버튼 클릭 시 결제 요청 생성 -> SDK 호출 -> 서버 컨펌 -> 성공 페이지 이동이 순차적으로 일어나야 한다', async () => {
    const user = userEvent.setup();

    // A. MSW API 모킹
    server.use(
      // [1] 결제 요청 생성
      http.post('*/api/v1/group-buys/:id/participations', () => {
        return HttpResponse.json(
          {
            success: true,
            data: {
              participationId: 123,
              orderName: '맛있는 쿠키 외 0건',
              totalAmount: 10000,
              productAmount: 10000,
              feeAmount: 0,
            },
            error: null,
          },
          { status: 201 },
        );
      }),
      // [3] 서버 결제 승인 확인
      http.post('*/api/v1/payments/confirm', () => {
        return HttpResponse.json(
          {
            success: true,
            data: {},
            error: null,
          },
          { status: 200 },
        );
      }),
    );

    // B. SDK 모킹 응답 설정
    vi.mocked(PortOne.requestPayment).mockResolvedValue(undefined);

    render(<JoinPageClient groupBuyId="1" groupBuy={mockGroupBuy} />);

    // 1. 수단 선택 (결제 가능 상태로 만들기)
    const cardMethod = screen.getByText(/신용카드/i);
    await user.click(cardMethod);

    // 2. 결제 버튼 클릭
    const payButton = screen.getByRole('button', { name: /결제하기/i });
    await user.click(payButton);

    // 3. 검증: 결제 중 로딩 및 비활성화 체크
    expect(payButton).toBeDisabled();

    // 4. 검증: SDK 호출 확인
    await waitFor(() => {
      expect(PortOne.requestPayment).toHaveBeenCalledWith(
        expect.objectContaining({
          totalAmount: 10000,
          orderName: '맛있는 쿠키 외 0건',
        }),
      );
    });

    // 5. 검증: 최종 페이지 이동 및 sessionStorage 저장 확인
    await waitFor(() => {
      expect(window.location.replace).toHaveBeenCalledWith(
        expect.stringContaining('/payment/complete?participationId=123'),
      );
    });
    expect(sessionStorage.getItem('paymentSuccess')).toBe('123');
  });

  it('SDK 결제 실패 시 payments/fail API를 호출하고 실패 페이지로 이동해야 한다', async () => {
    const user = userEvent.setup();

    // A. MSW 실패 핸들러
    const failApiSpy = vi.fn();
    server.use(
      http.post('*/api/v1/group-buys/:id/participations', () => {
        return HttpResponse.json(
          {
            success: true,
            data: {
              participationId: 123,
              orderName: '맛있는 쿠키 외 0건',
              totalAmount: 10000,
              productAmount: 10000,
              feeAmount: 0,
            },
            error: null,
          },
          { status: 201 },
        );
      }),
      http.post('*/api/v1/payments/fail', async ({ request }) => {
        failApiSpy(await request.json());
        return HttpResponse.json({ success: true });
      }),
    );

    // B. SDK 에러 응답
    vi.mocked(PortOne.requestPayment).mockResolvedValue({
      code: 'USER_CANCEL',
      message: '사용자가 결제창을 닫았습니다',
    } as unknown as PaymentResponse);

    render(<JoinPageClient groupBuyId="1" groupBuy={mockGroupBuy} />);

    await user.click(screen.getByText(/신용카드/i));
    await user.click(screen.getByRole('button', { name: /결제하기/i }));

    // 검증: fail API 호출, sessionStorage 저장, 페이지 이동
    await waitFor(() => {
      expect(failApiSpy).toHaveBeenCalledWith(
        expect.objectContaining({ errorCode: 'USER_CANCEL' }),
      );
      expect(window.location.replace).toHaveBeenCalledWith(
        expect.stringContaining('/payment/fail?errorCode=USER_CANCEL'),
      );
    });
    expect(sessionStorage.getItem('paymentFail')).toBe('USER_CANCEL');
  });

  it('결제 요청 생성(participations) API 실패 시 fail API를 호출하고 실패 페이지로 이동해야 한다', async () => {
    const user = userEvent.setup();
    const failApiSpy = vi.fn();

    server.use(
      http.post('*/api/v1/group-buys/:id/participations', () => {
        return HttpResponse.json(
          { success: false, data: null, error: 'bad request' },
          { status: 400 },
        );
      }),
      http.post('*/api/v1/payments/fail', async ({ request }) => {
        failApiSpy(await request.json());
        return HttpResponse.json({ success: true });
      }),
    );

    render(<JoinPageClient groupBuyId="1" groupBuy={mockGroupBuy} />);

    await user.click(screen.getByText(/신용카드/i));
    await user.click(screen.getByRole('button', { name: /결제하기/i }));

    await waitFor(() => {
      expect(failApiSpy).toHaveBeenCalled();
      expect(window.location.replace).toHaveBeenCalledWith(
        expect.stringContaining('/payment/fail'),
      );
    });
    expect(sessionStorage.getItem('paymentFail')).toBe('결제 요청 생성 실패');
  });

  it('결제 컨펌(confirm) API 실패 시 fail API를 호출하고 실패 페이지로 이동해야 한다', async () => {
    const user = userEvent.setup();
    const failApiSpy = vi.fn();

    server.use(
      http.post('*/api/v1/group-buys/:id/participations', () => {
        return HttpResponse.json(
          {
            success: true,
            data: {
              participationId: 123,
              orderName: '맛있는 쿠키 외 0건',
              totalAmount: 10000,
              productAmount: 10000,
              feeAmount: 0,
            },
            error: null,
          },
          { status: 201 },
        );
      }),
      http.post('*/api/v1/payments/confirm', () => {
        return HttpResponse.json(
          { success: true, data: {}, error: null },
          { status: 500 },
        );
      }),
      http.post('*/api/v1/payments/fail', async ({ request }) => {
        failApiSpy(await request.json());
        return HttpResponse.json({ success: true });
      }),
    );

    vi.mocked(PortOne.requestPayment).mockResolvedValue(undefined);

    render(<JoinPageClient groupBuyId="1" groupBuy={mockGroupBuy} />);

    await user.click(screen.getByText(/신용카드/i));
    await user.click(screen.getByRole('button', { name: /결제하기/i }));

    await waitFor(() => {
      expect(failApiSpy).toHaveBeenCalled();
      expect(window.location.replace).toHaveBeenCalledWith(
        expect.stringContaining('/payment/fail'),
      );
    });
    expect(sessionStorage.getItem('paymentFail')).toBe('결제 확인 실패');
  });
});
