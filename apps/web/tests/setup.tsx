import '@testing-library/jest-dom';
import { beforeAll, afterEach, afterAll, vi } from 'vitest';
import { setupServer } from 'msw/node';
import { handlers } from '../mocks/handlers';

export const server = setupServer(...handlers);

beforeAll(() => {
  process.env.NEXT_PUBLIC_API_BASE_URL = 'http://localhost:9090';
  process.env.NEXT_PUBLIC_PORTONE_STORE_ID = 'test-store-id';
  process.env.NEXT_PUBLIC_PORTONE_CHANNEL_KEY = 'test-channel-key';
  server.listen({ onUnhandledRequest: 'error' });
});

afterEach(() => {
  server.resetHandlers();
  vi.clearAllMocks();
  sessionStorage.clear();
});

afterAll(() => server.close());

// crypto.randomUUID 모킹
Object.defineProperty(global, 'crypto', {
  value: {
    randomUUID: () => 'test-uuid-1234-5678',
  },
  writable: true,
});

// window.location 모킹
Object.defineProperty(window, 'location', {
  value: {
    href: '',
    origin: 'http://localhost:3000',
    assign: vi.fn(),
    replace: vi.fn(),
  },
  writable: true,
});

// next/image 모킹
vi.mock('next/image', () => ({
  __esModule: true,
  default: (
    props: React.ImgHTMLAttributes<HTMLImageElement> & { alt: string },
  ) => {
    // eslint-disable-next-line @next/next/no-img-element
    return <img {...props} alt={props.alt} />;
  },
}));

// next/navigation 모킹 (router 호출 검증이 필요한 테스트는 파일 내에서 vi.hoisted로 직접 정의)
vi.mock('next/navigation', () => ({
  usePathname: () => '/test-path',
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    prefetch: vi.fn(),
    back: vi.fn(),
  }),
  useSearchParams: () => new URLSearchParams(),
}));

// @portone/browser-sdk/v2 모킹
vi.mock('@portone/browser-sdk/v2', () => ({
  requestPayment: vi.fn(),
}));
