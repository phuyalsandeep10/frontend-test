import { queryClient } from '@/providers/query-provider';
import { AuthService } from '@/services/auth/auth';
import { verify2FaPayload } from '@/services/auth/types';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
export const useVerifyTwoFaOtp = () => {
  return useMutation({
    mutationFn: (payload: verify2FaPayload) =>
      AuthService.verify2FAOtp(payload),
  });
};
