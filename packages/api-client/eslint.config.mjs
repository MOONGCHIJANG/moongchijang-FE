import { defineConfig, globalIgnores } from 'eslint/config';
import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import prettier from 'eslint-config-prettier';

const eslintConfig = defineConfig([
  js.configs.recommended,
  ...tseslint.configs.recommended,
  prettier,
  globalIgnores([
    'src/generated/**',
    'src/zod/**',
    'src/hooks/**',
    'src/mock-data/**',
  ]),
]);

export default eslintConfig;
