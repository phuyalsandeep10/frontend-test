import { z } from 'zod';
export const businessRegisterFormSchema = z.object({
  name: z.string().nonempty({ message: 'Business name is required' }),
  domain: z.string().nonempty({ message: 'Domain is required' }),
  purpose: z.string().nonempty({ message: 'Purpose is required' }),
});
