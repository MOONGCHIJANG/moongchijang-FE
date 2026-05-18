import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import PaymentFailClient from '@/app/(pages)/payment/fail/_components/PaymentFailClient';

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
  props: Partial<{ errorCode: string; groupBuyId: string }> = {},
) {
  return render(
    <PaymentFailClient
      errorCode={props.errorCode ?? 'USER_CANCEL'}
      groupBuyId={props.groupBuyId ?? '1'}
    />,
  );
}

describe('PaymentFailClient', () => {
  describe('정상 진입 — sessionStorage 토큰 일치', () => {
    beforeEach(() => {
      sessionStorage.setItem('paymentFail', 'USER_CANCEL');
    });

    it('"오류 코드: USER_CANCEL"을 포함한 결제 실패 UI를 표시한다', async () => {
      renderComponent();
      await waitFor(() => {
        expect(screen.getByText('오류 코드: USER_CANCEL')).toBeInTheDocument();
      });
    });

    it('검증 즉시 paymentFail을 sessionStorage에서 제거한다', async () => {
      renderComponent();
      await waitFor(() => {
        expect(sessionStorage.getItem('paymentFail')).toBeNull();
      });
    });

    it('popstate 이벤트 발생 시 window.location.replace("/item/1")을 호출한다', async () => {
      renderComponent();
      await waitFor(() =>
        expect(screen.getByText('오류 코드: USER_CANCEL')).toBeInTheDocument(),
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

    it('sessionStorage에 다른 errorCode가 있으면 router.replace("/feed")를 호출한다', async () => {
      sessionStorage.setItem('paymentFail', 'OTHER_ERROR');
      renderComponent();
      await waitFor(() => {
        expect(mockRouter.replace).toHaveBeenCalledWith('/feed');
      });
    });

    it('비정상 진입 시 결제 실패 UI를 렌더링하지 않는다', async () => {
      renderComponent();
      await waitFor(() => {
        expect(mockRouter.replace).toHaveBeenCalledWith('/feed');
      });
      expect(screen.queryByText('오류 코드: USER_CANCEL')).not.toBeInTheDocument();
    });
  });

  describe('이벤트 리스너 정리 (cleanup)', () => {
    it('컴포넌트 언마운트 후 popstate가 발생해도 window.location.replace를 호출하지 않는다', async () => {
      sessionStorage.setItem('paymentFail', 'USER_CANCEL');
      const { unmount } = renderComponent();
      await waitFor(() =>
        expect(screen.getByText('오류 코드: USER_CANCEL')).toBeInTheDocument(),
      );
      unmount();
      window.dispatchEvent(new PopStateEvent('popstate'));
      expect(window.location.replace).not.toHaveBeenCalled();
    });
  });
});
