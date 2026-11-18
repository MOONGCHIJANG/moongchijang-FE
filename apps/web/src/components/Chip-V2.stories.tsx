import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { ChipV2, type ChipV2Variant } from './Chip-V2';

const VARIANTS: ChipV2Variant[] = [
  'yellow',
  'brandLighter',
  'blue',
  'brand',
  'disabled',
];

const meta: Meta<typeof ChipV2> = {
  title: 'Components/ChipV2',
  component: ChipV2,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    variant: {
      control: 'select',
      options: VARIANTS,
    },
    size: {
      control: 'inline-radio',
      options: ['s', 'm'],
    },
  },
  args: {
    label: '정윤서 · 4개',
    size: 's',
  },
};

export default meta;
type Story = StoryObj<typeof ChipV2>;

export const Yellow: Story = { args: { variant: 'yellow' } };
export const BrandLighter: Story = { args: { variant: 'brandLighter' } };
export const Blue: Story = { args: { variant: 'blue' } };
export const Brand: Story = { args: { variant: 'brand' } };
export const Disabled: Story = { args: { variant: 'disabled' } };

/**
 * S / M 사이즈별 전체 variant 비교
 */
export const AllVariants: Story = {
  render: (args) => (
    <div className="flex gap-6">
      {(['s', 'm'] as const).map((size) => (
        <div key={size} className="flex flex-col items-center gap-3">
          {VARIANTS.map((variant) => (
            <ChipV2 key={variant} {...args} size={size} variant={variant} />
          ))}
        </div>
      ))}
    </div>
  ),
};
