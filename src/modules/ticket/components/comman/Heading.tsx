import React from 'react';
import { cn } from '@/lib/utils';

type SectionHeaderProps = {
  title: string;
  icon?: React.ReactNode;
  description?: string;
  descriptionIcon?: React.ReactNode;
  className?: string;
};

const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  icon,
  description,
  descriptionIcon,
  className,
}) => {
  return (
    <div className={cn('', className)}>
      <h1 className="font-outfit text-brand-dark flex items-center gap-2 text-3xl leading-[40px] font-semibold">
        {title}
        {icon && <span>{icon}</span>}
      </h1>
      {description && (
        <p className="font-outfit text-gray-primary flex items-center gap-1 pt-2 text-xs leading-[17px] font-normal">
          {descriptionIcon && <span>{descriptionIcon}</span>}
          {description && <span> {description}</span>}
        </p>
      )}
    </div>
  );
};

export default SectionHeader;
