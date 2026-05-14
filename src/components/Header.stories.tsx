import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import Header from './Header';

const meta = {
  title: 'Components/Header',
  component: Header,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    text: '헤더입니다.',
    showBackButton: true,
  },
};

export const Secondary: Story = {
  args: {
    text: '뒤로가기 없는 버전',
    showBackButton: false,
  },
};
