'use client';
import AuthLayout from '@/components/custom-components/Auth/common/AuthLayout';
import TwoFactorAuthentication from '@/components/custom-components/Auth/TwoFactorAuthentication/TwoFactorAuthenticationDialog/TwoFactorAuthentication';
import React from 'react';
import { Icons } from '@/components/ui/Icons';

const RegisterPage = () => {
  return (
    <div>
      <AuthLayout>
        <TwoFactorAuthentication />
      </AuthLayout>
    </div>
  );
};

export default RegisterPage;
