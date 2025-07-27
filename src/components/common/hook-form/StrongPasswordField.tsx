import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { Controller, Control, FieldValues, Path } from 'react-hook-form';
import { cn } from '@/lib/utils';
import Label from './Label';
import { Input } from '@/components/ui/input';
import { getPasswordValidationStatus } from '@/hooks/utils/validation-utils';
import { Icons } from '@/components/ui/Icons';

type PasswordFieldProps<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  label?: string;
  required?: boolean;
  placeholder?: string;
  inputClassName?: string;
};

export function StrongPasswordField<T extends FieldValues>({
  control,
  name,
  label,
  required = false,
  placeholder,
  inputClassName,
}: PasswordFieldProps<T>) {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const status = getPasswordValidationStatus(password);

  return (
    <div className="space-y-2">
      {label && (
        <Label htmlFor={name} required={required}>
          {label}
        </Label>
      )}

      <Controller
        name={name}
        control={control}
        rules={{
          required: 'Password is required',
          validate: (value) => {
            const { hasUpperCase, hasNumber, hasMinLength } =
              getPasswordValidationStatus(value);

            if (!hasUpperCase) return;
            if (!hasNumber) return;
            if (!hasMinLength) return;
            return true;
          },
        }}
        render={({ field }) => (
          <>
            <div className="relative">
              <Input
                {...field}
                id={name}
                type={showPassword ? 'text' : 'password'}
                onChange={(e) => {
                  field.onChange(e);
                  setPassword(e.target.value);
                }}
                className={cn(
                  'border-gray-light h-[36px] border px-3 pr-10',
                  inputClassName,
                )}
                placeholder={placeholder}
              />

              <span
                className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer text-black"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </span>
            </div>
          </>
        )}
      />

      {/* Live password strength indicators */}
      <div className="mt-2">
        <p className="text-gray-primary text-xs">Password Must Contain:</p>

        <ul className="mt-1 space-y-1 text-sm">
          <ValidationItem
            label="At least 1 uppercase"
            isValid={status.hasUpperCase}
          />
          <ValidationItem
            label="At least 1 number"
            isValid={status.hasNumber}
          />
          <ValidationItem
            label="At least 8 characters"
            isValid={status.hasMinLength}
          />
        </ul>
      </div>
    </div>
  );
}

const ValidationItem = ({
  label,
  isValid,
}: {
  label: string;
  isValid: boolean;
}) => (
  <li className="flex items-center gap-2">
    <span
      className={cn('text-lg', isValid ? 'text-success' : 'text-gray-primary')}
    >
      {isValid ? (
        <Icons.checbox_circle className="h-2.5 w-2.5" />
      ) : (
        <Icons.checbox_circle className="h-2.5 w-2.5" />
      )}
    </span>
    <p className="text-gray-primary text-xs">{label}</p>
  </li>
);
