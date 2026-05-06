'use client';
import { Button } from '@/components/Button';
import { formatPhone, isValidPhone } from '@/lib/phone';
import React, { useEffect, useState } from 'react';

type EditNumberProps = {
  open?: boolean;
  initialValue?: string;
  onClose?: () => void;
  onConfirm?: (value: string) => void;
};

const EditNumber = ({
  open = false,
  initialValue = '',
  onClose,
  onConfirm,
}: EditNumberProps) => {
  const [show, setShow] = useState(open);
  const [animate, setAnimate] = useState(false);
  const [input, setInput] = useState(initialValue);

  useEffect(() => {
    if (open) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setInput(initialValue);
      setShow(true);
      setTimeout(() => setAnimate(true), 10);
    } else {
      setAnimate(false);
      const timeout = setTimeout(() => setShow(false), 320);
      return () => clearTimeout(timeout);
    }
  }, [open, initialValue]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(formatPhone(e.target.value));
  };

  const handleConfirm = () => {
    if (isValidPhone(input)) onConfirm?.(input);
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-30 overflow-hidden">
      {/* Overlay */}
      <div
        className={`absolute inset-0 z-10 bg-black/60 transition-opacity duration-300 ${animate ? 'opacity-100' : 'opacity-0'} ${!animate ? 'pointer-events-none' : ''}`}
        onClick={onClose}
        aria-label="닫기 오버레이"
      />
      {/* Bottom Sheet */}
      <div
        className={`z-20 fixed bottom-0 left-0 right-0 mx-auto w-full max-w-110
          transition-transform duration-300 ease-in-out
          ${animate ? 'translate-y-0' : 'translate-y-full'}
          ${!animate ? 'pointer-events-none' : ''}`}
        style={{ willChange: 'transform' }}
      >
        <div className="bg-white p-p7 pb-p8 rounded-t-2xlarge flex flex-col gap-g4">
          <p className="heading-md-bold">전화번호</p>
          <input
            type="tel"
            className="border border-border-default focus:outline-none rounded-xlarge px-p5 py-p4 body-md-regular"
            placeholder="전화번호를 입력하세요"
            value={input}
            onChange={handleChange}
            inputMode="numeric"
          />
          <Button
            variant="primary"
            className="bg-button-natural"
            onClick={handleConfirm}
            disabled={!isValidPhone(input)}
          >
            완료
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EditNumber;
