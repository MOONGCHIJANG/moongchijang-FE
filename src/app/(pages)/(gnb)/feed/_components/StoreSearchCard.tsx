import Image from 'next/image';
import { cn } from '@/lib/utils';
import type { ApiResponseStoreSearchListDataStoresItem } from '@/api/generated/api.schemas';

interface StoreSearchCardProps {
  store: ApiResponseStoreSearchListDataStoresItem & { thumbnailUrl?: string };
  isSelected: boolean;
  onClick: () => void;
}

export const StoreSearchCard = ({
  store,
  isSelected,
  onClick,
}: StoreSearchCardProps) => (
  <button
    type="button"
    onClick={onClick}
    className={cn(
      'w-full rounded-2xl border flex items-center gap-3 overflow-hidden transition-colors text-left',
      isSelected
        ? 'border-border-brand bg-surface-brand-lighter'
        : 'border-border-default bg-bg-white',
    )}
  >
    <div className="w-2/5 h-24 shrink-0 bg-surface-elevated relative overflow-hidden">
      <Image
        src={store.thumbnailUrl ?? '/images/img1.jpg'}
        alt={store.storeName ?? ''}
        fill
        className="object-cover"
      />
    </div>
    <div className="w-3/5 py-3 pr-3 min-w-0">
      <span className="heading-md-semibold text-text-basic font-pretendard block truncate">
        {store.storeName}
      </span>
      <span className="caption-sm-regular text-text-tertiary font-pretendard block mt-0.5 truncate">
        {store.roadAddress}
      </span>
    </div>
  </button>
);
