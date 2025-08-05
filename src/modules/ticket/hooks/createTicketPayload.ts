import axiosInstance from '@/apiConfigs/axiosInstance';

import { TicketFormData } from '@/lib/ticket.schema';

export interface TicketApiPayload {
  title: string;
  description: string;
  sender_domain: string;
  notes?: string;
  attachment?: string;
  priority_id: number;
  department_id: number;
  customer_id?: number;
  customer_name?: string;
  customer_email: string;
  customer_phone?: string;
  customer_location?: string;
  assignees: number[];
}

export function mapFormDataToPayload(
  formData: TicketFormData,
  options: {
    priorityId: number;
    departmentId: number;
    customerId?: number;
    assigneeIds: number[];
    attachment?: string;
  },
): TicketApiPayload {
  return {
    title: formData.ticket,
    description: formData.description,
    sender_domain: formData.sender,
    notes: formData.notes || '',
    attachment: options.attachment || '',
    priority_id: options.priorityId,
    department_id: options.departmentId,
    customer_id: options.customerId,
    customer_name: formData.customerName || '',
    customer_email: formData.email,
    customer_phone: formData.customerPhone || '',
    customer_location: formData.customerCompany || '',
    assignees: options.assigneeIds,
  };
}

export async function createTicket(payload: TicketApiPayload) {
  try {
    const response = await axiosInstance.post('/tickets', payload);
    return response.data;
  } catch (error) {
    throw error;
  }
}
