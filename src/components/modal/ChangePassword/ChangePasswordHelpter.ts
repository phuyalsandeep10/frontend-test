import { z } from 'zod';
export const changePasswordModalSchema = z
  .object({
    old_password: z
      .string()
      .nonempty({ message: 'Current Password is required' })
      .min(6, {
        message: 'Current Password must be at least 6 characters long',
      }),
    new_password: z
      .string()
      .nonempty({ message: 'New Password is required' })
      .min(6, { message: 'New Password must be at least 6 characters long' }),
    confirm_password: z
      .string()
      .nonempty({ message: 'Confirm Password is required' })
      .min(6, {
        message: 'Confirm Password must be at least 6 characters long',
      }),
  })
  .refine((data) => data.new_password === data.confirm_password, {
    path: ['confirm_password'],
    message: 'The password you entered did not match.',
  });
