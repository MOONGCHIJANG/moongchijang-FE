/**
 * 개발용 mock 서버 (포트: 9090)
 *
 * - `pnpm dev:mock` 실행 시 Next.js 서버와 함께 자동으로 시작됩니다.
 * - 엔드포인트 추가/수정은 mocks/handlers.ts 에서 합니다.
 */

import express from 'express';
import cors from 'cors';
import { createMiddleware } from '@mswjs/http-middleware';
import { handlers } from './handlers';

const app = express();
const PORT = 9090;

app.use(cors({ origin: /^http:\/\/localhost:\d+$/ }));
app.use(express.json());
app.use((req, _res, next) => {
  console.log(`[Mock] ${req.method} ${req.path}`);
  next();
});

app.use(createMiddleware(...handlers));

app.listen(PORT, () => {
  console.log(`[Mock] Server running on http://localhost:${PORT}`);
  console.log(`[Mock] ${handlers.length}개 엔드포인트 등록됨`);
});
