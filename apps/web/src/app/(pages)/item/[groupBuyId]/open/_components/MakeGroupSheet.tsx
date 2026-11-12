'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Button } from '@moongchijang/ui';
import { BottomSheet } from '@/components/BottomSheet';
import { AlertBanner } from '@/components/AlertBanner';
import NumStepper from '@/components/NumStepper';

const SETTLEMENT_NOTICE = [
  '결제는 구매 가능 수량이 모이면 총대인 내가 한 번에 해요',
  '참여자 몫은 결제 후 계좌이체로 받을 수 있고,',
  '참여자 간 정산에는 뭉치장이 관여하지 않아요',
].join('\n');

interface Props {
  isOpen: boolean;
  onClose: () => void;
  /** 예: '9/23(수) 15:00' */
  pickupLabel: string;
  /** 예: '9/21(월) 23:59' */
  paymentDeadlineLabel: string;
  productName: string;
  price: number;
  /** null 이면 수량 제한 없음 */
  maxQuantity: number | null;
}

const MakeGroupSheet = ({
  isOpen,
  onClose,
  pickupLabel,
  paymentDeadlineLabel,
  productName,
  price,
  maxQuantity,
}: Props) => {
  const [quantity, setQuantity] = useState(1);
  const [agreed, setAgreed] = useState(false);

  // TODO(방 만들기)
  const handleSubmit = () => {};

  return (
    <BottomSheet isOpen={isOpen} onClose={onClose}>
      <div className="flex flex-col gap-g5 pt-p6 pb-g6">
        <div className="flex flex-col gap-g4">
          <div className="flex items-center gap-g3 px-p6">
            <span className="relative size-6 shrink-0 overflow-clip">
              <span className="absolute inset-[8.01%_5%_10.51%_2.5%]">
                <Image src="/icons/cart.svg" alt="" fill />
              </span>
            </span>
            <p className="heading-lg-bold text-black">
              함께 사기 방을 만들어요
            </p>
          </div>

          <div className="flex flex-col gap-g3 px-p6">
            <div className="flex items-center justify-between px-p5 py-p3 rounded-xlarge border border-border-subtle">
              <div className="flex flex-col gap-g1">
                <p className="heading-sm-semibold text-text-basic">
                  {pickupLabel} 픽업
                </p>
                <p className="caption-sm-medium text-text-tertiary">
                  결제 마감 {paymentDeadlineLabel}
                </p>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="caption-sm-medium text-text-subtle-inverse cursor-pointer"
              >
                변경
              </button>
            </div>

            <div className="flex flex-col gap-g2">
              <p className="caption-sm-medium text-text-tertiary">
                내가 구매할 수량
              </p>
              <div className="flex items-center justify-between px-p5 py-p3 rounded-xlarge border border-border-subtle">
                <div className="flex flex-col text-text-basic">
                  <p className="caption-sm-medium">{productName}</p>
                  <p className="heading-sm-bold">
                    {(price * quantity).toLocaleString()}원
                  </p>
                </div>
                <NumStepper
                  max={maxQuantity}
                  value={quantity}
                  onChange={setQuantity}
                />
              </div>
            </div>

            <AlertBanner variant="red" text={SETTLEMENT_NOTICE} />
          </div>
        </div>

        <div className="flex flex-col gap-g4 px-p6">
          <button
            type="button"
            role="checkbox"
            aria-checked={agreed}
            onClick={() => setAgreed((prev) => !prev)}
            className="flex h-8 items-center justify-center gap-g2 cursor-pointer"
          >
            <Image
              src={
                agreed ? '/icons/checkbox-on.svg' : '/icons/checkbox-off.svg'
              }
              alt=""
              width={28}
              height={28}
              className="shrink-0"
            />
            <span className="body-sm-regular text-text-subtle">
              재판매·영업 목적이 아니라, 지인과 나눠 사기 위한 방이에요
            </span>
          </button>
          <Button
            variant="black"
            size="lg"
            fullWidth
            disabled={!agreed}
            onClick={handleSubmit}
            className="rounded-2xlarge disabled:bg-button-tertiary-fill-pressed disabled:text-text-basic-inverse"
          >
            뭉쳐서 구매할 방 만들기
          </Button>
        </div>
      </div>
    </BottomSheet>
  );
};

export default MakeGroupSheet;
