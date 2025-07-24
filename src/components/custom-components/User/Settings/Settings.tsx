'use client';

import { usePathname, useRouter } from 'next/navigation';
import SubSidebarContentWrapper from '../CustomUserSidebar/SubSidebarContentWrapper';
import SubSettingsSidebarMenus from './SubSettingsSidebarMenus';
import React from 'react';
import PreviousArrow from '@/assets/svg/PreviousArrow';
import NextArrow from '@/assets/svg/NextArrow';
import Arrow from '@/assets/svg/Arrow';
import { Search } from 'lucide-react';
import { cn } from '@/lib/utils';

const Settings = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const router = useRouter();

  // Split and clean the path, removing empty segments
  const segments = pathname.split('/').filter(Boolean);
  const breadcrumbs = segments.slice(1); // Remove 'index[0]' or similar first segment

  // Navigate browser history
  const goToPrevious = () => router.back();
  const goToNext = () => router.forward();

  return (
    <div className="flex h-full">
      <SubSidebarContentWrapper>
        <SubSettingsSidebarMenus />
      </SubSidebarContentWrapper>

      <div className="flex-1">
        <div>
          <div
            className={cn(
              'border-b-gray-light flex h-auto w-full items-center justify-between border-b px-24 xl:h-10',
            )}
          >
            <div
              className={cn(
                'text-gray-primary flex items-center gap-3 text-base font-semibold',
              )}
            >
              {/* Prev / Next buttons */}
              <button
                onClick={goToPrevious}
                className={cn('cursor-pointer rounded p-1')}
              >
                <PreviousArrow />
              </button>
              <button
                onClick={goToNext}
                className={cn('cursor-pointer rounded p-1')}
              >
                <NextArrow />
              </button>

              {/* Breadcrumb path */}
              <div className={cn('flex cursor-pointer items-center gap-2')}>
                {breadcrumbs.map((crumb, index) => (
                  <span
                    key={index}
                    className={cn(
                      'text-pure-black font-outfit flex items-center text-[12px] leading-[17px] font-normal',
                    )}
                  >
                    {index > 0 && (
                      <span className="mx-3 cursor-pointer">
                        <Arrow />
                      </span>
                    )}
                    <span className="capitalize">
                      {crumb.replace(/-/g, ' ')}
                    </span>
                  </span>
                ))}
              </div>
            </div>
            <div className={cn('flex cursor-pointer items-center space-x-3')}>
              <Search
                size={14}
                className={cn('text-pure-black cursor-pointer')}
              />
              <input
                type="text"
                placeholder="Search..."
                className={cn(
                  'border-gray-primary cursor-pointer rounded border px-3 py-1 text-sm focus:ring-2 focus:outline-none',
                )}
              />
            </div>
          </div>

          <div className="px-24 py-11">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
