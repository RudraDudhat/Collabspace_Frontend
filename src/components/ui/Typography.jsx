import React from 'react';
import { cn } from '../../utils/cn';

const Typography = React.forwardRef(({
  variant = 'body',
  size,
  weight,
  className,
  children,
  as: Component = 'p',
  gradient = false,
  ...props
}, ref) => {
  const variants = {
    h1: 'text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-[var(--text-primary)]',
    h2: 'text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-[var(--text-primary)]',
    h3: 'text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight text-[var(--text-primary)]',
    h4: 'text-xl md:text-2xl lg:text-3xl font-bold tracking-tight text-[var(--text-primary)]',
    h5: 'text-lg md:text-xl lg:text-2xl font-bold tracking-tight text-[var(--text-primary)]',
    h6: 'text-base md:text-lg lg:text-xl font-bold tracking-tight text-[var(--text-primary)]',
    body: 'text-base leading-relaxed text-[var(--text-secondary)]',
    bodyLarge: 'text-lg leading-relaxed text-[var(--text-secondary)]',
    bodySmall: 'text-sm leading-relaxed text-[var(--text-secondary)]',
    caption: 'text-sm text-[var(--text-muted)]',
    overline: 'text-xs uppercase tracking-wider font-medium text-[var(--text-muted)]',
    label: 'text-sm font-medium text-[var(--text-primary)]',
  };

  const sizes = {
    xs: 'text-xs',
    sm: 'text-sm',
    base: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl',
    '2xl': 'text-2xl',
    '3xl': 'text-3xl',
    '4xl': 'text-4xl',
    '5xl': 'text-5xl',
    '6xl': 'text-6xl',
  };

  const weights = {
    light: 'font-light',
    normal: 'font-normal',
    medium: 'font-medium',
    semibold: 'font-semibold',
    bold: 'font-bold',
    extrabold: 'font-extrabold',
  };

  const defaultComponents = {
    h1: 'h1',
    h2: 'h2',
    h3: 'h3',
    h4: 'h4',
    h5: 'h5',
    h6: 'h6',
    body: 'p',
    bodyLarge: 'p',
    bodySmall: 'p',
    caption: 'span',
    overline: 'span',
    label: 'label',
  };

  const classes = cn(
    variants[variant],
    size && sizes[size],
    weight && weights[weight],
    gradient && 'text-gradient',
    className
  );

  const ElementComponent = Component || defaultComponents[variant] || 'p';

  return (
    <ElementComponent ref={ref} className={classes} {...props}>
      {children}
    </ElementComponent>
  );
});

Typography.displayName = 'Typography';

export default Typography;