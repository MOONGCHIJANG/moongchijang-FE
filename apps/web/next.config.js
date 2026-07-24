/** @type {import('next').NextConfig} */
const nextConfig = {
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
