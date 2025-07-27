import * as React from 'react';
import { cn } from '@/lib/utils';

const Progress = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    value?: number;
    indicatorClassName?: string;
  }
>(({ className, value, indicatorClassName, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      'bg-secondary relative w-full overflow-hidden rounded-full',
      className,
    )}
    {...props}
  >
    <div
      className={cn(
        'bg-primary h-full w-full flex-1 transition-all',
        indicatorClassName,
      )}
      style={{ width: `${value}%` }}
    />
  </div>
));

Progress.displayName = 'Progress';

export { Progress };
