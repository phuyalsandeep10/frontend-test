'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';

import Link from 'next/link';
import { forgotPasswordVerifyFormSchema } from './forgotPasswordVerifyHelper';
import { useForgotPasswordVerify } from '@/hooks/auth/useForgotPasswordVerify';
import HeadingSubHeadingTypography from '../RegisterForm/HeadingSubHeadingTypography';
import { Icons } from '@/components/ui/Icons';
import { StrongPasswordField } from '@/components/common/hook-form/StrongPasswordField';
import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import SuccessScreen from './ForgotPasswordSuccess';

const ForgotPasswordVerifyForm = () => {
  const { mutate: forgotPassVerify, isPending } = useForgotPasswordVerify();
  const searchParams = useSearchParams();
  const [verifySuccess, setVerifySuccess] = useState(false);
  const token = searchParams.get('token');
  const email = searchParams.get('email');
  const form = useForm<z.infer<typeof forgotPasswordVerifyFormSchema>>({
    resolver: zodResolver(forgotPasswordVerifyFormSchema),
    defaultValues: {
      new_password: '',
      confirm_password: '',
    },
  });

  async function onSubmit(
    values: z.infer<typeof forgotPasswordVerifyFormSchema>,
  ) {
    const forgotPassVerifyData = {
      new_password: values.new_password,
      token,
      email,
    };
    console.log(forgotPassVerifyData);
    forgotPassVerify(values, {
      onSuccess: () => {
        setVerifySuccess(true);
      },
      onError: () => {
        setVerifySuccess(false);
      },
    });
  }

  return (
    <>
      <div className="pt-[180px]">
        {!verifySuccess ? (
          <>
            <Link
              href={'/login'}
              className="text-theme-text-primary flex items-center gap-1 pb-[32px] text-[15px] font-semibold"
            >
              <Icons.chevron_left className="h-4 w-4" />
              Go back
            </Link>

            <HeadingSubHeadingTypography
              heading={
                <>
                  Set New <span className="text-brand-primary">Password</span>
                </>
              }
            />

            <div className="flex h-screen pt-[40px]">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="w-full space-y-4"
                >
                  <StrongPasswordField
                    control={form.control}
                    name="new_password"
                    label="Enter new password"
                    required
                    placeholder="**********"
                  />

                  <StrongPasswordField
                    control={form.control}
                    name="confirm_password"
                    label="Confirm your password"
                    compareWith={form.watch('new_password')}
                    required
                    placeholder="**********"
                    hideChecklist
                  />
                  <Button
                    variant="default"
                    type="submit"
                    size="lg"
                    className="mt-4 w-full"
                    disabled={isPending}
                  >
                    {isPending ? 'Confirming...' : 'Confirm'}
                  </Button>
                </form>
              </Form>
            </div>
          </>
        ) : (
          <SuccessScreen
            text="SUCCESSFUL"
            subText="You have changed your password"
          />
        )}
      </div>
    </>
  );
};

export default ForgotPasswordVerifyForm;
