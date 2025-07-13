import { z } from 'zod';
export const formSchema = z.object({
  email: z
    .string()
    .min(2, { message: 'Email must be at least 2 characters.' })
    .email({ message: 'Invalid email address.' }),
  password: z.string().min(4, {
    message: 'Password should be at least 8 character',
  }),
});
