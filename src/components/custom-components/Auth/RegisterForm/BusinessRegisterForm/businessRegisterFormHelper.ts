import { z } from 'zod';
export const businessRegisterFormSchema = z.object({
  businessName: z.string().optional(),
  businessDomain: z
    .string()
    .email({ message: 'Invalid business domain address' }),
  selectedPlan: z.string().optional(),
});
