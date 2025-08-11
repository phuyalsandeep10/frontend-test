import { z } from 'zod';

const websiteRegex =
  /^(https:\/\/|www\.)[a-z0-9]+(-[a-z0-9]+)*(\.[a-z0-9]+(-[a-z0-9]+)*)+$/;

export const businessRegisterFormSchema = z.object({
  name: z.string().nonempty({ message: 'Business name is required' }),
  domain: z
    .string()
    .nonempty({ message: 'Website is required' })
    .transform((val) => val.trim().toLowerCase())
    .refine((val) => websiteRegex.test(val), {
      message:
        'Please enter a valid website URL (lowercase, no spaces, only hyphen allowed)',
    }),
  purpose: z.string().nonempty({ message: 'Purpose is required' }),
});
