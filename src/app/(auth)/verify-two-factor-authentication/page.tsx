import AuthLayout from '@/components/custom-components/Auth/common/AuthLayout';
import VerifyTwoFaToken from '@/components/custom-components/Auth/TwoFactorAuthentication/VerifyTwoFaToken/VerifyTwoFaToken';
import React from 'react';

const VerifyTwoFaPage = () => {
  return (
    <AuthLayout>
      <VerifyTwoFaToken />
    </AuthLayout>
  );
};

export default VerifyTwoFaPage;
