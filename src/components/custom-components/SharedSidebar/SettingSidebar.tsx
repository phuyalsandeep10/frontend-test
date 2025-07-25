'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Icons } from '@/components/ui/Icons';

export interface SidebarItem {
  label: string;
  href: string;
  icon: React.ReactNode;
}

interface SidebarSectionProps {
  title: string;
  items: SidebarItem[];
  isOpen: boolean;
  onToggle: (title: string) => void;
}

const SidebarSection: React.FC<SidebarSectionProps> = ({
  title,
  items,
  isOpen,
  onToggle,
}) => {
  const pathname = usePathname();

  return (
    <div>
      <button
        onClick={() => onToggle(title)}
        className={cn(
          `hover:text-brand-primary font-outfit flex w-full cursor-pointer items-center justify-between gap-5 pb-4 text-sm font-normal`,
          {
            'text-brand-primary': isOpen,
            'text-brand-dark': !isOpen,
          },
        )}
      >
        {title}
        {isOpen ? (
          <Icons.chevron_up className="h-5 w-5" />
        ) : (
          <Icons.chevron_down className="h-5 w-5" />
        )}
      </button>

      {isOpen && items.length > 0 && (
        <div
          className={cn(
            'font-outfit mb-4.5 flex flex-col gap-5 text-sm font-normal',
          )}
        >
          {items.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.label}
                href={item.href}
                className={cn(
                  `flex items-center gap-3 ${
                    isActive ? 'text-brand-primary' : 'text-brand-dark'
                  } hover:text-brand-primary`,
                )}
              >
                {item.icon}
                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default SidebarSection;
