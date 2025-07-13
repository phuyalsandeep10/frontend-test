import { z } from 'zod';
export const emailVerifyFormSchema = z.object({
  token: z.string({
    message: 'Token is required',
  }),
  email: z
    .string()
    .min(2, { message: 'Email must be at least 2 characters.' })
    .email({ message: 'Invalid email address.' }),
});
