'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { emailVerifyFormSchema } from './emailVerifyFormHelper';
import { useVerifyEmail } from '@/hooks/auth/useVerifyEmail';
import OTP from '@/components/common/hook-form/OTP';
import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import SuccessScreen from '../ForgotPasswordVerifyForm/ForgotPasswordSuccess';
import { ROUTES } from '@/routes/routes';
import HeadingSubHeadingTypography from '../RegisterForm/HeadingSubHeadingTypography';
import Link from 'next/link';
import { Icons } from '@/components/ui/Icons';

const EmailVerifyForm = () => {
  const [hasError, setHasError] = useState(false);
  const [verifySuccess, setVerifySuccess] = useState(false);
  const router = useRouter();
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

  // useEffect(() => {
  //   if (!email) {
  //     router.replace(ROUTES.LOGIN);
  //   }
  // }, [email,router]);

  return (
    <div className="mt-[150px]">
      {!verifySuccess ? (
        <>
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
                Enter{' '}
                <span className="text-brand-primary">Verification Code</span>
              </>
            }
            subHeading="Please enter the 6-digit code we just sent you at *****@gmail.com
to continue."
          />

          <div className="mt-10 w-[489px]">
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
