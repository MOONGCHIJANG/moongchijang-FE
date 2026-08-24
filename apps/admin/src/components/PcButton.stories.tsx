import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { PcButton } from './PcButton';

const meta: Meta<typeof PcButton> = {
  title: 'Admin/PcButton',
  component: PcButton,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof PcButton>;

export const Default: Story = {
  args: {
    children: '로그인',
  },
};

export const Disabled: Story = {
  args: {
    children: '로그인',
    disabled: true,
  },
};
