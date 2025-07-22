'use client';
import dynamic from 'next/dynamic';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { userRoutes } from '@/routes/userRoutes';
import { useAuthenticatedUser } from '@/hooks/auth/useAuthenticatedUser';
const TwoFactorAuthenticationDialog = dynamic(
  () =>
    import(
      '@/components/custom-components/Auth/TwoFactorAuthentication/TwoFactorAuthenticationDialog/TwoFactorAuthenticationDialog'
    ),
  { ssr: false },
);
const VerifyTwoFaToken = () => {
  const [open2FaDialog, setOpen2FaDialog] = useState(false);
  const { data, isLoading } = useAuthenticatedUser();
  const router = useRouter();

  useEffect(() => {
    if (
      data?.data?.user?.two_fa_enabled &&
      !data.data?.is_2fa_verified &&
      !isLoading
    ) {
      setOpen2FaDialog(true);
    } else if (
      data?.data?.user?.two_fa_enabled &&
      data.data?.is_2fa_verified &&
      !isLoading
    ) {
      router.replace(userRoutes.DASHBOARD);
    }
  }, [data, isLoading, router]);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <TwoFactorAuthenticationDialog
        open={open2FaDialog}
        closeModal={() => setOpen2FaDialog(false)}
        otpauth_url={data?.data?.user?.two_fa_auth_url || ''}
        base32={data?.data?.user.two_fa_secret || ''}
      />
    </div>
  );
};

export default VerifyTwoFaToken;
