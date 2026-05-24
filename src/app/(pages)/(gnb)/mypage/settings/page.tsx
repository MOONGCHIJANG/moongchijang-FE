'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Icon } from '@iconify/react';
import { useGetApiV1UsersMe } from '@/api/hooks/auth/auth';
import { AuthUserRole } from '@/api/generated/api.schemas';
import { useAuthStore } from '@/store/authStore';
import Header from '@/components/Header';
import Modal from '@/components/Modal';
import { useState } from 'react';

function SettingRow({
  label,
  onClick,
  href,
  labelClassName,
}: {
  label: string;
  onClick?: () => void;
  href?: string;
  labelClassName?: string;
}) {
  const inner = (
    <div className="flex items-center justify-between py-p5">
      <span
        className={`heading-sm-regular text-text-basic ${labelClassName ?? ''}`}
      >
        {label}
      </span>
      <Icon
        icon="lucide:chevron-right"
        className="w-6 h-6 text-icon-tertiary"
      />
    </div>
  );

  if (href) {
    return <Link href={href}>{inner}</Link>;
  }
  if (onClick) {
    return (
      <button type="button" className="w-full text-left" onClick={onClick}>
        {inner}
      </button>
    );
  }
  return <div>{inner}</div>;
}

export default function SettingsPage() {
  const router = useRouter();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const { data: meData } = useGetApiV1UsersMe();
  const user = meData?.status === 200 ? meData.data?.data : null;
  const isSeller = user?.role === AuthUserRole.SELLER;

  const storeLogout = useAuthStore((s) => s.logout);

  async function handleLogout() {
    await storeLogout();
    router.push('/login');
  }

  return (
    <div className="min-h-dvh bg-bg-white flex flex-col">
      <Header text="마이페이지" />

      {/* 역할 배너 */}
      {isSeller ? (
        <div className="bg-surface-brand-lighter px-p6 py-p5 flex items-center justify-between">
          <span className="body-md-semibold text-text-brand">
            사장님으로 전환하기
          </span>
          <div className="w-[50px] h-[26px] rounded-full bg-button-primary-fill flex items-center justify-end px-[2px]">
            <div className="w-[22px] h-[22px] rounded-full bg-white" />
          </div>
        </div>
      ) : (
        <Link
          href="/login"
          className="bg-surface-brand-lighter px-p6 py-p5 flex items-center justify-between"
        >
          <span className="heading-sm-semibold text-text-brand">
            사장님으로 가입하기
          </span>
          <Icon
            icon="lucide:chevron-right"
            className="w-6 h-6 text-icon-primary"
          />
        </Link>
      )}

      <div className="flex flex-col py-0">
        {/* 프로필 */}
        <div className="bg-surface-white px-[16px] py-[16px] flex items-center justify-between border-b border-dashed border-divider-default">
          <div>
            <p className="heading-md-bold text-text-basic">
              {user?.nickname ?? '-'}
            </p>
            <p className="caption-sm-regular text-[#5C5D68] mt-p1">
              {user?.email ?? '-'}
            </p>
          </div>
        </div>

        {/* 정보 */}
        <div className="bg-surface-white px-[16px]">
          <p className="caption-sm-medium text-text-disabled pt-p6 pb-p3">
            정보
          </p>
          <SettingRow label="휴대폰 번호" />
          <SettingRow label="닉네임 변경" href="/mypage/nickname-change" />
          <SettingRow label="비밀번호 변경" href="/mypage/password-change" />
        </div>

        <div className="border-t border-border-subtle" />

        {/* 기타 */}
        <div className="bg-surface-white px-[16px]">
          <p className="caption-sm-medium text-text-disabled pt-p6 pb-p3">
            기타
          </p>
          <SettingRow label="이용약관" href="/terms" />
          <SettingRow
            label="로그아웃"
            onClick={() => setShowLogoutModal(true)}
          />
          <SettingRow label="탈퇴하기" href="/mypage/withdraw" />
        </div>

        <div className="border-t border-border-subtle" />
      </div>

      <Modal
        isOpen={showLogoutModal}
        iconType="warning"
        title="로그아웃"
        description="정말 로그아웃 하시겠어요?"
        confirmLabel="로그아웃"
        cancelLabel="취소"
        onConfirm={handleLogout}
        onCancel={() => setShowLogoutModal(false)}
      />
    </div>
  );
}
