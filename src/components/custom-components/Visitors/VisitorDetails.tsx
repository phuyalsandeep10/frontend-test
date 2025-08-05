import React from 'react';
import { VisitorDetailsProps } from './types';

const VisitorDetails: React.FC<VisitorDetailsProps> = ({
  label,
  value,
  icon,
}) => {
  return (
    <div>
      <p className="text-brand-dark pb-2 text-sm leading-5 font-semibold">
        {label}
      </p>
      <p className="text-theme-text-primary flex items-center gap-1 text-sm leading-5">
        {icon}
        {value}
      </p>
    </div>
  );
};

export default VisitorDetails;
