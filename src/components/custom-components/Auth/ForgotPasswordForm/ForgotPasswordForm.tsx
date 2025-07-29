'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import Link from 'next/link';
import { forgotPasswordFormSchema } from './forgotPasswordHelper';
import { useForgotPassword } from '@/hooks/auth/useForgotPassword';
import HeadingSubHeadingTypography from '../RegisterForm/HeadingSubHeadingTypography';
import { Icons } from '@/components/ui/Icons';
import { ValidEmailInput } from '@/components/common/hook-form/ValidEmailInput';
import { useState } from 'react';

const ForgotPasswordForm = () => {
  const { mutate: forgotPass, isPending } = useForgotPassword();
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [validEmail, setValidEmail] = useState('');

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
    <>
      <div className="pt-[180px]">
        <Link
          href={'/login'}
          className="text-theme-text-primary flex items-center pb-[32px] text-[15px] font-semibold"
        >
          <Icons.chevron_left className="h-4 w-4" />
          Go back
        </Link>

        <HeadingSubHeadingTypography
          heading={
            <>
              Enter your register email address to{' '}
              <span className="text-brand-primary">
                get a password reset code
              </span>
            </>
          }
        />

        <div className="flex h-screen pt-[40px]">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-full space-y-4"
            >
              <ValidEmailInput
                onValidityChange={(valid, email) => {
                  setIsEmailValid(valid);
                  setValidEmail(email);
                }}
                name="email"
                label="Enter your Email "
                required
              />

              <Button
                variant="default"
                type="submit"
                size="lg"
                className="mt-4 w-full"
                disabled={isPending}
              >
                {isPending ? 'Sending...' : 'Send Reset Code'}
              </Button>

              <div className="text-brand-primary mt-[16px] flex w-full justify-between text-[18px] leading-[29px] underline">
                <Link href="/register">Return to Sign In</Link>
                <Link href="/register">Don’t Have an Account</Link>
                <p>Need Help?</p>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </>
  );
};

export default ForgotPasswordForm;
