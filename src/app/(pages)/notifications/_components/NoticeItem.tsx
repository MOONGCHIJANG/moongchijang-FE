import Image from 'next/image';
import React from 'react';

const NoticeItem = () => {
  return (
    <button className="px-p7 py-g4 flex gap-5.5 items-center border-b border-b-border-natural">
      <Image
        src="/icons/notifications/store.svg"
        alt="store"
        width={20}
        height={20}
      />
      <div className="flex flex-1">
        <div className="flex flex-col gap-g3 flex-1 items-start">
          <p className="text-text-subtle body-md-semibold">오늘 팝업일이에요</p>
          <p className="text-text-subtle caption-sm-regular line-clamp-2 text-left">
            설명내용이에요설명내용이에요설명내용이에요설명내용이에요설명내용이에요설명내용이에요
          </p>
        </div>
        <p className="text-text-subtle-inverse caption-sm-regular min-w-15 text-right">
          시간
        </p>
      </div>
    </button>
  );
};

export default NoticeItem;
