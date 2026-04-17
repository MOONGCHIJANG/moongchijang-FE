import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { GNB, TabId } from './GNB';
import { useState } from 'react';

const meta = {
  title: 'Components/GNB',
  component: GNB,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    activeTab: {
      control: 'select',
      options: ['feed', 'request', 'favorite', 'mypage'],
      description: '현재 활성화된 탭',
    },
    onTabChange: { action: 'onTabChange' },
  },
} satisfies Meta<typeof GNB>;

export default meta;
type Story = StoryObj<typeof meta>;

// 기본 스토리 (피드 활성화)
export const Default: Story = {
  args: {
    activeTab: 'feed',
  },
};

// 각 탭별 스토리
export const FeedActive: Story = {
  args: {
    activeTab: 'feed',
  },
};

export const RequestActive: Story = {
  args: {
    activeTab: 'request',
  },
};

export const FavoriteActive: Story = {
  args: {
    activeTab: 'favorite',
  },
};

export const MyPageActive: Story = {
  args: {
    activeTab: 'mypage',
  },
};

// 인터랙티브 스토리 (클릭해서 탭 변경 가능)
export const Interactive: Story = {
  render: (args) => {
    const [active, setActive] = useState<TabId>('feed');
    return (
      <div className="w-full h-[400px] flex items-end bg-gray-50 pb-4">
        <GNB
          {...args}
          activeTab={active}
          onTabChange={(tab) => {
            setActive(tab);
            args.onTabChange?.(tab);
          }}
          className="mx-auto max-w-md shadow-sm"
        />
      </div>
    );
  },
};
