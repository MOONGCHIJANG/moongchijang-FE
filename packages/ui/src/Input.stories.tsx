import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import Input from './Input';

const meta: Meta<typeof Input> = {
  title: 'Components/Input',
  component: Input,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <div style={{ width: 360 }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Input>;

// off: 기본 placeholder 상태
export const Default: Story = {
  args: {
    placeholder: '매장 이름 또는 주소 검색',
  },
};

// stroke-black: 값 입력 후 포커스 상태 (X 버튼 노출)
export const Filled: Story = {
  args: {
    placeholder: '매장 이름 또는 주소 검색',
    value: '성심당 본점',
  },
};

// label + helperText
export const WithLabel: Story = {
  args: {
    label: '새 닉네임',
    placeholder: '변경하실 닉네임을 입력해주세요',
    helperText: '2~10자, 한글/영문/숫자',
  },
};

// helperText - 사용 가능 (초록/기본 색상)
export const HelperAvailable: Story = {
  args: {
    label: '새 닉네임',
    placeholder: '변경하실 닉네임을 입력해주세요',
    value: '뭉치뭉치',
    helperText: '사용 가능한 닉네임이에요',
    helperTextClassName: 'text-text-basic',
  },
};

// stroke-brand: 에러 상태 (빨간 테두리)
export const Error: Story = {
  args: {
    label: '새 닉네임',
    placeholder: '변경하실 닉네임을 입력해주세요',
    value: '뭉치',
    helperText: '이미 사용 중인 닉네임이에요',
    helperTextClassName: 'text-text-error',
    isError: true,
  },
};

// 왼쪽 검색 아이콘
export const WithSearchIcon: Story = {
  args: {
    placeholder: '매장 이름 또는 주소 검색',
    leftIcon: 'lucide:search',
  },
};

// 왼쪽 캘린더 아이콘
export const WithCalendarIcon: Story = {
  args: {
    placeholder: '픽업 날짜 선택',
    leftIcon: 'lucide:calendar-check',
    value: '2025-06-01',
  },
};

// 비밀번호 입력 (eye 토글)
export const Password: Story = {
  args: {
    placeholder: '비밀번호를 입력해주세요',
    isPassword: true,
    value: 'password123',
    label: '비밀번호',
  },
};

// 비밀번호 + 에러
export const PasswordError: Story = {
  args: {
    placeholder: '비밀번호를 입력해주세요',
    isPassword: true,
    value: '123',
    label: '비밀번호',
    helperText: '8자 이상 입력해주세요',
    helperTextClassName: 'text-text-error',
    isError: true,
  },
};

// focusVariant=brand: 포커스 시 브랜드 컬러 테두리
export const FocusBrand: Story = {
  args: {
    placeholder: '매장 이름 또는 주소 검색',
    leftIcon: 'lucide:search',
    focusVariant: 'brand',
  },
};
