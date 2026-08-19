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
  const onScanRef = useRef(onScan);
  const onErrorRef = useRef(onError);
  const [isScanning, setIsScanning] = useState(false);
  const [hasCamera, setHasCamera] = useState<boolean | null>(null);

  onScanRef.current = onScan;
  onErrorRef.current = onError;

  const stop = useCallback(() => {
    scannerRef.current?.stop();
    scannerRef.current?.destroy();
    scannerRef.current = null;
    setIsScanning(false);
  }, []);

  const start = useCallback(async () => {
    // 이미 활성 스캐너가 있으면 중복 생성 방지
    if (!videoRef.current || scannerRef.current) return;
    try {
      const QrScanner = (await import('qr-scanner')).default;

      const cameraAvailable = await QrScanner.hasCamera();
      setHasCamera(cameraAvailable);
      if (!cameraAvailable) {
        onErrorRef.current?.(new Error('카메라를 찾을 수 없습니다.'));
        return;
      }

      scannerRef.current = new QrScanner(
        videoRef.current,
        (result) => onScanRef.current(result.data),
        { returnDetailedScanResult: true, highlightScanRegion: false },
      );

      await scannerRef.current.start();
      setIsScanning(true);
    } catch (e) {
      onErrorRef.current?.(
        e instanceof Error ? e : new Error('QR 스캐너 오류'),
      );
    }
  }, []);

  useEffect(() => {
    return () => {
      stop();
    };
  }, [stop]);

  return { videoRef, isScanning, hasCamera, start, stop };
}
