'use client';

import { useState, useEffect, useRef } from 'react';
import { Icon } from '@iconify/react';
import { cn } from '@/lib/utils';

interface SearchBarProps {
  /**
   * 입력 필드의 안내 문구
   */
  placeholder?: string;
  /**
   * 디바운스된 검색 실행 콜백 (기본 300ms)
   */
  onSearch?: (value: string) => void;
  /**
   * 디바운스 지연 시간 (ms)
   */
  debounceDelay?: number;
  /**
   * 추가적인 스타일 클래스
   */
  className?: string;
}

export const SearchBar = ({
  placeholder = '매장명 또는 상품명 검색',
  onSearch,
  debounceDelay = 300,
  className,
}: SearchBarProps) => {
  const [inputValue, setInputValue] = useState('');
  const onSearchRef = useRef(onSearch);

  useEffect(() => {
    onSearchRef.current = onSearch;
  }, [onSearch]);

  const isMounted = useRef(false);

  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true;
      return;
    }
    const timer = setTimeout(() => {
      onSearchRef.current?.(inputValue);
    }, debounceDelay);
    return () => clearTimeout(timer);
  }, [inputValue, debounceDelay]);

  return (
    <div
      className={cn(
        'flex h-11 w-full items-center gap-2 rounded-full border border-primary-400 bg-white px-4 shadow-sm',
        className,
      )}
    >
      <Icon icon="solar:magnifer-linear" className="h-5 w-5 text-primary-400" />
      <input
        type="text"
        value={inputValue}
        placeholder={placeholder}
        className="w-full bg-transparent text-body-sm-regular text-text-basic outline-none placeholder:text-text-disabled"
        onChange={(e) => setInputValue(e.target.value)}
      />
      {inputValue && (
        <button
          onClick={() => setInputValue('')}
          className="flex h-5 w-5 items-center justify-center text-icon-disabled hover:text-icon-subtle"
          type="button"
        >
          <Icon icon="solar:close-circle-bold" className="h-4 w-4" />
        </button>
      )}
    </div>
  );
};
