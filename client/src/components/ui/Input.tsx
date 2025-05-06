import React, { forwardRef } from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  fullWidth?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, fullWidth = false, className = '', leftIcon, rightIcon, ...props }, ref) => {
    const inputWrapperClass = `relative flex items-center ${fullWidth ? 'w-full' : ''}`;
    
    const baseInputClass = 'rounded-md border border-[#cbd5e1] bg-white px-4 py-2 text-[#0f172a] placeholder-[#94a3b8] transition-colors focus:border-[#3b82f6] focus:outline-none focus:ring-2 focus:ring-[#3b82f6] focus:ring-opacity-50 disabled:cursor-not-allowed disabled:opacity-50';
    
    const errorInputClass = error ? 'border-[#ef4444] focus:border-[#ef4444] focus:ring-[#ef4444]' : '';
    
    const leftIconClass = leftIcon ? 'pl-10' : '';
    const rightIconClass = rightIcon ? 'pr-10' : '';
    
    const widthClass = fullWidth ? 'w-full' : '';
    
    return (
      <div className={`${fullWidth ? 'w-full' : ''} space-y-1`}>
        {label && (
          <label className="text-sm font-medium text-[#334155]">
            {label}
          </label>
        )}
        <div className={inputWrapperClass}>
          {leftIcon && (
            <div className="absolute left-3 flex h-full items-center text-[#64748b]">
              {leftIcon}
            </div>
          )}
          <input
            ref={ref}
            className={`${baseInputClass} ${errorInputClass} ${leftIconClass} ${rightIconClass} ${widthClass} ${className}`}
            {...props}
          />
          {rightIcon && (
            <div className="absolute right-3 flex h-full items-center text-[#64748b]">
              {rightIcon}
            </div>
          )}
        </div>
        {error && <p className="text-sm text-[#ef4444]">{error}</p>}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;