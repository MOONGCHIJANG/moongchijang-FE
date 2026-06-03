'use client';

import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Icon } from '@iconify/react';
import { QrScannerModal, type ScanToastItem } from './QrScannerModal';
import { usePostApiV1PickupsQrCodeVerify } from '@/api/hooks/pickup/pickup';

const TOAST_VISIBLE_MS = 2700;
const TOAST_REMOVE_MS = 3000;

type Props = {
  storeName?: string;
};

export function SellerTopBar({ storeName }: Props) {
  const router = useRouter();
  const [isQrOpen, setIsQrOpen] = useState(false);
  const [toasts, setToasts] = useState<ScanToastItem[]>([]);

  const { mutate: verifyQr } = usePostApiV1PickupsQrCodeVerify();

  const addToast = useCallback(
    (type: ScanToastItem['type'], title: string, subtitle: string) => {
      const id = `${Date.now()}-${Math.random()}`;
      setToasts((prev) => [...prev, { id, type, title, subtitle, visible: true }]);
      setTimeout(() => {
        setToasts((prev) =>
          prev.map((t) => (t.id === id ? { ...t, visible: false } : t)),
        );
      }, TOAST_VISIBLE_MS);
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, TOAST_REMOVE_MS);
    },
    [],
  );

  const handleScan = (qrCode: string) => {
    verifyQr(
      { qrCode },
      {
        onSuccess: (res) => {
          if (res.status === 200) {
            const d = res.data.data;
            addToast(
              'success',
              '픽업 완료',
              `${d.userName ?? '익명'} · ${d.productName} · ${d.quantity}개`,
            );
          } else if (res.status === 409) {
            addToast('error', '이미 처리된 픽업입니다.', '');
          } else if (res.status === 403) {
            addToast('error', '권한이 없는 QR 코드입니다.', '');
          } else {
            addToast('error', '유효하지 않은 QR 코드입니다.', '');
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
        onClose={() => {
          setIsQrOpen(false);
          setToasts([]);
        }}
        onScan={handleScan}
        toasts={toasts}
      />
    </>
  );
}
