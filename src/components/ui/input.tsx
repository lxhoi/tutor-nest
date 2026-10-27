import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';

const inputVariants = cva(
  'flex h-9 w-full min-w-0 rounded-md border border-neutral-200 bg-transparent px-3 py-1 text-sm shadow-xs outline-none transition-[color,box-shadow] placeholder:text-neutral-400 focus-visible:border-[var(--brand__primary)] focus-visible:ring-[3px] focus-visible:ring-[var(--brand__primary-focus)] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      variant: {
        default: '',
        legacy: '',
      },
    },
    defaultVariants: { variant: 'default' },
  },
);

export interface InputProps extends React.ComponentProps<'input'>, VariantProps<typeof inputVariants> {}

function Input({ className, variant, type, ...props }: InputProps) {
  const resolvedClassName = variant === 'legacy' ? className : cn(inputVariants({ variant }), className);
  return <input data-slot="input" data-variant={variant ?? 'default'} type={type} className={resolvedClassName} {...props} />;
}

export { Input, inputVariants };
