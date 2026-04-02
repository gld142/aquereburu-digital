import { forwardRef, type ElementType, type HTMLAttributes } from 'react';
import { cn } from '../lib/utils';

type HeadingLevel = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
type HeadingSize = 'display-xl' | 'display-lg' | 'display-md' | 'display-sm' | 'heading-lg' | 'heading-md' | 'heading-sm';

interface HeadingProps extends HTMLAttributes<HTMLHeadingElement> {
  as?: HeadingLevel;
  size?: HeadingSize;
  accent?: boolean;
}

const sizeClasses: Record<HeadingSize, string> = {
  'display-xl': 'text-display-xl',
  'display-lg': 'text-display-lg',
  'display-md': 'text-display-md',
  'display-sm': 'text-display-sm',
  'heading-lg': 'text-heading-lg',
  'heading-md': 'text-heading-md',
  'heading-sm': 'text-heading-sm',
};

const Heading = forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ as: Tag = 'h2', size = 'heading-lg', accent = false, className, children, ...props }, ref) => {
    return (
      <Tag
        ref={ref}
        className={cn(
          'font-display font-bold tracking-tight',
          sizeClasses[size],
          accent && 'text-gold-500',
          className
        )}
        {...props}
      >
        {children}
      </Tag>
    );
  }
);

Heading.displayName = 'Heading';

export { Heading };
export type { HeadingProps };
