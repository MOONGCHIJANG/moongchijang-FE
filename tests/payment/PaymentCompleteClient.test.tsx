import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import PaymentCompleteClient from '@/app/(pages)/payment/complete/_components/PaymentCompleteClient';

const mockRouterReplace = vi.fn();
const mockRouterPush = vi.fn();

vi.mock('next/navigation', () => ({
  usePathname: () => '/test-path',
  useRouter: () => ({
    push: mockRouterPush,
    replace: mockRouterReplace,
    prefetch: vi.fn(),
    back: vi.fn(),
  }),
  useSearchParams: () => new URLSearchParams(),
}));

describe('PaymentCompleteClient', () => {
  // 조건: redirect 페이지가 sessionStorage에 participationId를 저장한 뒤 정상 진입한 경우
  // 검증: 1회용 토큰 검증 통과 → 결제 완료 UI 렌더링
  it('sessionStorage에 올바른 participationId가 있으면 결제 완료 화면을 표시한다', async () => {
    sessionStorage.setItem('paymentSuccess', '456');

    render(<PaymentCompleteClient participationId="456" groupBuyId="1" />);

    await waitFor(() => {
      expect(screen.getByText('결제 완료')).toBeInTheDocument();
    });
  });

  // 조건: 정상 진입 후 검증 완료
  // 검증: paymentSuccess는 1회용 토큰이므로 검증 즉시 삭제되어야 함 (재진입 방지)
  it('sessionStorage 검증 성공 후 paymentSuccess 항목을 제거한다', async () => {
    sessionStorage.setItem('paymentSuccess', '456');

    render(<PaymentCompleteClient participationId="456" groupBuyId="1" />);

    await waitFor(() => {
      expect(sessionStorage.getItem('paymentSuccess')).toBeNull();
    });
  });

  // 조건: URL을 직접 입력하거나 새로고침해서 sessionStorage에 토큰이 없는 경우
  // 검증: 비정상 진입으로 판단 → /feed로 강제 리다이렉트
  it('sessionStorage에 paymentSuccess 값이 없으면 router.replace("/feed")를 호출한다', async () => {
    render(<PaymentCompleteClient participationId="456" groupBuyId="1" />);

    await waitFor(() => {
      expect(mockRouterReplace).toHaveBeenCalledWith('/feed');
    });
  });

  // 조건: sessionStorage에 값은 있지만 URL의 participationId와 다른 경우 (다른 결제 세션의 토큰)
  // 검증: 토큰 불일치로 비정상 진입 판단 → /feed로 강제 리다이렉트
  it('sessionStorage에 다른 participationId가 있으면 router.replace("/feed")를 호출한다', async () => {
    sessionStorage.setItem('paymentSuccess', '999');

    render(<PaymentCompleteClient participationId="456" groupBuyId="1" />);

    await waitFor(() => {
      expect(mockRouterReplace).toHaveBeenCalledWith('/feed');
    });
  });

  // 조건: 결제 완료 화면에서 브라우저 뒤로가기 버튼을 누른 경우
  // 검증: popstate 이벤트 → 결제 전 상품 페이지(/item/{groupBuyId})로 강제 이동 (결제 플로우 재진입 방지)
  it('popstate 이벤트 발생 시 window.location.replace("/item/1")을 호출한다', async () => {
    sessionStorage.setItem('paymentSuccess', '456');

    render(<PaymentCompleteClient participationId="456" groupBuyId="1" />);

    await waitFor(() => {
      expect(screen.getByText('결제 완료')).toBeInTheDocument();
    });

    window.dispatchEvent(new PopStateEvent('popstate'));

    expect(window.location.replace).toHaveBeenCalledWith('/item/1');
  });

  // 조건: 결제 완료 화면에서 사용자가 "다른 상품 둘러보기" 버튼을 클릭한 경우
  // 검증: router.push("/feed") 호출 → 피드 페이지로 이동
  it('"다른 상품 둘러보기" 버튼 클릭 시 router.push("/feed")를 호출한다', async () => {
    sessionStorage.setItem('paymentSuccess', '456');

    render(<PaymentCompleteClient participationId="456" groupBuyId="1" />);

    await waitFor(() => {
      expect(
        screen.getByRole('button', { name: '다른 상품 둘러보기' }),
      ).toBeInTheDocument();
    });

    fireEvent.click(screen.getByRole('button', { name: '다른 상품 둘러보기' }));

    expect(mockRouterPush).toHaveBeenCalledWith('/feed');
  });
});
