import React from 'react';
import { cn } from '../../utils/cn';

const Avatar = React.forwardRef(({
  className,
  size = 'md',
  src,
  alt,
  fallback,
  status,
  children,
  ...props
}, ref) => {
  const sizes = {
    sm: 'avatar-sm',
    md: 'avatar-md',
    lg: 'avatar-lg',
    xl: 'avatar-xl',
  };

  const statusColors = {
    online: 'status-online',
    away: 'status-away',
    offline: 'status-offline',
  };

  const classes = cn(
    'avatar bg-gradient-to-r from-[var(--brand-primary)] to-[var(--brand-secondary)]',
    sizes[size],
    className
  );

  const getInitials = (name) => {
    if (!name) return '?';
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  return (
    <div ref={ref} className="relative inline-block" {...props}>
      <div className={classes}>
        {src ? (
          <img
            src={src}
            alt={alt}
            className="w-full h-full object-cover rounded-full"
          />
        ) : (
          <span className="text-white font-semibold">
            {children || fallback || getInitials(alt)}
          </span>
        )}
      </div>
      {status && (
        <div className={cn(
          'absolute -bottom-1 -right-1',
          statusColors[status]
        )} />
      )}
    </div>
  );
});

Avatar.displayName = 'Avatar';

export default Avatar;