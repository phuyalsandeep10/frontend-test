import { useQuery } from '@tanstack/react-query';
import axiosInstance from '@/apiConfigs/axiosInstance';
import { useTicketStore } from '../useTicketStore';
import { Ticket } from '../../types/getTicket';
import { useEffect } from 'react';

const fetchTickets = async (): Promise<Ticket[]> => {
  const { data } = await axiosInstance.get('/tickets/');
  return data.data;
};

const fetchTicketsByStatus = async (statusId: number): Promise<Ticket[]> => {
  const { data } = await axiosInstance.post('/tickets/by-status', {
    status_id: statusId,
  });
  return data.data;
};

export const useTickets = (statusId?: number) => {
  const setTickets = useTicketStore((state) => state.setTickets);

  const query = useQuery<Ticket[], Error>({
    queryKey: ['tickets', statusId ?? 'all'],
    queryFn: () => (statusId ? fetchTicketsByStatus(statusId) : fetchTickets()),
  });

  // Sync Zustand store when tickets data arrives
  useEffect(() => {
    if (query.data) {
      setTickets(query.data);
    }
  }, [query.data, setTickets]);

  return query;
};
