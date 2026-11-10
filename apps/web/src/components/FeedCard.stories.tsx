import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Icon } from '@iconify/react';
import { FeedCard } from './FeedCard';

const meta: Meta<typeof FeedCard> = {
  title: 'Components/FeedCard',
  component: FeedCard,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  decorators: [
    (Story) => (
      <div className="w-[193px] p-2">
        <Story />
      </div>
    ),
  ],
  args: {
    storeName: '사이드템포',
    locationLabel: '성수동',
    productName: '두바이쫀득쿠키 4개입',
    price: 18000,
    thumbnailUrl: 'https://picsum.photos/seed/feed/360/280',
    unitQuantity: 1,
    minQuantity: 15,
    closedDayLabel: '월 휴무',
  },
};

export default meta;
type Story = StoryObj<typeof FeedCard>;

/** 피드 홈 */
export const Feed: Story = {
  args: { isNew: true, teamCount: 3 },
};

/** 찜: action 슬롯에 하트 버튼 */
export const Favorite: Story = {
  args: {
    action: (
      <button type="button" aria-label="찜 해제" className="shrink-0">
        <Icon
          icon="solar:heart-bold"
          aria-hidden
          className="size-6 text-icon-primary"
        />
      </button>
    ),
  },
};
