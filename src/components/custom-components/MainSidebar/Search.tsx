'use client';

import { Icons } from '@/components/ui/Icons';
import { cn } from '@/lib/utils';
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from '@/components/ui/tooltip';

interface SearchProps {
  collapsed?: boolean;
}

const Search: React.FC<SearchProps> = ({ collapsed = false }) => {
  return (
    <div
      className={cn(
        'relative h-9 pt-1',
        collapsed ? 'w-10' : 'w-full',
        'transition-all duration-300',
      )}
    >
      {collapsed ? (
        // Tooltip shown only when collapsed
        <Tooltip>
          <TooltipTrigger asChild>
            <div
              className={cn(
                'text-gray-primary flex items-center justify-center pt-2',
                'h-full w-full cursor-pointer',
              )}
            >
              <Icons.search className="h-4 w-4" />
            </div>
          </TooltipTrigger>
          <TooltipContent side="right" className="text-xs">
            Search
          </TooltipContent>
        </Tooltip>
      ) : (
        <>
          <div className="text-gray-primary pointer-events-none absolute inset-y-0 left-0 flex items-center pt-2 pl-3">
            <Icons.search className="h-4 w-4" />
          </div>
          <input
            type="search"
            placeholder="Search"
            className={cn(
              'placeholder:font-outfit font-outfit border-gray-light placeholder:text-theme-text-primary block h-9 w-full rounded-md border-[1px] pr-3 pl-9 text-xs leading-[17px] font-normal placeholder:text-xs',
            )}
          />
        </>
      )}
    </div>
  );
};

export default Search;
