import { z } from 'zod';
export const registerFormSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters long' }),
  name: z
    .string()
    .min(3, { message: 'Username must be at least 3 characters long' }),
});

export const headingAndSubHeadingHelper = {
  '0': {
    heading: 'Join Us',
    subHeading: 'Create your free Chatboq account and continue.',
  },
  '1': {
    heading: 'Welcome! Please confirm your email to finish setup.',
    subHeading: 'All setup are completed! Have fun with Chatboq.',
  },
  '2': {
    heading: 'Say more about yourself.',
    subHeading: 'Fill in your business information! You are almost there.',
  },
};
