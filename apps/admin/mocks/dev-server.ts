/**
 * 개발용 mock 서버 (포트: 9091)
 *
 * - `pnpm dev:admin:mock` 실행 시 Next.js 서버와 함께 자동으로 시작됩니다.
 * - 엔드포인트 추가/수정은 mocks/handlers.ts 에서 합니다.
 */

import { createMockServer } from '@moongchijang/api-client/mock-server';
import { handlers } from './handlers';

createMockServer(handlers, 9091, 'Admin Mock');
