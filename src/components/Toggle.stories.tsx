import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Toggle } from './Toggle';
import { useState } from 'react';

const meta: Meta<typeof Toggle> = {
  title: 'Components/Toggle',
  component: Toggle,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    checked: { control: 'boolean' },
    disabled: { control: 'boolean' },
    size: {
      control: 'inline-radio',
      options: ['sm', 'md'],
    },
    onChange: { action: 'changed' },
  },
};

export default meta;
type Story = StoryObj<typeof Toggle>;

/**
 * 비활성 상태 (Off, 기본 사이즈)
 */
export const Off: Story = {
  args: {
    checked: false,
    size: 'md',
  },
};

/**
 * 활성 상태 (On, 기본 사이즈)
 */
export const On: Story = {
  args: {
    checked: true,
    size: 'md',
  },
};

/**
 * 비활성화(disabled) 상태
 */
export const Disabled: Story = {
  args: {
    checked: false,
    disabled: true,
    size: 'md',
  },
};

/**
 * 작은 사이즈 - 비활성 (w-6 h-3.5)
 */
export const SmallOff: Story = {
  args: {
    checked: false,
    size: 'sm',
  },
};

/**
 * 작은 사이즈 - 활성 (w-6 h-3.5, brand-primary)
 */
export const SmallOn: Story = {
  args: {
    checked: true,
    size: 'sm',
  },
};

/**
 * 작은 사이즈 - 비활성화(disabled) 상태
 */
export const SmallDisabled: Story = {
  args: {
    checked: false,
    size: 'sm',
    disabled: true,
  },
};

/**
 * 클릭해서 토글 동작을 확인할 수 있는 인터랙티브 스토리
 */
export const Interactive: Story = {
  render: (args) => {
    const [checked, setChecked] = useState(false);
    return (
      <Toggle
        {...args}
        checked={checked}
        onChange={(next) => {
          setChecked(next);
          args.onChange?.(next);
        }}
      />
    );
  },
  args: {
    size: 'md',
  },
};

/**
 * 사이즈 비교 (md / sm, Off / On)
 */
export const SizeComparison: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-6">
        <span className="text-body-sm-regular text-gray-500 w-12">md</span>
        <Toggle checked={false} onChange={() => {}} size="md" />
        <Toggle checked={true} onChange={() => {}} size="md" />
      </div>
      <div className="flex items-center gap-6">
        <span className="text-body-sm-regular text-gray-500 w-12">sm</span>
        <Toggle checked={false} onChange={() => {}} size="sm" />
        <Toggle checked={true} onChange={() => {}} size="sm" />
      </div>
    </div>
  ),
};
