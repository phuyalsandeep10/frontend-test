'use client';

import AuthLayout from '@/components/custom-components/Auth/common/AuthLayout';
import EmailVerifyForm from '@/components/custom-components/Auth/EmailVerifyForm/EmailVerifyForm';
import { Suspense } from 'react';

const VerifyEmailPage = () => {
  return (
    <AuthLayout>
      <Suspense fallback={<div>Loading...</div>}>
        <EmailVerifyForm />
      </Suspense>
    </AuthLayout>
  );
};

export default VerifyEmailPage;
