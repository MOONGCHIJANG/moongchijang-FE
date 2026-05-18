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
      // 조건: redirect 페이지가 sessionStorage에 errorCode를 저장한 뒤 정상 진입
      renderComponent();
      // 검증: 1회용 토큰 검증 통과 → 결제 실패 UI 렌더링
      await waitFor(() => {
        expect(screen.getByText('오류 코드: USER_CANCEL')).toBeInTheDocument();
      });
    });

    it('검증 즉시 paymentFail을 sessionStorage에서 제거한다', async () => {
      // 조건: 정상 진입
      renderComponent();
      // 검증: 1회용 토큰 소비 — 재진입 방지를 위해 즉시 제거
      await waitFor(() => {
        expect(sessionStorage.getItem('paymentFail')).toBeNull();
      });
    });

    it('popstate 이벤트 발생 시 window.location.replace("/item/1")을 호출한다', async () => {
      // 조건: 정상 진입 후 브라우저 뒤로가기 시도
      renderComponent();
      await waitFor(() =>
        expect(screen.getByText('오류 코드: USER_CANCEL')).toBeInTheDocument(),
      );
      // 뒤로가기 이벤트 발생
      window.dispatchEvent(new PopStateEvent('popstate'));
      // 검증: 결제 실패 페이지에서 뒤로가기 → 상품 상세 페이지로 강제 이동
      expect(window.location.replace).toHaveBeenCalledWith('/item/1');
    });
  });

  describe('비정상 진입 — sessionStorage 토큰 불일치·부재', () => {
    it('sessionStorage에 값이 없으면 router.replace("/feed")를 호출한다', async () => {
      // 조건: redirect를 거치지 않고 URL을 직접 입력한 경우 (sessionStorage 없음)
      renderComponent();
      // 검증: 1회용 토큰 없음 → 피드로 리다이렉트
      await waitFor(() => {
        expect(mockRouter.replace).toHaveBeenCalledWith('/feed');
      });
    });

    it('sessionStorage에 다른 errorCode가 있으면 router.replace("/feed")를 호출한다', async () => {
      // 조건: 다른 결제 건의 토큰이 남아있는 경우 (토큰 불일치)
      sessionStorage.setItem('paymentFail', 'OTHER_ERROR');
      renderComponent();
      // 검증: 토큰 불일치 → 피드로 리다이렉트
      await waitFor(() => {
        expect(mockRouter.replace).toHaveBeenCalledWith('/feed');
      });
    });

    it('비정상 진입 시 결제 실패 UI를 렌더링하지 않는다', async () => {
      // 조건: sessionStorage 없음 (비정상 진입)
      renderComponent();
      await waitFor(() => {
        expect(mockRouter.replace).toHaveBeenCalledWith('/feed');
      });
      // 검증: verified === false → UI 미렌더링
      expect(
        screen.queryByText('오류 코드: USER_CANCEL'),
      ).not.toBeInTheDocument();
    });
  });

  describe('이벤트 리스너 정리 (cleanup)', () => {
    it('컴포넌트 언마운트 후 popstate가 발생해도 window.location.replace를 호출하지 않는다', async () => {
      // 조건: 정상 진입 후 다른 방법으로 페이지 이탈 → 컴포넌트 언마운트
      sessionStorage.setItem('paymentFail', 'USER_CANCEL');
      const { unmount } = renderComponent();
      await waitFor(() =>
        expect(screen.getByText('오류 코드: USER_CANCEL')).toBeInTheDocument(),
      );
      // 언마운트 후 popstate 발생
      unmount();
      window.dispatchEvent(new PopStateEvent('popstate'));
      // 검증: 이벤트 리스너 cleanup → 언마운트 후 popstate 무시
      expect(window.location.replace).not.toHaveBeenCalled();
    });
  });
});
