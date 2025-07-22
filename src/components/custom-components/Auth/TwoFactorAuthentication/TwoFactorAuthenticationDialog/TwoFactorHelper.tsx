import { z } from 'zod';
export const TwoFactorAuthenticationSchema = z.object({
  otp: z.string().length(6, { message: 'OTP must be exactly 6 digits' }),
});
