import { AuthService } from '@/services/auth/auth';
import { resendOtpPayloads } from '@/services/auth/types';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

export const useResendOtp = () => {
  return useMutation({
    mutationFn: (payload: resendOtpPayloads) => AuthService.resendOtp(payload),
    onSuccess: (data) => {
      toast.success(data?.message || 'OTP send successfully');
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.detail || 'Failed to send OTP');
      console.error('Failed to send OTP:', error);
    },
  });
};
