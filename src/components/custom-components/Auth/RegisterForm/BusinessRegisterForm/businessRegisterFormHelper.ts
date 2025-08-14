import { z } from 'zod';

const domainRegex =
  /^(?:https?:\/\/)?(?:www\.)?(?!-)[a-z0-9-]{1,63}(?<!-)(?:\.(?!-)[a-z0-9-]{1,63}(?<!-))+$/;

export const businessRegisterFormSchema = z.object({
  name: z.string().nonempty({ message: 'Business name is required' }),

  domain: z
    .string()
    .nonempty({ message: 'Domain is required' })
    // .transform((val) => val.trim().toLowerCase())
    .refine((val) => domainRegex.test(val), {
      message:
        'Please enter a valid domain (lowercase, no spaces, only hyphen allowed, e.g., example.com)',
    }),

  purpose: z.string().nonempty({ message: 'Purpose is required' }),
});
