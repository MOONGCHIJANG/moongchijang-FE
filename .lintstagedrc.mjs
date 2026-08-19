// ESLint flat config는 파일별로 가장 가까운 config를 찾지 않고 CWD 기준으로만
// 찾기 때문에, 저장소 루트에서 한 번에 eslint를 돌리면 apps/web·apps/admin의
// eslint-config-next(react-hooks, @next/next 플러그인)를 못 찾아 오탐이 난다.
// 그래서 워크스페이스별로 `pnpm --filter <pkg> exec eslint`를 통해 그 패키지
// 자신의 설정으로 검사하도록 나눈다.
const eslintFor = (pkg) => (files) =>
  `pnpm --filter ${pkg} exec eslint --fix ${files.join(' ')}`;

export default {
  'apps/web/**/*.{js,jsx,ts,tsx}': [
    eslintFor('@moongchijang/web'),
    'prettier --cache --write',
  ],
  'apps/admin/**/*.{js,jsx,ts,tsx}': [
    eslintFor('@moongchijang/admin'),
    'prettier --cache --write',
  ],
  'packages/api-client/**/*.{js,jsx,ts,tsx}': [
    eslintFor('@moongchijang/api-client'),
    'prettier --cache --write',
  ],
  'packages/ui/**/*.{js,jsx,ts,tsx}': [
    eslintFor('@moongchijang/ui'),
    'prettier --cache --write',
  ],
  '*.{css,md,json,yaml}': 'prettier --cache --write',
};
