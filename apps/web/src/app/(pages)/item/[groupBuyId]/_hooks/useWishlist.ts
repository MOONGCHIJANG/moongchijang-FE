'use client';

import { useRef, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import {
  postApiV1GroupBuysGroupBuyIdWishlist,
  deleteApiV1GroupBuysGroupBuyIdWishlist,
} from '@moongchijang/api-client/generated/wishlist/wishlist';
import type { ApiResponseGroupBuyDetailResponseData } from '@moongchijang/api-client/generated/api.schemas';
import { logEvent } from '@/lib/analytics';

const TOAST_DURATION = 3_500;

/**
 * 상품 찜 상태 + 토글 + 실패 토스트 메시지
 * (바텀시트 하트 버튼, '찜하고 알림 받기' 버튼에서 공통 사용)
 */
export const useWishlist = (data: ApiResponseGroupBuyDetailResponseData) => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const [liked, setLiked] = useState(data.isWishlisted);
  const [isPending, setIsPending] = useState(false);
  // 같은 렌더 안의 연속 클릭까지 막기 위해 ref 로도 가드
  const pendingRef = useRef(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(null), TOAST_DURATION);
  };

  const toggleWishlist = async () => {
    // 이전 요청이 끝나기 전 재클릭은 무시 (중첩 요청 시 화면·서버 상태 불일치 방지)
    if (pendingRef.current) return;
    pendingRef.current = true;
    setIsPending(true);

    const next = !liked;
    setLiked(next);
    if (next) {
      logEvent('add_to_wishlist', {
        item_id: data.id,
        item_name: data.productName,
        store_name: data.storeName,
      });
    }

    try {
      const result = next
        ? await postApiV1GroupBuysGroupBuyIdWishlist(data.id)
        : await deleteApiV1GroupBuysGroupBuyIdWishlist(data.id);

      const status = result.status as number;
      if (status < 200 || status >= 300) {
        setLiked(!next);
        showToast(
          status === 401 || status === 403
            ? '로그인 후에 이용해주세요.'
            : '오류가 발생했습니다. 다시 시도해주세요.',
        );
        return;
      }
      queryClient.invalidateQueries({ queryKey: ['/api/v1/wishlists'] });
      router.refresh();
    } catch {
      setLiked(!next);
      showToast('로그인 후에 이용해주세요.');
    } finally {
      pendingRef.current = false;
      setIsPending(false);
    }
  };

  return { liked, isPending, toggleWishlist, toastMessage };
};
