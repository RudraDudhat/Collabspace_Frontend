import React from 'react';
import { cn } from '../../utils/cn';

const LoadingSpinner = ({
  size = 'md',
  variant = 'primary',
  className,
  ...props
}) => {
  const sizes = {
    xs: 'w-3 h-3',
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
    xl: 'w-12 h-12',
  };

  const variants = {
    primary: 'border-[var(--brand-primary)]',
    secondary: 'border-[var(--text-muted)]',
    white: 'border-white',
  };

  return (
    <div
      className={cn(
        'animate-spin rounded-full border-2 border-transparent border-t-current',
        sizes[size],
        variants[variant],
        className
      )}
      {...props}
    />
  );
};

const LoadingSkeleton = ({
  className,
  variant = 'default',
  ...props
}) => {
  const variants = {
    default: 'skeleton h-4 w-full',
    text: 'skeleton h-4 w-3/4',
    title: 'skeleton h-6 w-1/2',
    avatar: 'skeleton h-10 w-10 rounded-full',
    card: 'skeleton h-32 w-full rounded-lg',
  };

  return (
    <div
      className={cn(variants[variant], className)}
      {...props}
    />
  );
};

const LoadingState = ({
  title = 'Loading...',
  description,
  size = 'md',
  className,
}) => (
  <div className={cn('flex flex-col items-center justify-center py-12', className)}>
    <LoadingSpinner size={size} className="mb-4" />
    <h3 className="text-lg font-medium text-[var(--text-primary)] mb-2">{title}</h3>
    {description && (
      <p className="text-sm text-[var(--text-muted)] text-center max-w-sm">
        {description}
      </p>
    )}
  </div>
);

export { LoadingSpinner, LoadingSkeleton, LoadingState };
export default LoadingSpinner;