import { toast } from 'sonner';
import { CustomToast } from '@/components/ui/CustomToast';

type ToastVariant = 'success' | 'error' | 'info' | 'warning' | 'default';
type ToastPosition =
  | 'top-left'
  | 'top-center'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-center'
  | 'bottom-right';

interface ToastOptions {
  title?: string;
  description?: string;
  duration?: number;
  variant?: ToastVariant;
  position?: ToastPosition;
}

export function showToast({
  title,
  description,
  duration = 3000,
  variant = 'default',
  position = 'top-right',
}: ToastOptions) {
  toast.custom(
    (id: string | number) => (
      <CustomToast
        id={id}
        title={title}
        description={description}
        variant={variant}
      />
    ),
    {
      duration,
      position,
    },
  );
}
