import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import PaymentFailClient from '@/app/(pages)/payment/fail/_components/PaymentFailClient';

const mockRouterReplace = vi.fn();

vi.mock('next/navigation', () => ({
  usePathname: () => '/test-path',
  useRouter: () => ({
    push: vi.fn(),
    replace: mockRouterReplace,
    prefetch: vi.fn(),
    back: vi.fn(),
  }),
  useSearchParams: () => new URLSearchParams(),
}));

describe('PaymentFailClient', () => {
  // 조건: redirect 페이지가 sessionStorage에 errorCode를 저장한 뒤 정상 진입한 경우
  // 검증: 1회용 토큰 검증 통과 → 오류 코드 포함한 결제 실패 UI 렌더링
  it('sessionStorage에 올바른 errorCode가 있으면 "오류 코드: USER_CANCEL"을 표시한다', async () => {
    sessionStorage.setItem('paymentFail', 'USER_CANCEL');

    render(<PaymentFailClient errorCode="USER_CANCEL" groupBuyId="1" />);

    await waitFor(() => {
      expect(screen.getByText('오류 코드: USER_CANCEL')).toBeInTheDocument();
    });
  });

  // 조건: 정상 진입 후 검증 완료
  // 검증: paymentFail은 1회용 토큰이므로 검증 즉시 삭제되어야 함 (재진입 방지)
  it('sessionStorage 검증 성공 후 paymentFail 항목을 제거한다', async () => {
    sessionStorage.setItem('paymentFail', 'USER_CANCEL');

    render(<PaymentFailClient errorCode="USER_CANCEL" groupBuyId="1" />);

    await waitFor(() => {
      expect(sessionStorage.getItem('paymentFail')).toBeNull();
    });
  });

  // 조건: URL을 직접 입력하거나 새로고침해서 sessionStorage에 토큰이 없는 경우
  // 검증: 비정상 진입으로 판단 → /feed로 강제 리다이렉트
  it('sessionStorage에 paymentFail 값이 없으면 router.replace("/feed")를 호출한다', async () => {
    render(<PaymentFailClient errorCode="USER_CANCEL" groupBuyId="1" />);

    await waitFor(() => {
      expect(mockRouterReplace).toHaveBeenCalledWith('/feed');
    });
  });

  // 조건: sessionStorage에 값은 있지만 URL의 errorCode와 다른 경우 (다른 결제 세션의 토큰)
  // 검증: 토큰 불일치로 비정상 진입 판단 → /feed로 강제 리다이렉트
  it('sessionStorage에 다른 errorCode가 있으면 router.replace("/feed")를 호출한다', async () => {
    sessionStorage.setItem('paymentFail', 'OTHER_ERROR');

    render(<PaymentFailClient errorCode="USER_CANCEL" groupBuyId="1" />);

    await waitFor(() => {
      expect(mockRouterReplace).toHaveBeenCalledWith('/feed');
    });
  });

  // 조건: 결제 실패 화면에서 브라우저 뒤로가기 버튼을 누른 경우
  // 검증: popstate 이벤트 → 결제 전 상품 페이지(/item/{groupBuyId})로 강제 이동 (결제 플로우 재진입 방지)
  it('popstate 이벤트 발생 시 window.location.replace("/item/1")을 호출한다', async () => {
    sessionStorage.setItem('paymentFail', 'USER_CANCEL');

    render(<PaymentFailClient errorCode="USER_CANCEL" groupBuyId="1" />);

    await waitFor(() => {
      expect(screen.getByText('오류 코드: USER_CANCEL')).toBeInTheDocument();
    });

    window.dispatchEvent(new PopStateEvent('popstate'));

    expect(window.location.replace).toHaveBeenCalledWith('/item/1');
  });
});
