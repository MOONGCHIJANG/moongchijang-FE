'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Icon } from '@iconify/react';
import { QrScannerModal } from './QrScannerModal';

type Props = {
  storeName?: string;
};

export function SellerTopBar({ storeName }: Props) {
  const [isQrOpen, setIsQrOpen] = useState(false);

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
        onScan={(result) => {
          console.log('QR 스캔 결과:', result);
        }}
      />
    </>
  );
}
