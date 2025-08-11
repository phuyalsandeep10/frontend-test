'use client';

import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';

import { TicketCardProps } from '@/modules/ticket/types/type';

export default function TicketCard({
  email,
  timeAgo,
  title,
  priority,
  status,
  created_by,
  avatarUrl,
  checked = false,
  onCheckChange,
  priority_bg_color,
  priority_fg_color,
  status_fg_color,
  status_bg_color,
}: TicketCardProps) {
  return (
    <div
      className={cn(
        'flex w-full flex-col overflow-hidden rounded-lg bg-white shadow-md sm:flex-row',
      )}
    >
      {/* Left Vertical Badge */}
      <div
        className={cn(
          'relative flex h-[60px] w-12 items-center justify-center sm:h-auto',
        )}
        style={{
          backgroundColor: status_bg_color,
        }}
      >
        {/* White Circle - half inside, half outside */}
        <div className="absolute top-1/2 left-0 h-6 w-6 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white" />

        {/* Rotated Status Text */}
        <span
          className="text-xl font-bold whitespace-nowrap text-white sm:-rotate-90"
          style={{
            color: status_fg_color,
          }}
        >
          {status}
        </span>
      </div>

      {/* Main Content */}
      <div className={cn('flex w-full flex-col gap-2 p-4')}>
        {/* Header */}
        <div className={cn('flex items-start justify-between')}>
          <div>
            <div className="flex items-center gap-2">
              {/* Checkbox added here */}
              <input
                type="checkbox"
                checked={checked}
                onChange={(e) => onCheckChange?.(e.target.checked)}
                className="accent-brand-primary h-4 w-4 cursor-pointer"
              />
              <p
                className={cn(
                  'font-outfit w-[160px] text-sm leading-[21px] font-normal break-words whitespace-normal',
                )}
              >
                {email}
              </p>
            </div>
            <p className="font-outfit text-theme-text-primary pt-1 text-xs leading-[17px] font-normal break-words whitespace-normal">
              Created from {created_by}
            </p>
          </div>

          <div className={cn('flex items-center gap-1')}>
            <span
              className={cn(
                'font-outfit text- text-gray-primary text-base leading-[26px] font-normal',
              )}
            >
              {timeAgo}
            </span>
            <Avatar className="h-10 w-10">
              <AvatarImage src={avatarUrl} alt="User" />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
          </div>
        </div>

        {/* Title */}
        <p
          className={cn(
            'font-outfit text-gray-g pb-3 text-2xl leading-[34px] font-semibold break-words whitespace-normal',
          )}
        >
          {title}
        </p>

        {/* Priority Badge */}
        <Badge
          className={cn(
            'font-outfit w-full justify-center rounded-full py-2 text-xs leading-[20px] font-bold',
          )}
          style={{
            backgroundColor: priority_bg_color,
            color: priority_fg_color,
          }}
        >
          {priority}
        </Badge>
      </div>
    </div>
  );
}
