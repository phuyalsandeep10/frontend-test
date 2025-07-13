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
import { resetPasswordFormSchema } from './resetPasswordHelper';
import { useResetPassword } from '../../../../hooks/auth/useResetPassword';
import Link from 'next/link';

const ResetPasswordForm = () => {
  const { mutate: resetPassword, isPending, isSuccess } = useResetPassword();
  const form = useForm<z.infer<typeof resetPasswordFormSchema>>({
    resolver: zodResolver(resetPasswordFormSchema),
    defaultValues: {
      old_password: '',
      new_password: '',
    },
  });
  console.log(isSuccess);
  async function onSubmit(values: z.infer<typeof resetPasswordFormSchema>) {
    resetPassword(values);
    form.reset();
  }
  return (
    <>
      <Link href={'/dashboard'} className="m-8 block text-indigo-500">
        Dashboard
      </Link>

      <div className="flex h-screen items-center justify-center">
        <Card className="w-full max-w-sm">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-full space-y-2 px-6"
            >
              <FormField
                control={form.control}
                name="old_password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Old Password</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your old password" {...field} />
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

              <Button type="submit" className="cursor-pointer">
                {' '}
                {isPending ? 'Resetting...' : 'Reset'}
              </Button>
            </form>
          </Form>
        </Card>
      </div>
    </>
  );
};

export default ResetPasswordForm;
