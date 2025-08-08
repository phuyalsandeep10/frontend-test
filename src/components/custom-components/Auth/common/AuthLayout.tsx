'use client';
import React from 'react';
import AuthLayoutLeftSection from './AuthLayoutLeftSection';
import AuthLayoutRightSection from './AuthLayoutRightSection';

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="font-outfit md:justify-center 2xl:flex 2xl:h-screen 2xl:items-center 2xl:justify-center">
      <div className="box-border grid w-full grid-cols-1 lg:grid-cols-2 2xl:max-w-[1440px]">
        <AuthLayoutLeftSection />
        <AuthLayoutRightSection>{children}</AuthLayoutRightSection>
      </div>
    </div>
  );
};

export default AuthLayout;
