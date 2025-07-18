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
import { forgotPasswordFormSchema } from './forgotPasswordHelper';
import { useForgotPassword } from '../../../../../hooks/auth/useForgotPassword';

const ForgotPasswordForm = () => {
  const { mutate: forgotPass, isPending } = useForgotPassword();

  const form = useForm<z.infer<typeof forgotPasswordFormSchema>>({
    resolver: zodResolver(forgotPasswordFormSchema),
    defaultValues: {
      email: '',
    },
  });

  async function onSubmit(values: z.infer<typeof forgotPasswordFormSchema>) {
    forgotPass(values);
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
              {isPending ? 'Submitting...' : 'Submit'}
            </Button>
            <Link href={'/login'} className="ml-4 text-indigo-500">
              Login
            </Link>
          </form>
        </Form>
      </Card>
    </div>
  );
};

export default ForgotPasswordForm;
