'use client';
import AuthLayout from '@/components/custom-components/Auth/common/AuthLayout';
import RegisterForm from '@/components/custom-components/Auth/RegisterForm/RegisterForm';
import React, { Suspense } from 'react';

const RegisterPage = () => {
  return (
    <div>
      <AuthLayout>
        <Suspense fallback={<div>Loading...</div>}>
          <RegisterForm />
        </Suspense>
      </AuthLayout>
    </div>
  );
};

export default RegisterPage;
