import { create } from 'zustand';

export type Attachment = {
  attachment: string;
};

export type Priority = {
  level: number;
  fg_color: string;
  id: number;
  name: string;
  bg_color: string;
};

export type Status = {
  id: number;
  name: string;
  fg_color: string;
  status_category: string;
  bg_color: string;
  is_default: boolean;
};

export type SLA = {
  id: number;
  name: string;
  resolution_time: number;
  created_at: string;
  response_time: number;
  priority_id: number;
};

export type Department = {
  id: number;
  name: string;
  description: string;
};

export type CreatedBy = {
  email: string;
  name: string;
};

export type Customer = {
  name?: string;
  email?: string;
  phone?: string;
  location?: string;
  is_online?: boolean;
};

export type Ticket = {
  id: number;
  title: string;
  description: string;
  attachment: Attachment[];
  priority: Priority;
  status: Status;
  sla: SLA;
  department: Department;
  created_by: CreatedBy;
  assignees: any[];
  created_at: string;
  opened_at: string | null;
  is_spam: boolean;
  customer?: Customer;
  customer_email?: string;
};

type TicketStore = {
  tickets: Ticket[];
  setTickets: (tickets: Ticket[]) => void;
};

export const getTicket = create<TicketStore>((set) => ({
  tickets: [],
  setTickets: (tickets) => set({ tickets }),
}));
