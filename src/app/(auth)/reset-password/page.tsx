'use client';
import AuthLayout from '@/components/custom-components/Auth/common/AuthLayout';
import ResetPasswordForm from '@/components/custom-components/Auth/ResetPasswordForm/ResetPasswordForm';
import React from 'react';

const ResetPassword = () => {
  return (
    <div>
      <AuthLayout>
        <ResetPasswordForm />
      </AuthLayout>
    </div>
  );
};

export default ResetPassword;
