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
  });
};
