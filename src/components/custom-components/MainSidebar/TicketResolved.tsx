'use client';

import { ReactNode } from 'react';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from '@/components/ui/tooltip';

interface TicketResolvedProps {
  resolved: number;
  total: number;
  label?: string;
  icon?: ReactNode;
  className?: string;
  collapsed?: boolean;
}

export default function TicketResolved({
  resolved,
  total,
  label,
  icon,
  className = '',
  collapsed = false,
}: TicketResolvedProps) {
  const percentage = (resolved / total) * 100;

  if (collapsed) {
    return (
      <Tooltip>
        <TooltipTrigger asChild>
          <div
            className={cn(
              'w-12 max-w-md cursor-pointer transition-all duration-300',
              className,
            )}
          >
            <div className="flex items-center justify-between pb-1">
              <div className="text-brand-dark flex min-w-0 items-center justify-center gap-1">
                {icon}
              </div>

              <span className="text-brand-dark font-outfit text-[10px] font-normal">
                {resolved}/{total}
              </span>
            </div>

            <Progress
              value={percentage}
              className="bg-theme-text-light h-1 w-full rounded-xl transition-all duration-300"
              indicatorClassName="bg-brand-primary rounded-xl"
            />
          </div>
        </TooltipTrigger>

        <TooltipContent side="right" className="text-xs">
          {label}
        </TooltipContent>
      </Tooltip>
    );
  }

  return (
    <div
      className={cn('w-full max-w-md transition-all duration-300', className)}
    >
      <div className="flex items-center justify-between pb-1">
        <div className="text-brand-dark flex min-w-0 items-center gap-1">
          {icon}
          {!collapsed && (
            <span className="font-outfit max-w-[8rem] truncate text-xs font-normal">
              {label}
            </span>
          )}
        </div>

        <span className="text-brand-dark font-outfit text-xs font-normal">
          {resolved}/{total}
        </span>
      </div>

      <Progress
        value={percentage}
        className="bg-theme-text-light h-1 w-full rounded-xl transition-all duration-300"
        indicatorClassName="bg-brand-primary rounded-xl"
      />
    </div>
  );
}
