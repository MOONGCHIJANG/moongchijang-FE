import express from 'express';
import cors from 'cors';
import { createMiddleware } from '@mswjs/http-middleware';
import type { RequestHandler } from 'msw';

/**
 * MSW 핸들러를 Express 서버로 감싸 실행하는 공통 부트스트랩.
 * apps/web, apps/admin의 mocks/dev-server.ts가 각자의 handlers만 넘겨 재사용한다.
 */
export function createMockServer(
  handlers: RequestHandler[],
  port: number,
  label: string,
) {
  const app = express();

  app.use(
    cors({
      origin: /^http:\/\/localhost:\d+$/,
      credentials: true,
    }),
  );
  app.use(express.json());
  app.use((req, _res, next) => {
    console.log(`[${label}] ${req.method} ${req.path}`);
    next();
  });

  app.use(createMiddleware(...handlers));

  app.listen(port, () => {
    console.log(`[${label}] Server running on http://localhost:${port}`);
    console.log(`[${label}] ${handlers.length}개 엔드포인트 등록됨`);
  });
}
