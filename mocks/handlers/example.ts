import { http, HttpResponse, delay } from 'msw';

export const exampleHandlers = [
  // 예시: GET /api/example
  http.get('/api/example', async () => {
    await delay(3000);
    return HttpResponse.json({
      message: 'MSW가 성공적으로 작동합니다.',
    });
  }),
];
