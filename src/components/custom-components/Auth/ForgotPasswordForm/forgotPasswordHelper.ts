import { z } from 'zod';
export const forgotPasswordFormSchema = z.object({
  email: z
    .string()
    .min(2, { message: 'Email must be at least 2 characters.' })
    .email({ message: 'Invalid email address.' }),
});
