import { useQuery } from '@tanstack/react-query';
import axiosInstance from '@/apiConfigs/axiosInstance';

export const useTeamMembers = (teamId?: string | number) => {
  return useQuery({
    queryKey: ['team-members', teamId],
    queryFn: async () => {
      if (!teamId) return [];

      const response = await axiosInstance.get(`/teams/${teamId}/team-members`);
      return response.data.data;
    },
    enabled: !!teamId,
  });
};
