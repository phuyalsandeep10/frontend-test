import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { ROUTES } from '@/routes/routes';
import { AuthService } from '@/services/auth/auth';

export const useLoginUser = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: AuthService.loginUser,
  });
};
