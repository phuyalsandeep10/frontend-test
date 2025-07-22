import { VariantProps } from 'class-variance-authority';
import { Button as ShadcnButton, buttonVariants } from '@/components/ui/button';
import React, { ReactNode, ButtonHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

type ButtonVariants = VariantProps<typeof buttonVariants>;

type ButtonProps = {
  children: ReactNode;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  loading?: boolean;
  className?: string;
} & ButtonHTMLAttributes<HTMLButtonElement> &
  ButtonVariants;

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'default',
  size = 'default',
  leftIcon,
  rightIcon,
  loading = false,
  className,
  disabled,
  ...rest
}) => {
  return (
    <ShadcnButton
      variant={variant}
      size={size}
      disabled={disabled || loading}
      className={cn(buttonVariants({ variant, size }), className)}
      {...rest}
    >
      {loading ? (
        <span>Loading...</span>
      ) : (
        <>
          {leftIcon && (
            <span className={children ? 'mr-2 inline-flex' : 'inline-flex'}>
              {leftIcon}
            </span>
          )}
          {children}
          {rightIcon && (
            <span className={children ? 'ml-2 inline-flex' : 'inline-flex'}>
              {rightIcon}
            </span>
          )}
        </>
      )}
    </ShadcnButton>
  );
};

export default Button;
