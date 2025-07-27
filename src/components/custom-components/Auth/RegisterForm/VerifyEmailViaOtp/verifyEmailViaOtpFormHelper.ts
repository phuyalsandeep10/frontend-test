import { z } from 'zod';
export const verifyEmailViaOtpFormSchema = z.object({
  token: z
    .string()
    .length(6, { message: 'OTP must be exactly 6 digits' })
    .regex(/^\d{6}$/, { message: 'OTP must contain only digits' }),
});
