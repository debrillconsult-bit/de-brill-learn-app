import React, { ButtonHTMLAttributes, ReactNode } from 'react';
import { cn } from '@/src/lib/utils';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  children?: ReactNode;
}

export const Button = ({ 
  variant = 'primary', 
  size = 'md', 
  fullWidth = false,
  className,
  children,
  ...props 
}: ButtonProps) => {
  const variants = {
    primary: 'bg-brand-gold text-brand-navy hover:bg-brand-gold/90',
    secondary: 'bg-brand-navy text-white hover:bg-brand-navy/90',
    outline: 'border-1.5 border-brand-navy text-brand-navy bg-transparent hover:bg-brand-navy/5',
  };

  const sizes = {
    sm: 'h-10 px-4 text-[12px]',
    md: 'h-12 px-6 text-[14px]',
    lg: 'h-14 px-8 text-[16px]',
  };

  return (
    <button
      className={cn(
        'rounded-[20px] font-bold transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed',
        variants[variant],
        sizes[size],
        fullWidth && 'w-full',
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};
