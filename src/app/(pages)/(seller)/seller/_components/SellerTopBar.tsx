'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Icon } from '@iconify/react';
import { QrScannerModal } from './QrScannerModal';
import { BottomSheet } from '@/components/BottomSheet';
import { ToastBlack } from '@/components/ToastBlack';
import { Button } from '@/components/Button';
import { usePostApiV1PickupsQrCodeVerify } from '@/api/hooks/pickup/pickup';
import type { ApiResponsePickupVerifyData } from '@/api/generated/api.schemas';

type Props = {
  storeName?: string;
};

export function SellerTopBar({ storeName }: Props) {
  const router = useRouter();
  const [isQrOpen, setIsQrOpen] = useState(false);
  const [pickupResult, setPickupResult] =
    useState<ApiResponsePickupVerifyData | null>(null);
  const [toastMessage, setToastMessage] = useState('');
  const [isToastVisible, setIsToastVisible] = useState(false);

  const { mutate: verifyQr } = usePostApiV1PickupsQrCodeVerify();

  const showToast = (message: string) => {
    setToastMessage(message);
    setIsToastVisible(true);
    setTimeout(() => setIsToastVisible(false), 3000);
  };

  const handleScan = (qrCode: string) => {
    verifyQr(
      { qrCode },
      {
        onSuccess: (response) => {
          if (response.status === 200) {
            setPickupResult(response.data.data);
          } else if (response.status === 409) {
            showToast('이미 처리된 픽업입니다.');
          } else if (response.status === 403) {
            showToast('권한이 없는 QR 코드입니다.');
          } else {
            showToast('유효하지 않은 QR 코드입니다.');
          }
        },
      },
    );
  };

  return (
    <>
      <div className="flex w-full items-center justify-between py-3">
        <div className="flex items-center gap-1.5">
          <div className="flex h-6 w-6 items-center justify-center">
            <Image
              src="/icons/icon.svg"
              alt="뭉치장"
              width={24}
              height={24}
              className="h-6 w-6 object-contain"
            />
          </div>
          <span className="heading-sm-medium text-text-basic">
            안녕하세요{storeName ? `, ${storeName}님` : ''}
          </span>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            className="flex h-6 w-6 items-center justify-center"
            aria-label="알림"
            onClick={() => router.push('/seller/notifications')}
          >
            <Icon
              icon="iconamoon:notification"
              className="h-6 w-6 text-text-basic"
            />
          </button>
          <button
            type="button"
            className="flex h-6 w-6 items-center justify-center"
            aria-label="QR 코드"
            onClick={() => setIsQrOpen(true)}
          >
            <Icon
              icon="solar:qr-code-outline"
              className="h-6 w-6 text-text-basic"
            />
          </button>
        </div>
      </div>

      <QrScannerModal
        isOpen={isQrOpen}
        onClose={() => setIsQrOpen(false)}
        onScan={handleScan}
      />

      <BottomSheet
        isOpen={pickupResult !== null}
        onClose={() => setPickupResult(null)}
      >
        {pickupResult && (
          <div className="flex flex-col gap-6 px-5 pb-8 pt-2">
            <div className="flex flex-col items-center gap-3 py-3">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-surface-brand-lighter">
                <Icon
                  icon="ic:round-check-circle"
                  className="h-9 w-9 text-primary-400"
                />
              </div>
              <div className="flex flex-col items-center gap-1">
                <span className="heading-md-bold text-text-basic">픽업 완료!</span>
                <span className="body-sm-regular text-text-tertiary">
                  수령이 정상 처리됐어요
                </span>
              </div>
            </div>

            <div className="overflow-hidden rounded-2xl border border-border-brand-lighter">
              <div className="bg-surface-brand-lighter px-4 py-2.5">
                <span className="caption-xs-bold text-text-brand">픽업 정보</span>
              </div>
              <div className="flex flex-col divide-y divide-border-default bg-white px-4">
                <PickupInfoRow label="구매자" value={pickupResult.userName ?? '-'} />
                <PickupInfoRow label="상품명" value={pickupResult.productName} />
                <PickupInfoRow label="수량" value={`${pickupResult.quantity}개`} />
              </div>
            </div>

            <Button size="lg" fullWidth onClick={() => setPickupResult(null)}>
              확인
            </Button>
          </div>
        )}
      </BottomSheet>

      <div className="fixed bottom-24 left-1/2 z-[200] -translate-x-1/2">
        <ToastBlack message={toastMessage} isVisible={isToastVisible} />
      </div>
    </>
  );
}

function PickupInfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between py-3.5">
      <span className="body-sm-regular text-text-tertiary">{label}</span>
      <span className="body-sm-bold text-text-basic">{value}</span>
    </div>
  );
}
