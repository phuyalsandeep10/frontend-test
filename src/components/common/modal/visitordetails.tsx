import React from 'react';

interface VisitorDetailsProps {
  label: string;
  value: string;
  icon?: React.ReactNode;
}

const VisitorDetails: React.FC<VisitorDetailsProps> = ({
  label,
  value,
  icon,
}) => {
  return (
    <div>
      <p className="text-brand-dark pb-[8px] text-[14px] leading-[21px] font-semibold">
        {label}
      </p>
      <p className="text-theme-text-primary flex items-center gap-1 text-[14px] leading-[21px] tracking-[0.02em]">
        {icon}
        {value}
      </p>
    </div>
  );
};

export default VisitorDetails;
