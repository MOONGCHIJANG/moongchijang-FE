/** @type {import('next').NextConfig} */
const nextConfig = {
  // Amplify SSR 배포용: pnpm은 node_modules를 심볼릭 링크로 구성해 Amplify가
  // 런타임 의존성을 못 찾는데(예: 'next' dependency missing 에러), standalone은
  // 필요한 의존성을 실제 파일로 복사한 자체완결 폴더(.next/standalone)를 만든다.
  output: 'standalone',
  transpilePackages: ['@moongchijang/api-client', '@moongchijang/ui'],
  images: {
    unoptimized: process.env.NODE_ENV === 'development',
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'picsum.photos',
      },
      {
        protocol: 'https',
        hostname: '*.moongchijang.com',
      },
      {
        protocol: 'https',
        hostname: 'dkg5euyknlpa.cloudfront.net',
      },
    ],
  },
};

module.exports = nextConfig;
