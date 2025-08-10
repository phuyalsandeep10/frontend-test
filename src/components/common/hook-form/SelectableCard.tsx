import React from 'react';
import { Controller } from 'react-hook-form';
import Label from './Label';
import ErrorText from './ErrorText';

type SelectableCardGroupProps = {
  name: string;
  control: any;
  required?: boolean;
  label?: string;
  options: string[];
  labelClassName?: string;
};

const SelectableCardGroup: React.FC<SelectableCardGroupProps> = ({
  name,
  control,
  required = false,
  label,
  options,
  labelClassName,
}) => {
  return (
    <Controller
      name={name}
      control={control}
      defaultValue=""
      render={({ field, fieldState }) => (
        <div className="w-full space-y-4">
          {label && (
            <Label
              htmlFor={name}
              required={required}
              className={labelClassName}
            >
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
                      ? 'bg-brand-primary border-transparent text-base font-semibold text-white'
                      : 'border-gray-light text-brand-dark bg-white text-base'
                  }`}
                >
                  {option}
                </button>
              );
            })}
          </div>
          {fieldState.error && (
            <ErrorText error={`${fieldState.error.message}`} />
          )}
        </div>
      )}
    />
  );
};

export default SelectableCardGroup;
