import { z } from 'zod';
export const businessRegisterFormSchema = z.object({
  name: z.string().nonempty({ message: 'Business name is required' }),
  website: z.string().nonempty({ message: 'Website is required' }),
  purpose: z.string().nonempty({ message: 'Purpose is required' }),
});
