import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Chip } from './Chip';

const meta: Meta<typeof Chip> = {
  title: 'Components/Chip',
  component: Chip,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    active: {
      control: 'boolean',
      description: '활성화 상태 여부',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Chip>;

/**
 * 기본 상태 (Default)
 */
export const Default: Story = {
  args: {
    label: '마감임박',
    active: false,
  },
};

/**
 * 활성화 상태 (Active)
 */
export const Active: Story = {
  args: {
    label: '전체',
    active: true,
  },
};
