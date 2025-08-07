'use client';

import React, { useEffect, useState } from 'react';
import AuthenticatorModal from '@/components/modal/Authenticator/AuthenticatorModal';
import { useAuthStore } from '@/store/AuthStore/useAuthStore';
import VerifyEmailModal from '@/components/custom-components/Dashboard/VerifyEmailModal/VerifyEmailModal';
import BusinessCreateFormModal from '@/components/custom-components/Dashboard/BusinessCreateFormModal/BusinessCreateFormModal';

const DashboardPage = () => {
  const [open2FaAuthenticatorModal, setOpen2FaAuthenticatorModal] =
    useState(false);
  const [openEmailVerifyForm, setOpenVerifyEmail] = useState(false);
  const [openCreateBusinessModal, setOpenCreateBusinessModal] = useState(false);

  const authData = useAuthStore((state) => state.authData);

  useEffect(() => {
    console.log('authData:', authData);
    if (!authData?.data?.user?.email_verified_at) {
      setOpenVerifyEmail(true);
    } else {
      setOpenVerifyEmail(false);
    }

    if (
      Object.keys(authData?.data?.user?.attributes || {}).length === 0 &&
      authData?.data?.user?.email_verified_at
    ) {
      setOpenCreateBusinessModal(true);
    } else {
      setOpenCreateBusinessModal(false);
    }

    if (
      authData?.data?.user?.two_fa_enabled &&
      !authData?.data?.is_2fa_verified
    ) {
      setOpen2FaAuthenticatorModal(true);
    } else {
      setOpen2FaAuthenticatorModal(false);
    }
  }, [authData]);

  return (
    <div>
      <div className="mb-4 text-xl">User Dashboard</div>

      <AuthenticatorModal
        open={open2FaAuthenticatorModal}
        setOpen={setOpen2FaAuthenticatorModal}
        otpauth_url={authData?.data?.user?.two_fa_auth_url || ''}
        cancelButtonText="Cancel"
        submitButtonText="Submit"
        submitPendingText="Submitting..."
      />

      <VerifyEmailModal
        open={openEmailVerifyForm}
        setOpen={setOpenVerifyEmail}
      />
      <BusinessCreateFormModal
        open={openCreateBusinessModal}
        setOpen={setOpenCreateBusinessModal}
      />
    </div>
  );
};

export default DashboardPage;
