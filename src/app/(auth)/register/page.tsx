'use client';
import AuthLayout from '@/components/custom-components/Auth/common/AuthLayout';
import RegisterForm from '@/components/custom-components/Auth/RegisterForm/RegisterForm';
import React from 'react';

const RegisterPage = () => {
  return (
    <div>
      <AuthLayout>
        <RegisterForm />
      </AuthLayout>
    </div>
  );
};

export default RegisterPage;
