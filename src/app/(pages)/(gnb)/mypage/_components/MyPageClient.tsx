'use client';

import { useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useGetApiV1UsersMeTabsCounts } from '@/api/hooks/my-page/my-page';
import { Icon } from '@iconify/react';
import Image from 'next/image';
import Link from 'next/link';
import { ProfileSection } from './ProfileSection';
import { ParticipationTab } from './ParticipationTab';

type TabKey = 'active' | 'waiting' | 'completed' | 'refunded';

interface MyPageClientProps {
  tab: TabKey;
  isLoggedIn: boolean;
}

const TAB_LABELS: Record<TabKey, string> = {
  active: '진행 중',
  waiting: '픽업 대기',
  completed: '픽업 완료',
  refunded: '환불/취소',
};

// TODO: 백엔드에서 beforeAchievedCount / achievedCount 분리되면 active·waiting 카운트 연결

const MyPageClient = ({ tab, isLoggedIn }: MyPageClientProps) => {
  const router = useRouter();

  const { data: countsData } = useGetApiV1UsersMeTabsCounts({
    query: { enabled: isLoggedIn },
  });
  const counts = countsData?.status === 200 ? countsData.data?.data : null;

  const handleTabChange = useCallback(
    (next: TabKey) => {
      router.push(`/mypage?tab=${next}`);
    },
    [router],
  );

  if (!isLoggedIn) {
    return (
      <div className="h-dvh bg-surface-white no-scroll">
        <div className="py-4 bg-bg-white-muted">
          <Link
            href="/login"
            className="flex justify-between w-full items-center p-g5 bg-surface-white"
          >
            <p className="heading-sm-semibold">로그인하고 뭉치장 이용하기</p>
            <Icon
              icon="lucide:chevron-right"
              className="w-8 h-8 text-icon-basic"
            />
          </Link>
        </div>
        <div className="flex flex-col gap-g5 items-center pt-25">
          <Image src="/icons/starpoint.svg" width={91} height={91} alt="" />
          <p className="whitespace-pre-line heading-sm-medium text-center">{`로그인 후\n이용 가능해요`}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col bg-bg-white-muted min-h-full">
      {/* 프로필 / 설정 섹션 */}
      <ProfileSection />

      {/* 탭 */}
      <div className="mt-g4 bg-surface">
        <div className="flex overflow-x-auto scrollbar-hide">
          {(Object.keys(TAB_LABELS) as TabKey[]).map((key) => (
            <button
              key={key}
              type="button"
              className={`flex-1 bg-bg-white min-w-max px-g3 pt-g4 pb-g3 whitespace-nowrap transition-colors ${
                tab === key
                  ? 'text-text-basic caption-sm-bold border-b-2 border-button-natural'
                  : 'text-text-tertiary caption-sm-medium'
              }`}
              onClick={() => handleTabChange(key)}
            >
              {TAB_LABELS[key]}
            </button>
          ))}
        </div>

        {/* 탭 컨텐츠 */}
        <ParticipationTab tabType={tab} />
      </div>
    </div>
  );
};

export default MyPageClient;
