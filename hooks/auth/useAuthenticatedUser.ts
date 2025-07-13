import { useQuery } from '@tanstack/react-query';
import axiosInstance from '@/apiConfigs/axiosInstance';
import { AuthService } from '@/services/auth/auth';

interface User {
  id: number;
  name: string;
  email: string;
  mobile: string | null;
  email_verified_at: string | null;
  is_staff: boolean;
  is_superuser: boolean;
  is_active: boolean;
  image: string | null;
  attributes: any | null;
  created_at: string;
  updated_at: string;
}

export const useAuthenticatedUser = () => {
  const tokens = AuthService.getAuthTokens();

  return useQuery<User | null>({
    queryKey: ['authUser'],
    queryFn: async () => {
      if (!tokens?.accessToken) return null;
      const res = await axiosInstance.get('/auth/me');
      return res.data;
    },
    refetchInterval: 30000,
    refetchIntervalInBackground: true,
  });
};
