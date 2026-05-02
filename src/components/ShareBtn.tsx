import { Icon } from '@iconify/react';
import React from 'react';

type ShareBtnProps = {
  children: React.ReactNode;
  onClick?: () => void;
};

const ShareBtn = ({ children, onClick }: ShareBtnProps) => {
  return (
    <button
      className="rounded-medium px-p5 py-p3 bg-gray-50 flex gap-1 items-center cursor-pointer"
      onClick={onClick}
      type="button"
    >
      <Icon icon="material-symbols:share" className="w-4 h-4 text-icon-basic" />
      <p className="text-button-natural">{children}</p>
    </button>
  );
};

export default ShareBtn;
