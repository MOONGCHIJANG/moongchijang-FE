import { Button } from '@moongchijang/ui';
import Image from 'next/image';
import Link from 'next/link';

interface GroupBuyRequestCardProps {
  icon?: string;
  title?: string;
  description?: string;
  buttonLabel?: string;
  onRequest?: () => void;
}

export const GroupBuyRequestCard = ({
  icon = '/icons/search.svg',
  title = '원하는 매장·상품이 없나요?',
  description = '가게 이름과 상품을 알려주시면 뭉치장이 입점을 요청해볼게요',
  buttonLabel = '입점 요청하기',
  onRequest,
}: GroupBuyRequestCardProps) => {
  return (
    <div className="flex flex-col items-center gap-3 rounded-3xlarge border border-dashed border-border-brand-lighter bg-surface-secondary-lighter px-5 py-4">
      <Image src={icon} alt="" width={43} height={50} />
      <div className="flex flex-col items-center gap-1 text-center">
        <p className="whitespace-pre-line text-[18px] font-bold leading-[26px] text-text-basic">
          {title}
        </p>
        <p className="whitespace-pre-line body-sm-regular text-text-tertiary">
          {description}
        </p>
      </div>
      <div className="flex w-full flex-col items-center gap-2">
        <Button
          size="md"
          fullWidth
          onClick={onRequest}
          className="h-auto px-7 pb-3.5 pt-3"
        >
          {buttonLabel}
        </Button>
        <Link href="/request" className="caption-sm-regular text-text-tertiary">
          내 요청 현황 보기 ›
        </Link>
      </div>
    </div>
  );
};
