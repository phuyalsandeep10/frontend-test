'use client';

import { usePathname, useRouter } from 'next/navigation';
import React from 'react';

import { cn } from '@/lib/utils';
import { Icons } from '@/components/ui/Icons';

const SettingsHeader = () => {
  const pathname = usePathname();
  const router = useRouter();

  const goToPrevious = () => router.back();
  const goToNext = () => router.forward();

  const segments = pathname.split('/').filter(Boolean);

  return (
    <div
      className={cn(
        'border-b-gray-light flex h-auto w-full items-center justify-between border-b px-24 xl:h-10',
      )}
    >
      <div className="text-gray-primary flex items-center gap-3 text-base font-semibold">
        <button onClick={goToPrevious} className="cursor-pointer rounded p-1">
          <Icons.arrow_left className="text-pure-black h-3.5 w-3.5" />
        </button>
        <button onClick={goToNext} className="cursor-pointer rounded p-1">
          <Icons.arrow_right className="text-pure-black h-3.5 w-3.5" />
        </button>

        {/* Clean breadcrumb with icon separator */}
        <div className="font-outfit text-pure-black flex items-center text-xs font-normal">
          {segments.map((segment, index) => (
            <React.Fragment key={index}>
              <span className="capitalize">{segment.replace(/-/g, ' ')}</span>
              {index < segments.length - 1 && (
                <Icons.chevron_right className="text-pure-black mx-2 h-4 w-4" />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      <div className="flex items-center space-x-3">
        <Icons.search size={14} className="text-pure-black" />
        <input
          type="text"
          placeholder="Search..."
          className="border-gray-primary rounded border px-3 py-1 text-sm focus:ring-2 focus:outline-none"
        />
      </div>
    </div>
  );
};

export default SettingsHeader;
