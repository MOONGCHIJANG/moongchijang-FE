/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  transpilePackages: ['@moongchijang/api-client', '@moongchijang/ui'],
};

module.exports = nextConfig;
