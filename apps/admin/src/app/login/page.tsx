import Image from 'next/image';
import { LoginForm } from './_components/LoginForm';

export default function LoginPage() {
  return (
    <main className="relative min-h-dvh w-full overflow-hidden bg-primary-400">
      {/* 에러 메시지 등으로 카드(및 main) 높이가 변해도 배경이 다시 크롭되지 않도록 뷰포트에 고정 */}
      <Image
        src="/login_bg.jpg"
        alt=""
        fill
        priority
        className="!fixed inset-0 object-cover"
      />
      {/* lg 이상: Figma 1920x1080 캔버스 기준 리터럴 수치(우측204·상단107·패딩200/140·gap100)를 vw/vh 비율로 그대로 적용. 실제 브라우저 뷰포트는 항상 1920보다 작으므로 vw/vh 변환만으로 자연스럽게 축소됨 */}
      <div className="relative z-10 flex min-h-dvh flex-col items-center px-6 py-12 lg:flex-row lg:items-start lg:justify-end lg:pt-[9.907vh] lg:pr-[10.625vw]">
        <div className="flex w-fit flex-col gap-20 rounded-3xlarge bg-bg-white px-28 py-40 lg:gap-[9.259vh] lg:px-[7.292vw] lg:py-[18.519vh]">
          <div className="flex flex-col">
            <h1 className="title-md-semibold text-primary-400">
              Welcome Back!
            </h1>
            <p className="heading-md-medium text-gray-400">
              오늘도 화이팅 사고뭉치들
            </p>
          </div>
          <LoginForm />
        </div>
      </div>
    </main>
  );
}
