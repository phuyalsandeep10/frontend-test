import { AuthService } from '@/services/auth/auth';
import { ResetPasswordpayload } from '@/services/auth/types';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

export const useResetPassword = () => {
  return useMutation({
    mutationFn: (payload: ResetPasswordpayload) =>
      AuthService.resetPassword(payload),
    onSuccess: (data) => {
      toast.success(data?.message || 'Password reset successfully!');
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.detail || 'Password reset failed!');
    },
  });
};
