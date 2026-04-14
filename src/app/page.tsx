import { serverFetch } from '@/lib/fetcher';
import { PendingApiError } from '@/lib/static-registry';
import type { ExampleResponse } from '@mocks/data/example';

// 빌드 타임 사전 렌더링을 막고 요청마다 서버에서 렌더링
// (mock 모드에선 Express, static 에선 레지스트리, real 에선 실서버로 요청이 나감)
export const dynamic = 'force-dynamic';

async function loadExample(): Promise<ExampleResponse | { pending: true }> {
  try {
    return await serverFetch<ExampleResponse>('/api/example');
  } catch (error) {
    if (error instanceof PendingApiError) return { pending: true };
    throw error;
  }
}

export default async function Home() {
  const result = await loadExample();
  const body = 'pending' in result ? '🚧 아직 개발 중입니다' : result.message;

  return (
    <div>
      <div>초기세팅</div>
      {body}
    </div>
  );
}
