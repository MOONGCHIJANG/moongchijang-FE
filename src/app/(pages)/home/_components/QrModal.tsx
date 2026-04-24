'use client';

import React, { useState, useEffect } from 'react';
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

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => setAnimate(true), 50);
      return () => clearTimeout(timer);
    } else {
      // 비동기 처리를 통해 cascading render 린트 에러 해결
      Promise.resolve().then(() => {
        setAnimate(false);
        setIsExpanded(false);
      });
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleClose = () => {
    setAnimate(false);
    setTimeout(onClose, 300);
  };

  return (
    <div
      className={cn(
        'fixed inset-0 z-[9999] flex flex-col items-center justify-center transition-opacity duration-500 ease-out',
        animate ? 'opacity-100' : 'opacity-0',
      )}
    >
      {/* 1. 백그라운드 레이어: fixed inset-0의 영향으로 전체 화면을 꽉 채움 */}
      <div
        className="absolute inset-0 bg-bg-dim-darkest backdrop-blur-[4px] transition-all duration-500"
        onClick={handleClose}
      />

      {/* 2. 모달 및 컨텐츠 컨테이너 */}
      <div
        className={cn(
          'relative w-72 inline-flex flex-col justify-start items-center gap-3 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] transform',
          animate ? 'translate-y-0' : 'translate-y-40',
        )}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-9 h-0 outline outline-[3px] outline-offset-[-1.50px] outline-surface-white rounded-full"></div>

        <div className="self-stretch flex flex-col justify-start items-center gap-5">
          <div
            className={cn(
              'self-stretch pb-5 bg-bg-white rounded-[20px] inline-flex justify-start items-start gap-2.5 transition-all duration-300 shadow-2xl overflow-hidden',
              isExpanded ? 'scale-[1.05]' : 'scale-100',
            )}
          >
            <div className="w-72 inline-flex flex-col justify-start items-center gap-1">
              <div className="self-stretch h-12 p-3.5 bg-surface-default rounded-tl-[20px] rounded-tr-[20px] flex flex-col justify-start items-start gap-2.5">
                <div className="w-64 inline-flex justify-between items-center">
                  <div className="justify-start text-text-basic text-base font-bold font-pretendard leading-6">
                    픽업 QR코드
                  </div>
                  <button
                    onClick={handleClose}
                    className="w-6 h-6 flex items-center justify-center -mr-1"
                  >
                    <Icon
                      icon="ic:round-close"
                      className="w-6 h-6 text-text-basic"
                    />
                  </button>
                </div>
              </div>

              <div className="w-64 flex flex-col items-center gap-4">
                <div
                  className={cn(
                    'self-stretch flex flex-col justify-start items-start transition-all duration-300 overflow-hidden origin-top',
                    isExpanded
                      ? 'max-h-0 opacity-0 border-b-0 px-0 pt-0 pb-0'
                      : 'max-h-[500px] opacity-100 px-2.5 pt-2.5 pb-5 border-b border-border-default flex flex-col justify-start items-start gap-2.5',
                  )}
                >
                  <div className="self-stretch flex flex-col justify-start items-start gap-3.5">
                    <div className="inline-flex justify-start items-center gap-2">
                      <div className="h-5 px-3 py-2 bg-brand-primary rounded-[10px] flex justify-center items-center">
                        <div className="justify-start text-text-basic-inverse text-[10px] font-bold font-pretendard">
                          {dDayText}
                        </div>
                      </div>
                      <div className="justify-start text-text-basic text-xl font-bold font-pretendard leading-8">
                        {storeName}
                      </div>
                    </div>

                    <div className="self-stretch flex flex-col justify-start items-end gap-3.5">
                      <div className="self-stretch flex flex-col justify-start gap-2">
                        <div className="self-stretch inline-flex justify-between items-center">
                          <div className="justify-start text-text-basic text-sm font-semibold font-pretendard leading-5">
                            예약 번호
                          </div>
                          <div className="text-right justify-start text-text-subtle text-sm font-normal font-pretendard leading-5">
                            {orderNumber}
                          </div>
                        </div>
                        <div className="self-stretch inline-flex justify-between items-start gap-4">
                          <div className="justify-start text-text-basic text-sm font-semibold font-pretendard leading-5 shrink-0">
                            픽업 장소
                          </div>
                          <div
                            className="text-right justify-start text-text-subtle text-sm font-normal font-pretendard leading-5 break-keep"
                            dangerouslySetInnerHTML={{
                              __html: pickupLocation.replace('\n', '<br/>'),
                            }}
                          ></div>
                        </div>
                        <div className="self-stretch inline-flex justify-between items-center">
                          <div className="justify-start text-text-basic text-sm font-semibold font-pretendard leading-5">
                            픽업 일시
                          </div>
                          <div className="text-right justify-start text-text-subtle text-sm font-normal font-pretendard leading-5">
                            {pickupTime}
                          </div>
                        </div>
                      </div>
                      <button className="px-4 py-2 bg-surface-brand-lighter rounded-[10px] inline-flex justify-center items-center">
                        <div className="justify-start text-text-brand text-[10px] font-bold font-pretendard">
                          자세히 보기 →
                        </div>
                      </button>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col justify-start items-center gap-3">
                  <div
                    className={cn(
                      'relative flex items-center justify-center transition-all duration-300',
                      isPickupDay ? 'cursor-pointer' : 'cursor-not-allowed',
                    )}
                    onClick={() => isPickupDay && setIsExpanded(!isExpanded)}
                  >
                    <div
                      className={cn(
                        'transition-all duration-500 flex justify-center items-center',
                        !isPickupDay && 'blur-[6px] opacity-30',
                      )}
                    >
                      <QRCodeSVG
                        value={qrValue}
                        size={isExpanded ? 240 : 112}
                        className={cn(isExpanded && 'mt-4')}
                      />
                    </div>
                    {!isPickupDay && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-10 h-10 flex justify-center items-center">
                          <Icon
                            icon="solar:lock-bold"
                            className="w-8 h-8 text-icon-subtle"
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  <div
                    className={cn(
                      'self-stretch text-center justify-start text-text-subtle text-[10px] font-bold font-pretendard transition-all duration-300 overflow-hidden',
                      isExpanded
                        ? 'max-h-0 opacity-0 mt-0'
                        : 'max-h-10 opacity-100 mt-2',
                    )}
                  >
                    {isPickupDay
                      ? 'QR코드를 클릭하면 크게 볼 수 있어요'
                      : '픽업일이 되면 QR코드가 활성화돼요'}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="inline-flex justify-start items-center gap-2">
            <div className="flex justify-start items-center gap-2">
              <div className="justify-start text-text-basic-inverse text-xs font-bold font-pretendard leading-4">
                흔들어서 큐알 화면 열기
              </div>
            </div>
            <Toggle
              checked={shakeEnabled}
              onChange={onShakeToggle}
              size="sm"
              className={cn(
                'w-6 h-3.5',
                shakeEnabled ? 'bg-brand-primary' : 'bg-alpha-white-20',
              )}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
