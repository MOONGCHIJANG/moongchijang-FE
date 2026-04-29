import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { BottomSheet } from './BottomSheet';
import React, { useState } from 'react';
import { Button } from './Button';

const meta: Meta<typeof BottomSheet> = {
  title: 'Components/BottomSheet',
  component: BottomSheet,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof BottomSheet>;

export const Default: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <div className="p-4">
        <Button onClick={() => setIsOpen(true)}>바텀시트 열기</Button>
        <BottomSheet isOpen={isOpen} onClose={() => setIsOpen(false)}>
          <div className="p-6">
            <h2 className="text-heading-md-bold mb-4">바텀시트 제목</h2>
            <p className="text-body-md-regular text-gray-500 mb-6">
              바텀시트 내용이 여기에 들어갑니다.
            </p>
            <Button fullWidth onClick={() => setIsOpen(false)}>
              닫기
            </Button>
          </div>
        </BottomSheet>
      </div>
    );
  },
};

/**
 * 상단 핸들을 아래로 드래그하면 일정 거리(100px) 이상 내려간 뒤 손을 뗄 때 닫힙니다.
 * 손을 떼기 전까지는 위로 다시 끌어올려 원위치로 복귀시킬 수 있습니다.
 */
export const DragToDismiss: Story = {
  name: '드래그로 닫기',
  render: () => {
    const [isOpen, setIsOpen] = useState(true);
    return (
      <div className="p-4">
        <Button onClick={() => setIsOpen(true)}>바텀시트 열기</Button>
        <BottomSheet isOpen={isOpen} onClose={() => setIsOpen(false)}>
          <div className="p-6">
            <h2 className="text-heading-md-bold mb-4">드래그로 닫기</h2>
            <p className="text-body-md-regular text-gray-500 mb-2">
              상단 핸들 바를 아래로 끌어내려 보세요.
            </p>
            <ul className="text-body-sm-regular text-gray-500 mb-6 list-disc pl-5 space-y-1">
              <li>100px 이상 내린 상태에서 손을 떼면 닫힙니다.</li>
              <li>떼기 전에 다시 위로 끌어올리면 원위치로 돌아옵니다.</li>
              <li>임계값 이하에서 떼면 자동으로 스냅백됩니다.</li>
            </ul>
            <Button fullWidth onClick={() => setIsOpen(false)}>
              닫기
            </Button>
          </div>
        </BottomSheet>
      </div>
    );
  },
};
