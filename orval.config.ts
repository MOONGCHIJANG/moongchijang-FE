import { defineConfig } from 'orval';
import dotenv from 'dotenv';

dotenv.config();

// 생성 파일 상단에 주입할 헤더 (ESLint 검사 비활성화)
const generatedFileHeader = [
  '/* eslint-disable */',
  '// 이 파일은 Orval이 자동 생성합니다. 직접 수정하지 마세요.',
];

export default defineConfig({
  'fetch-api': {
    input: {
      target: process.env.SWAGGER_URL || 'http://localhost:8080/openapi.yaml',
    },
    output: {
      mode: 'tags-split',
      target: './src/api/generated',
      client: 'fetch',
      mock: true,
      clean: true,
      override: {
        header: () => generatedFileHeader,
        mutator: {
          path: './src/lib/custom-fetch.ts',
          name: 'customFetch',
        },
      },
    },
  },
  'zod-api': {
    input: {
      target: process.env.SWAGGER_URL || 'http://localhost:8080/openapi.yaml',
    },
    output: {
      mode: 'tags-split',
      client: 'zod',
      target: './src/api/zod',
      formatter: 'prettier',
      clean: true,
      override: {
        header: () => generatedFileHeader,
      },
    },
  },
});
