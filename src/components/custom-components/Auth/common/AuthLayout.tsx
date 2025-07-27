'use client';
import React from 'react';
import AuthLayoutLeftSection from './AuthLayoutLeftSection';
import AuthLayoutRightSection from './AuthLayoutRightSection';

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="font-outfit md:justify-center 2xl:flex 2xl:items-center">
      <div className="box-border grid h-[1024px] w-full grid-cols-1 xl:grid-cols-2 2xl:max-w-[1440px]">
        <AuthLayoutLeftSection />
        <AuthLayoutRightSection>{children}</AuthLayoutRightSection>
      </div>
    </div>
  );
};

export default AuthLayout;
