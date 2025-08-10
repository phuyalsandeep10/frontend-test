import AuthenticatorModal from '@/components/modal/Authenticator/AuthenticatorModal';

import { useAuthStore } from '@/store/AuthStore/useAuthStore';
import React, { useState } from 'react';

interface Verify2FaOtpModalProps {
  open: boolean;
}

const Verify2FaOtpModal = ({ open }: Verify2FaOtpModalProps) => {
  const authData = useAuthStore((state) => state.authData);
  const [open2FaAuthenticatorModal, setOpen2FaAuthenticatorModal] =
    useState(false);
  return (
    <div>
      <AuthenticatorModal
        open={open2FaAuthenticatorModal}
        setOpen={setOpen2FaAuthenticatorModal}
        otpauth_url={authData?.data?.user?.two_fa_auth_url || ''}
      />
    </div>
  );
};

export default Verify2FaOtpModal;
