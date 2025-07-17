'use client';
import { Button } from '@/components/ui/button';
import React, { useState } from 'react';
import { useLogout } from '../../../hooks/auth/useLogout';
import { useAuthenticatedUser } from '../../../hooks/auth/useAuthenticatedUser';
import { Card, CardContent } from '@/components/ui/card';
import Link from 'next/link';
import { useGenerateTwoFaOtp } from '../../../hooks/auth/useGenerateTwoFaOtp';
// import TwoFactorAuthenticationDialog from '@/components/custom-components/TwoFactorAuthentication/TwoFactorAuthenticationDialog';
import dynamic from 'next/dynamic';
import { useDisable2Fa } from '../../../hooks/auth/useDisable2Fa';

const TwoFactorAuthenticationDialog = dynamic(
  () =>
    import(
      '@/components/custom-components/TwoFactorAuthentication/TwoFactorAuthenticationDialog'
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
  const { data } = useAuthenticatedUser();

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
          <div>{data?.email}</div>
          <div>{data?.name}</div>
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
        <Button
          onClick={() => generate2FaOtp()}
          type="button"
          variant={'secondary'}
          className="w-fit cursor-pointer"
        >
          {generate2faOtpLoading ? 'Enabaling....' : 'Enable 2 FA'}
        </Button>
        <Button
          onClick={() => setOpen2FaDialog(true)}
          type="button"
          variant={'outline'}
          className="w-fit cursor-pointer"
        >
          Verify 2 Fa
        </Button>
      </div>
      <TwoFactorAuthenticationDialog
        open={open2FaDialog}
        closeModal={() => setOpen2FaDialog(false)}
        otpauth_url={twoFaGeneratedOtpData?.['2fa_otp_auth_url'] || ''}
        base32={twoFaGeneratedOtpData?.['2fa_secrete'] || ''}
      />

      <Button
        onClick={() => disable2Fa()}
        type="button"
        variant={'outline'}
        className="w-fit cursor-pointer"
      >
        {disable2FaLoading ? 'Disabling....' : 'Disable 2fa '}
      </Button>
    </div>
  );
};

export default DashboardPage;
