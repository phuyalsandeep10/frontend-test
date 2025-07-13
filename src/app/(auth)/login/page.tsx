'use client';
import LoginForm from '@/components/custom-components/LoginForm/LoginForm';
import React, { Suspense } from 'react';

const LoginPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LoginForm />
    </Suspense>
  );
};

export default LoginPage;
