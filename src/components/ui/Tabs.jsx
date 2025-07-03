import React, { useState, createContext, useContext } from 'react';
import { cn } from '../../utils/cn';

const TabsContext = createContext();

const Tabs = ({
  defaultValue,
  value: controlledValue,
  onValueChange,
  orientation = 'horizontal',
  className,
  children,
  ...props
}) => {
  const [internalValue, setInternalValue] = useState(defaultValue);
  const value = controlledValue !== undefined ? controlledValue : internalValue;

  const handleValueChange = (newValue) => {
    if (controlledValue === undefined) {
      setInternalValue(newValue);
    }
    onValueChange?.(newValue);
  };

  return (
    <TabsContext.Provider value={{ value, onValueChange: handleValueChange, orientation }}>
      <div className={cn('w-full', className)} {...props}>
        {children}
      </div>
    </TabsContext.Provider>
  );
};

const TabsList = ({
  className,
  children,
  ...props
}) => {
  const { orientation } = useContext(TabsContext);

  return (
    <div
      className={cn(
        'inline-flex items-center justify-center rounded-lg bg-[var(--tertiary-bg)] p-1',
        orientation === 'vertical' ? 'flex-col h-fit' : 'h-10',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

const TabsTrigger = ({
  value,
  className,
  children,
  disabled = false,
  ...props
}) => {
  const { value: selectedValue, onValueChange, orientation } = useContext(TabsContext);
  const isSelected = selectedValue === value;

  return (
    <button
      className={cn(
        'inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
        orientation === 'vertical' ? 'w-full' : '',
        isSelected
          ? 'bg-[var(--card-bg)] text-[var(--text-primary)] shadow-sm'
          : 'text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--card-bg)]/50',
        className
      )}
      onClick={() => !disabled && onValueChange(value)}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

const TabsContent = ({
  value,
  className,
  children,
  ...props
}) => {
  const { value: selectedValue } = useContext(TabsContext);
  
  if (selectedValue !== value) {
    return null;
  }

  return (
    <div
      className={cn(
        'mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 fade-in',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export { Tabs, TabsList, TabsTrigger, TabsContent };