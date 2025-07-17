import { AuthService } from '@/services/auth/auth';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

export const useDisable2Fa = () => {
  return useMutation({
    mutationFn: AuthService.disable2Fa,
    onSuccess: (data) => {
      console.log(data);
      toast.success(
        data?.message || '2 Factor authentication disabled successfully',
      );
    },
    onError: (error: any) => {
      toast.error(
        error?.response?.data?.detail ||
          'Failed to disable 2 factor authentication',
      );
      console.log(error);
    },
  });
};
