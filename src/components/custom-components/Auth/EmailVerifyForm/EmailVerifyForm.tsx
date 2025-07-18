'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { emailVerifyFormSchema } from './emailVerifyFormHelper';
import { useVerifyEmail } from '../../../../../hooks/auth/useVerifyEmail';

const EmailVerifyForm = () => {
  const { mutate: verifyEmailAddress, isPending } = useVerifyEmail();

  const form = useForm<z.infer<typeof emailVerifyFormSchema>>({
    resolver: zodResolver(emailVerifyFormSchema),
    defaultValues: {
      token: '',
      email: '',
    },
  });

  async function onSubmit(values: z.infer<typeof emailVerifyFormSchema>) {
    verifyEmailAddress(values);
  }

  return (
    <div className="flex h-screen items-center justify-center">
      <Card className="w-full max-w-sm">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full space-y-2 px-6"
          >
            <FormField
              control={form.control}
              name="token"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Token</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your token" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="cursor-pointer">
              {isPending ? 'Verifying...' : 'Verify'}
            </Button>
          </form>
        </Form>
      </Card>
    </div>
  );
};

export default EmailVerifyForm;
