export const getKakaoAuthUrl = () =>
  `https://kauth.kakao.com/oauth/authorize` +
  `?client_id=${process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID}` +
  `&redirect_uri=${encodeURIComponent(process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI ?? '')}` +
  `&response_type=code`;
