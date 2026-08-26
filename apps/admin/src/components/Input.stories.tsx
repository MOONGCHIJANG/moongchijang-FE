import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Input } from './Input';

const meta: Meta<typeof Input> = {
  title: 'Admin/Input',
  component: Input,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof Input>;

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
