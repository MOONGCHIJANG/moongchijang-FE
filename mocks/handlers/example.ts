import { http, HttpResponse, delay } from 'msw';
import { exampleData } from '../data/example';

export const exampleHandlers = [
  http.get('/api/example', async () => {
    await delay(3000);
    return HttpResponse.json(exampleData);
  }),
];
