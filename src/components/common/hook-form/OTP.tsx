import React, { useState } from 'react';
import Label from './Label';
import { Controller } from 'react-hook-form';
import ErrorText from './ErrorText';

type OTPProps = {
  label?: string;
  required?: boolean;
  length?: number;
  name: string;
  control: any;
  hasError: boolean;
  width?: string;
  height?: string;
  gap?: string;
  textSize?: string;
};

const OTP: React.FC<OTPProps> = ({
  label,
  required = false,
  length = 6,
  name,
  control,
  hasError,
  width,
  height,
  gap = '8',
  textSize = 'text-[32px]',
}) => {
  return (
    <Controller
      name={name}
      control={control}
      defaultValue=""
      render={({ field, fieldState }) => {
        const otp = field.value
          .split('')
          .concat(Array(length).fill(''))
          .slice(0, length);

        const handleChange = (value: string, index: number) => {
          if (!/^[0-9]?$/.test(value)) return;
          const newOtp = [...otp];
          newOtp[index] = value;
          const newValue = newOtp.join('');
          field.onChange(newValue);

          if (value && index < length - 1) {
            const nextInput = document.getElementById(`otp-${index + 1}`);
            nextInput?.focus();
          }
        };

        const handleKeyDown = (
          e: React.KeyboardEvent<HTMLInputElement>,
          index: number,
        ) => {
          if (e.key === 'Backspace' && !otp[index] && index > 0) {
            const prevInput = document.getElementById(`otp-${index - 1}`);
            prevInput?.focus();
          }
        };

        return (
          <div className="w-full space-y-4">
            <Label htmlFor="otp-0" required={required} className="mb-6">
              {label}
            </Label>

            <div className={`flex w-full gap-${gap}`}>
              {otp.map((digit: string, i: number) => (
                <input
                  key={i}
                  id={`otp-${i}`}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleChange(e.target.value, i)}
                  onKeyDown={(e) => handleKeyDown(e, i)}
                  className={`h-[60px] w-[60px] min-w-0 flex-1 rounded-[8px] border-2 text-center ${textSize} font-semibold ${
                    hasError
                      ? 'border-alert-prominent text-grey-light'
                      : 'border-gray-dark'
                  } focus:border-brand-primary`}
                  style={{ maxWidth: `${100 / length}%`, width, height }}
                />
              ))}
            </div>
            {fieldState.error && <ErrorText error={fieldState.error.message} />}
          </div>
        );
      }}
    />
  );
};

export default OTP;
