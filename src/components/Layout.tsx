import React from 'react';
import { cn } from '@/src/lib/utils';

export const StatusBar = () => {
  return (
    <div className="h-[44px] bg-[#1A1A1A] flex items-center justify-between px-6 text-white text-[12px] font-medium z-50 sticky top-0">
      <span>9:41</span>
      <div className="flex items-center gap-1.5">
        <div className="w-4 h-4 rounded-full border border-white/40 flex items-center justify-center">
          <div className="w-2 h-2 bg-white rounded-full" />
        </div>
        <div className="flex gap-0.5 items-end h-3">
          <div className="w-0.5 h-1 bg-white" />
          <div className="w-0.5 h-1.5 bg-white" />
          <div className="w-0.5 h-2 bg-white" />
          <div className="w-0.5 h-2.5 bg-white/40" />
        </div>
        <div className="w-6 h-3 border border-white/40 rounded-sm relative px-0.5 py-0.5">
          <div className="h-full w-4/5 bg-white rounded-px" />
          <div className="absolute -right-1 top-1 w-0.5 h-1 bg-white/40 rounded-r-sm" />
        </div>
      </div>
    </div>
  );
};

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
  accentColor = '#2E7D32', 
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
