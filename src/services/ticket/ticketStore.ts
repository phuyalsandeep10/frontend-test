// stores/ticketStore.ts
import { create } from 'zustand';

interface Ticket {
  id: number;
  title: string;
  description: string;
  // add other relevant fields here if needed
}

interface TicketState {
  tickets: Ticket[];
  setTickets: (tickets: Ticket[]) => void;
}

export const useTicketStore = create<TicketState>((set) => ({
  tickets: [],
  setTickets: (tickets) => set({ tickets }),
}));
