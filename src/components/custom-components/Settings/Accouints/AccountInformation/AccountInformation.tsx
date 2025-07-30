'use client';
import React, { useState } from 'react';
// import CountrySelect, { Country } from '../../CountrySelect';

import CountrySelect, { Country } from '@/shared/CountrySelect';
import PhoneInput from '@/shared/PhoneInput';

const AccountInformation = () => {
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  return (
    <div>
      AccountInformation
      <CountrySelect value={selectedCountry} onChange={setSelectedCountry} />
      <PhoneInput />
    </div>
  );
};

export default AccountInformation;
