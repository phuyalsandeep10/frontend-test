import { z } from 'zod';
export const registerFormSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters long' }),
  name: z
    .string()
    .min(3, { message: 'Username must be at least 3 characters long' }),
  otp: z
    .string()
    .length(6, { message: 'OTP must be exactly 6 digits' })
    .regex(/^\d{6}$/, { message: 'OTP must contain only digits' }),
  businessName: z.string().optional(),
  businessDomain: z
    .string()
    .email({ message: 'Invalid business domain address' }),
  selectedPlan: z.string().optional(),
});
