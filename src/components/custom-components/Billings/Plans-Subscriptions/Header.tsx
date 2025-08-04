'use client';
import React from 'react';
import { Icons } from '@/components/ui/Icons';
import { HeaderComponentProps } from './types';

const HeaderComponent: React.FC<HeaderComponentProps> = ({ heading }) => {
  return (
    <div className="flex items-center gap-2">
      <h1 className="text-brand-dark text-[32px] leading-10 font-semibold">
        {heading}
      </h1>
      <span className="flex items-center">
        <Icons.help className="text-theme-text-primary h-6 w-6" />
      </span>
    </div>
  );
};

export default HeaderComponent;
