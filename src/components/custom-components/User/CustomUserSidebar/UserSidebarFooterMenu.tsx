'use client';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';
import Image from 'next/image';
import React from 'react';
import { cn } from '@/lib/utils';
import { Icons } from '@/components/ui/Icons';

const UserSidebarFooterMenu = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div
          className={cn(
            'corsor transition-colors-pointer flex w-full cursor-pointer items-center gap-3 rounded-md',
          )}
        >
          {/* Avatar with gradient ring */}
          <div
            className={cn(
              'from-theme-text-dark via-brand-text to-brand-primary font-outfit rounded-full bg-gradient-to-r p-[2px]',
            )}
          >
            <div className={cn('rounded-full bg-white')}>
              <Image
                src="/avatar.jpg"
                alt="User"
                width={32}
                height={32}
                className={cn('rounded-full object-cover')}
              />
            </div>
          </div>

          {/* Name & Email */}
          <div className={cn('flex flex-col text-left leading-[29px]')}>
            <span
              className={cn(
                'text-theme-text-dark font-outfit text-lg font-medium',
              )}
            >
              Yubesh here
            </span>
            <span
              className={cn(
                'text-theme-text-primary font-outfit text-xs font-normal',
              )}
            >
              yubeshkoira@mail.com
            </span>
          </div>

          {/* Right arrow */}
          <Icons.chevron_right className="h-6 w-6" />
        </div>
      </DropdownMenuTrigger>

      {/* Optional Dropdown Content */}

      <DropdownMenuContent side="top" className={cn('w-full')}>
        <DropdownMenuItem
          className={cn('hover:bg-muted w-full cursor-pointer text-sm')}
        >
          Profile
        </DropdownMenuItem>
        <DropdownMenuItem
          className={cn('hover:bg-muted w-full cursor-pointer text-sm')}
        >
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserSidebarFooterMenu;
