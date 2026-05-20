'use client';

import { useGetApiV1UsersMe } from '@/api/hooks/auth/auth';
import { Icon } from '@iconify/react';
import Link from 'next/link';

export function ProfileSection() {
  const { data: meData } = useGetApiV1UsersMe();
  const user = meData?.status === 200 ? meData.data?.data : null;

  return (
    <Link
      href="/mypage/settings"
      className="flex items-center justify-between px-g5 py-g5 mt-g4 bg-surface-white"
    >
      <div>
        <p className="heading-sm-bold text-text-basic">
          {user?.nickname ?? '-'}
        </p>
        <p className="body-sm-regular text-text-tertiary mt-p2">
          {user?.email ?? '-'}
        </p>
      </div>
      <Icon icon="lucide:chevron-right" className="w-6 h-6 text-icon-subtle" />
    </Link>
  );
}
