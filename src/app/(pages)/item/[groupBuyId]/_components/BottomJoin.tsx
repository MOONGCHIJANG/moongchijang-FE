'use client';
import { Button } from '@/components/Button';
import { Icon } from '@iconify/react';
import React, { useState } from 'react';

const BottomJoin = () => {
  const [isLiked, setIsLiked] = useState(false);

  return (
    <div className="fixed bottom-0 left-0 right-0 z-10 mx-auto w-full max-w-110 px-7 py-p6 flex flex-col gap-g3 rounded-t-3xlarge shadow-[0px_-2px_20px_0px_rgba(0,0,0,0.10)] bg-white">
      <p className="text-center text-brand-primary">00분뒤에 줄 서세요</p>
      <div className="flex gap-g4 items-center">
        <button
          className="w-11 h-11 cursor-pointer"
          onClick={() => setIsLiked(!isLiked)}
        >
          <Icon
            icon={isLiked ? 'solar:heart-bold' : 'solar:heart-outline'}
            className={`w-6 h-6 ${isLiked ? 'text-icon-primary' : 'text-icon-tertiary'}`}
          />
        </button>
        <Button size="md" className="w-full text-white cursor-pointer">
          공구 참여하기
        </Button>
      </div>
    </div>
  );
};

export default BottomJoin;
