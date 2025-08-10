import { useQuery } from '@tanstack/react-query';
import { PriorityResponse } from '@/services/priority/priority';
import { usePriorityStore } from '@/services/priority/usePriorityStore';
import axiosInstance from '@/apiConfigs/axiosInstance';

export const usePriorities = () => {
  const setPriorities = usePriorityStore((state) => state.setPriorities);
  const setLoading = usePriorityStore((state) => state.setLoading);
  const setError = usePriorityStore((state) => state.setError);

  return useQuery({
    queryKey: ['priorities'],
    queryFn: async () => {
      setLoading(true);
      setError(null);
      try {
        const res =
          await axiosInstance.get<PriorityResponse>('/tickets/priority');
        setPriorities(res.data.data);
        return res.data.data;
      } catch (error: any) {
        setError(error.message || 'Failed to fetch priorities');
        throw error;
      } finally {
        setLoading(false);
      }
    },
    staleTime: 1000 * 60 * 5, // cache 5 minutes
  });
};
