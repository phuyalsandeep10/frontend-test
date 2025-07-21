import { z } from 'zod';
export const resetPasswordFormSchema = z.object({
  old_password: z
    .string()
    .nonempty({ message: 'Old Password is required' })
    .min(6, { message: 'Old Password must be at least 6 characters long' }),
  new_password: z
    .string()
    .nonempty({ message: 'New Password is required' })
    .min(6, { message: 'New Password must be at least 6 characters long' }),
});
