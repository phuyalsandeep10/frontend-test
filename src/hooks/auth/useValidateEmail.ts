import { AuthService } from '@/services/auth/auth';
import { useMutation } from '@tanstack/react-query';
export const useValidateEmail = () => {
  return useMutation({
    mutationFn: (payload: string) => AuthService.validateEmail(payload),
    onSuccess: (data) => {
      console.log('Validated Email', data);
    },
    onError: (error: any) => {
      console.error('Email validate error:', error);
    },
  });
};
