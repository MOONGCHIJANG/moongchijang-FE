import { Button } from '@moongchijang/ui';
import Image from 'next/image';

interface GroupBuyRequestCardProps {
  icon?: string;
  title?: string;
  description?: string;
  buttonLabel?: string;
  onRequest?: () => void;
}

export const GroupBuyRequestCard = ({
  icon,
  title = '뭉치장이 원하는 공구에 참여할 수 있도록\n도와드릴게요!',
  description = '입점 검토에 2~5 영업일이 걸려요',
  buttonLabel = '입점 요청하기',
  onRequest,
}: GroupBuyRequestCardProps) => {
  return (
    <div className="min-h-60 rounded-2xl border border-dashed border-border-brand-lighter bg-surface-secondary-lighter p-5 flex flex-col justify-center gap-8">
      <div className="flex flex-col items-center gap-1 text-center">
        {icon && (
          <Image src={icon} alt="" width={48} height={48} className="mb-1" />
        )}
        <p className="heading-md-bold text-text-basic font-pretendard whitespace-pre-line">
          {title}
        </p>
        <p className="body-lg-regular text-text-tertiary font-pretendard whitespace-pre-line">
          {description}
        </p>
      </div>
      <Button
        size="md"
        fullWidth
        onClick={onRequest}
        className="px-7 pt-3 pb-3.5 h-auto"
      >
        {buttonLabel}
      </Button>
    </div>
  );
};
