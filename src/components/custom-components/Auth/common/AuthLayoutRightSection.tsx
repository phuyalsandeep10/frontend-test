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
    <div className="box-border pt-4 pr-4 pl-4 md:pt-10 md:pr-10 md:pl-[139px]">
      <div className="flex justify-end">
        <LanguageDropdown
          onValueChange={setSelectedLanguage}
          selectedLanguage={selectedLanguage}
        />
      </div>
      {children}
    </div>
  );
};

export default AuthLayoutRightSection;
