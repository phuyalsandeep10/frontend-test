'use client';
import AuthLayout from '@/components/custom-components/Auth/common/AuthLayout';
import LoginForm from '@/components/custom-components/Auth/LoginForm/LoginForm';
import React, { Suspense } from 'react';

const LoginPage = () => {
  return (
    <AuthLayout>
      <Suspense fallback={<div>Loading...</div>}>
        <LoginForm />
      </Suspense>
    </AuthLayout>
  );
};

export default LoginPage;
