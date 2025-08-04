'use client';

import React from 'react';
import { Controller } from 'react-hook-form';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from '@/components/ui/input-otp';
import Label from './Label';
import ErrorText from './ErrorText';
import { cn } from '@/lib/utils';

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
  width = '60px',
  height = '60px',
  gap = '8',
  textSize,
}) => {
  return (
    <Controller
      name={name}
      control={control}
      defaultValue=""
      render={({ field, fieldState }) => (
        <div className="w-full space-y-4">
          <Label htmlFor="otp-0" required={required} className="mb-6">
            {label}
          </Label>

          <InputOTP
            maxLength={length}
            value={field.value}
            onChange={field.onChange}
          >
            <InputOTPGroup className={`flex gap-${gap}`}>
              {Array.from({ length }).map((_, i) => (
                <InputOTPSlot
                  key={i}
                  id={`otp-${i}`}
                  index={i}
                  className={cn(
                    'h-[60px] w-[60px] min-w-0 rounded-[8px] border-2 text-center text-3xl font-semibold',
                    textSize,
                    hasError
                      ? 'border-alert-prominent text-grey-light'
                      : 'border-gray-dark',
                    'data-[active=true]:border-brand-primary data-[active=true]:ring-[0px]',
                  )}
                  style={{ width, height }}
                />
              ))}
            </InputOTPGroup>
          </InputOTP>

          {fieldState.error && <ErrorText error={fieldState.error.message} />}
        </div>
      )}
    />
  );
};

export default OTP;
