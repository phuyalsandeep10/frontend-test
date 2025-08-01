'use client';

import React from 'react';
import { Button } from '@/components/ui/button';

type CurrentVisitorsProps = {
  title: string;
  description: string;
  highlightText: string;
  buttonText: string;
  buttonIcon?: React.ReactNode;
};

const CurrentVisitors: React.FC<CurrentVisitorsProps> = ({
  title,
  description,
  highlightText,
  buttonText,
  buttonIcon,
}) => {
  return (
    <div className="mb-[40px]">
      <div className="flex items-center justify-between">
        <p
          className="text-brand-dark text-[20px] leading-[30px] font-semibold"
          style={{ letterSpacing: '-0.001em' }}
        >
          {title}
        </p>
        <Button variant="success" leftIcon={buttonIcon}>
          {buttonText}
        </Button>
      </div>
      <p
        className="text-theme-text-primary mb-[8px] text-[12px] leading-[17px]"
        style={{ letterSpacing: '0.002em' }}
      >
        {description}
      </p>
      <p className="text-brand-dark text-[14px] leading-[21px] font-semibold">
        {highlightText}
      </p>
    </div>
  );
};

export default CurrentVisitors;
