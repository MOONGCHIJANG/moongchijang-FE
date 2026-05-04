import React, { useEffect, useState } from 'react';
import ShareButtonItem from './ShareButtonItem';

type BottomShareProps = {
  open?: boolean;
  onClose?: () => void;
};

const BottomShare = ({ open = true, onClose }: BottomShareProps) => {
  const [show, setShow] = useState(open);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    if (open) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setShow(true);
      setTimeout(() => setAnimate(true), 10);
    } else {
      setAnimate(false);
      const timeout = setTimeout(() => setShow(false), 320);
      return () => clearTimeout(timeout);
    }
  }, [open]);

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
        className={`z-20 flex flex-col gap-3 fixed bottom-0 left-0 right-0 mx-auto w-full max-w-110 justify-center
        transition-transform duration-300 ease-in-out
        ${animate ? 'translate-y-0' : 'translate-y-full'}
        ${!animate ? 'pointer-events-none' : ''}`}
        style={{ willChange: 'transform' }}
      >
        <div className="w-9 h-0.75 bg-white mx-auto rounded-full" />
        <div className="bg-white px-p10 pt-p8 pb-p8 rounded-t-3xlarge flex justify-between items-center">
          <ShareButtonItem platform="kakao" />
          <ShareButtonItem platform="instagram" />
          <ShareButtonItem platform="x" />
          <ShareButtonItem platform="etc" />
        </div>
      </div>
    </div>
  );
};

export default BottomShare;
