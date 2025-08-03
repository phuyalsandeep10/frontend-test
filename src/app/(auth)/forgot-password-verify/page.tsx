'use client';
import AuthLayout from '@/components/custom-components/Auth/common/AuthLayout';
import ForgotPasswordVerifyForm from '@/components/custom-components/Auth/ForgotPasswordVerifyForm/ForgotPasswordverifyForm';
import { Suspense } from 'react';

const ForgotPasswordFormVerifyPage = () => {
  return (
    <div>
      <AuthLayout>
        <Suspense fallback={<div>Loading...</div>}>
          <ForgotPasswordVerifyForm />
        </Suspense>
      </AuthLayout>
    </div>
  );
};

export default ForgotPasswordFormVerifyPage;
