import { defineConfig } from 'orval';
import dotenv from 'dotenv';

dotenv.config();

export default defineConfig({
  'fetch-api': {
    input: {
      target: process.env.SWAGGER_URL || 'http://localhost:8080/openapi.yaml',
    },
    output: {
      mode: 'single',
      target: './src/api/generated/api.ts',
      client: 'fetch',
      mock: true,
      clean: true,
      override: {
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
    },
  },
});
