import Image from 'next/image';
import Link from 'next/link';
import { getServerUserRole } from '@/lib/server-auth';
import { AuthUserRole } from '@/api/generated/api.schemas';

export default async function NotFound() {
  const role = await getServerUserRole();
  const homeHref = role === AuthUserRole.SELLER ? '/seller' : '/feed';

  return (
    <div className="flex min-h-dvh flex-col items-center justify-center gap-g6 px-p6 pb-[74px]">
      <div className="flex flex-col items-center gap-g4">
        <Image
          src="/icons/moongchinyang.svg"
          alt=""
          width={80}
          height={100}
          className="mb-g4 h-25 w-20"
        />
        <p className="heading-md-semibold text-center text-text-basic">
          페이지를 찾을 수 없어요
        </p>
        <p className="body-sm-regular text-center text-text-tertiary">
          주소가 잘못됐거나 더 이상 존재하지 않는 페이지예요
        </p>
      </div>
      <Link
        href={homeHref}
        className="rounded-xl bg-button-primary-fill px-8 py-3 heading-sm-bold text-white"
      >
        홈으로 가기
      </Link>
    </div>
  );
}
