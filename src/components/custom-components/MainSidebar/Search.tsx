'use client';
import { cn } from '@/lib/utils';
import { Search as SearchIcon } from 'lucide-react';

const Search = () => {
  return (
    <div className={cn('relative h-[34px] pt-1')}>
      <div
        className={cn(
          'text-gray-primary pointer-events-none absolute inset-y-0 left-0 flex items-center pt-[6px] pl-3',
        )}
      >
        <SearchIcon size={14} />
      </div>
      <input
        type="search"
        placeholder="Search"
        className={cn(
          'placeholder:font-outfit font-outfit border-gray-light placeholder:text-theme-text-primary block h-[34px] w-full rounded-md border-[1px] pr-3 pl-9 text-[12px] leading-[17px] font-normal placeholder:text-[12px]',
        )}
      />
    </div>
  );
};

export default Search;
