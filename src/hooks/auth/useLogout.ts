import { ROUTES } from '@/routes/routes';
import { AuthService } from '@/services/auth/auth';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export const useLogout = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: AuthService.logoutUser,
    onSuccess: (data) => {
      AuthService.clearAuthTokens();
      console.log(data);
      toast.success(data?.message || 'Logged out successfully');
      router.replace(ROUTES.LOGIN);
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.detail || 'Logout failed');
      console.error('Logout failed:', error);
    },
  });
};
