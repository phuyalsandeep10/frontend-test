import { useQuery } from '@tanstack/react-query';
// import axiosInstance from '@/services/priority/lib/axios';
import axiosInstance from '@/apiConfigs/axiosInstance';
import { useTeamStore } from '@/services/teams/useTeamStore';
import { TeamResponse } from '@/services/teams/team';

export const useTeams = () => {
  const setTeams = useTeamStore((state) => state.setTeams);
  const setLoading = useTeamStore((state) => state.setLoading);
  const setError = useTeamStore((state) => state.setError);

  return useQuery({
    queryKey: ['teams'],
    queryFn: async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await axiosInstance.get<TeamResponse>('/teams');
        setTeams(res.data.data);
        return res.data.data;
      } catch (error: any) {
        setError(error.message || 'Failed to fetch teams');
        throw error;
      } finally {
        setLoading(false);
      }
    },
    staleTime: 1000 * 60 * 5,
  });
};
