import { z } from 'zod';
export const AuthenticatorSchema = z.object({
  token: z
    .string()
    .min(6, 'OTP must be 6 digits')
    .max(6, 'OTP must be 6 digits'),
});
