import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-[var(--color-ring)] focus-visible:ring-[var(--color-ring)]/50 focus-visible:ring-[3px] aria-invalid:ring-[var(--color-destructive)]/20 dark:aria-invalid:ring-[var(--color-destructive)]/40 aria-invalid:border-[var(--color-destructive)]",
  {
    variants: {
      variant: {
        default: `
  bg-[var(--color-brand-primary)]
  text-[var(--color-primary-foreground)]
  hover:bg-[var(--color-brand-hover)]
  active:bg-[var(--color-brand-pressed)]
  disabled:bg-[var(--color-brand-disable)]
  disabled:text-[var(--color-disabled-foreground)]
  disabled:opacity-100
  disabled:cursor-not-allowed
`,
        destructive:
          'bg-[var(--color-destructive)] text-white shadow-xs hover:bg-[var(--color-destructive)/90] focus-visible:ring-[var(--color-destructive)]/20 dark:focus-visible:ring-[var(--color-destructive)]/40 dark:bg-[var(--color-destructive)/60]',
        outline: `
  border border-[var(--color-brand-primary)]
  bg-transparent
  text-[var(--color-brand-primary)]
  hover:bg-[var(--color-secondary-hover)]
  hover:text-[var(--color-accent-foreground)]
  disabled:bg-[var(--color-brand-disable)]
  disabled:text-[#71717A]
  dark:bg-[var(--color-input)/30]
  dark:border-[var(--color-input)]
  dark:hover:bg-[var(--color-input)/50]
`,

        secondary:
          'bg-[var(--color-secondary)] text-[var(--color-secondary-foreground)] shadow-xs hover:bg-[var(--color-secondary)/80]',
        ghost:
          'hover:bg-[var(--color-accent)] hover:text-[var(--color-accent-foreground)] dark:hover:bg-[var(--color-accent)/50]',
        link: 'text-[var(--color-brand-primary)] underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-9 px-4 py-2 has-[>svg]:px-3',
        sm: 'h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5',
        lg: 'h-[60px] rounded-[8px] px-6 has-[>svg]:px-4',
        icon: 'size-9',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : 'button';

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
