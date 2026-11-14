import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { AlertBanner } from './AlertBanner';

const SAMPLE_TEXT = [
  '결제는 구매 가능 수량이 모이면 총대인 내가 한 번에 해요.',
  '참여자 몫은 결제 후 계좌이체로 받아요.',
  '참여자 간 정산에는 뭉치장이 관여하지 않아요.',
].join('\n');

const meta: Meta<typeof AlertBanner> = {
  title: 'Components/AlertBanner',
  component: AlertBanner,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <div className="w-90">
        <Story />
      </div>
    ),
  ],
  argTypes: {
    variant: {
      control: 'inline-radio',
      options: ['yellowL', 'yellowS', 'blue', 'red', 'gray'],
    },
  },
  args: {
    text: SAMPLE_TEXT,
  },
};

export default meta;
type Story = StoryObj<typeof AlertBanner>;

export const YellowL: Story = {
  args: { variant: 'yellowL', headline: '본인 명의 계좌만 등록할 수 있어요' },
};
export const YellowS: Story = { args: { variant: 'yellowS' } };
export const Blue: Story = { args: { variant: 'blue' } };
export const Red: Story = { args: { variant: 'red' } };
export const Gray: Story = { args: { variant: 'gray' } };
