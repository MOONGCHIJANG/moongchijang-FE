import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { ToastBlack } from './ToastBlack';

const meta: Meta<typeof ToastBlack> = {
  title: 'Components/Toast',
  component: ToastBlack,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    message: { control: 'text' },
    isVisible: { control: 'boolean' },
    icon: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof ToastBlack>;

/**
 * 아이콘이 있는 토스트
 */
export const WithIcon: Story = {
  args: {
    message: '요청 제출에 실패했어요. 다시 시도해주세요',
    isVisible: true,
    icon: 'lucide:circle-alert',
  },
};

/**
 * 아이콘이 없는 토스트
 */
export const WithoutIcon: Story = {
  args: {
    message: '요청 제출에 실패했어요. 다시 시도해주세요',
    isVisible: true,
  },
};
