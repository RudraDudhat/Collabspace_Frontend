import React from 'react';
import { cn } from '../../utils/cn';

const StatusIndicator = ({
  status = 'offline',
  size = 'md',
  showLabel = false,
  label,
  className,
  ...props
}) => {
  const sizes = {
    xs: 'w-2 h-2',
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
    lg: 'w-5 h-5',
  };

  const statuses = {
    online: 'bg-[var(--success)] border-[var(--success)]',
    away: 'bg-[var(--warning)] border-[var(--warning)]',
    busy: 'bg-[var(--error)] border-[var(--error)]',
    offline: 'bg-[var(--text-subtle)] border-[var(--text-subtle)]',
  };

  const statusLabels = {
    online: 'Online',
    away: 'Away',
    busy: 'Busy',
    offline: 'Offline',
  };

  if (showLabel || label) {
    return (
      <div className={cn('flex items-center space-x-2', className)} {...props}>
        <div
          className={cn(
            'rounded-full border-2 border-[var(--card-bg)]',
            sizes[size],
            statuses[status]
          )}
        />
        <span className="text-sm text-[var(--text-muted)]">
          {label || statusLabels[status]}
        </span>
      </div>
    );
  }

  return (
    <div
      className={cn(
        'rounded-full border-2 border-[var(--card-bg)]',
        sizes[size],
        statuses[status],
        className
      )}
      {...props}
    />
  );
};

export default StatusIndicator;