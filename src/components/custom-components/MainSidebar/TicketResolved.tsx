'use client';

import TicketIcon from '@/assets/svg/TicketIcon';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';

interface TicketResolvedProps {
  resolved: number;
  total: number;
  label?: string;
  className?: string;
}

export default function TicketResolved({
  resolved,
  total,
  label,
  className = '',
}: TicketResolvedProps) {
  const percentage = (resolved / total) * 100;

  return (
    <div className={cn(`w-full max-w-md ${className}`)}>
      <div className={cn('flex items-center justify-between pb-1')}>
        <div className={cn('text-brand-primary flex items-center gap-1')}>
          <TicketIcon />
          <span
            className={cn(
              'text-brand-dark font-outfit text-[12px] font-normal',
            )}
          >
            {label}
          </span>
        </div>
        <span
          className={cn('text-brand-dark font-outfit text-[12px] font-normal')}
        >
          {resolved}/{total}
        </span>
      </div>
      <Progress
        value={percentage}
        className={cn('bg-theme-text-light h-[4px] rounded-[10px]')}
        indicatorClassName={cn('bg-brand-primary rounded-[10px]')}
      />
    </div>
  );
}
