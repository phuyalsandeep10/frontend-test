'use client';
import React, { useState } from 'react';
import LanguageDropdown from './LanguageDropdown';

const AuthLayoutRightSection = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [selectedLanguage, setSelectedLanguage] = useState('English - US');
  console.log(selectedLanguage);

  return (
    <div className="pt-4 pr-4 pl-4 lg:pl-5 xl:pt-10 xl:pr-10 xl:pl-[60px]">
      <div className="flex justify-end">
        <LanguageDropdown
          onValueChange={setSelectedLanguage}
          selectedLanguage={selectedLanguage}
        />
      </div>
      <div className="flex h-[calc(100%-40px)] flex-col justify-center">
        {children}
      </div>
    </div>
  );
};

export default AuthLayoutRightSection;
