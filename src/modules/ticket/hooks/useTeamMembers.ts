// hooks/useTeamMembers.ts
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export const useTeamMembers = (teamId?: string | number) => {
  return useQuery({
    queryKey: ['team-members', teamId],
    queryFn: async () => {
      if (!teamId) return [];
      const response = await axios.get(`/teams/${teamId}/team-members`);
      return response.data;
    },
    enabled: !!teamId, // only run if teamId is truthy
  });
};
