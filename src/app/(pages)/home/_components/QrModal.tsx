'use client';

import { useState, useEffect, useRef } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { Icon } from '@iconify/react';
import { cn } from '@/lib/utils';
import { Toggle } from '@/components/Toggle';

interface QrModalProps {
  isOpen: boolean;
  onClose: () => void;
  isPickupDay: boolean;
  orderNumber: string;
  pickupLocation: string;
  pickupTime: string;
  storeName: string;
  qrValue: string;
  dDayText: string;
  shakeEnabled: boolean;
  onShakeToggle: (enabled: boolean) => void;
}

export const QrModal = ({
  isOpen,
  onClose,
  isPickupDay,
  orderNumber,
  pickupLocation,
  pickupTime,
  storeName,
  qrValue,
  dDayText,
  shakeEnabled,
  onShakeToggle,
}: QrModalProps) => {
  const [animate, setAnimate] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [prevIsOpen, setPrevIsOpen] = useState(isOpen);
  const [dragY, setDragY] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const dragStartY = useRef(0);

  if (prevIsOpen !== isOpen) {
    setPrevIsOpen(isOpen);
    if (!isOpen) {
      setAnimate(false);
      setIsExpanded(false);
    }
  }

  useEffect(() => {
    if (!isOpen) return;
    const timer = setTimeout(() => setAnimate(true), 50);
    return () => clearTimeout(timer);
  }, [isOpen]);

  if (!isOpen) return null;

  const handleClose = () => {
    setAnimate(false);
    setTimeout(onClose, 300);
  };

  const handlePointerDown = (e: React.PointerEvent) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    dragStartY.current = e.clientY;
    setIsDragging(true);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    const delta = Math.max(0, e.clientY - dragStartY.current);
    setDragY(delta);
  };

  const handlePointerUp = () => {
    setIsDragging(false);
    if (dragY > 80) {
      setDragY(500);
      setTimeout(() => {
        setDragY(0);
        onClose();
      }, 300);
    } else {
      setDragY(0);
    }
  };

  return (
    <div
      className={cn(
        'absolute inset-0 z-50 flex flex-col items-center justify-center transition-opacity duration-300 ease-out',
        animate ? 'opacity-100' : 'opacity-0',
      )}
    >
      {/* 배경 딤 + 블러 */}
      <div
        className="absolute inset-0 bg-bg-dim-darkest backdrop-blur-sm"
        onClick={handleClose}
      />

      {/* 카드 + 토글 컨테이너 */}
      <div
        className={cn(
          'relative flex flex-col items-center gap-4',
          isDragging
            ? 'transition-none'
            : 'transition-transform duration-300 ease-out',
          !isDragging && (animate ? 'translate-y-0' : 'translate-y-10'),
        )}
        style={dragY > 0 ? { transform: `translateY(${dragY}px)` } : undefined}
        onClick={(e) => e.stopPropagation()}
      >
        {/* 드래그 핸들 */}
        <div
          className="w-[342px] flex items-center justify-center py-2 cursor-grab active:cursor-grabbing touch-none"
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
        >
          <div className="w-9 h-1 bg-alpha-white-50 rounded-max" />
        </div>

        {/* 메인 카드 */}
        <div className="w-[342px] bg-surface-white rounded-3xlarge shadow-2xl overflow-hidden">
          {/* 헤더 */}
          <div className="bg-surface-default rounded-tl-3xlarge rounded-tr-3xlarge px-5 py-3.5 flex justify-between items-center">
            <span className="text-text-basic text-body-lg-bold font-pretendard">
              픽업 QR코드
            </span>
            <button
              onClick={handleClose}
              className="w-6 h-6 flex items-center justify-center"
            >
              <Icon icon="ic:round-close" className="w-6 h-6 text-text-basic" />
            </button>
          </div>

          {/* 정보 섹션 */}
          <div
            className={cn(
              'flex flex-col overflow-hidden transition-all duration-300 origin-top',
              isExpanded ? 'max-h-0 opacity-0' : 'max-h-[500px] opacity-100',
            )}
          >
            <div className="px-5 pt-4 pb-5 flex flex-col gap-3.5 border-b border-dashed border-border-default">
              <div className="flex items-center gap-2">
                <span className="bg-brand-primary text-text-basic-inverse text-caption1 font-bold font-pretendard w-[41px] h-5 flex items-center justify-center rounded-max">
                  {dDayText}
                </span>
                <span className="text-text-basic text-heading-sm-bold font-pretendard">
                  {storeName}
                </span>
              </div>

              <div className="flex flex-col gap-2">
                <div className="flex justify-between items-center">
                  <span className="text-text-basic text-body-sm-bold font-pretendard">
                    예약 번호
                  </span>
                  <span className="text-text-subtle text-body-sm-regular font-pretendard">
                    {orderNumber}
                  </span>
                </div>
                <div className="flex justify-between items-start gap-4">
                  <span className="text-text-basic text-body-sm-bold font-pretendard shrink-0">
                    픽업 장소
                  </span>
                  <span className="text-text-subtle text-body-sm-regular font-pretendard text-right break-keep">
                    {pickupLocation.split('\n').map((line, i, arr) => (
                      <span key={i}>
                        {line}
                        {i < arr.length - 1 && <br />}
                      </span>
                    ))}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-text-basic text-body-sm-bold font-pretendard">
                    픽업 일시
                  </span>
                  <span className="text-text-subtle text-body-sm-regular font-pretendard">
                    {pickupTime}
                  </span>
                </div>
              </div>

              <button className="self-end bg-surface-brand-lighter text-text-brand text-caption1 font-bold font-pretendard w-[90px] h-7 flex items-center justify-center rounded-xlarge">
                자세히 보기 →
              </button>
            </div>
          </div>

          {/* QR 코드 섹션 */}
          <div className="px-5 py-6 flex flex-col items-center gap-3">
            <div
              className={cn(
                'relative flex items-center justify-center',
                isPickupDay ? 'cursor-pointer' : 'cursor-not-allowed',
              )}
              onClick={() => isPickupDay && setIsExpanded(!isExpanded)}
            >
              <div
                className={cn(
                  'transition-all duration-500',
                  !isPickupDay && 'blur-sm opacity-70',
                )}
              >
                <QRCodeSVG value={qrValue} size={isExpanded ? 220 : 128} />
              </div>
              {!isPickupDay && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <Icon
                    icon="majesticons:lock"
                    className="w-10 h-10 text-icon-basic"
                  />
                </div>
              )}
            </div>

            <p
              className={cn(
                'text-text-subtle text-caption1 font-bold font-pretendard text-center transition-all duration-300 overflow-hidden',
                isExpanded ? 'max-h-0 opacity-0' : 'max-h-10 opacity-100',
              )}
            >
              {isPickupDay
                ? 'QR코드를 클릭하면 크게 볼 수 있어요'
                : '픽업일이 되면 QR코드가 활성화돼요'}
            </p>
          </div>
        </div>

        {/* 흔들기 토글 바 */}
        <div className="flex items-center gap-2 bg-bg-dim-darker rounded-max px-5 py-2.5">
          <span className="text-text-basic-inverse text-caption-sm-medium font-pretendard">
            흔들어서 큐알 화면 열기
          </span>
          <Toggle checked={shakeEnabled} onChange={onShakeToggle} size="sm" />
        </div>
      </div>
    </div>
  );
};
