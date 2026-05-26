import { Suspense } from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { GNB } from './GNB';

const meta = {
  title: 'Components/GNB',
  component: GNB,
  parameters: {
    layout: 'fullscreen',
    nextjs: {
      navigation: {
        pathname: '/feed',
      },
    },
  },
  decorators: [
    (Story) => (
      <Suspense fallback={null}>
        <Story />
      </Suspense>
    ),
  ],
  tags: ['autodocs'],
} satisfies Meta<typeof GNB>;

export default meta;
type Story = StoryObj<typeof meta>;

export const FeedActive: Story = {
  parameters: {
    nextjs: { navigation: { pathname: '/feed' } },
  },
};

export const RequestActive: Story = {
  parameters: {
    nextjs: { navigation: { pathname: '/request' } },
  },
};

export const FavoriteActive: Story = {
  parameters: {
    nextjs: { navigation: { pathname: '/favorite' } },
  },
};

export const MyPageActive: Story = {
  parameters: {
    nextjs: { navigation: { pathname: '/mypage' } },
  },
};
