'use client';

import { useRef, useState, useCallback, useEffect } from 'react';
import type QrScannerType from 'qr-scanner';

interface UseQrScannerOptions {
  onScan: (result: string) => void;
  onError?: (error: Error) => void;
}

export function useQrScanner({ onScan, onError }: UseQrScannerOptions) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const scannerRef = useRef<QrScannerType | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [hasCamera, setHasCamera] = useState<boolean | null>(null);

  const stop = useCallback(() => {
    scannerRef.current?.stop();
    scannerRef.current?.destroy();
    scannerRef.current = null;
    setIsScanning(false);
  }, []);

  const start = useCallback(async () => {
    if (!videoRef.current) return;
    try {
      const QrScanner = (await import('qr-scanner')).default;

      const cameraAvailable = await QrScanner.hasCamera();
      setHasCamera(cameraAvailable);
      if (!cameraAvailable) {
        onError?.(new Error('카메라를 찾을 수 없습니다.'));
        return;
      }

      scannerRef.current = new QrScanner(
        videoRef.current,
        (result) => onScan(result.data),
        { returnDetailedScanResult: true, highlightScanRegion: true },
      );

      await scannerRef.current.start();
      setIsScanning(true);
    } catch (e) {
      onError?.(e instanceof Error ? e : new Error('QR 스캐너 오류'));
    }
  }, [onScan, onError]);

  useEffect(() => {
    return () => {
      stop();
    };
  }, [stop]);

  return { videoRef, isScanning, hasCamera, start, stop };
}
