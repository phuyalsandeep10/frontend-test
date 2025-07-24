import { Icons } from '@/components/ui/Icons';
import React from 'react';

const ErrorText = ({ error }: { error: string }) => {
  return (
    <div className="mt-2 flex items-center gap-1.5">
      <Icons.error_warning className="text-error h-4 w-4" />
      <p className="text-error text-xs">{error}</p>
    </div>
  );
};

export default ErrorText;
