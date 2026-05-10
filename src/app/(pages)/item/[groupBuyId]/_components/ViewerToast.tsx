'use client';
import { useEffect, useState } from 'react';
import Toast from './Toast';

const ViewerToast = ({ count = 0 }: { count?: number }) => {
  // TODO: 실시간 인원 관련 정보 불러오기
  const [visible, setVisible] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const fadeTimer = setTimeout(() => setFadeOut(true), 3_000);
    const hideTimer = setTimeout(() => setVisible(false), 3_500);
    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      className={`fixed bottom-31 left-1/2 -translate-x-1/2 z-50 transition-opacity duration-500 ${
        fadeOut ? 'opacity-0' : 'opacity-100'
      }`}
    >
      <Toast>지금 {count}명이 보고있어요</Toast>
    </div>
  );
};

export default ViewerToast;
