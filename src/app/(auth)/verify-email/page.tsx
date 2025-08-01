'use client';

import AuthLayout from '@/components/custom-components/Auth/common/AuthLayout';
import EmailVerifyForm from '@/components/custom-components/Auth/EmailVerifyForm/EmailVerifyForm';

const VerifyEmailPage = () => {
  return (
    <AuthLayout>
      <EmailVerifyForm />
    </AuthLayout>
  );
};

export default VerifyEmailPage;
