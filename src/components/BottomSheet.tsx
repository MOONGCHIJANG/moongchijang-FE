'use client';

import React, { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

interface BottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
}

const DRAG_CLOSE_THRESHOLD = 100;

export const BottomSheet = ({
  isOpen,
  onClose,
  children,
  className,
}: BottomSheetProps) => {
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [prevIsOpen, setPrevIsOpen] = useState(isOpen);
  const dragStartY = useRef<number | null>(null);

  // isOpen이 닫힘으로 바뀌는 순간 드래그 상태를 리셋 (render-phase reset 패턴)
  if (prevIsOpen !== isOpen) {
    setPrevIsOpen(isOpen);
    if (!isOpen) {
      setDragOffset(0);
      setIsDragging(false);
    }
  }

  // 바텀시트가 열려 있을 때 배경 스크롤 방지 + 닫힐 때 드래그 ref 정리
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
      dragStartY.current = null;
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    dragStartY.current = e.clientY;
    setIsDragging(true);
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (dragStartY.current === null) return;
    const delta = e.clientY - dragStartY.current;
    // 아래 방향으로만 따라오도록 0 이상으로 클램프 (위로 끌어올리면 원위치 고정)
    setDragOffset(Math.max(0, delta));
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (dragStartY.current === null) return;
    const delta = e.clientY - dragStartY.current;
    dragStartY.current = null;
    setIsDragging(false);
    if (e.currentTarget.hasPointerCapture(e.pointerId)) {
      e.currentTarget.releasePointerCapture(e.pointerId);
    }

    if (delta > DRAG_CLOSE_THRESHOLD) {
      onClose();
    } else {
      setDragOffset(0);
    }
  };

  return (
    <div
      className={cn(
        'fixed inset-0 z-[100] flex items-end justify-center bg-alpha-black-50 transition-opacity duration-300',
        isOpen ? 'opacity-100' : 'pointer-events-none opacity-0',
      )}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className={cn(
          'relative w-full min-w-[360px] max-w-[440px] rounded-t-[20px] bg-white ease-out',
          !isDragging && 'transition-transform duration-300',
          className,
        )}
        style={{
          transform: isOpen
            ? `translateY(${dragOffset}px)`
            : 'translateY(100%)',
        }}
      >
        {/* Drag Handle */}
        <div
          className="flex w-full justify-center pt-3 pb-1 touch-none cursor-grab active:cursor-grabbing"
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
        >
          <div className="h-1 w-10 rounded-full bg-gray-200" />
        </div>
        {children}
      </div>
    </div>
  );
};
