import { Controller, Control, FieldValues, Path } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import Label from './Label';
import { Icons } from '@/components/ui/Icons';
import ErrorText from './ErrorText';

type InputFieldProps<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  label?: string;
  required?: boolean;
  className?: string;
  inputClassName?: string;
  type?: string;
  placeholder?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
};

export function InputField<T extends FieldValues>({
  control,
  name,
  label,
  required = false,
  className,
  inputClassName,
  type = 'text',
  placeholder,
  leftIcon,
  rightIcon,
}: InputFieldProps<T>) {
  return (
    <div className={cn('space-y-1', className)}>
      {label && (
        <Label htmlFor={name} required={required} className="mb-2">
          {label}
        </Label>
      )}

      <Controller
        control={control}
        name={name}
        render={({ field, fieldState }) => (
          <>
            <div className="relative">
              {leftIcon && (
                <span className="absolute top-1/2 left-3 -translate-y-1/2">
                  {leftIcon}
                </span>
              )}
              <Input
                id={name}
                type={type}
                placeholder={placeholder}
                className={cn(
                  leftIcon && 'pl-6',
                  rightIcon && 'pr-6',
                  fieldState.error && 'border-color-error',
                  inputClassName,
                  'border-grey-light h-[36px] border-[1px] px-3 placeholder:text-sm focus:outline-none',
                )}
                {...field}
              />
              {rightIcon && (
                <span className="absolute top-1/2 right-3 -translate-y-1/2">
                  {rightIcon}
                </span>
              )}
            </div>

            {fieldState.error && (
              <ErrorText error={`${fieldState.error.message}`} />
            )}
          </>
        )}
      />
    </div>
  );
}
