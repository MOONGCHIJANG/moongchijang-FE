import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { PcInput } from './PcInput';

const meta: Meta<typeof PcInput> = {
  title: 'Admin/PcInput',
  component: PcInput,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof PcInput>;

export const Default: Story = {
  args: {
    label: '아이디',
    placeholder: '아이디를 입력해주세요',
  },
};

export const Filled: Story = {
  args: {
    label: '아이디',
    placeholder: '아이디를 입력해주세요',
    defaultValue: 'moong1234',
  },
};

export const Password: Story = {
  args: {
    label: '비밀번호',
    placeholder: '비밀번호를 입력해주세요',
    isPassword: true,
    defaultValue: 'chijang1234',
  },
};
