import { defineConfig, globalIgnores } from 'eslint/config';
import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import prettier from 'eslint-config-prettier';

// lint-staged(pre-commit)가 저장소 루트에서 실행되기 때문에 필요한 최소 루트 설정.
// ESLint 9 flat config는 CWD 기준으로 config를 찾기 때문에 루트에도 하나가 있어야 한다.
// Next.js 관련 규칙을 포함한 실제 린트는 각 워크스페이스의 `turbo run lint`(CI)가 담당한다.
const eslintConfig = defineConfig([
  js.configs.recommended,
  ...tseslint.configs.recommended,
  prettier,
  globalIgnores([
    '**/.next/**',
    '**/dist/**',
    '**/out/**',
    '**/build/**',
    '**/node_modules/**',
    '**/*.d.ts',
    '**/generated/**',
    '**/zod/**',
    // CommonJS 설정 파일(next.config.js 등)은 각 워크스페이스의
    // eslint-config-next가 적절한 env로 검사하므로 루트 최소 설정에서는 제외
    '**/*.config.js',
    '**/*.config.cjs',
  ]),
]);

export default eslintConfig;
