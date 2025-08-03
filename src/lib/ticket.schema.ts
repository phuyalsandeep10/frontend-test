import { z } from 'zod';

export const ticketSchema = z.object({
  ticket: z.string().min(1, 'Ticket topic is required'),
  email: z
    .string()
    .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Please enter a valid email address'),
  priority: z.string().min(1, 'Priority is required'),
  member: z.string().min(1, 'Member is required'),
  team: z.string().min(1, 'Team are  required'),
  sender: z.string().min(1, "Sender's domain is required"),
  description: z.string().min(1, 'Description is required'),
  notes: z.string().optional(),
});

export type TicketFormData = z.infer<typeof ticketSchema>;
