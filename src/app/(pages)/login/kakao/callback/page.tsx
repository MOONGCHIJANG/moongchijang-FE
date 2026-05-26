import { Suspense } from 'react';
import KakaoCallbackPage from './_components/KakaoCallbackClient';

export default function Page() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center h-screen">
          <p className="body-md-regular text-text-tertiary">로그인 중...</p>
        </div>
      }
    >
      <KakaoCallbackPage />
    </Suspense>
  );
}
