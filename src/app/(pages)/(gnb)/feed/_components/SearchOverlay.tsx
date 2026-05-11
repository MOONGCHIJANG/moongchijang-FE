'use client';

import { useRef, useEffect } from 'react';
import { Icon } from '@iconify/react';
import { SearchBar } from './SearchBar';

const RECOMMENDED_SEARCHES = ['두쫀쿠', '버타떡', '모모양과', '두바이모피빵'];

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  onSearch: (keyword: string) => void;
  inputValue: string;
  onInputChange: (value: string) => void;
  recentSearches: string[];
  onRemoveRecent: (keyword: string) => void;
  onClearRecent: () => void;
}

export const SearchOverlay = ({
  isOpen,
  onClose,
  onSearch,
  inputValue,
  onInputChange,
  recentSearches,
  onRemoveRecent,
  onClearRecent,
}: SearchOverlayProps) => {
  const searchBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    const timer = setTimeout(() => {
      searchBarRef.current?.querySelector('input')?.focus();
    }, 0);
    return () => clearTimeout(timer);
  }, [isOpen]);

  const handleSearch = (keyword: string) => {
    if (!keyword.trim()) return;
    onSearch(keyword.trim());
  };

  const handleChipClick = (keyword: string) => {
    onInputChange(keyword);
    handleSearch(keyword);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-y-0 left-1/2 -translate-x-1/2 w-full max-w-[440px] z-50 bg-bg-white flex flex-col">
      <div className="flex items-center gap-3 px-4 pt-4 pb-3">
        <button onClick={onClose} className="flex-shrink-0 p-1">
          <Icon icon="mingcute:left-line" className="h-6 w-6 text-icon-basic" />
        </button>
        <div ref={searchBarRef} className="flex-1">
          <SearchBar
            placeholder="먹고 싶은 메뉴나 가게를 찾아보세요"
            value={inputValue}
            onChange={onInputChange}
            onEnter={handleSearch}
            className="h-11 shadow-none"
          />
        </div>
      </div>

      <div className="flex flex-col gap-6 px-5 pt-2 overflow-y-auto">
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <span className="body-md-bold text-text-basic font-pretendard">
              최근 검색어
            </span>
            {recentSearches.length > 0 && (
              <button
                onClick={onClearRecent}
                className="caption-sm-regular text-text-disabled font-pretendard"
              >
                전체 삭제
              </button>
            )}
          </div>
          {recentSearches.length === 0 ? (
            <span className="caption-sm-bold text-text-disabled font-pretendard">
              검색 내역이 없습니다.
            </span>
          ) : (
            <div className="flex flex-wrap gap-2">
              {recentSearches.map((keyword) => (
                <div
                  key={keyword}
                  className="flex items-center gap-1 rounded-full border border-border-default px-3 py-1.5"
                >
                  <button
                    onClick={() => handleChipClick(keyword)}
                    className="body-sm-regular text-text-basic font-pretendard"
                  >
                    {keyword}
                  </button>
                  <button
                    onClick={() => onRemoveRecent(keyword)}
                    className="flex items-center justify-center"
                    type="button"
                  >
                    <Icon
                      icon="solar:close-linear"
                      className="h-3.5 w-3.5 text-icon-disabled"
                    />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="flex flex-col gap-3">
          <span className="body-md-bold text-text-basic font-pretendard">
            뭉치장 추천 검색어
          </span>
          <div className="flex flex-wrap gap-2">
            {RECOMMENDED_SEARCHES.map((keyword) => (
              <button
                key={keyword}
                onClick={() => handleChipClick(keyword)}
                className="rounded-full bg-primary-50 px-3 py-1.5 body-sm-regular text-text-brand font-pretendard"
                type="button"
              >
                {keyword}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
