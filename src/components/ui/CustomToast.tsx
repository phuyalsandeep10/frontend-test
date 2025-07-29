import React from 'react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import { Info, AlertTriangle } from 'lucide-react';
import { Icons } from './Icons';

interface CustomToastProps {
  id: string | number;
  title?: string;
  description?: string;
  variant?: 'success' | 'error' | 'info' | 'warning' | 'default';
}

export const CustomToast: React.FC<CustomToastProps> = ({
  id,
  title,
  description,
  variant = 'default',
}) => {
  const variantClasses = {
    success:
      'bg-prominent-success text-outfit font-normal text-base text-gray-primary border-success border-1 w-76 h-20 ',
    error:
      'w-96 h-24 border-1 bg-error-bg text-outfit font-normal text-base text-alert-prominent border-error',
    info: 'bg-blue-100 text-blue-800 border-blue-500',
    warning: 'bg-yellow-100 text-yellow-800 border-yellow-500',
    default: 'bg-gray-100 text-gray-800 border-gray-400',
  };

  const iconMap = {
    success: <Icons.success_toast className="bg-success h-6 w-6 text-white" />,
    error: <Icons.x className="bg-alert-prominent mt-1 h-6 w-6 text-white" />,
    info: <Info className="h-5 w-5 text-blue-600" />,
    warning: <AlertTriangle className="h-5 w-5 text-yellow-600" />,
    default: <Info className="h-5 w-5 text-gray-600" />,
  };

  return (
    <div
      className={cn(
        'relative flex w-full max-w-sm items-center gap-4 rounded-lg border p-4 shadow-md',
        variantClasses[variant],
      )}
    >
      {/* Icon */}
      <div className="mt-3">{iconMap[variant]}</div>

      {/* Content */}
      <div className="flex-1">
        {title && <h4 className="text-base font-semibold">{title}</h4>}
        {description && <p className="mt-1 text-base">{description}</p>}
      </div>

      {/* Close Button */}
      <button
        onClick={() => toast.dismiss(id)}
        className="text-gray-primary absolute top-2 right-2"
        aria-label="Close"
      >
        <Icons.x className="w-6- mt-5 mr-5 h-6 cursor-pointer" />
      </button>
    </div>
  );
};
