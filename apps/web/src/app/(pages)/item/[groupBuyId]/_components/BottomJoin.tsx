'use client';
import { Button } from '@moongchijang/ui';
import { Icon } from '@iconify/react';
import { useEffect, useState } from 'react';
import { ApiResponseGroupBuyDetailResponseData } from '@moongchijang/api-client/generated/api.schemas';
import { useRouter } from 'next/navigation';
import { logEvent } from '@/lib/analytics';
import { ToastBlack } from '@/components/ToastBlack';
import { ToastTooltip } from '@/components/ToastTooltip';
import { getOrderAvailability } from '../_lib/orderAvailability';
import { useWishlist } from '../_hooks/useWishlist';

interface Props {
  data: ApiResponseGroupBuyDetailResponseData;
}

const BottomJoin = ({ data }: Props) => {
  const router = useRouter();
  const { liked, toggleWishlist, toastMessage } = useWishlist(data);
  const [showGuideToast, setShowGuideToast] = useState(false);

  const { isOrderable, reopenLabel } = getOrderAvailability(data);

  // 진입 시 '같이 사기' 위 안내 토스트를 잠깐 보여줬다가 자연스럽게 숨김
  useEffect(() => {
    if (!isOrderable) return;
    const showTimer = setTimeout(() => setShowGuideToast(true), 300);
    const hideTimer = setTimeout(() => setShowGuideToast(false), 3_300);
    return () => {
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
    };
  }, [isOrderable]);

  // TODO(함께사기): 혼자 사기 / 같이 사기 이동 경로·이벤트가 정해지면 분기
  const handleJoin = () => {
    logEvent('group_buy_join_click', {
      item_id: data.id,
      item_name: data.productName,
    });
    router.push(`/item/${data.id}/join`);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-10 mx-auto w-full max-w-110 p-p6 flex flex-col gap-g3 rounded-t-3xlarge shadow-[0px_-2px_10px_0px_rgba(0,0,0,0.10)] bg-white">
      {isOrderable ? (
        <div className="flex gap-g3 items-center">
          <button
            type="button"
            aria-label={liked ? '찜 해제' : '찜하기'}
            aria-pressed={liked}
            className="flex shrink-0 items-center justify-center w-11 h-11 p-p5 rounded-2xlarge bg-button-white cursor-pointer"
            onClick={toggleWishlist}
          >
            <Icon
              icon={liked ? 'solar:heart-bold' : 'solar:heart-outline'}
              width={20}
              height={20}
              className={liked ? 'text-icon-primary' : 'text-icon-tertiary'}
            />
          </button>
          <Button
            variant="outline"
            size="md"
            className="w-24 shrink-0 rounded-2xlarge text-text-disabled cursor-pointer"
            onClick={handleJoin}
          >
            혼자 사기
          </Button>
          <div className="relative flex-1 min-w-0">
            <div className="pointer-events-none absolute bottom-full left-1/2 mb-2 -translate-x-1/2">
              <ToastTooltip
                variant="dark"
                icon="mdi:hand-clap"
                message="친구랑 뭉쳐서 부담 줄이기"
                isVisible={showGuideToast}
              />
            </div>
            <Button
              size="md"
              fullWidth
              className="rounded-2xlarge cursor-pointer"
              onClick={handleJoin}
            >
              같이 사기
            </Button>
          </div>
        </div>
      ) : (
        <Button
          variant="tertiary"
          size="md"
          fullWidth
          disabled
          className="h-13 flex-col gap-0 rounded-2xlarge"
        >
          <span>지금은 주문할 수 있는 날짜가 없어요</span>
          <span className="caption-sm-regular">{reopenLabel}</span>
        </Button>
      )}
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

export default BottomJoin;
