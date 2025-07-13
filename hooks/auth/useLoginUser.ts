import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { userRoutes } from '@/routes/userRoutes';
import { AuthService } from '@/services/auth/auth';

export const useLoginUser = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: AuthService.loginUser,
    onSuccess: (data) => {
      const authToken = {
        accessToken: data.access_token,
        refreshToken: data.refresh_token,
      };
      AuthService.setAuthTokens(authToken);
      queryClient.invalidateQueries({ queryKey: ['authUser'] });
      toast.success('Logged in successfully');
      router.replace(userRoutes.DASHBOARD);
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.detail || 'Login failed');
    },
  });
};
