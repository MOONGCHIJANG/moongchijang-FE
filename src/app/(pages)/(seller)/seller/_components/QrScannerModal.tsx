'use client';

import { Icon } from '@iconify/react';
import { useQrScanner } from '@/hooks/useQrScanner';

interface QrScannerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onScan: (result: string) => void;
}

export function QrScannerModal({
  isOpen,
  onClose,
  onScan,
}: QrScannerModalProps) {
  const { videoRef, isScanning, start, stop } = useQrScanner({
    onScan: (result) => {
      stop();
      onScan(result);
      onClose();
    },
  });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-y-0 left-1/2 z-50 flex w-full max-w-110 -translate-x-1/2 flex-col bg-black">
      <div className="flex items-center justify-between px-4 py-3">
        <span className="body-md-bold text-white">QR 코드 스캔</span>
        <button
          type="button"
          onClick={() => {
            stop();
            onClose();
          }}
          className="flex h-8 w-8 items-center justify-center"
        >
          <Icon icon="ic:round-close" className="h-6 w-6 text-white" />
        </button>
      </div>

      <div className="relative flex flex-1 items-center justify-center">
        <video
          ref={videoRef}
          className="h-full w-full object-cover"
          muted
          playsInline
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="h-56 w-56 rounded-2xl border-2 border-white opacity-60" />
        </div>
      </div>

      <div className="flex flex-col items-center gap-4 px-4 py-8">
        <p className="body-sm-regular text-white opacity-70">
          QR 코드를 박스 안에 맞춰주세요
        </p>
        {!isScanning && (
          <button
            type="button"
            onClick={start}
            className="rounded-full bg-white px-8 py-3 body-md-bold text-black"
          >
            스캔 시작
          </button>
        )}
      </div>
    </div>
  );
}
