import { queryClient } from '@/providers/query-provider';
import { AuthService } from '@/services/auth/auth';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

export const useDisable2Fa = () => {
  return useMutation({
    mutationFn: AuthService.disable2Fa,
    onSuccess: (data) => {
      console.log(data);
      toast.success(
        data?.message || 'Two Factor authentication disabled successfully',
      );
      queryClient.invalidateQueries({ queryKey: ['authUser'] });
    },
    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message ||
          'Failed to disable 2 factor authentication',
      );
      console.log(error);
    },
  });
};
