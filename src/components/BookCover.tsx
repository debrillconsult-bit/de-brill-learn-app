import React from 'react';

interface BookCoverProps {
  title: string;
  classLevel: string;
  series: 'Phonics' | 'MEP';
  color: string;
  size?: 'sm' | 'md' | 'lg';
}

export const BookCover = ({
  title, classLevel, series, color, size = 'md'
}: BookCoverProps) => {
  const dims = {
    sm: 'w-12 h-16',
    md: 'w-20 h-28',
    lg: 'w-full h-40',
  };

  const shortTitle = series === 'MEP' ? 'MEP' : 'BP';

  const ipaSymbols = ['/ɪ/', '/æ/', '/eɪ/', '/θ/'];

  return (
    <div
      className={`${dims[size]} rounded-[6px] overflow-hidden relative flex-shrink-0`}
      style={{ backgroundColor: color }}
    >
      <div className="absolute inset-0 flex flex-col">

        <div className="flex-1 relative overflow-hidden">
          <div
            className="absolute inset-0 opacity-15"
            style={{
              background: `linear-gradient(
                135deg,
                rgba(255,255,255,0.3) 0%,
                transparent 50%,
                rgba(0,0,0,0.2) 100%
              )`
            }}
          />

          <div className="absolute top-1 left-1 right-1 grid grid-cols-2 gap-0.5 opacity-20">
            {ipaSymbols.map((sym, i) => (
              <span
                key={i}
                className="text-white font-bold"
                style={{ fontSize: size === 'sm' ? '5px' : '7px' }}
              >
                {sym}
              </span>
            ))}
          </div>

          <div className="absolute inset-0 flex items-center justify-center">
            <span
              className="text-white font-extrabold opacity-30"
              style={{
                fontSize:
                  size === 'sm' ? '14px' :
                  size === 'md' ? '22px' : '32px'
              }}
            >
              {shortTitle}
            </span>
          </div>
        </div>

        <div
          className="px-1 py-1 flex flex-col gap-0"
          style={{ backgroundColor: 'rgba(0,0,0,0.35)' }}
        >
          <span
            className="text-white font-bold leading-tight truncate"
            style={{
              fontSize:
                size === 'sm' ? '5px' :
                size === 'md' ? '7px' : '9px'
            }}
          >
            {classLevel}
          </span>
        </div>
      </div>

      <div
        className="absolute top-0 right-0 w-1/3 h-1/3 opacity-20"
        style={{
          background: 'white',
          clipPath: 'polygon(100% 0, 100% 100%, 0 0)'
        }}
      />
    </div>
  );
};
