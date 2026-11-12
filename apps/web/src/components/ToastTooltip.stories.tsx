import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { ToastTooltip } from './ToastTooltip';

const meta: Meta<typeof ToastTooltip> = {
  title: 'Components/ToastTooltip',
  component: ToastTooltip,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    variant: {
      control: 'inline-radio',
      options: ['default', 'dark', 'brand'],
    },
    icon: { control: 'text' },
    isVisible: { control: 'boolean' },
  },
  args: {
    message: '3초만에 빠른 회원가입',
    isVisible: true,
  },
};

export default meta;
type Story = StoryObj<typeof ToastTooltip>;

export const Default: Story = { args: { variant: 'default' } };
export const Dark: Story = { args: { variant: 'dark' } };
export const Brand: Story = { args: { variant: 'brand' } };

/**
 * 아이콘 변경 예시 (PDP 바텀시트 '같이 사기' 안내)
 */
export const CustomIcon: Story = {
  args: {
    variant: 'dark',
    icon: '/icons/hand-clap.svg',
    message: '친구랑 뭉쳐서 부담 줄이기',
  },
};
