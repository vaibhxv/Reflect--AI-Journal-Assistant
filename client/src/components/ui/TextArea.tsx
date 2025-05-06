import React, { forwardRef } from 'react';

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  fullWidth?: boolean;
}

const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ label, error, fullWidth = false, className = '', ...props }, ref) => {
    const baseClass = 'rounded-md border border-[#cbd5e1] bg-white px-4 py-2 text-[#0f172a] placeholder-[#94a3b8] transition-colors focus:border-[#3b82f6] focus:outline-none focus:ring-2 focus:ring-[#3b82f6] focus:ring-opacity-50 disabled:cursor-not-allowed disabled:opacity-50';
    
    const errorClass = error ? 'border-[#ef4444] focus:border-[#ef4444] focus:ring-[#ef4444]' : '';
    
    const widthClass = fullWidth ? 'w-full' : '';
    
    return (
      <div className={`${fullWidth ? 'w-full' : ''} space-y-1`}>
        {label && (
          <label className="text-sm font-medium text-[#334155]">
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          className={`${baseClass} ${errorClass} ${widthClass} ${className}`}
          {...props}
        />
        {error && <p className="text-sm text-[#ef4444]">{error}</p>}
      </div>
    );
  }
);

TextArea.displayName = 'TextArea';

export default TextArea;