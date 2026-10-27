import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';

const badgeVariants = cva(
  'inline-flex items-center justify-center rounded-md border px-2 py-0.5 text-xs font-medium whitespace-nowrap transition-colors focus-visible:ring-[3px] focus-visible:ring-offset-2',
  {
    variants: {
      variant: {
        default: 'border-transparent bg-[var(--brand__primary)] text-[var(--brand__onprimary)]',
        secondary: 'border-transparent bg-[var(--brand__secondary)] text-[var(--brand__onsecondary)]',
        tertiary: 'border-transparent bg-[var(--brand__tertiary)] text-[var(--brand__ontertiary)]',
        success: 'border-transparent bg-[var(--semantic__successdark)] text-[var(--semantic__successon-solid)]',
        destructive: 'border-transparent bg-[var(--semantic__alertdark)] text-[var(--semantic__alerton-solid)]',
        outline: 'border-[var(--border__alphastrong)] text-current',
        legacy: '',
      },
    },
    defaultVariants: { variant: 'default' },
  },
);

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement>, VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  const resolvedClassName = variant === 'legacy' ? className : cn(badgeVariants({ variant }), className);
  return <span data-slot="badge" data-variant={variant ?? 'default'} className={resolvedClassName} {...props} />;
}

export { Badge, badgeVariants };
