import { useQuery } from '@tanstack/react-query';
import axiosInstance from '@/apiConfigs/axiosInstance';

export const useCustomers = (organizationId: number) => {
  return useQuery({
    queryKey: ['customers', organizationId],
    queryFn: async () => {
      const { data } = await axiosInstance.get(
        `/customers?organizationId=${organizationId}`,
      );
      return data.data;
    },
    enabled: !!organizationId,
  });
};
