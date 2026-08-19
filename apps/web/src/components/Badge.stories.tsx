import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Badge } from './Badge';

const meta: Meta<typeof Badge> = {
  title: 'Components/Badge',
  component: Badge,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    onDelete: { action: 'deleted' },
  },
};

export default meta;
type Story = StoryObj<typeof Badge>;

export const Default: Story = {
  args: {
    label: '전국',
  },
};

export const WithDelete: Story = {
  args: {
    label: '강남 | 역삼 | 삼성',
    onDelete: () => {},
  },
};

export const Multiple: Story = {
  render: () => (
    <div className="flex gap-2">
      <Badge label="서울 전체" onDelete={() => {}} />
      <Badge label="강남구" onDelete={() => {}} />
      <Badge label="서초구" onDelete={() => {}} />
    </div>
  ),
};
