import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { useState } from 'react';
import Modal from './Modal';
import { Button } from './Button';

const meta: Meta<typeof Modal> = {
  title: 'Components/Modal',
  component: Modal,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof Modal>;

// 2버튼 – description 있음
export const TwoButtonWithDescription: Story = {
  name: '2버튼 + 설명 (주문 취소)',
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <div className="flex h-screen items-center justify-center">
        <Button onClick={() => setIsOpen(true)}>모달 열기</Button>
        <Modal
          isOpen={isOpen}
          title="주문을 취소할까요?"
          description="취소 후에는 되돌릴 수 없어요."
          iconType="warning"
          confirmLabel="취소할게요"
          cancelLabel="아니요"
          onConfirm={() => setIsOpen(false)}
          onCancel={() => setIsOpen(false)}
        />
      </div>
    );
  },
};

// 2버튼 – description 없음
export const TwoButton: Story = {
  name: '2버튼 (설명 없음)',
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <div className="flex h-screen items-center justify-center">
        <Button onClick={() => setIsOpen(true)}>모달 열기</Button>
        <Modal
          isOpen={isOpen}
          title="정말 취소하시겠어요?"
          iconType="warning"
          confirmLabel="취소하기"
          cancelLabel="다시 생각하기"
          onConfirm={() => setIsOpen(false)}
          onCancel={() => setIsOpen(false)}
        />
      </div>
    );
  },
};

// 1버튼 – description 없음
export const OneButton: Story = {
  name: '1버튼 (설명 없음)',
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <div className="flex h-screen items-center justify-center">
        <Button onClick={() => setIsOpen(true)}>모달 열기</Button>
        <Modal
          isOpen={isOpen}
          title="닉네임 변경이 완료되었어요"
          iconType="success"
          confirmLabel="확인"
          onConfirm={() => setIsOpen(false)}
        />
      </div>
    );
  },
};

// 1버튼 – description 있음
export const OneButtonWithDescription: Story = {
  name: '1버튼 + 설명',
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <div className="flex h-screen items-center justify-center">
        <Button onClick={() => setIsOpen(true)}>모달 열기</Button>
        <Modal
          isOpen={isOpen}
          title="닉네임 변경이 완료되었어요"
          description="앱을 재시작하면 반영돼요."
          iconType="success"
          confirmLabel="확인"
          onConfirm={() => setIsOpen(false)}
        />
      </div>
    );
  },
};
