import React from 'react';
import { Controller } from 'react-hook-form';
import Label from './Label';

type SelectableCardGroupProps = {
  name: string;
  control: any;
  required?: boolean;
  label?: string;
  options: string[];
};

const SelectableCardGroup: React.FC<SelectableCardGroupProps> = ({
  name,
  control,
  required = false,
  label,
  options,
}) => {
  return (
    <Controller
      name={name}
      control={control}
      defaultValue=""
      render={({ field, fieldState }) => (
        <div className="w-full space-y-4">
          {label && (
            <Label htmlFor={name} required={required} className="mb-6">
              {label}
            </Label>
          )}
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-2">
            {options.map((option, i) => {
              const isSelected = field.value === option;
              return (
                <button
                  key={i}
                  type="button"
                  onClick={() => field.onChange(option)}
                  className={`rounded-lg border p-4 text-center font-medium transition ${
                    isSelected
                      ? 'border-transparent bg-[var(--color-brand-primary)] text-[16px] font-semibold text-white'
                      : 'border-[#D4D4D4] bg-white text-[16px] text-[#2D004C]'
                  }`}
                >
                  {option}
                </button>
              );
            })}
          </div>
          {fieldState.error && (
            <p className="text-sm text-[var(--color-error)]">
              {fieldState.error.message}
            </p>
          )}
        </div>
      )}
    />
  );
};

export default SelectableCardGroup;
