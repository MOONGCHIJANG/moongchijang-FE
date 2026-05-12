'use client';
import React from 'react';
import ShareButtonItem from './ShareButtonItem';
import { BottomSheet } from '@/components/BottomSheet';

type BottomShareProps = {
  open?: boolean;
  onClose?: () => void;
};

const BottomShare = ({ open = false, onClose }: BottomShareProps) => {
  return (
    <BottomSheet isOpen={open} onClose={onClose ?? (() => {})}>
      <div className="px-p10 pt-p8 pb-p8 flex justify-between items-center">
        <ShareButtonItem platform="kakao" />
        <ShareButtonItem platform="instagram" />
        <ShareButtonItem platform="x" />
        <ShareButtonItem platform="etc" />
      </div>
    </BottomSheet>
  );
};

export default BottomShare;
