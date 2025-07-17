import { AuthService } from '@/services/auth/auth';
import { verify2FaPayload } from '@/services/auth/types';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
export const useVerifyTwoFaOtp = () => {
  return useMutation({
    mutationFn: (payload: verify2FaPayload) =>
      AuthService.verify2FAOtp(payload),
    onSuccess: (data) => {
      toast.success(data?.message || 'Otp verification successful');
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.detail || 'Failed to verify otp');
      console.error('2fa otp verify error:', error);
    },
  });
};
