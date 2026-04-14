/**
 * /api/example 응답 데이터
 *
 * 로컬: mocks/handlers/example.ts 가 Express 응답으로 사용
 * 배포(static): src/lib/static-registry.ts 가 dynamic import 로 사용
 */

export type ExampleResponse = {
  message: string;
};

export const exampleData: ExampleResponse = {
  message: '배포 및 MSW 설정 확인 중이에요!',
};
