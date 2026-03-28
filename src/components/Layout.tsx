import React from 'react';
import { cn } from '@/src/lib/utils';

export const StatusBar = () => null;

interface DiagonalHeaderProps {
  title?: string;
  subtitle?: string;
  accentColor?: string;
  showWatermark?: boolean;
  className?: string;
  children?: React.ReactNode;
}

export const DiagonalHeader = ({ 
  title, 
  subtitle, 
  accentColor = '#4DBBEE',
  showWatermark = true,
  className,
  children
}: DiagonalHeaderProps) => {
  return (
    <div className={cn("relative h-[80px] w-full overflow-hidden", className)}>
      {/* Gold Band (Left) */}
      <div className="absolute inset-0 bg-brand-gold diagonal-header-gold z-10 flex items-center px-4">
        {title && (
          <h1 className="text-brand-navy text-[16px] font-bold leading-tight max-w-[180px]">
            {title}
          </h1>
        )}
        {children}
      </div>

      {/* Navy Band (Right) */}
      <div className="absolute inset-0 bg-brand-navy diagonal-header-navy z-0">
        {showWatermark && (
          <div className="ipa-watermark opacity-10">
            <span>/ɪ/</span>
            <span>/æ/</span>
            <span>/eɪ/</span>
          </div>
        )}
      </div>

      {/* Corner Accent */}
      <div 
        className="absolute top-0 right-0 w-[60px] h-[60px] corner-accent z-20"
        style={{ backgroundColor: accentColor }}
      />
    </div>
  );
};
