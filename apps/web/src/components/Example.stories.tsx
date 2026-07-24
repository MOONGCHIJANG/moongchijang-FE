import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Example } from './index';

// 스토리 메타 설정 - 이 컴포넌트의 스토리 전체에 적용되는 공통 설정
const meta = {
  title: 'Components/Example', // Storybook 사이드바 경로 (슬래시로 depth 구분)
  component: Example, // 스토리에서 사용할 컴포넌트 지정
  parameters: {
    layout: 'centered', // 캔버스 중앙 정렬. 'fullscreen' | 'padded' | 'centered'
  },
  tags: ['autodocs'], // Props 타입 기반으로 Docs 탭 자동 생성 !필수!
} satisfies Meta<typeof Example>;

export default meta;
type Story = StoryObj<typeof meta>; // Story 타입에 meta 연결해서 args 타입 추론

// 아래는 각 스토리 별 설정, 다양한 예시 기본으로 보여줄 수 있음
// 최소 한 개는 존재해야 함
// primary=true 일 때
export const Primary: Story = {
  args: {
    title: '예시입니다.',
    primary: true,
    text: 'text 는 없어도 됨',
  },
};

// primary=false (기본값) 일 때
export const Secondary: Story = {
  args: {
    title: '예시입니다.',
  },
};

// 크기 변화 확인용
export const Large: Story = {
  args: {
    title: '예시입니다.',
    size: 'large',
  },
};

export const Small: Story = {
  args: {
    title: '예시입니다.',
    size: 'small',
  },
};
