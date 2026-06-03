'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Icon } from '@iconify/react';
import {
  useGetApiV1UsersMe,
  usePatchApiV1UsersMeRole,
} from '@/api/hooks/auth/auth';
import { MyPageRoleSwitchRequestRole } from '@/api/generated/api.schemas';
import { useAuthStore } from '@/store/authStore';
import Header from '@/components/Header';
import Modal from '@/components/Modal';

function SettingRow({
  label,
  value,
  onClick,
  href,
  labelClassName,
}: {
  label: string;
  value?: string | null;
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
      <div className="flex items-center gap-g4">
        {value && (
          <span className="heading-sm-regular text-text-subtle-inverse">
            {value}
          </span>
        )}
        <Icon
          icon="lucide:chevron-right"
          className="w-6 h-6 text-icon-tertiary"
        />
      </div>
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

export default function SellerMyPage() {
  const router = useRouter();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const { data: meData } = useGetApiV1UsersMe();
  const user = meData?.status === 200 ? meData.data?.data : null;

  const { mutate: switchRole, isPending: isSwitching } =
    usePatchApiV1UsersMeRole();
  const storeLogout = useAuthStore((s) => s.logout);

  function handleSwitchToCustomer() {
    if (isSwitching) return;
    switchRole(
      { data: { role: MyPageRoleSwitchRequestRole.BUYER } },
      { onSuccess: () => router.push('/feed') },
    );
  }

  async function handleLogout() {
    await storeLogout();
    router.push('/feed');
  }

  return (
    <div className="min-h-dvh bg-bg-white flex flex-col">
      <Header text="마이페이지" />

      <button
        type="button"
        disabled={isSwitching}
        onClick={handleSwitchToCustomer}
        className="bg-surface-brand-lighter px-p6 py-p5 flex items-center justify-between w-full"
      >
        <span className="body-md-semibold text-text-brand">
          소비자 화면으로 전환하기
        </span>
        <div className="w-[50px] h-[26px] rounded-full bg-button-primary-fill flex items-center justify-end px-[2px]">
          <div className="w-[22px] h-[22px] rounded-full bg-white" />
        </div>
      </button>

      <div className="bg-surface-white px-g5 py-[16px] border-b border-dashed border-divider-default">
        <p className="heading-md-bold text-text-basic">
          {user?.nickname ?? '-'}
        </p>
        <p className="caption-sm-regular text-text-tertiary mt-p1">
          {user?.email ?? '-'}
        </p>
      </div>

      <div className="bg-surface-white px-g5">
        <p className="caption-sm-medium text-text-disabled pt-p6 pb-p3">정보</p>
        <SettingRow
          label="휴대폰 번호"
          value={
            user?.phoneNumber
              ? '+82 ' + user.phoneNumber.replace(/^0/, '')
              : undefined
          }
          href="/mypage/phone-change"
        />
        <SettingRow label="닉네임 변경" href="/mypage/nickname-change" />
        <SettingRow label="비밀번호 변경" href="/mypage/password-change" />
        <SettingRow
          label="사업자 정보 변경"
          href="/seller/mypage/business-info"
        />
        <SettingRow
          label="정산 정보 변경"
          href="/seller/mypage/settlement-info"
        />
      </div>

      <div className="border-t border-border-subtle" />

      <div className="bg-surface-white px-g5">
        <p className="caption-sm-medium text-text-disabled pt-p6 pb-p3">기타</p>
        <SettingRow label="이용약관" href="/terms" />
        <SettingRow label="로그아웃" onClick={() => setShowLogoutModal(true)} />
      </div>

      <div className="border-t border-border-subtle" />

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
