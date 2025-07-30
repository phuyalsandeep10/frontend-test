import { ROUTES } from '@/routes/routes';
import { AuthService } from '@/services/auth/auth';
import { ForgotPasswordVerifyPayload } from '@/services/auth/types';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export const useForgotPasswordVerify = () => {
  const router = useRouter();
  return useMutation({
    mutationFn: (payload: ForgotPasswordVerifyPayload) =>
      AuthService.forgotPasswordVerify(payload),
    onSuccess: (data) => {
      toast.success(data?.message || 'Password reset verified successfully');
      router.replace(ROUTES.LOGIN);
      console.log('Forgot Password Verify success:', data);
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.detail || 'Verification failed');
      console.error('Forgot Password Verify error:', error);
    },
  });
};
