import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import PaymentCompleteClient from '@/app/(pages)/payment/complete/_components/PaymentCompleteClient';

const mockRouter = vi.hoisted(() => ({
  push: vi.fn(),
  replace: vi.fn(),
  prefetch: vi.fn(),
  back: vi.fn(),
}));

vi.mock('next/navigation', () => ({
  usePathname: () => '/test-path',
  useRouter: () => mockRouter,
  useSearchParams: () => new URLSearchParams(),
}));

function renderComponent(
  props: Partial<{ participationId: string; groupBuyId: string }> = {},
) {
  return render(
    <PaymentCompleteClient
      participationId={props.participationId ?? '456'}
      groupBuyId={props.groupBuyId ?? '1'}
    />,
  );
}

describe('PaymentCompleteClient', () => {
  describe('정상 진입 — sessionStorage 토큰 일치', () => {
    beforeEach(() => {
      sessionStorage.setItem('paymentSuccess', '456');
    });

    it('결제 완료 화면을 표시한다', async () => {
      renderComponent();
      await waitFor(() => {
        expect(screen.getByText('결제 완료')).toBeInTheDocument();
      });
    });

    it('검증 즉시 paymentSuccess를 sessionStorage에서 제거한다', async () => {
      renderComponent();
      await waitFor(() => {
        expect(sessionStorage.getItem('paymentSuccess')).toBeNull();
      });
    });

    it('"다른 상품 둘러보기" 클릭 시 router.push("/feed")를 호출한다', async () => {
      renderComponent();
      await waitFor(() =>
        expect(
          screen.getByRole('button', { name: '다른 상품 둘러보기' }),
        ).toBeInTheDocument(),
      );
      await userEvent.click(
        screen.getByRole('button', { name: '다른 상품 둘러보기' }),
      );
      expect(mockRouter.push).toHaveBeenCalledWith('/feed');
    });

    it('popstate 이벤트 발생 시 window.location.replace("/item/1")을 호출한다', async () => {
      renderComponent();
      await waitFor(() =>
        expect(screen.getByText('결제 완료')).toBeInTheDocument(),
      );
      window.dispatchEvent(new PopStateEvent('popstate'));
      expect(window.location.replace).toHaveBeenCalledWith('/item/1');
    });
  });

  describe('비정상 진입 — sessionStorage 토큰 불일치·부재', () => {
    it('sessionStorage에 값이 없으면 router.replace("/feed")를 호출한다', async () => {
      renderComponent();
      await waitFor(() => {
        expect(mockRouter.replace).toHaveBeenCalledWith('/feed');
      });
    });

    it('sessionStorage에 다른 participationId가 있으면 router.replace("/feed")를 호출한다', async () => {
      sessionStorage.setItem('paymentSuccess', '999');
      renderComponent();
      await waitFor(() => {
        expect(mockRouter.replace).toHaveBeenCalledWith('/feed');
      });
    });

    it('비정상 진입 시 결제 완료 UI를 렌더링하지 않는다', async () => {
      renderComponent();
      await waitFor(() => {
        expect(mockRouter.replace).toHaveBeenCalledWith('/feed');
      });
      expect(screen.queryByText('결제 완료')).not.toBeInTheDocument();
    });
  });

  describe('이벤트 리스너 정리 (cleanup)', () => {
    it('컴포넌트 언마운트 후 popstate가 발생해도 window.location.replace를 호출하지 않는다', async () => {
      sessionStorage.setItem('paymentSuccess', '456');
      const { unmount } = renderComponent();
      await waitFor(() =>
        expect(screen.getByText('결제 완료')).toBeInTheDocument(),
      );
      unmount();
      window.dispatchEvent(new PopStateEvent('popstate'));
      expect(window.location.replace).not.toHaveBeenCalled();
    });
  });
});
