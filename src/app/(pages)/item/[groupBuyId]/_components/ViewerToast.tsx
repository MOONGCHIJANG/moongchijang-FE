'use client';
import { useEffect, useRef, useState } from 'react';
import Toast from './Toast';
import { usePostApiV1GroupBuysGroupBuyIdViewersHeartbeat } from '@/api/hooks/group-buy/group-buy';

const HEARTBEAT_INTERVAL = 25_000; // 25초

const ViewerToast = ({ groupBuyId }: { groupBuyId: number }) => {
  const [visible, setVisible] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);
  const [viewerCount, setViewerCount] = useState(0);
  const fadeTimerRef = useRef<NodeJS.Timeout | null>(null);
  const hideTimerRef = useRef<NodeJS.Timeout | null>(null);

  const { mutate: heartbeat } =
    usePostApiV1GroupBuysGroupBuyIdViewersHeartbeat();

  const sendHeartbeat = () => {
    heartbeat(
      { groupBuyId },
      {
        onSuccess: (result) => {
          if (result.status !== 200) return;
          const { activeViewerCount, showFomoBadge } = result.data.data;

          if (showFomoBadge) {
            setViewerCount(activeViewerCount);
            setVisible(true);
            setFadeOut(false);

            if (fadeTimerRef.current) clearTimeout(fadeTimerRef.current);
            if (hideTimerRef.current) clearTimeout(hideTimerRef.current);

            fadeTimerRef.current = setTimeout(() => setFadeOut(true), 3_000);
            hideTimerRef.current = setTimeout(() => setVisible(false), 3_500);
          }
        },
      },
    );
  };

  useEffect(() => {
    // 진입 시 즉시 호출
    sendHeartbeat();

    // 주기적 호출
    const interval = setInterval(sendHeartbeat, HEARTBEAT_INTERVAL);

    return () => {
      clearInterval(interval);
      if (fadeTimerRef.current) clearTimeout(fadeTimerRef.current);
      if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
    };
  }, [groupBuyId]);

  if (!visible) return null;

  return (
    <div
      className={`fixed bottom-31 left-1/2 -translate-x-1/2 z-50 transition-opacity duration-500 ${
        fadeOut ? 'opacity-0' : 'opacity-100'
      }`}
    >
      <Toast>지금 {viewerCount}명이 보고있어요</Toast>
    </div>
  );
};

export default ViewerToast;
