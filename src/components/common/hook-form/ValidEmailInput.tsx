import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';

import { cn } from '@/lib/utils';
import { useValidateEmail } from '@/hooks/auth/useValidateEmail';
import Label from './Label';

function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

interface ValidEmailInputProps {
  onValidityChange: (isValid: boolean, email: string) => void;
  className?: string;
  label?: string;
  name: string;
  required?: boolean;
}

export function ValidEmailInput({
  onValidityChange,
  className,
  label,
  name,
  required,
}: ValidEmailInputProps) {
  const [email, setEmail] = useState('');
  const [localValidation, setLocalValidation] = useState<{
    valid: boolean | null;
    message: string;
  }>({ valid: null, message: '' });

  const debouncedEmail = useDebounce(email, 1000);
  const validateMutation = useValidateEmail();

  useEffect(() => {
    if (!debouncedEmail) {
      setLocalValidation({ valid: null, message: '' });
      onValidityChange(false, '');
      return;
    }

    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if (!emailRegex.test(debouncedEmail)) {
      setLocalValidation({
        valid: false,
        message: 'Invalid email format',
      });
      onValidityChange(false, debouncedEmail);
      return;
    }

    // API validation
    validateMutation.mutate(debouncedEmail);
  }, [debouncedEmail]);

  useEffect(() => {
    if (validateMutation.isSuccess && validateMutation.data) {
      setLocalValidation({
        valid: true,
        // message: (validateMutation.data as any)?.message || 'Email is valid',
        message: '',
      });
      onValidityChange(true, debouncedEmail);
    }

    if (validateMutation.isError && validateMutation.error) {
      let backendMessage = 'Email validation failed';

      if ((validateMutation.error as any)?.response?.data?.message) {
        backendMessage = (validateMutation.error as any).response.data.message;
      } else if (validateMutation.error instanceof Error) {
        backendMessage = validateMutation.error.message;
      }

      setLocalValidation({
        valid: false,
        message: backendMessage,
      });
      onValidityChange(false, debouncedEmail);
    }
  }, [validateMutation.isSuccess, validateMutation.isError]);

  const getStatusStyle = () => {
    if (localValidation.valid === true) return 'text-success';
    if (localValidation.valid === false) return 'text-error';
    return '';
  };

  return (
    <div className={cn('space-y-2', className)}>
      {label && (
        <Label htmlFor={name} required={required} className="mb-2">
          {label}
        </Label>
      )}
      <Input
        id="email"
        type="email"
        value={email}
        name={name}
        required={required}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your Email Address"
        aria-describedby="email-validation"
      />

      {localValidation.message && (
        <p
          id="email-validation"
          className={cn(
            'text-sm transition-opacity duration-300',
            getStatusStyle(),
          )}
        >
          {localValidation.message}
        </p>
      )}
    </div>
  );
}
