'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { QRCodeSVG } from 'qrcode.react';
import { Icon } from '@iconify/react';
import { cn } from '@/lib/utils';
import { Toggle } from '@/components/Toggle';
import { QrExpandTooltip } from './QrExpandTooltip';
import { logEvent } from '@/lib/analytics';

interface QrModalProps {
  isOpen: boolean;
  onClose: () => void;
  isPickupDay: boolean;
  hasCandidate: boolean;
  hasMultipleToday: boolean;
  productName: string;
  reservationNumber: string;
  pickupAddress: string;
  pickupTimeStart: string;
  pickupTimeEnd: string;
  qrCode: string;
  dDayText: string;
  shakeEnabled: boolean;
  onShakeToggle: (enabled: boolean) => void;
  onDetailClick: () => void;
  onMultiplePickupClick?: () => void;
}

export const QrModal = ({
  isOpen,
  onClose,
  isPickupDay,
  hasCandidate,
  hasMultipleToday,
  productName,
  reservationNumber,
  pickupAddress,
  pickupTimeStart,
  pickupTimeEnd,
  qrCode,
  dDayText,
  shakeEnabled,
  onShakeToggle,
  onDetailClick,
  onMultiplePickupClick,
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
    document.body.style.overflow = 'hidden';
    logEvent('qr_view', {
      pickup_status: isPickupDay ? 'pickup_day' : 'before_pickup',
    });
    const timer = setTimeout(() => setAnimate(true), 50);
    return () => {
      clearTimeout(timer);
      document.body.style.overflow = '';
    };
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
        'fixed inset-0 z-50 flex flex-col items-center justify-center transition-opacity duration-300 ease-out',
        animate ? 'opacity-100' : 'opacity-0',
      )}
    >
      <div
        className="absolute inset-0 bg-bg-dim-darkest backdrop-blur-sm"
        onClick={handleClose}
      />

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
        <div
          className="w-[280px] flex items-center justify-center py-2 cursor-grab active:cursor-grabbing touch-none"
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
        >
          <div className="w-9 h-1 bg-alpha-white-50 rounded-max" />
        </div>

        <div className="w-[280px] bg-surface-white rounded-3xlarge shadow-2xl overflow-hidden">
          <div className="bg-surface-default rounded-tl-3xlarge rounded-tr-3xlarge px-5 py-3.5 flex justify-between items-center">
            <span className="text-text-basic heading-sm-bold font-pretendard">
              픽업 QR코드
            </span>
            <button
              onClick={handleClose}
              className="w-6 h-6 flex items-center justify-center"
            >
              <Icon icon="ic:round-close" className="w-6 h-6 text-text-basic" />
            </button>
          </div>

          {hasCandidate ? (
            <>
              <div
                className={cn(
                  'flex flex-col overflow-hidden transition-all duration-300 origin-top',
                  isExpanded
                    ? 'max-h-0 opacity-0'
                    : 'max-h-[500px] opacity-100',
                )}
              >
                <div className="px-5 pt-4 pb-5 flex flex-col gap-3.5 border-b border-dashed border-border-default">
                  <div className="flex items-center gap-2">
                    <span className="bg-brand-primary text-text-basic-inverse caption-xs-bold font-pretendard px-2 h-5 flex items-center justify-center rounded-max shrink-0 whitespace-nowrap">
                      {dDayText}
                    </span>
                    <span className="text-text-basic heading-lg-bold font-pretendard truncate">
                      {productName}
                    </span>
                  </div>

                  <div className="flex flex-col gap-2">
                    <div className="flex justify-between items-center">
                      <span className="text-text-basic body-md-semibold font-pretendard shrink-0">
                        예약 번호
                      </span>
                      <span className="text-text-subtle body-md-regular font-pretendard">
                        {reservationNumber}
                      </span>
                    </div>
                    <div className="flex justify-between items-start gap-4">
                      <span className="text-text-basic body-md-semibold font-pretendard shrink-0">
                        픽업 장소
                      </span>
                      <span className="text-text-subtle body-md-regular font-pretendard text-right break-keep">
                        {pickupAddress}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-text-basic body-md-semibold font-pretendard">
                        픽업 일시
                      </span>
                      <span className="text-text-subtle body-md-regular font-pretendard">
                        {pickupTimeStart}~{pickupTimeEnd}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={onDetailClick}
                    className="self-end bg-surface-brand-lighter text-text-brand caption-xs-bold font-pretendard w-[90px] h-7 flex items-center justify-center rounded-xlarge"
                  >
                    자세히 보기 →
                  </button>
                </div>
              </div>

              <div className="px-5 py-6 flex flex-col items-center gap-3">
                {isExpanded && isPickupDay && (
                  <div className="flex flex-col items-center gap-1">
                    <Icon
                      icon="ic:round-warning"
                      className="size-5 text-brand-primary"
                    />
                    <span className="caption-xs-bold font-pretendard text-brand-primary text-center">
                      QR 코드는 1회만 사용 가능하며 픽업 후 무효 처리돼요
                    </span>
                  </div>
                )}

                <div
                  className={cn(
                    'relative flex items-center justify-center',
                    isPickupDay ? 'cursor-pointer' : 'cursor-not-allowed',
                  )}
                  onClick={() => {
                    if (!isPickupDay) return;
                    if (!isExpanded) logEvent('qr_enlarge');
                    setIsExpanded(!isExpanded);
                  }}
                >
                  <div
                    className={cn(
                      'transition-all duration-500',
                      !isPickupDay && 'blur-sm opacity-70',
                    )}
                  >
                    <QRCodeSVG
                      value={qrCode || ' '}
                      size={isExpanded ? 220 : 128}
                    />
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

                {!isExpanded && isPickupDay && <QrExpandTooltip />}

                {!isExpanded && !isPickupDay && (
                  <p className="text-text-subtle body-sm-bold font-pretendard text-center">
                    픽업일이 되면 QR코드가 활성화돼요
                  </p>
                )}
              </div>
            </>
          ) : (
            <div className="px-5 py-8 flex flex-col items-center gap-4">
              <Image src="/icons/starpoint.svg" alt="" width={60} height={60} />
              <p className="text-text-basic body-md-bold font-pretendard text-center">
                아직 픽업 예정인 상품이 없어요
              </p>
            </div>
          )}
        </div>

        {hasCandidate && !isPickupDay && !hasMultipleToday && (
          <div className="w-[326px] bg-brand-primary rounded-lg px-3 py-2 flex justify-start items-center gap-2">
            <Icon
              icon="ic:round-schedule"
              className="size-3.5 text-icon-inverse shrink-0"
            />
            <span className="caption-xs-bold font-pretendard text-text-basic-inverse">
              QR코드는 픽업 당일에 활성화돼요
            </span>
          </div>
        )}

        <div className="flex items-center gap-2">
          <span className="text-text-basic-inverse body-sm-medium font-pretendard">
            흔들어서 큐알 화면 열기
          </span>
          <Toggle checked={shakeEnabled} onChange={onShakeToggle} size="sm" />
        </div>

        {hasMultipleToday && (
          <button
            onClick={onMultiplePickupClick}
            className="w-[326px] bg-brand-primary rounded-lg px-3 py-2 flex justify-start items-center gap-2"
          >
            <Icon
              icon="ic:round-warning"
              className="size-3.5 text-icon-inverse shrink-0"
            />
            <span className="caption-xs-bold font-pretendard text-text-basic-inverse">
              오늘 픽업인 공구가 2개 이상 있어요. 마이페이지를 확인해주세요.
            </span>
          </button>
        )}
      </div>
    </div>
  );
};
