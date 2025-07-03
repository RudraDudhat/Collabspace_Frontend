import React from 'react';
import { cn } from '../../utils/cn';

const Input = React.forwardRef(({
  className,
  type = 'text',
  error,
  label,
  hint,
  icon: Icon,
  iconPosition = 'left',
  ...props
}, ref) => {
  const inputClasses = cn(
    'input-primary',
    error && 'input-error',
    Icon && iconPosition === 'left' && 'pl-10',
    Icon && iconPosition === 'right' && 'pr-10',
    className
  );

  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm font-medium text-[var(--text-primary)]">
          {label}
        </label>
      )}
      <div className="relative">
        {Icon && iconPosition === 'left' && (
          <Icon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[var(--text-muted)]" />
        )}
        <input
          ref={ref}
          type={type}
          className={inputClasses}
          {...props}
        />
        {Icon && iconPosition === 'right' && (
          <Icon className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[var(--text-muted)]" />
        )}
      </div>
      {hint && !error && (
        <p className="text-sm text-[var(--text-muted)]">{hint}</p>
      )}
      {error && (
        <p className="text-sm text-[var(--error)]">{error}</p>
      )}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;