import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: '뭉치장',
    short_name: '뭉치장',
    description: '동네 공구 플랫폼 뭉치장에서 주변 공구를 찾아보세요.',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#ffffff',
    icons: [
      {
        src: '/favicon/android-icon-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/favicon/android-icon-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  };
}
