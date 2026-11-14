'use client';

import { Button } from '@moongchijang/ui';
import type { ApiResponseGroupBuyDetailResponseData } from '@moongchijang/api-client/generated/api.schemas';
import { ToastBlack } from '@/components/ToastBlack';
import { SvgIcon } from '@/components/SvgIcon';
import { useWishlist } from '../_hooks/useWishlist';

interface Props {
  data: ApiResponseGroupBuyDetailResponseData;
}

/**
 * 주문 불가 상태에서 '찜하고 알림 받기'를 유도하는 카드
 * 찜 완료 후에는 비활성 상태로 고정된다.
 */
const ReopenNotifyCard = ({ data }: Props) => {
  const { liked, toggleWishlist, toastMessage } = useWishlist(data);

  return (
    <div className="flex w-full flex-col gap-g2 p-p5 rounded-xlarge border border-border-subtle bg-surface-white">
      <p className="body-sm-bold text-text-basic">다시 열리면 알려드릴까요?</p>
      <p className="pb-1.5 caption-sm-regular text-text-tertiary">
        찜해두면 주문이 가능해질 때 알림을 보내드려요
      </p>
      <Button
        variant="brand-soft"
        size="sm"
        fullWidth
        disabled={liked}
        onClick={toggleWishlist}
        className="gap-g1 px-p5 rounded-xlarge border border-border-brand cursor-pointer disabled:border-transparent"
      >
        <SvgIcon src="/icons/heart-fill.svg" size={16} />
        {liked ? '알림 신청 완료' : '찜하고 알림 받기'}
      </Button>
      {toastMessage && (
        <div className="fixed bottom-30 left-4 right-4 z-50 flex justify-center">
          <ToastBlack
            message={toastMessage}
            isVisible
            icon="cuida:alert-outline"
          />
        </div>
      )}
    </div>
  );
};

export default ReopenNotifyCard;
