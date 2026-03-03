'use client';

import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react';
import { cn } from '@urbancart/ui';
import { MagneticButton, ShimmerButton } from '../motion/magnetic-button';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'link';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  isLoading?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  magnetic?: boolean;
  shimmer?: boolean;
}

const buttonVariants = {
  primary: 'bg-white text-black hover:bg-white/90',
  secondary: 'bg-neutral-800 text-white hover:bg-neutral-700',
  outline: 'border border-white/30 bg-transparent text-white hover:border-white hover:bg-white/5',
  ghost: 'bg-transparent text-white hover:bg-white/10',
  link: 'bg-transparent text-white underline-offset-4 hover:underline',
};

const buttonSizes = {
  sm: 'h-8 px-3 text-xs',
  md: 'h-10 px-4 text-sm',
  lg: 'h-12 px-6 text-sm',
  xl: 'h-14 px-8 text-base',
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'primary',
      size = 'md',
      isLoading,
      leftIcon,
      rightIcon,
      magnetic = false,
      shimmer = false,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const baseClasses = cn(
      'inline-flex items-center justify-center gap-2 font-medium uppercase tracking-wider transition-all duration-300',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50',
      'disabled:pointer-events-none disabled:opacity-50',
      buttonVariants[variant],
      buttonSizes[size],
      className
    );
    
    const content = (
      <>
        {isLoading ? (
          <svg
            className="h-4 w-4 animate-spin"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        ) : (
          leftIcon
        )}
        {children}
        {rightIcon}
      </>
    );
    
    if (magnetic && !disabled) {
      return (
        <MagneticButton className="inline-block">
          <button
            ref={ref}
            className={baseClasses}
            disabled={disabled || isLoading}
            {...props}
          >
            {content}
          </button>
        </MagneticButton>
      );
    }
    
    if (shimmer && !disabled) {
      return (
        <ShimmerButton className={baseClasses} {...props}>
          {content}
        </ShimmerButton>
      );
    }
    
    return (
      <button
        ref={ref}
        className={baseClasses}
        disabled={disabled || isLoading}
        {...props}
      >
        {content}
      </button>
    );
  }
);

Button.displayName = 'Button';

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  'aria-label': string;
}

const iconButtonSizes = {
  sm: 'h-8 w-8',
  md: 'h-10 w-10',
  lg: 'h-12 w-12',
};

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  (
    {
      className,
      variant = 'ghost',
      size = 'md',
      isLoading,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center rounded-full transition-all duration-300',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50',
          'disabled:pointer-events-none disabled:opacity-50',
          buttonVariants[variant],
          iconButtonSizes[size],
          className
        )}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading ? (
          <svg
            className="h-4 w-4 animate-spin"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        ) : (
          children
        )}
      </button>
    );
  }
);

IconButton.displayName = 'IconButton';

interface LinkButtonProps extends ButtonHTMLAttributes<HTMLAnchorElement> {
  href: string;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  external?: boolean;
}

export function LinkButton({
  href,
  className,
  variant = 'primary',
  size = 'md',
  leftIcon,
  rightIcon,
  external = false,
  children,
  ...props
}: LinkButtonProps) {
  const externalProps = external
    ? { target: '_blank', rel: 'noopener noreferrer' }
    : {};
  
  return (
    <a
      href={href}
      className={cn(
        'inline-flex items-center justify-center gap-2 font-medium uppercase tracking-wider transition-all duration-300',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50',
        buttonVariants[variant],
        buttonSizes[size],
        className
      )}
      {...externalProps}
      {...props}
    >
      {leftIcon}
      {children}
      {rightIcon}
    </a>
  );
}

interface CTAButtonProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  href?: string;
  arrow?: boolean;
}

/**
 * Premium CTA button with arrow animation
 */
export function CTAButton({
  children,
  className = '',
  onClick,
  href,
  arrow = true,
}: CTAButtonProps) {
  const content = (
    <span className="group relative inline-flex items-center gap-2 overflow-hidden">
      <span className="relative">
        {children}
        <span className="absolute bottom-0 left-0 h-px w-0 bg-current transition-all duration-300 group-hover:w-full" />
      </span>
      {arrow && (
        <svg
          className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
        </svg>
      )}
    </span>
  );
  
  if (href) {
    return (
      <a
        href={href}
        className={cn(
          'text-sm font-medium uppercase tracking-widest text-white transition-colors hover:text-white/80',
          className
        )}
      >
        {content}
      </a>
    );
  }
  
  return (
    <button
      onClick={onClick}
      className={cn(
        'text-sm font-medium uppercase tracking-widest text-white transition-colors hover:text-white/80',
        className
      )}
    >
      {content}
    </button>
  );
}
