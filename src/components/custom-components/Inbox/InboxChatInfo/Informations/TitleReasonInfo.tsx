import React from 'react';
import InformationsWrapper from './InformationsWrapper';
import { Icons } from '@/components/ui/Icons';
import { cn } from '@/lib/utils';

interface TitleReasonInfoProps {
  icon: React.ReactNode;
  title: string;
  content: string;
  className?: string;
}

const TitleReasonInfo = ({
  icon: Icon,
  title,
  content,
  className = '',
}: TitleReasonInfoProps) => {
  return (
    <InformationsWrapper>
      <div>
        <div className="mb-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            {Icon}
            <span className="text-theme-text-dark font-medium">{title}</span>
          </div>

          <Icons.plus_circle className="text-theme-text-dark h-5 w-5 cursor-pointer" />
        </div>
        <div className="border-theme-text-primary text-theme-text-primary rounded-lg border p-3 text-sm font-normal">
          <p>{content}</p>
        </div>
      </div>
    </InformationsWrapper>
  );
};

export default TitleReasonInfo;
