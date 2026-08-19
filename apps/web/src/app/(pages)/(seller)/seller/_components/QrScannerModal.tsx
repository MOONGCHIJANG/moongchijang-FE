'use client';

import { useEffect, useRef, useState } from 'react';
import { Icon } from '@iconify/react';
import { cn } from '@/lib/utils';
import { useQrScanner } from '@/hooks/useQrScanner';

export type ScanToastItem = {
  id: string;
  type: 'success' | 'error';
  title: string;
  subtitle: string;
  visible: boolean;
};

interface QrScannerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onScan: (result: string) => void;
  toasts?: ScanToastItem[];
}

const SAME_QR_COOLDOWN_MS = 3000;
const CAMERA_RESTART_MS = 300;

export function QrScannerModal({
  isOpen,
  onClose,
  onScan,
  toasts = [],
}: QrScannerModalProps) {
  // 동일 QR 중복 스캔 방지 — timeout 기반 쿨다운
  const lastScannedCodeRef = useRef<string | null>(null);
  const cooldownTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // 카메라 재개 타이머
  const resumeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [pendingResume, setPendingResume] = useState(false);

  const clearResume = () => {
    if (resumeTimerRef.current) {
      clearTimeout(resumeTimerRef.current);
      resumeTimerRef.current = null;
    }
    setPendingResume(false);
  };

  useEffect(() => {
    return () => {
      if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
      if (cooldownTimerRef.current) clearTimeout(cooldownTimerRef.current);
    };
  }, []);

  const { videoRef, isScanning, start, stop } = useQrScanner({
    onScan: (result) => {
      // 쿨다운 중인 동일 QR은 무시
      if (lastScannedCodeRef.current === result && cooldownTimerRef.current) {
        return;
      }

      // 쿨다운 설정
      lastScannedCodeRef.current = result;
      if (cooldownTimerRef.current) clearTimeout(cooldownTimerRef.current);
      cooldownTimerRef.current = setTimeout(() => {
        lastScannedCodeRef.current = null;
        cooldownTimerRef.current = null;
      }, SAME_QR_COOLDOWN_MS);

      stop();
      onScan(result);
      setPendingResume(true);
      clearResume();
      resumeTimerRef.current = setTimeout(() => {
        setPendingResume(false);
        resumeTimerRef.current = null;
        start();
      }, CAMERA_RESTART_MS);
    },
  });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-y-0 left-1/2 z-50 flex w-full max-w-110 -translate-x-1/2 flex-col bg-black">
      {/* 헤더 */}
      <div className="flex items-center justify-between px-4 py-3">
        <span className="body-md-bold text-white">QR 코드 스캔</span>
        <button
          type="button"
          onClick={() => {
            clearResume();
            stop();
            onClose();
          }}
          className="flex h-8 w-8 items-center justify-center"
        >
          <Icon icon="ic:round-close" className="h-6 w-6 text-white" />
        </button>
      </div>

      {/* 카메라 영역 */}
      <div className="relative flex flex-1 items-center justify-center">
        <video
          ref={videoRef}
          className="h-full w-full object-cover"
          muted
          playsInline
        />

        {/* 스캔 가이드 박스 */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="h-56 w-56 rounded-2xl border-2 border-white opacity-60" />
        </div>

        {/* 픽업 결과 토스트 스택 — 아래에서 위로 쌓임 */}
        {toasts.length > 0 && (
          <div className="absolute bottom-4 left-4 right-4 flex flex-col-reverse gap-2">
            {toasts.map((toast) => (
              <div
                key={toast.id}
                className={cn(
                  'flex items-center gap-3 rounded-2xl px-4 py-3 transition-opacity duration-300',
                  toast.type === 'success'
                    ? 'bg-success-50'
                    : 'bg-surface-info',
                  toast.visible ? 'opacity-100' : 'opacity-0',
                )}
              >
                <Icon
                  icon={
                    toast.type === 'success'
                      ? 'ic:round-check-circle'
                      : 'lucide:circle-alert'
                  }
                  className={cn(
                    'h-5 w-5 shrink-0',
                    toast.type === 'success'
                      ? 'text-text-success'
                      : 'text-white',
                  )}
                />
                <div className="min-w-0">
                  <p
                    className={cn(
                      'body-sm-bold',
                      toast.type === 'success'
                        ? 'text-text-basic'
                        : 'text-white',
                    )}
                  >
                    {toast.title}
                  </p>
                  {toast.subtitle && (
                    <p
                      className={cn(
                        'caption-xs-regular truncate',
                        toast.type === 'success'
                          ? 'text-text-tertiary'
                          : 'text-white opacity-80',
                      )}
                    >
                      {toast.subtitle}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 하단 안내 */}
      <div className="flex flex-col items-center gap-4 px-4 py-8">
        <p className="body-sm-regular text-white opacity-70">
          QR 코드를 박스 안에 맞춰주세요
        </p>
        {!isScanning && !pendingResume && (
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
