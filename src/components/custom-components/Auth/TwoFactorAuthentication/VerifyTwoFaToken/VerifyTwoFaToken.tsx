'use client';
import React, { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ROUTES } from '@/routes/routes';
import { useAuthenticatedUser } from '@/hooks/auth/useAuthenticatedUser';
import HeadingSubHeadingTypography from '../../RegisterForm/HeadingSubHeadingTypography';
import { Icons } from '@/components/ui/Icons';
import OTP from '@/components/common/hook-form/OTP';
import { useForm } from 'react-hook-form';
import z from 'zod';
import { verifyEmailViaOtpFormSchema } from '../../RegisterForm/VerifyEmailViaOtp/verifyEmailViaOtpFormHelper';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from '@/components/ui/form';
import Button from '@/components/common/hook-form/Button';
import { useVerifyTwoFaOtp } from '@/hooks/auth/useVerifyTwoFaOtp';
import Link from 'next/link';
import { X } from 'lucide-react';
import SuccessToast from '@/components/common/toasts/SuccessToast';
import ErrorToast from '@/components/common/toasts/ErrorToast';

const VerifyTwoFaToken = () => {
  const router = useRouter();
  const [shouldRenderForm, setShouldRenderForm] = useState(false);
  const [otpVerifySuccess, setOtpVerifySuccess] = useState(false);
  const [otpVerifyError, setotpVerifyError] = useState(false);
  const { data, isLoading } = useAuthenticatedUser();

  const { mutate: verify2faOtp, isPending: isVerifyOtpPending } =
    useVerifyTwoFaOtp();

  const form = useForm<z.infer<typeof verifyEmailViaOtpFormSchema>>({
    resolver: zodResolver(verifyEmailViaOtpFormSchema),
    defaultValues: { token: '' },
  });

  const onSubmit = (values: z.infer<typeof verifyEmailViaOtpFormSchema>) => {
    verify2faOtp(values, {
      onSuccess: () => {
        setOtpVerifySuccess(true);
        setotpVerifyError(false);
      },
      onError: () => {
        setotpVerifyError(true);
        setOtpVerifySuccess(false);
      },
    });
  };

  useEffect(() => {
    if (isLoading) return;
    const isVerified =
      data?.data?.user?.two_fa_enabled && data.data?.is_2fa_verified;

    if (isVerified) {
      router.replace(ROUTES.DASHBOARD);
    } else {
      setShouldRenderForm(true);
    }
  }, [data, isLoading, router]);

  if (isLoading || !shouldRenderForm) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div>Loading...</div>
      </div>
    );
  }
  return (
    <div>
      <div className="mt-[212px] w-[489px]">
        <Link
          href={ROUTES.LOGIN}
          className="text-theme-text-primary mb-8 flex items-center gap-2"
        >
          <Icons.chevronLeft />
          <p className="text-[15px] leading-[19px]">Go back</p>
        </Link>
        <div className="mb-10">
          <HeadingSubHeadingTypography
            heading={
              <>
                Enter
                <span className="text-brand-primary">Verification Code</span>
              </>
            }
            subHeading="Please enter the 6-digit code we just sent you at linked Authenticator app."
          />
        </div>
        {otpVerifyError && (
          <ErrorToast
            text="We couldn't validate the code you provided. Kindly recheck and enter it again."
            onClick={() => setotpVerifyError(false)}
          />
        )}
        {otpVerifySuccess && (
          <SuccessToast
            text="OTP validation successful"
            onClick={() => setOtpVerifySuccess(false)}
          />
        )}

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full space-y-4"
          >
            {!otpVerifySuccess && (
              <>
                <OTP
                  label="Enter OTP received in mail."
                  required
                  control={form.control}
                  name="token"
                  hasError
                />
                <Button
                  variant="default"
                  type="submit"
                  size="lg"
                  className="mt-4 w-full"
                >
                  {isVerifyOtpPending ? 'Submiting...' : ' Continue'}
                </Button>
              </>
            )}
            {otpVerifySuccess && (
              <Button
                variant="default"
                type="button"
                size="lg"
                className="mt-4 w-full"
                onClick={() => router.replace(ROUTES.DASHBOARD)}
              >
                Continue
              </Button>
            )}
          </form>
        </Form>
      </div>
    </div>
  );
};

export default VerifyTwoFaToken;
