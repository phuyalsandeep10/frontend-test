'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from '@/components/ui/tooltip';

interface SidebarProps {
  label: string;
  icon: React.ComponentType<any>;
  route: string;
}

interface SidebarListProps {
  title: string;
  sidebar: SidebarProps[];
  collapsed?: boolean;
  className?: string;
}

const SidebarList: React.FC<SidebarListProps> = ({
  title,
  sidebar,
  className = '',
  collapsed = false,
}) => {
  const router = useRouter();

  const handleNavigate = (route: string) => {
    router.push(route);
  };

  return (
    <div className={cn('w-full pt-10')}>
      {!collapsed && (
        <h2 className="text-brand-primary font-outfit pb-3 text-sm font-semibold">
          {title}
        </h2>
      )}

      <div className={`space-y-6 ${className}`}>
        {sidebar.map(({ label, icon: Icon, route }) => {
          const buttonContent = (
            <button
              key={label}
              onClick={() => handleNavigate(route)}
              className={cn(
                'font-outfit text-theme-text-dark hover:text-brand-primary flex cursor-pointer items-center gap-2 text-sm font-normal transition-colors',
                collapsed && 'justify-center',
              )}
            >
              <Icon className="h-5 w-5" />
              {!collapsed && <span>{label}</span>}
            </button>
          );

          return collapsed ? (
            <Tooltip key={label}>
              <TooltipTrigger asChild>{buttonContent}</TooltipTrigger>
              <TooltipContent side="right" className="text-xs">
                {label}
              </TooltipContent>
            </Tooltip>
          ) : (
            buttonContent
          );
        })}
      </div>
    </div>
  );
};

export default SidebarList;
