import { AuthService } from '@/services/auth/auth';
import { ForgotPasswordPayload } from '@/services/auth/types';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

export const useForgotPassword = () => {
  return useMutation({
    mutationFn: (payload: ForgotPasswordPayload) =>
      AuthService.forgotPassword(payload),
    onSuccess: (data) => {
      toast.success(data?.message || 'Password reset email sent successfully');
      console.log('Forgot Password success:', data);
    },
    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message ||
          'Failed to submit forgot password request',
      );
      console.error('Forgot Password error:', error);
    },
  });
};
