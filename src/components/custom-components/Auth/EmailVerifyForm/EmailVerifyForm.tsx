'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { emailVerifyFormSchema } from './emailVerifyFormHelper';
import { useVerifyEmail } from '@/hooks/auth/useVerifyEmail';
import OTP from '@/components/common/hook-form/OTP';
import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import SuccessScreen from '../ForgotPasswordVerifyForm/ForgotPasswordSuccess';
import { ROUTES } from '@/routes/routes';

const EmailVerifyForm = () => {
  const [hasError, setHasError] = useState(false);
  const [verifySuccess, setVerifySuccess] = useState(false);
  const searchParams = useSearchParams();
  const email = searchParams.get('email');
  const { mutate: verifyEmail, isPending: verifyEmailPending } =
    useVerifyEmail();
  const form = useForm<z.infer<typeof emailVerifyFormSchema>>({
    resolver: zodResolver(emailVerifyFormSchema),
    defaultValues: {
      token: '',
    },
  });

  const onSubmit = (values: any) => {
    const verifyEmailData = { ...values, email };
    console.log(verifyEmailData);
    verifyEmail(verifyEmailData, {
      onSuccess: () => {
        setHasError(false);
        setVerifySuccess(true);
      },
      onError: (error) => {
        setHasError(true);
        setVerifySuccess(false);
        console.log(error);
      },
    });
  };

  return (
    <div className="mt-[150px]">
      {!verifySuccess ? (
        <>
          <p className="text-theme-text-primary mb-8">
            We have sent mail with verification code to *****@gmail.com.
          </p>

          <div className="w-[489px]">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="w-full space-y-4"
              >
                <OTP
                  label="Enter OTP received in mail."
                  required
                  control={form.control}
                  name="token"
                  hasError={hasError}
                />
                <Button
                  variant="default"
                  type="submit"
                  size="lg"
                  className="mt-4 w-full"
                >
                  {verifyEmailPending ? 'Verifying...' : 'Continue'}
                </Button>
              </form>
            </Form>
          </div>
        </>
      ) : (
        <SuccessScreen
          text="SUCCESSFUL"
          subText="Email Verification successful."
          redirectLink={ROUTES.DASHBOARD}
        />
      )}
    </div>
  );
};

export default EmailVerifyForm;
