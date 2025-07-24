import React from 'react';
import { Controller, Control, FieldValues, Path } from 'react-hook-form';
import { cn } from '@/lib/utils';
import Label from './Label';
import { Textarea } from '@/components/ui/textarea';

type TextAreaFieldProps<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  label?: string;
  required?: boolean;
  className?: string;
  textareaClassName?: string;
  placeholder?: string;
  rows?: number;
};

export function TextAreaField<T extends FieldValues>({
  control,
  name,
  label,
  required = false,
  className,
  textareaClassName,
  placeholder,
  rows = 4,
}: TextAreaFieldProps<T>) {
  return (
    <div className={cn('flex flex-col gap-1', className)}>
      {label && (
        <Label htmlFor={name} required={required}>
          {label}
        </Label>
      )}

      <Controller
        control={control}
        name={name}
        render={({ field, fieldState }) => (
          <>
            <Textarea
              id={name}
              placeholder={placeholder}
              rows={rows}
              className={cn(
                textareaClassName,
                fieldState.error && 'border-color-error',
              )}
              {...field}
            />
            {fieldState.error && (
              <p className="text-color-error text-sm">
                {fieldState.error.message}
              </p>
            )}
          </>
        )}
      />
    </div>
  );
}
