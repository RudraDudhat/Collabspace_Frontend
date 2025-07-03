import React from 'react';
import { cn } from '../../utils/cn';

const Badge = React.forwardRef(({
  className,
  variant = 'secondary',
  children,
  ...props
}, ref) => {
  const variants = {
    primary: 'badge-primary',
    secondary: 'badge-secondary',
    success: 'badge-success',
    warning: 'badge-warning',
    error: 'badge-error',
  };

  const classes = cn(
    'badge',
    variants[variant],
    className
  );

  return (
    <span ref={ref} className={classes} {...props}>
      {children}
    </span>
  );
});

Badge.displayName = 'Badge';

export default Badge;