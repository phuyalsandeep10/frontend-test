'use client';

import ChangePasswordModal from '@/components/modal/ChangePassword/ChangePasswordModal';
import { Button } from '@/components/ui/button';
import { useGenerateTwoFaOtp } from '@/hooks/auth/useGenerateTwoFaOtp';
import { useDisable2Fa } from '@/hooks/auth/useDisable2Fa';
import React, { useEffect, useState } from 'react';
import AuthenticatorModal from '@/components/modal/Authenticator/AuthenticatorModal';
import { useAuthStore } from '@/store/AuthStore/useAuthStore';
import VerifyEmailModal from '@/components/custom-components/Dashboard/VerifyEmailModal/VerifyEmailModal';
import ConfirmModal from '@/components/custom-components/Dashboard/ConfirmModal/ConfirmModal';

const DashboardPage = () => {
  const [openPasswordModal, setOpenPasswordModal] = useState(false);
  const [openConfirm2FaModal, setConfirm2FaModal] = useState(false);
  const [open2FaAuthenticatorModal, setOpen2FaAuthenticatorModal] =
    useState(false);

  const [openEmailVerifyForm, setOpenVerifyEmail] = useState(false);

  const {
    mutate: generate2FaOtp,
    isPending: generate2faOtpLoading,
    data: twoFaGeneratedOtpData,
  } = useGenerateTwoFaOtp();

  const { mutate: disable2Fa, isPending: disable2FaLoading } = useDisable2Fa();
  const authData = useAuthStore((state) => state.authData);
  console.log(authData);

  useEffect(() => {
    if (twoFaGeneratedOtpData && !generate2faOtpLoading) {
      // setOpen2FaAuthenticatorModal(true);
      // setConfirm2FaModal(false);
    }
  }, [twoFaGeneratedOtpData, generate2faOtpLoading]);

  const openConfirmModal = () => {
    setConfirm2FaModal(true);
  };

  useEffect(() => {
    if (!authData?.email_verified_at) {
      setOpenVerifyEmail(true);
    }
  }, [authData]);

  console.log(openConfirm2FaModal);

  return (
    <div>
      <div className="mb-4 text-xl">User Dashboard</div>

      <div className="mb-6 flex gap-4">
        <Button onClick={() => setOpenPasswordModal(true)}>
          Change Password
        </Button>

        {authData?.two_fa_enabled ? (
          <Button
            onClick={() => disable2Fa()}
            variant="outline"
            className="w-fit cursor-pointer"
          >
            {disable2FaLoading ? 'Disabling...' : 'Disable 2FA'}
          </Button>
        ) : (
          <Button
            onClick={() => openConfirmModal()}
            variant="secondary"
            className="w-fit cursor-pointer"
          >
            Enable 2FA
          </Button>
        )}
      </div>

      <ChangePasswordModal
        open={openPasswordModal}
        setOpen={setOpenPasswordModal}
      />

      <ConfirmModal
        open={openConfirm2FaModal}
        setOpen={setConfirm2FaModal}
        loading={generate2faOtpLoading}
        onClick={() => generate2FaOtp()}
      />

      <AuthenticatorModal
        open={open2FaAuthenticatorModal}
        setOpen={setOpen2FaAuthenticatorModal}
        otpauth_url={twoFaGeneratedOtpData?.['2fa_otp_auth_url'] || ''}
      />
      <VerifyEmailModal
        open={openEmailVerifyForm}
        setOpen={setOpenVerifyEmail}
      />
    </div>
  );
};

export default DashboardPage;
