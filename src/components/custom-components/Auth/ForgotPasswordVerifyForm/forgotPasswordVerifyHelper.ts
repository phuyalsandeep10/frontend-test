import { z } from 'zod';
export const forgotPasswordVerifyFormSchema = z.object({
  token: z.string({ message: 'Username must be at least 3 characters long' }),
  email: z.string().email({ message: 'Invalid email address' }),
  new_password: z
    .string()
    .min(6, { message: 'New password must be at least 6 characters long' }),
});
