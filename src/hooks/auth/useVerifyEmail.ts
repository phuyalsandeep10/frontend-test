import { userRoutes } from '@/routes/userRoutes';
import { AuthService } from '@/services/auth/auth';
import { VerifyEmailpayload } from '@/services/auth/types';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export const useVerifyEmail = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: (payload: VerifyEmailpayload) =>
      AuthService.verifyEmail(payload),
    onSuccess: (data) => {
      toast.success(data?.message || 'Email verified successfully');
      // router.replace(userRoutes.LOGIN);
      console.log('Verify email success:', data);
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.detail || 'Email verification failed');
      console.error('Verify email error:', error);
    },
  });
};
