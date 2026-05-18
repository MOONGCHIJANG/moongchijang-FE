import Header from '@/components/Header';
import Image from 'next/image';
import Link from 'next/link';

const page = () => {
  return (
    <main className="relative h-dvh bg-white flex flex-col overflow-hidden">
      <Header text="아이디/비밀번호 찾기" />
      <div className="flex-1 flex flex-col items-center justify-center">
        <Image
          src="/images/mcj-logo-1.png"
          alt="뭉치장 로고"
          width={183}
          height={76}
          className="w-40 h-16.5"
        />
        <p className="body-lg-bold text-black pt-10 pb-5.5">
          {`카카오톡 '뭉치장' 공식 채널에 문의 부탁드립니다.`}
        </p>
        <Link
          href="https://pf.kakao.com/_MdICX"
          target="_blank"
          className="flex flex-col gap-g2 items-center cursor-pointer"
        >
          <Image
            src="/icons/kakao-share.svg"
            alt="카카오톡 채널 추가 버튼"
            width={58}
            height={58}
          />
          <span className="caption-sm-medium text-text-subtle">
            카카오톡 채널
          </span>
        </Link>
      </div>
    </main>
  );
};

export default page;
