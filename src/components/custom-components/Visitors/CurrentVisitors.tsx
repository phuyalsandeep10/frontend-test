'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { CurrentVisitorsProps } from './types';

const CurrentVisitors: React.FC<CurrentVisitorsProps> = ({
  title,
  description,
  highlightText,
  buttonText,
  buttonIcon,
}) => {
  return (
    <div className="mb-10">
      <div className="flex items-center justify-between">
        <p className="text-brand-dark text-xl leading-7.5 font-semibold">
          {title}
        </p>
        <Button variant="success" leftIcon={buttonIcon}>
          {buttonText}
        </Button>
      </div>
      <p className="text-theme-text-primary mb-2 text-xs leading-4.5">
        {description}
      </p>
      <p className="text-brand-dark text-[14px] leading-5 font-semibold">
        {highlightText}
      </p>
    </div>
  );
};

export default CurrentVisitors;
