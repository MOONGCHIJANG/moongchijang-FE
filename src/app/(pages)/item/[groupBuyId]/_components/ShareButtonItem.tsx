import Image from 'next/image';
import React from 'react';

type ShareButtonItemProps = {
  platform: 'kakao' | 'instagram' | 'x' | 'etc';
  onClick?: () => void;
};

const ShareButtonItem = ({ platform, onClick }: ShareButtonItemProps) => {
  return (
    <button
      className="flex flex-col gap-g2 items-center caption-sm-medium"
      onClick={onClick}
    >
      <Image
        src={`/icons/${platform}.svg`}
        alt="공유하기"
        width={40}
        height={40}
        className="mx-1.5"
      />
      <p>
        {platform === 'kakao' && '카카오톡'}
        {platform === 'instagram' && '인스타그램'}
        {platform === 'x' && 'X'}
        {platform === 'etc' && '더보기'}
      </p>
    </button>
  );
};

export default ShareButtonItem;
