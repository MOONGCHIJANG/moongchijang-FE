/**
 * MSW 개발용 mock 서버
 *
 * handlers.ts에 정의된 핸들러를 Express 서버에 연결하여
 * 실제 HTTP 서버로 동작합니다. (기본 포트: 9090)
 *
 * - 서버 컴포넌트(SSR)와 클라이언트 컴포넌트 모두 이 서버로 API 요청을 보냅니다.
 * - `pnpm dev:mock` 실행 시 Next.js 서버와 함께 자동으로 시작됩니다.
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
  console.log(`[MSW] ${req.method} ${req.path}`);
  next();
});

app.use(createMiddleware(...handlers));

app.listen(PORT, () => {
  console.log(`[MSW] Mock server running on http://localhost:${PORT}`);
});
