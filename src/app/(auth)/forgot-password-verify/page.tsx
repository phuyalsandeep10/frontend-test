'use client';
import AuthLayout from '@/components/custom-components/Auth/common/AuthLayout';
import ForgotPasswordVerifyForm from '@/components/custom-components/Auth/ForgotPasswordVerifyForm/ForgotPasswordverifyForm';

const ForgotPasswordFormVerifyPage = () => {
  return (
    <div>
      <AuthLayout>
        <ForgotPasswordVerifyForm />
      </AuthLayout>
    </div>
  );
};

export default ForgotPasswordFormVerifyPage;
