import React from 'react';
import Logo from '@/assets/svg/Logo';
import { cn } from '@/lib/utils';
const UserSidebarHeader = () => {
  return (
    <div className="flex">
      <div>
        <Logo />
      </div>
      <div>
        <h1
          className={cn(
            'from-theme-text-dark via-brand-text to-brand-primary font-outfit bg-gradient-to-r bg-clip-text text-[18px] leading-[29px] font-medium text-transparent',
          )}
        >
          Brahamabyte Lab
        </h1>
        <p
          className={cn(
            'text-theme-text-primary font-outfit text-[12px] leading-[17px] font-normal',
          )}
        >
          brahmabytelab.com
        </p>
      </div>
    </div>
  );
};

export default UserSidebarHeader;
