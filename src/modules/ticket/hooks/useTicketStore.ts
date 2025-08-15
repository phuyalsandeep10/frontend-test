import { create } from 'zustand';
import { Ticket } from '../types/getTicket';

type TicketStore = {
  tickets: Ticket[];
  setTickets: (tickets: Ticket[]) => void;
};

export const useTicketStore = create<TicketStore>((set) => ({
  tickets: [],
  setTickets: (tickets) => set({ tickets }),
}));
