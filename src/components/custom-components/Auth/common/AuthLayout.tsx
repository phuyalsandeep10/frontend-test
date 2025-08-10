'use client';
import React from 'react';
import AuthLayoutLeftSection from './AuthLayoutLeftSection';
import AuthLayoutRightSection from './AuthLayoutRightSection';

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="font-outfit box-border grid h-screen w-full grid-cols-1 lg:grid-cols-2 2xl:mx-auto 2xl:flex 2xl:h-[1024px] 2xl:max-w-[1440px] 2xl:items-center 2xl:justify-center">
      <AuthLayoutLeftSection />
      <AuthLayoutRightSection>{children}</AuthLayoutRightSection>
    </div>
  );
};

export default AuthLayout;
