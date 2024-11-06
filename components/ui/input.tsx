import * as React from 'react';

import { cn } from '@/lib/utils';

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          'shadow-none border-[0.1px] border-gray-300 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 flex h-10 w-full rounded-md  transition-colors border-input bg-background  px-3 py-2 text-sm font-medium text-gray-800 ring-offset-background',
          'placeholder:text-muted-foreground',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-500/30 focus-visible:ring-offset-2',
          'focus-visible:border-gray-500',
          'disabled:cursor-not-allowed disabled:opacity-50',
          'transition-all duration-300 ease-out',
          'focus-visible:shadow-md',
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = 'Input';

export { Input };
