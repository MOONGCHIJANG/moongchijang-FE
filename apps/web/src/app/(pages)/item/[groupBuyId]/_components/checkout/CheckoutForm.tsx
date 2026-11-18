'use client';
import NumStepper from '@/components/NumStepper';
import Image from 'next/image';

type Props = {
  quantity: number;
  onQuantityChange: (value: number) => void;
  /** 기본 1. 혼자 사기는 전체 최소 수량(targetQuantity) */
  minQuantity?: number;
  maxQuantity: number | null;
  /** 진입 시 스테퍼 아래 한 번 띄울 안내 */
  quantityNotice?: string;
  productName: string;
  productAmount: number;
  feeAmount: number;
  totalAmount: number;
  /** 없으면(null·빈 문자열) 회색 자리 표시 */
  productImage?: string | null;
};

/** 상품·수량 카드 + 결제 금액 카드 (참여하기 / 혼자 사기 결제 공통) */
const CheckoutForm = ({
  quantity,
  onQuantityChange,
  minQuantity,
  maxQuantity,
  quantityNotice,
  productName,
  productAmount,
  feeAmount,
  totalAmount,
  productImage,
}: Props) => {
  return (
    <div className="flex flex-col gap-3 pt-3">
      {/* 상품 카드 */}
      <div className="rounded-2xlarge bg-surface-white border border-border-subtle p-p5 flex items-center justify-between">
        <div className="flex gap-g4 items-center">
          {productImage ? (
            <Image
              src={productImage}
              alt="상품 이미지"
              width={60}
              height={60}
              className="w-15 h-15 rounded-xlarge bg-gray-200 object-cover"
            />
          ) : (
            // 썸네일이 없으면 같은 크기의 회색 자리만 표시
            <div className="w-15 h-15 shrink-0 rounded-xlarge bg-gray-200" />
          )}
          <div className="flex flex-col gap-g2">
            <p className="body-md-bold">{productName}</p>
            <p className="caption-sm-regular">
              {(productAmount / quantity).toLocaleString()}원
            </p>
          </div>
        </div>
        <NumStepper
          min={minQuantity}
          max={maxQuantity}
          initialNotice={quantityNotice}
          value={quantity}
          onChange={onQuantityChange}
        />
      </div>
      {/* 결제 금액 */}
      <div className="rounded-2xlarge bg-surface-white border border-border-subtle p-p5 flex flex-col gap-g4">
        <p className="heading-md-bold">결제 금액</p>
        <div className="flex flex-col gap-g5">
          <div className="flex flex-col divide-y divide-dashed divide-border-subtle border-b border-b-border-focus body-md-semibold">
            <div className="flex justify-between py-p4">
              <p className="w-15">상품 금액</p>
              <p className="text-text-tertiary">
                {productAmount.toLocaleString()}원
              </p>
            </div>
            <div className="flex justify-between py-p4">
              <div className="flex gap-g4 items-center">
                <p>수수료</p>
                <div className="px-g3 py-g1 rounded-small bg-surface-brand-lighter text-text-brand caption-xs-bold">
                  뭉치장은 수수료 0%
                </div>
              </div>
              <p className="text-text-tertiary">
                {(feeAmount * quantity).toLocaleString()}원
              </p>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <p className="heading-sm-bold">최종 결제</p>
            <p className="heading-lg-bold text-text-brand">
              {totalAmount.toLocaleString()}원
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutForm;
