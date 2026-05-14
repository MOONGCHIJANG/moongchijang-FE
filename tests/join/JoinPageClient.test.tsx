import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import JoinPageClient from '@/app/(pages)/item/[groupBuyId]/join/_components/JoinPageClient';
import type { ApiResponseGroupBuyDetailResponseData } from '@/api/generated/api.schemas';
import * as PortOne from '@portone/browser-sdk/v2';
import { http, HttpResponse } from 'msw';
import { server } from 'tests/setup';

// 1. SDK 모킹 (이미 tests/setup.ts에서 했지만 명시적으로 확인)
vi.mock('@portone/browser-sdk/v2', () => ({
  requestPayment: vi.fn(),
}));

const mockGroupBuy = {
  id: 1,
  productName: '맛있는 쿠키',
  price: 10000,
  imageUrls: ['/test.jpg'],
  maxQuantity: 10,
  // ... 필요한 필드 추가
};

describe('JoinPageClient 결제 로직 테스트', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('결제 버튼 클릭 시 결제 요청 생성 -> SDK 호출 -> 서버 컨펌 -> 성공 페이지 이동이 순차적으로 일어나야 한다', async () => {
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
    vi.mocked(PortOne.requestPayment).mockResolvedValue({
      // 성공 시 보통 undefined나 에러 코드가 없는 객체 반환 (스펙에 따라 다름)
    });

    render(
      <JoinPageClient
        groupBuyId="1"
        groupBuy={
          mockGroupBuy as unknown as ApiResponseGroupBuyDetailResponseData
        }
      />,
    );

    // 1. 수단 선택 (결제 가능 상태로 만들기)
    const cardMethod = screen.getByText(/신용카드/i);
    fireEvent.click(cardMethod);

    // 2. 결제 버튼 클릭
    const payButton = screen.getByRole('button', { name: /결제하기/i });
    fireEvent.click(payButton);

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

    // 5. 검증: 최종 페이지 이동 확인
    await waitFor(() => {
      expect(window.location.replace).toHaveBeenCalledWith(
        expect.stringContaining('/payment/complete?participationId=123'),
      );
    });
  });

  it('SDK 결제 실패 시 payments/fail API를 호출하고 실패 페이지로 이동해야 한다', async () => {
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
    });

    render(
      <JoinPageClient
        groupBuyId="1"
        groupBuy={
          mockGroupBuy as unknown as ApiResponseGroupBuyDetailResponseData
        }
      />,
    );

    fireEvent.click(screen.getByText(/신용카드/i));
    fireEvent.click(screen.getByRole('button', { name: /결제하기/i }));

    // 검증: fail API 호출 및 페이지 이동
    await waitFor(() => {
      expect(failApiSpy).toHaveBeenCalledWith(
        expect.objectContaining({ errorCode: 'USER_CANCEL' }),
      );
      expect(window.location.replace).toHaveBeenCalledWith(
        expect.stringContaining('/payment/fail?errorCode=USER_CANCEL'),
      );
    });
  });
});
