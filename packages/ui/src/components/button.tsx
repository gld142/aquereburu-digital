'use client';

import { forwardRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { motion, type HTMLMotionProps } from 'framer-motion';
import { cn } from '../lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-lg text-body-sm font-medium transition-all duration-300 ease-premium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        primary:
          'bg-navy-700 text-white hover:bg-navy-800 shadow-premium hover:shadow-premium-lg focus-visible:ring-navy-700',
        accent:
          'bg-gold-500 text-navy-900 hover:bg-gold-600 shadow-gold hover:shadow-gold-lg focus-visible:ring-gold-500',
        outline:
          'border-2 border-navy-700 text-navy-700 hover:bg-navy-700 hover:text-white focus-visible:ring-navy-700',
        ghost:
          'text-navy-700 hover:bg-navy-700/10 focus-visible:ring-navy-700',
        link: 'text-gold-500 underline-offset-4 hover:underline focus-visible:ring-gold-500',
      },
      size: {
        sm: 'h-9 px-4 text-body-sm',
        md: 'h-11 px-6 text-body-md',
        lg: 'h-13 px-8 text-body-lg',
        xl: 'h-14 px-10 text-body-lg',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
);

type ButtonProps = HTMLMotionProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    magnetic?: boolean;
  };

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, magnetic = false, ...props }, ref) => {
    return (
      <motion.button
        ref={ref}
        className={cn(buttonVariants({ variant, size, className }))}
        whileHover={magnetic ? { scale: 1.02 } : undefined}
        whileTap={{ scale: 0.98 }}
        transition={{ type: 'spring', stiffness: 400, damping: 17 }}
        {...props}
      />
    );
  }
);

Button.displayName = 'Button';

export { Button, buttonVariants };
export type { ButtonProps };
