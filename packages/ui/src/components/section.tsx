'use client';

import { forwardRef, type ReactNode } from 'react';
import { motion, type HTMLMotionProps } from 'framer-motion';
import { cn } from '../lib/utils';

type SectionProps = HTMLMotionProps<'section'> & {
  children: ReactNode;
  className?: string;
  containerClassName?: string;
  fullWidth?: boolean;
};

const sectionVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1],
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

const Section = forwardRef<HTMLElement, SectionProps>(
  ({ children, className, containerClassName, fullWidth = false, ...props }, ref) => {
    return (
      <motion.section
        ref={ref}
        className={cn('py-20 md:py-28 lg:py-34', className)}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        variants={sectionVariants}
        {...props}
      >
        {fullWidth ? (
          children
        ) : (
          <div className={cn('mx-auto max-w-7xl px-4 sm:px-6 lg:px-8', containerClassName)}>
            {children}
          </div>
        )}
      </motion.section>
    );
  }
);

Section.displayName = 'Section';

export { Section, sectionVariants, itemVariants };
export type { SectionProps };
