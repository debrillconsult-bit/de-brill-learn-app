import React from 'react';
import { cn } from '@/src/lib/utils';
import { X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

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

interface LessonHeaderProps {
  progress: number;
  total: number;
  current: number;
}

export const LessonHeader = ({ progress, total, current }: LessonHeaderProps) => {
  const navigate = useNavigate();
  return (
    <div className="bg-white border-b border-[#DDDDDD] px-4 py-3 flex items-center justify-between">
      <button 
        onClick={() => {
          if (confirm('Are you sure you want to exit the lesson? Your progress will be saved.')) {
            navigate(-1);
          }
        }} 
        className="text-brand-muted hover:text-brand-navy transition-colors"
      >
        <X size={24} />
      </button>
      <div className="flex-1 mx-4">
        <div className="h-2 w-full bg-[#EEEEEE] rounded-full overflow-hidden">
          <div 
            className="h-full bg-brand-gold rounded-full transition-all duration-500" 
            style={{ width: `${progress}%` }} 
          />
        </div>
      </div>
      <span className="text-[11px] font-extrabold text-brand-navy tabular-nums">
        {current} / {total}
      </span>
    </div>
  );
};
