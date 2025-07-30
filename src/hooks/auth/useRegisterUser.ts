import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { ROUTES } from '@/routes/routes';
import { RegisterPayload } from '@/services/auth/types';
import { AuthService } from '@/services/auth/auth';

export const useRegisterUser = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: (payload: RegisterPayload) => AuthService.registerUser(payload),
    onSuccess: (data) => {
      toast.success(data?.message || 'Registration successful!');
      // router.push(ROUTES.LOGIN);
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.detail || 'Registration failed');
    },
  });
};
