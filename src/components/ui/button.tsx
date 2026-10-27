import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors outline-none focus-visible:ring-[3px] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        default: 'bg-[var(--brand__primary)] text-[var(--brand__onprimary)] hover:bg-[var(--brand__primary-hover)] focus-visible:ring-[var(--brand__primary-focus)]',
        secondary: 'bg-[var(--brand__secondary)] text-[var(--brand__onsecondary)] hover:bg-[var(--brand__secondary-hover)] focus-visible:ring-[var(--brand__secondary-focus)]',
        tertiary: 'bg-[var(--brand__tertiary)] text-[var(--brand__ontertiary)] hover:bg-[var(--brand__tertiary-hover)] focus-visible:ring-[var(--brand__tertiary-focus)]',
        outline: 'border border-[var(--systembg__fgbase)] bg-transparent hover:bg-[var(--systembg__fgalt)]',
        ghost: 'hover:bg-[var(--systembg__fgalt)]',
        destructive: 'bg-[var(--semantic__alertdark)] text-[var(--semantic__alerton-solid)] hover:opacity-90',
        link: 'text-[var(--brand__primary)] underline-offset-4 hover:underline',
        legacy: '',
      },
      size: {
        default: 'h-9 px-4 py-2',
        sm: 'h-8 rounded-md px-3 text-xs',
        lg: 'h-10 rounded-md px-6',
        icon: 'size-9',
        legacy: '',
      },
    },
    defaultVariants: { variant: 'default', size: 'default' },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

function Button({ className, variant, size, asChild = false, ...props }: ButtonProps) {
  const Comp = asChild ? Slot : 'button';
  const resolvedClassName = variant === 'legacy'
    ? className
    : cn(buttonVariants({ variant, size }), className);

  return (
    <Comp
      data-slot="button"
      data-variant={variant ?? 'default'}
      data-size={size ?? 'default'}
      className={resolvedClassName}
      {...props}
    />
  );
}

export { Button, buttonVariants };
