import { useState } from 'react';
import CountrySelect, { Country } from '@/shared/CountrySelect';
import PhoneInput from '@/shared/PhoneInput';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export default function PersonalInformation() {
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);

  // Personal information form fields
  const formFields = [
    {
      id: 'fullName',
      label: 'Full Name',
      value: 'Yubesh Koirala',
      required: true,
      hint: 'Your Display Name is visible to the user.',
    },
    {
      id: 'email',
      label: 'Email Address',
      value: 'yubeshkoirala11@gmail.com',
      required: true,
    },
    {
      id: 'phone',
      label: 'Contact Number',
      value: '9842367186',
      countryCode: '+977',
      required: false,
    },
    {
      id: 'address',
      label: 'Address',
      value: 'Rio de Janeiro',
      required: true,
    },
    {
      id: 'country',
      label: 'Country',
      value: 'Brazil',
      icon: '/brazil-br.svg',
      required: true,
    },
    {
      id: 'language',
      label: 'Language',
      value: 'English',
      required: false,
    },
  ];
  return (
    <section className="">
      <h3 className="text-brand-dark text-[20px] leading-[30px] font-semibold tracking-[-0.1%]">
        Personal Information
      </h3>

      <div className="">
        {formFields.map((field) => (
          <div key={field.id} className="mt-6">
            <label className="text-brand-dark text-[16px] leading-[26px] font-medium">
              {field.label}
              {field.required && (
                <span className="text-alert-prominent">*</span>
              )}
            </label>

            {field.id === 'country' ? (
              <CountrySelect
                value={selectedCountry}
                onChange={setSelectedCountry}
                buttonClassName="w-[80%] h-9 text-pure-black font-normal"
              />
            ) : field.id === 'language' ? (
              <Select defaultValue={field.value}>
                <SelectTrigger className="h-9 w-[80%] border-neutral-300 bg-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={field.value}>{field.value}</SelectItem>
                </SelectContent>
              </Select>
            ) : field.id === 'phone' ? (
              <div className="border-gray-light text-theme-text-dark mt-3 h-9 w-[80%] rounded-[4px] border bg-white text-[14px] leading-[21px] font-normal tracking-[0.15%] opacity-100">
                <PhoneInput />
              </div>
            ) : (
              <Input
                className="border-gray-light text-theme-text-dark mt-3 h-9 w-[80%] rounded-[4px] border bg-white text-[14px] leading-[21px] font-normal tracking-[0.15%] opacity-100"
                defaultValue={field.id === 'email' ? '' : field.value}
                placeholder={field.id === 'email' ? field.value : ''}
              />
            )}

            {field.hint && (
              <p className="mt-2 text-[12px] leading-[17px] font-normal tracking-[0.02%]">
                {field.hint}
              </p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
