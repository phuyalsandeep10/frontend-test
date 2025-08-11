'use client';
import React from 'react';
import AuthLayoutLeftSection from './AuthLayoutLeftSection';
import AuthLayoutRightSection from './AuthLayoutRightSection';

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="font-outfit box-border grid h-screen w-full grid-cols-1 lg:grid-cols-2">
      <AuthLayoutLeftSection />
      <AuthLayoutRightSection>{children}</AuthLayoutRightSection>
    </div>
  );
};

export default AuthLayout;
