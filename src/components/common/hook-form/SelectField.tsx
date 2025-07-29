'use client';

import React from 'react';
import {
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';
import Label from './Label';
import { Controller, Control, FieldValues, Path } from 'react-hook-form';
import { cn } from '@/lib/utils';
import { Select } from '@radix-ui/react-select';

type SelectFieldProps<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  label?: string;
  required?: boolean;
  options: { value: string; label: string }[];
  placeholder?: string;
  className?: string;
};

export function SelectField<T extends FieldValues>({
  control,
  name,
  label,
  required = false,
  options,
  placeholder = 'Select an option',
  className = '',
}: SelectFieldProps<T>) {
  return (
    <div className={cn('flex flex-col gap-1', className)}>
      {label && (
        <Label htmlFor={name} required={required}>
          {label}
        </Label>
      )}
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState }) => (
          <>
            <Select value={field.value} onValueChange={field.onChange}>
              <SelectTrigger id={name} className="w-full">
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
              <SelectContent>
                {options.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {fieldState.error && (
              <span className="text-error text-sm">
                {fieldState.error.message}
              </span>
            )}
          </>
        )}
      />
    </div>
  );
}
