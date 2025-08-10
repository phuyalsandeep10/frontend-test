import * as React from 'react';
import { Label as ShadcnLabel } from '@/components/ui/label';

type LabelProps = {
  htmlFor: string;
  children?: React.ReactNode;
  required?: boolean;
  className?: string;
};

const Label: React.FC<LabelProps> = ({
  htmlFor,
  children,
  required = false,
  className = '',
}) => {
  return (
    <ShadcnLabel
      htmlFor={htmlFor}
      className={`text-brand-dark font-outfit mb-1 block text-[20px] leading-[30px] font-semibold ${className}`}
    >
      {children}
      {required && <span className="text-error ml-1">*</span>}
    </ShadcnLabel>
  );
};

export default Label;
