import { z } from 'zod';
export const emailVerifyFormSchema = z.object({
  token: z.string({
    message: 'Token is required',
  }),
});
