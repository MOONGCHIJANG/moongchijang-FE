'use client';

import Link from 'next/link';
import { Icon } from '@iconify/react';
import type { MyGroupBuy } from '../_hooks/useFeedHomePlaceholder';
import { MyGroupBuyCard } from './MyGroupBuyCard';

interface MyGroupBuySectionProps {
  items: MyGroupBuy[];
}

export const MyGroupBuySection = ({ items }: MyGroupBuySectionProps) => {
  return (
    <section className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <h2 className="heading-sm-bold text-text-basic">
          내 함께 사기 <span className="text-text-brand">{items.length}</span>
        </h2>
        {/* TODO: v2 내 함께 사기 목록 라우트가 정해지면 경로 교체 */}
        <Link
          href="/mypage"
          className="flex items-center caption-sm-medium text-text-tertiary"
        >
          전체
          <Icon icon="lucide:chevron-right" className="size-[18px]" />
        </Link>
      </div>
      <div className="-mx-4 flex gap-[7px] overflow-x-auto px-4 scrollbar-hide">
        {items.map((item) => (
          <MyGroupBuyCard key={item.id} {...item} />
        ))}
      </div>
    </section>
  );
};
