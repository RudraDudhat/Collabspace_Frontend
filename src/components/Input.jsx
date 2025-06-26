import React from 'react';

const Input = ({ label, type = 'text', name, value, onChange, placeholder, id, required, icon: IconComponent, error }) => {
  const hasError = !!error;
  return (
    <div className="mb-5">
      {label && (
        <label htmlFor={id || name} className="block text-sm font-medium text-[#605E5C] mb-1.5 dark:text-gray-400">
          {label}
        </label>
      )}
      <div className="relative rounded-lg shadow-sm">
        {IconComponent && (
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
            <IconComponent className={`h-5 w-5 ${hasError ? 'text-[#A4262C]/80 dark:text-red-400/80' : 'text-[#605E5C]/70 dark:text-gray-500'}`} aria-hidden="true" />
          </div>
        )}
        <input
          type={type}
          id={id || name}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          className={`block w-full px-3.5 py-2.5 border 
            ${hasError 
              ? 'border-[#A4262C]/70 focus:ring-[#A4262C] focus:border-[#A4262C] dark:border-red-500/70 dark:focus:ring-red-500 dark:focus:border-red-500' 
              : 'border-gray-300 focus:ring-[#464775] focus:border-[#464775] dark:border-gray-600 dark:focus:ring-[#6264A7] dark:focus:border-[#6264A7]'} 
            bg-white text-[#323130] placeholder-[#605E5C]/60 rounded-lg 
            focus:outline-none focus:ring-1 sm:text-sm transition-colors duration-150 ease-in-out 
            dark:bg-[#201F1E] dark:text-[#F3F2F1] dark:placeholder-gray-400/60
            ${IconComponent ? 'pl-11' : 'pl-3.5'}`}
          aria-invalid={hasError}
          aria-describedby={hasError ? `${id || name}-error` : undefined}
        />
      </div>
      {hasError && (
        <p id={`${id || name}-error`} className="mt-1.5 text-xs text-[#A4262C] dark:text-red-400">
          {error}
        </p>
      )}
    </div>
  );
};

export default Input;