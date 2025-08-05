'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ROUTES } from '@/routes/routes';
import { useAuthenticatedUser } from '@/hooks/auth/useAuthenticatedUser';

import AuthenticatorModal from '@/components/modal/Authenticator/AuthenticatorModal';

const VerifyTwoFaToken = () => {
  const router = useRouter();
  const [open2FaAuthenticatorModal, setOpen2FaAuthenticatorModal] =
    useState(false);
  const { data, isLoading } = useAuthenticatedUser();

  useEffect(() => {
    if (isLoading) return;
    const isVerified =
      data?.data?.user?.two_fa_enabled && data.data?.is_2fa_verified;

    if (isVerified) {
      router.replace(ROUTES.DASHBOARD);
    } else {
      setOpen2FaAuthenticatorModal(true);
    }
  }, [data, isLoading, router]);

  if (isLoading || !open2FaAuthenticatorModal) {
    return (
      <div className="flex items-center justify-center">
        <div>Loading...</div>
      </div>
    );
  }
  return (
    <div>
      <AuthenticatorModal
        open={open2FaAuthenticatorModal}
        setOpen={setOpen2FaAuthenticatorModal}
        otpauth_url={data?.data.user.two_fa_auth_url || ''}
      />
    </div>
  );
};

export default VerifyTwoFaToken;
