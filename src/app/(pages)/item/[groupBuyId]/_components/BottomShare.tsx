'use client';
import React, { useState, useCallback } from 'react';
import ShareButtonItem from './ShareButtonItem';
import { BottomSheet } from '@/components/BottomSheet';
import { ToastBlack } from '@/components/ToastBlack';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://moongchijang.com';
const DEFAULT_OG_IMAGE = `${SITE_URL}/og/og-1200x630.png`;
const TOAST_DURATION_MS = 2_000;

type BottomShareProps = {
  open?: boolean;
  onClose?: () => void;
  groupBuyId: number;
  productName: string;
  imageUrl?: string;
  description?: string;
};

const BottomShare = ({
  open = false,
  onClose,
  groupBuyId,
  productName,
  imageUrl,
  description,
}: BottomShareProps) => {
  const [toastMessage, setToastMessage] = useState('');
  const [toastVisible, setToastVisible] = useState(false);

  const showToast = useCallback(
    (message: string) => {
      onClose?.();
      setTimeout(() => {
        setToastMessage(message);
        setToastVisible(true);
        setTimeout(() => setToastVisible(false), TOAST_DURATION_MS);
      }, 200); // 바텀시트 닫힘 애니메이션 후 toast 노출
    },
    [onClose],
  );

  const pageUrl = `${SITE_URL}/item/${groupBuyId}`;
  const shareText = `[뭉치장] ${productName} 공구 같이 뭉쳐서 구매하자!`;

  // Kakao Share는 절대 URL만 허용 — 상대경로 방어
  const kakaoImageUrl = imageUrl?.startsWith('http')
    ? imageUrl
    : DEFAULT_OG_IMAGE;

  const handleX = () => {
    const url = `https://twitter.com/intent/tweet?url=${encodeURIComponent(pageUrl)}&text=${encodeURIComponent(shareText)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleInstagram = async () => {
    try {
      await navigator.clipboard.writeText(pageUrl);
      showToast('링크가 복사됐어요. 인스타그램에 붙여넣기 해보세요!');
    } catch {
      showToast('링크 복사에 실패했어요. 직접 복사해주세요.');
    }
  };

  const handleKakao = async () => {
    if (!window.Kakao?.isInitialized()) {
      try {
        await navigator.clipboard.writeText(pageUrl);
        showToast('링크가 복사됐어요. 카카오톡에 붙여넣기 해보세요!');
      } catch {
        showToast('링크 복사에 실패했어요. 직접 복사해주세요.');
      }
      return;
    }
    window.Kakao.Share.sendDefault({
      objectType: 'feed',
      content: {
        title: shareText,
        description: description ?? '뭉치장에서 공구에 참여해보세요!',
        imageUrl: kakaoImageUrl,
        link: { webUrl: pageUrl, mobileWebUrl: pageUrl },
      },
      buttons: [
        {
          title: '공구 보러가기',
          link: { webUrl: pageUrl, mobileWebUrl: pageUrl },
        },
      ],
    });
  };

  const handleEtc = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title: shareText, url: pageUrl });
      } catch (e) {
        // 사용자가 공유를 취소한 경우(AbortError)는 무시
        if (e instanceof Error && e.name !== 'AbortError') {
          showToast('공유에 실패했어요.');
        }
      }
    } else {
      try {
        await navigator.clipboard.writeText(pageUrl);
        showToast('링크가 복사됐어요!');
      } catch {
        showToast('링크 복사에 실패했어요. 직접 복사해주세요.');
      }
    }
  };

  return (
    <>
      <BottomSheet isOpen={open} onClose={onClose ?? (() => {})}>
        <div className="px-p10 pt-p8 pb-p8 flex justify-between items-center">
          <ShareButtonItem platform="kakao" onClick={handleKakao} />
          <ShareButtonItem platform="instagram" onClick={handleInstagram} />
          <ShareButtonItem platform="x" onClick={handleX} />
          <ShareButtonItem platform="etc" onClick={handleEtc} />
        </div>
      </BottomSheet>
      <div className="fixed bottom-24 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none mx-auto max-w-110">
        <ToastBlack message={toastMessage} isVisible={toastVisible} />
      </div>
    </>
  );
};

export default BottomShare;
