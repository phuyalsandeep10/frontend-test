export interface TicketType {
  id: number;
  title: string;
  customer_email: string;
  created_by_id: number;
  priority_id: number;
  status_id: number;
  created_at: string;
}

export interface TicketResponse {
  success: boolean;
  message: string;
  data: TicketType[];
}
