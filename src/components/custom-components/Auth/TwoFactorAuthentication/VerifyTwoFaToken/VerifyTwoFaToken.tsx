'use client';
import React, { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { userRoutes } from '@/routes/userRoutes';
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

const VerifyTwoFaToken = () => {
  const router = useRouter();
  const [shouldRenderForm, setShouldRenderForm] = useState(false);
  const { data, isLoading } = useAuthenticatedUser();

  const { mutate: verify2faOtp, isPending: isVerifyOtpPending } =
    useVerifyTwoFaOtp();

  const form = useForm<z.infer<typeof verifyEmailViaOtpFormSchema>>({
    resolver: zodResolver(verifyEmailViaOtpFormSchema),
    defaultValues: { token: '' },
  });

  const onSubmit = useCallback(
    (values: any) => {
      verify2faOtp({ token: values.token });
    },
    [verify2faOtp],
  );

  useEffect(() => {
    if (isLoading) return;

    const isVerified =
      data?.data?.user?.two_fa_enabled && data.data?.is_2fa_verified;

    if (isVerified) {
      router.replace(userRoutes.DASHBOARD);
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
          href={userRoutes.LOGIN}
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

        {/* Error toast  */}
        {/* <div>
          <div className="mb-8 flex items-center justify-between rounded-lg border border-[#FFF5F3] bg-[#FAD6D5] p-5">
            <div className="flex gap-3.5">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0 4C0 1.79086 1.79086 0 4 0H20C22.2091 0 24 1.79086 24 4V20C24 22.2091 22.2091 24 20 24H4C1.79086 24 0 22.2091 0 20V4Z"
                  fill="#F61818"
                />
                <path
                  d="M11.9997 10.5865L16.9495 5.63672L18.3637 7.05093L13.4139 12.0007L18.3637 16.9504L16.9495 18.3646L11.9997 13.4149L7.04996 18.3646L5.63574 16.9504L10.5855 12.0007L5.63574 7.05093L7.04996 5.63672L11.9997 10.5865Z"
                  fill="white"
                />
              </svg>

              <p className="text-error leading-[26px]">
                We couldn&apos;t validate the code you provided. Kindly recheck
                and enter it again.
              </p>
            </div>
            <div className="cursor-pointer">
              <X className="text-gray-primary" />
            </div>
          </div>
        </div> */}

        {/* Success toast  */}
        {/* <div>
          <div className="mb-8 flex items-center justify-between rounded-lg border border-[#009959] bg-[#E5F9DB] p-5">
            <div className="flex gap-4">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0 4C0 1.79086 1.79086 0 4 0H20C22.2091 0 24 1.79086 24 4V20C24 22.2091 22.2091 24 20 24H4C1.79086 24 0 22.2091 0 20V4Z"
                  fill="#009959"
                />
                <path
                  d="M9.9997 15.1709L19.1921 5.97852L20.6063 7.39273L9.9997 17.9993L3.63574 11.6354L5.04996 10.2212L9.9997 15.1709Z"
                  fill="white"
                />
              </svg>
              <p className="text-gray-primary leading-[26px]">
                OTP validation successful
              </p>
            </div>
            <div className="cursor-pointer">
              <X className="text-gray-primary" />
            </div>
          </div>
        </div> */}
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
            />
            <Button
              variant="default"
              type="submit"
              size="lg"
              className="mt-4 w-full"
            >
              {isVerifyOtpPending ? 'Submiting...' : ' Continue'}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default VerifyTwoFaToken;
