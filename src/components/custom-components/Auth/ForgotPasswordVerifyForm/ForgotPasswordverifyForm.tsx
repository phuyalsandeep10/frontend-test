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
import Link from 'next/link';
import { forgotPasswordVerifyFormSchema } from './forgotPasswordVerifyHelper';
import { useForgotPasswordVerify } from '../../../../../hooks/auth/useForgotPasswordVerify';

const ForgotPasswordVerifyForm = () => {
  const { mutate: forgotPassVerify, isPending } = useForgotPasswordVerify();

  const form = useForm<z.infer<typeof forgotPasswordVerifyFormSchema>>({
    resolver: zodResolver(forgotPasswordVerifyFormSchema),
    defaultValues: {
      token: '',
      email: '',
      new_password: '',
    },
  });

  async function onSubmit(
    values: z.infer<typeof forgotPasswordVerifyFormSchema>,
  ) {
    forgotPassVerify(values);
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

            <FormField
              control={form.control}
              name="new_password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>New Password</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your new password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit">{isPending ? 'Submitting' : 'Submit'}</Button>
            <Link href={'/login'} className="ml-4 text-indigo-600">
              Login
            </Link>
          </form>
        </Form>
      </Card>
    </div>
  );
};

export default ForgotPasswordVerifyForm;
