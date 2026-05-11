import Image from 'next/image';

interface EmptyStateProps {
  title: string;
  description?: string;
}

export const EmptyState = ({ title, description }: EmptyStateProps) => {
  return (
    <div className="flex flex-col items-center gap-3 pt-10 pb-6">
      <Image src="/icons/request_empty.svg" alt="" width={115} height={82} />
      <div className="flex flex-col items-center gap-1.5">
        <p className="heading-md-bold text-text-basic text-center font-pretendard whitespace-pre-line">
          {title}
        </p>
        {description && (
          <p className="body-sm-regular text-text-tertiary text-center font-pretendard whitespace-pre-line">
            {description}
          </p>
        )}
      </div>
    </div>
  );
};
