import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import Toast from './Toast';

const meta = {
  title: 'Components/Toast',
  component: Toast,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Toast>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    children: '지금 40명이 보고있어요',
  },
};
