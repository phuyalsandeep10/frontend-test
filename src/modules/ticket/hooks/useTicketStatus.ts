import { useQuery } from '@tanstack/react-query';
import axiosInstance from '@/apiConfigs/axiosInstance';

export type TicketStatus = {
  id: number;
  name: string;
  fg_color: string;
  bg_color: string;
  is_default: boolean;
  status_category: string;
};

type StatusResponse = {
  success: boolean;
  message: string;
  data: TicketStatus[];
};

export const useTicketStatuses = () => {
  return useQuery({
    queryKey: ['ticket-statuses'],
    queryFn: async (): Promise<TicketStatus[]> => {
      const res = await axiosInstance.get<StatusResponse>('/tickets/status');
      return res.data.data;
    },
    staleTime: 1000 * 60 * 5,
  });
};
