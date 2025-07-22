'use client';
import { Button } from '@/components/ui/button';
import React, { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { useLogout } from '@/hooks/auth/useLogout';
import { useGenerateTwoFaOtp } from '@/hooks/auth/useGenerateTwoFaOtp';
import { useAuthenticatedUser } from '@/hooks/auth/useAuthenticatedUser';
import { useDisable2Fa } from '@/hooks/auth/useDisable2Fa';

const TwoFactorAuthenticationDialog = dynamic(
  () =>
    import(
      '@/components/custom-components/Auth/TwoFactorAuthentication/TwoFactorAuthenticationDialog/TwoFactorAuthenticationDialog'
    ),
  { ssr: false },
);

const DashboardPage = () => {
  const [open2FaDialog, setOpen2FaDialog] = useState(false);
  const { mutate: logout, isPending } = useLogout();
  const {
    mutate: generate2FaOtp,
    isPending: generate2faOtpLoading,
    data: twoFaGeneratedOtpData,
  } = useGenerateTwoFaOtp();

  const { mutate: disable2Fa, isPending: disable2FaLoading } = useDisable2Fa();
  const { data: authUserData } = useAuthenticatedUser();
  useEffect(() => {
    if (twoFaGeneratedOtpData && !generate2faOtpLoading) {
      setOpen2FaDialog(true);
    }
  }, [twoFaGeneratedOtpData, generate2faOtpLoading]);

  console.log(
    'authUserData',
    authUserData,
    'twoFaGeneratedOtpData',
    twoFaGeneratedOtpData,
  );

  return (
    <div className="m-6 flex flex-col gap-4">
      <h1>Dashboard Page</h1>
      <div className="flex gap-4">
        <Link href={'/dashboard'} className="text-indigo-500">
          Dashboard
        </Link>
        <Link href={'/profile'} className="text-indigo-500">
          {' '}
          Profile
        </Link>
      </div>
      <Card>
        <CardContent>
          <h1>{authUserData?.data?.user.name}</h1>
          <h1>{authUserData?.data?.user.email}</h1>
        </CardContent>
      </Card>
      <Button
        onClick={() => logout()}
        type="button"
        variant={'destructive'}
        className="w-fit cursor-pointer"
      >
        {isPending ? 'Logging out' : 'Logout'}
      </Button>
      <div className="flex gap-2">
        {authUserData?.data?.user?.two_fa_enabled ? (
          <Button
            onClick={() => disable2Fa()}
            type="button"
            variant={'outline'}
            className="w-fit cursor-pointer"
          >
            {disable2FaLoading ? 'Disabling....' : 'Disable 2fa '}
          </Button>
        ) : (
          <Button
            onClick={() => generate2FaOtp()}
            type="button"
            variant={'secondary'}
            className="w-fit cursor-pointer"
          >
            {generate2faOtpLoading ? 'Enabaling....' : 'Enable 2 FA'}
          </Button>
        )}
      </div>
      <TwoFactorAuthenticationDialog
        open={open2FaDialog}
        closeModal={() => setOpen2FaDialog(false)}
        otpauth_url={twoFaGeneratedOtpData?.['2fa_otp_auth_url'] || ''}
        base32={twoFaGeneratedOtpData?.['2fa_secrete'] || ''}
      />
    </div>
  );
};

export default DashboardPage;
