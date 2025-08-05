import { ROUTES } from '@/routes/routes';
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
  });
};
