'use client';

import Image from 'next/image';
import { Button } from './Button';

interface ModalProps {
  isOpen: boolean;
  title: string;
  description?: string;
  iconType?: 'warning' | 'success';
  confirmLabel: string;
  cancelLabel?: string;
  onConfirm: () => void;
  onCancel?: () => void;
}

const ICON_MAP = {
  warning: { src: '/icons/starpoint.svg', width: 91, height: 91 },
  success: { src: '/icons/complete.svg', width: 60, height: 60 },
} as const;

export default function Modal({
  isOpen,
  title,
  description,
  iconType,
  confirmLabel,
  cancelLabel,
  onConfirm,
  onCancel,
}: ModalProps) {
  if (!isOpen) return null;

  const icon = iconType ? ICON_MAP[iconType] : null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onClick={(e) => {
        if (e.target === e.currentTarget) onCancel?.();
      }}
    >
      <div className="flex w-[321px] flex-col rounded-[20px] bg-white p-4">
        <div className="flex flex-col items-center gap-5">
          <div className="flex w-[234px] flex-col items-center gap-5">
            {icon && (
              <Image
                src={icon.src}
                width={icon.width}
                height={icon.height}
                alt=""
              />
            )}
            <div className="flex w-full flex-col items-center gap-1">
              <p className="heading-lg-bold text-center text-text-basic">
                {title}
              </p>
              {description && (
                <p className="heading-md-medium whitespace-pre-line text-center text-text-subtle">
                  {description}
                </p>
              )}
            </div>
          </div>
          {cancelLabel ? (
            <div className="flex w-full gap-2">
              <Button
                variant="tertiary"
                size="md"
                className="flex-1"
                onClick={onCancel}
              >
                {cancelLabel}
              </Button>
              <Button
                variant="black"
                size="md"
                className="flex-1"
                onClick={onConfirm}
              >
                {confirmLabel}
              </Button>
            </div>
          ) : (
            <Button variant="black" size="md" fullWidth onClick={onConfirm}>
              {confirmLabel}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
