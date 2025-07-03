import React from 'react';
import { cn } from '../../utils/cn';
import Button from './Button';
import Typography from './Typography';

const EmptyState = ({
  icon: Icon,
  title,
  description,
  action,
  actionLabel,
  onAction,
  className,
  size = 'md',
  ...props
}) => {
  const sizes = {
    sm: {
      container: 'py-8',
      icon: 'w-12 h-12',
      title: 'text-lg',
      description: 'text-sm',
    },
    md: {
      container: 'py-12',
      icon: 'w-16 h-16',
      title: 'text-xl',
      description: 'text-base',
    },
    lg: {
      container: 'py-16',
      icon: 'w-20 h-20',
      title: 'text-2xl',
      description: 'text-lg',
    },
  };

  const sizeConfig = sizes[size];

  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center text-center',
        sizeConfig.container,
        className
      )}
      {...props}
    >
      {Icon && (
        <Icon className={cn(
          'text-[var(--text-subtle)] mb-4',
          sizeConfig.icon
        )} />
      )}
      
      {title && (
        <Typography
          variant="h4"
          className={cn(
            'text-[var(--text-primary)] mb-2',
            sizeConfig.title
          )}
        >
          {title}
        </Typography>
      )}
      
      {description && (
        <Typography
          variant="body"
          className={cn(
            'text-[var(--text-muted)] mb-6 max-w-md',
            sizeConfig.description
          )}
        >
          {description}
        </Typography>
      )}
      
      {(action || (actionLabel && onAction)) && (
        <div>
          {action || (
            <Button onClick={onAction}>
              {actionLabel}
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default EmptyState;