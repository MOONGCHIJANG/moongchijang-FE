import Image from 'next/image';

export function EmptyHome() {
  return (
    <div className="flex flex-col items-center gap-4 text-center">
      <Image
        src="/images/store.png"
        alt="매장 일러스트"
        width={159}
        height={95}
        className="object-contain"
      />
      <div className="flex flex-col gap-1.5">
        <p className="body-lg-bold text-text-basic">진행 중인 공구가 없어요</p>
        <p className="body-sm-regular text-text-secondary">
          공구 관리 탭에서 공구 개설이 가능해요!
        </p>
      </div>
    </div>
  );
}
