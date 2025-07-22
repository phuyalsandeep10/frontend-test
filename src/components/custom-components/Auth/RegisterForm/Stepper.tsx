import { Icons } from '@/components/ui/Icons';
import React from 'react';

interface StepperProps {
  step: number;
}

const Stepper = ({ step }: StepperProps) => {
  return (
    <div className="mt-10 mb-14">
      <div className="relative ml-[22px] box-border flex w-[494px] justify-between">
        {[1, 2, 3].map((s) => (
          <div key={s}>
            <div
              className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-normal ${
                step >= s
                  ? 'bg-brand-primary text-white'
                  : 'bg-brand-disable text-theme-text-primary'
              }`}
            >
              {step >= s ? <Icons.check className="h-4 w-4 text-white" /> : s}
            </div>
          </div>
        ))}

        <div className="absolute top-1/2 -z-10 w-full">
          <div className="h-[2px] w-full bg-[#E8DFFF]">
            <div
              className={`bg-brand-primary h-full ${
                step === 0 ? 'w-0' : ''
              } ${step === 1 ? 'w-1/3' : ''} ${
                step === 2 ? 'w-[75%]' : ''
              } ${step >= 3 ? 'w-full' : ''}`}
            />
          </div>
        </div>
      </div>

      <div className="mt-2.5 flex w-[560px] justify-between">
        {['Account Information', 'Verification', 'Business Information'].map(
          (label, index) => (
            <p
              key={label}
              className={`text-center text-sm ${
                step >= index + 1
                  ? 'text-brand-primary'
                  : 'text-theme-text-primary'
              }`}
            >
              {label}
            </p>
          ),
        )}
      </div>
    </div>
  );
};

export default Stepper;
