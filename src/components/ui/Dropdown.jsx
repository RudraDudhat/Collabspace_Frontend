import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { cn } from '../../utils/cn';

const Dropdown = ({
  trigger,
  children,
  position = 'bottom-left',
  offset = 8,
  className,
  onOpenChange,
  disabled = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 });
  const triggerRef = useRef(null);
  const dropdownRef = useRef(null);

  const positions = {
    'top-left': { vertical: 'top', horizontal: 'left' },
    'top-right': { vertical: 'top', horizontal: 'right' },
    'bottom-left': { vertical: 'bottom', horizontal: 'left' },
    'bottom-right': { vertical: 'bottom', horizontal: 'right' },
  };

  const calculatePosition = () => {
    if (!triggerRef.current || !dropdownRef.current) return;

    const triggerRect = triggerRef.current.getBoundingClientRect();
    const dropdownRect = dropdownRef.current.getBoundingClientRect();
    const viewport = {
      width: window.innerWidth,
      height: window.innerHeight,
    };

    const pos = positions[position];
    let top = 0;
    let left = 0;

    // Calculate vertical position
    if (pos.vertical === 'top') {
      top = triggerRect.top - dropdownRect.height - offset;
    } else {
      top = triggerRect.bottom + offset;
    }

    // Calculate horizontal position
    if (pos.horizontal === 'left') {
      left = triggerRect.left;
    } else {
      left = triggerRect.right - dropdownRect.width;
    }

    // Keep dropdown within viewport
    if (left < 8) left = 8;
    if (left + dropdownRect.width > viewport.width - 8) {
      left = viewport.width - dropdownRect.width - 8;
    }
    if (top < 8) top = 8;
    if (top + dropdownRect.height > viewport.height - 8) {
      top = viewport.height - dropdownRect.height - 8;
    }

    setDropdownPosition({ top, left });
  };

  const toggleDropdown = () => {
    if (disabled) return;
    
    const newIsOpen = !isOpen;
    setIsOpen(newIsOpen);
    onOpenChange?.(newIsOpen);
  };

  const closeDropdown = () => {
    setIsOpen(false);
    onOpenChange?.(false);
  };

  useEffect(() => {
    if (isOpen) {
      calculatePosition();
    }
  }, [isOpen, position]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        triggerRef.current &&
        dropdownRef.current &&
        !triggerRef.current.contains(event.target) &&
        !dropdownRef.current.contains(event.target)
      ) {
        closeDropdown();
      }
    };

    const handleEscape = (event) => {
      if (event.key === 'Escape' && isOpen) {
        closeDropdown();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen]);

  const dropdownContent = isOpen && (
    <div
      ref={dropdownRef}
      className={cn('dropdown-menu fade-in', className)}
      style={{
        position: 'fixed',
        top: dropdownPosition.top,
        left: dropdownPosition.left,
        zIndex: 50,
      }}
    >
      {children}
    </div>
  );

  return (
    <>
      <div ref={triggerRef} onClick={toggleDropdown}>
        {trigger}
      </div>
      {dropdownContent && createPortal(dropdownContent, document.body)}
    </>
  );
};

const DropdownItem = ({
  children,
  onClick,
  disabled = false,
  className,
  ...props
}) => (
  <button
    className={cn(
      'dropdown-item w-full',
      disabled && 'opacity-50 cursor-not-allowed',
      className
    )}
    onClick={onClick}
    disabled={disabled}
    {...props}
  >
    {children}
  </button>
);

const DropdownSeparator = ({ className }) => (
  <div className={cn('divider my-1', className)} />
);

export { Dropdown, DropdownItem, DropdownSeparator };
export default Dropdown;