import { z } from 'zod';
const websiteRegex =
  /^(https?:\/\/)?(www\.)?[\w\-]+\.\w{2,}(\/[\w\-./?%&=]*)?$/;
export const businessRegisterFormSchema = z.object({
  name: z.string().nonempty({ message: 'Business name is required' }),
  domain: z
    .string()
    .nonempty({ message: 'Website is required' })
    .regex(websiteRegex, { message: 'Please enter a valid website URL' }),
  purpose: z.string().nonempty({ message: 'Purpose is required' }),
});
