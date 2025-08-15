import { useQuery } from '@tanstack/react-query';
import axiosInstance from '@/apiConfigs/axiosInstance';

export const useGetorganizationDetails = () => {
  return useQuery({
    queryKey: ['getOrganizationDetails'],
    queryFn: async () => {
      const res = await axiosInstance.get('/organizations');
      if (res.data) {
        console.log(res.data);
      }
      return res.data;
    },
    refetchOnWindowFocus: false,
    refetchOnMount: true,
  });
};
