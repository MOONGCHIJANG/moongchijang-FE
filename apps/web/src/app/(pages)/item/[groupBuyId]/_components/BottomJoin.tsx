'use client';
import { Button } from '@moongchijang/ui';
import { Icon } from '@iconify/react';
import { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import {
  postApiV1GroupBuysGroupBuyIdWishlist,
  deleteApiV1GroupBuysGroupBuyIdWishlist,
} from '@moongchijang/api-client/generated/wishlist/wishlist';
import { ApiResponseGroupBuyDetailResponseData } from '@moongchijang/api-client/generated/api.schemas';
import { useRouter } from 'next/navigation';
import { logEvent } from '@/lib/analytics';
import { ToastBlack } from '@/components/ToastBlack';

interface Props {
  data: ApiResponseGroupBuyDetailResponseData;
}

const BottomJoin = ({ data }: Props) => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const [liked, setLiked] = useState(data.isWishlisted);

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleWishlist = async () => {
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

      const isSuccess =
        (result.status as number) >= 200 && (result.status as number) < 300;
      if (!isSuccess) {
        setLiked(!next);
        if (
          (result.status as number) === 401 ||
          (result.status as number) === 403
        ) {
          setToastMessage('로그인 후에 이용해주세요.');
        } else {
          setToastMessage('오류가 발생했습니다. 다시 시도해주세요.');
        }
        setTimeout(() => setToastMessage(null), 3_500);
        return;
      }
      queryClient.invalidateQueries({ queryKey: ['/api/v1/wishlists'] });
      router.refresh();
    } catch {
      setLiked(!next);
      setToastMessage('로그인 후에 이용해주세요.');
      setTimeout(() => setToastMessage(null), 3_500);
    }
  };

  const handleJoin = () => {
    logEvent('group_buy_join_click', {
      item_id: data.id,
      item_name: data.productName,
    });
    router.push(`/item/${data.id}/join`);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-10 mx-auto w-full max-w-110 px-7 py-p6 flex flex-col gap-g3 rounded-t-3xlarge shadow-[0px_-2px_20px_0px_rgba(0,0,0,0.10)] bg-white">
      {/* TODO(함께사기): 1.2.2 [혼자 사기]/[함께 사기] 2버튼 + 판매 불가 상태 안내로 교체 */}
      <div className="flex gap-g4 items-center">
        <button className="w-11 h-11 cursor-pointer" onClick={handleWishlist}>
          <Icon
            icon={liked ? 'solar:heart-bold' : 'solar:heart-outline'}
            className={`w-6 h-6 ${liked ? 'text-icon-primary' : 'text-icon-tertiary'}`}
          />
        </button>
        <Button
          size="md"
          className="w-full text-white cursor-pointer"
          onClick={handleJoin}
        >
          공구 참여하기
        </Button>
      </div>
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
