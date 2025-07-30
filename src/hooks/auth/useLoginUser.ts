import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { ROUTES } from '@/routes/routes';
import { AuthService } from '@/services/auth/auth';

export const useLoginUser = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: AuthService.loginUser,
    onSuccess: (data) => {
      const authToken = {
        accessToken: data?.data?.access_token,
        refreshToken: data?.data?.refresh_token,
      };
      AuthService.setAuthTokens(authToken);
      toast.success(data?.message || 'Logged in successfully');
      router.replace(ROUTES.DASHBOARD);
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.detail || 'Login failed');
    },
  });
};
