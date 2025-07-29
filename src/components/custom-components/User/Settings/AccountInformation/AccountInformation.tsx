'use client';
import React, { useState } from 'react';
// import CountrySelect, { Country } from '../../CountrySelect';
import PhoneInput from '../../../../../shared/PhoneInput';
import ToastUse from '../../Toastuse';
import CountrySelect, { Country } from '@/shared/CountrySelect';

const AccountInformation = () => {
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  return (
    <div>
      AccountInformation
      <CountrySelect value={selectedCountry} onChange={setSelectedCountry} />
      <PhoneInput />
      <ToastUse />
    </div>
  );
};

export default AccountInformation;
