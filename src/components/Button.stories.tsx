import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Button } from './Button';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    variant: 'primary',
    children: '적용하기',
    fullWidth: true,
    size: 'lg',
  },
};

export const Outline: Story = {
  args: {
    variant: 'outline',
    children: '초기화',
    size: 'md',
  },
};

export const Medium: Story = {
  args: {
    variant: 'primary',
    size: 'md',
    children: '설정하기',
  },
};

export const Tertiary: Story = {
  args: {
    variant: 'tertiary',
    size: 'md',
    children: '다시 생각하기',
  },
};
