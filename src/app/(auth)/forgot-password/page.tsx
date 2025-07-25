'use client';
import AuthLayout from '@/components/custom-components/Auth/common/AuthLayout';
import ForgotPasswordForm from '@/components/custom-components/Auth/ForgotPasswordForm/ForgotPasswordForm';

const ForgotPasswordPage = () => {
  return (
    <AuthLayout>
      <ForgotPasswordForm />
    </AuthLayout>
  );
};

export default ForgotPasswordPage;
