'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';

interface SidebarProps {
  label: string;
  icon: React.ComponentType<any>;
  route: string;
}

interface SidebarListProps {
  title: string;
  sidebar: SidebarProps[];
}

const SidebarList: React.FC<SidebarListProps> = ({ title, sidebar }) => {
  const router = useRouter();

  const handleNavigate = (route: string) => {
    router.push(route);
  };

  return (
    <div className={cn('w-full pt-10')}>
      <h2
        className={cn(
          'text-brand-primary font-outfit pb-3 text-sm font-semibold',
        )}
      >
        {title}
      </h2>

      <div className={cn('space-y-6 pb-6')}>
        {sidebar.map(({ label, icon: Icon, route }) => (
          <button
            key={label}
            onClick={() => handleNavigate(route)}
            className={cn(
              'font-outfit text-theme-text-dark hover:text-brand-primary flex cursor-pointer items-center gap-2 text-sm font-normal transition-colors',
            )}
          >
            <Icon className={cn('h-5 w-5')} />
            {label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SidebarList;
