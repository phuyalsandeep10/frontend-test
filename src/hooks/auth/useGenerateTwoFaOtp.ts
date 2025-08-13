import { AuthService } from '@/services/auth/auth';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

export const useGenerateTwoFaOtp = () => {
  return useMutation({
    mutationFn: AuthService.generate2FAOtp,
    onSuccess: (response) => {
      const data = response?.data;
      console.log(data);
      toast.success(
        data?.message || '2 Factor authentication otp generated  successfully',
      );
    },
    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message ||
          'Failed to generate 2 factor authentication otp',
      );
      console.log(error);
    },
  });
};
