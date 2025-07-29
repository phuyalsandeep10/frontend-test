import { z } from 'zod';

export const contactFormSchema = z.object({
  email: z.string().email('Invalid email address'),
  phoneNumber: z
    .string()
    .min(7, 'Phone number must be at least 7 digits')
    .regex(/^[0-9]+$/, 'Phone number must contain only digits'),
  messenger: z.string().min(2, 'Messenger username is required'),
  telegram: z.string().min(2, 'Telegram username is required'),
  twitter: z.string().min(2, 'Twitter username is required'),
  whatsapp: z.string().min(10, 'WhatsApp number is required'),
});

export type ContactFormSchema = z.infer<typeof contactFormSchema>;
