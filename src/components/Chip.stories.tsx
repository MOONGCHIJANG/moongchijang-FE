import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Chip } from './Chip';
import { useState } from 'react';

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
    disabled: { control: 'boolean' },
    onClick: { action: 'clicked' },
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

/**
 * 비활성화(disabled) 상태
 */
export const Disabled: Story = {
  args: {
    label: '마감임박',
    active: false,
    disabled: true,
  },
};

/**
 * 클릭해서 active 상태 토글 — 필터 chip 동작 확인용
 */
export const Interactive: Story = {
  render: (args) => {
    const [active, setActive] = useState(false);
    return (
      <Chip
        {...args}
        active={active}
        onClick={() => {
          setActive((prev) => !prev);
          args.onClick?.();
        }}
      />
    );
  },
  args: {
    label: '마감임박',
  },
};

/**
 * 여러 chip 중 하나만 활성화되는 단일 선택 필터 그룹 예시
 */
export const FilterGroup: Story = {
  render: () => {
    const options = ['전체', '마감임박', '달성임박'];
    const [active, setActive] = useState('전체');
    return (
      <div className="flex gap-2">
        {options.map((opt) => (
          <Chip
            key={opt}
            label={opt}
            active={active === opt}
            onClick={() => setActive(opt)}
          />
        ))}
      </div>
    );
  },
};
