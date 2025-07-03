import React, { useState, useRef, useEffect } from 'react';
import { MagnifyingGlassIcon, XMarkIcon, CommandLineIcon } from '@heroicons/react/24/outline';
import { cn } from '../../utils/cn';

const SearchInput = ({
  placeholder = 'Search...',
  value,
  onChange,
  onFocus,
  onBlur,
  onClear,
  showShortcut = false,
  shortcut = '⌘K',
  expandable = false,
  className,
  ...props
}) => {
  const [isExpanded, setIsExpanded] = useState(!expandable);
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef(null);

  const handleFocus = (e) => {
    setIsFocused(true);
    setIsExpanded(true);
    onFocus?.(e);
  };

  const handleBlur = (e) => {
    setIsFocused(false);
    if (expandable && !value) {
      setIsExpanded(false);
    }
    onBlur?.(e);
  };

  const handleClear = () => {
    onChange?.({ target: { value: '' } });
    onClear?.();
    inputRef.current?.focus();
  };

  const handleExpandClick = () => {
    if (!isExpanded) {
      setIsExpanded(true);
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsExpanded(true);
        setTimeout(() => inputRef.current?.focus(), 100);
      }
    };

    if (showShortcut) {
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }
  }, [showShortcut]);

  return (
    <div className={cn('relative', className)}>
      <div
        className={cn(
          'relative transition-all duration-300',
          expandable && !isExpanded ? 'w-10' : 'w-full'
        )}
      >
        <button
          onClick={handleExpandClick}
          className={cn(
            'absolute left-3 top-1/2 transform -translate-y-1/2 text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors duration-200',
            !expandable && 'pointer-events-none'
          )}
        >
          <MagnifyingGlassIcon className="w-5 h-5" />
        </button>
        
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={onChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder={placeholder}
          className={cn(
            'input-search pl-10 transition-all duration-300',
            expandable && !isExpanded && 'opacity-0 pointer-events-none',
            value && 'pr-20',
            showShortcut && !value && 'pr-16'
          )}
          {...props}
        />

        {/* Clear button */}
        {value && (
          <button
            onClick={handleClear}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors duration-200"
          >
            <XMarkIcon className="w-4 h-4" />
          </button>
        )}

        {/* Keyboard shortcut */}
        {showShortcut && !value && isExpanded && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center space-x-1">
            <kbd className="px-2 py-1 text-xs bg-[var(--tertiary-bg)] border border-[var(--border-color)] rounded flex items-center space-x-1">
              <CommandLineIcon className="w-3 h-3" />
              <span>K</span>
            </kbd>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchInput;