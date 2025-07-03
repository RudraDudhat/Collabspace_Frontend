import React from 'react';
import { cn } from '../../utils/cn';

const Progress = ({
  value = 0,
  max = 100,
  size = 'md',
  variant = 'primary',
  showLabel = false,
  label,
  className,
  ...props
}) => {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

  const sizes = {
    sm: 'h-2',
    md: 'h-3',
    lg: 'h-4',
  };

  const variants = {
    primary: 'bg-gradient-to-r from-[var(--brand-primary)] to-[var(--brand-secondary)]',
    success: 'bg-gradient-to-r from-[var(--success)] to-green-600',
    warning: 'bg-gradient-to-r from-[var(--warning)] to-yellow-600',
    error: 'bg-gradient-to-r from-[var(--error)] to-red-600',
  };

  return (
    <div className={cn('w-full', className)} {...props}>
      {(showLabel || label) && (
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-[var(--text-primary)]">
            {label}
          </span>
          {showLabel && (
            <span className="text-sm text-[var(--text-muted)]">
              {Math.round(percentage)}%
            </span>
          )}
        </div>
      )}
      <div className={cn(
        'w-full bg-[var(--tertiary-bg)] rounded-full overflow-hidden',
        sizes[size]
      )}>
        <div
          className={cn(
            'h-full transition-all duration-500 ease-out rounded-full',
            variants[variant]
          )}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

const CircularProgress = ({
  value = 0,
  max = 100,
  size = 'md',
  variant = 'primary',
  showLabel = false,
  strokeWidth = 4,
  className,
  ...props
}) => {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);
  
  const sizes = {
    sm: 32,
    md: 48,
    lg: 64,
    xl: 80,
  };

  const radius = (sizes[size] - strokeWidth * 2) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  const variants = {
    primary: 'stroke-[var(--brand-primary)]',
    success: 'stroke-[var(--success)]',
    warning: 'stroke-[var(--warning)]',
    error: 'stroke-[var(--error)]',
  };

  return (
    <div className={cn('relative inline-flex items-center justify-center', className)} {...props}>
      <svg
        width={sizes[size]}
        height={sizes[size]}
        className="transform -rotate-90"
      >
        <circle
          cx={sizes[size] / 2}
          cy={sizes[size] / 2}
          r={radius}
          stroke="var(--tertiary-bg)"
          strokeWidth={strokeWidth}
          fill="transparent"
        />
        <circle
          cx={sizes[size] / 2}
          cy={sizes[size] / 2}
          r={radius}
          className={variants[variant]}
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeDasharray={strokeDasharray}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          style={{
            transition: 'stroke-dashoffset 0.5s ease-in-out',
          }}
        />
      </svg>
      {showLabel && (
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-sm font-medium text-[var(--text-primary)]">
            {Math.round(percentage)}%
          </span>
        </div>
      )}
    </div>
  );
};

export { Progress, CircularProgress };
export default Progress;