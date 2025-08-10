'use client';
import React from 'react';
import AuthLayoutLeftSection from './AuthLayoutLeftSection';
import AuthLayoutRightSection from './AuthLayoutRightSection';

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="2xl:mx-auto 2xl:flex 2xl:h-[1024px] 2xl:max-w-[1440px] 2xl:items-center 2xl:justify-center">
      <div className="font-outfit box-border grid w-full grid-cols-1 lg:h-screen lg:grid-cols-2 xl:h-auto">
        <AuthLayoutLeftSection />
        <AuthLayoutRightSection>{children}</AuthLayoutRightSection>
      </div>
    </div>
  );
};

export default AuthLayout;
