import Image from 'next/image';
import ToastToolTip from '../(gnb)/mypage/_components/ToastTooltip';
import LoginButton from './_components/LoginButton';

const page = () => {
  return (
    <main className="h-dvh bg-bg-white-muted flex flex-col overflow-hidden">
      <div className="flex-1 flex flex-col gap-3.75 items-center justify-center mb-10">
        <Image
          src="/images/mcj-logo-1.png"
          alt="뭉치장 로고"
          width={183}
          height={76}
          className="w-55.5 h-23"
        />
        <p className="heading-lg-bold">
          줄서지 말고
          <span
            className="rounded-[8px] px-2 py-0.5"
            style={{ background: '#FFEDE9', color: '#FF502E' }}
          >
            뭉쳐서 구매
          </span>
          하자!
        </p>
      </div>

      <div
        className="px-4 flex flex-col gap-3.25 items-center"
        style={{
          paddingBottom: 'calc(1.75rem + env(safe-area-inset-bottom, 0px))',
        }}
      >
        <ToastToolTip text="3초만에 빠른 회원가입" />
        <LoginButton />
      </div>
    </main>
  );
};

export default page;
