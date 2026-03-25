import React from 'react';
import { useNavigate } from 'react-router-dom';
import { StatusBar } from '@/src/components/Layout';

export const SplashScreen = () => {
  const navigate = useNavigate();

  React.useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/welcome');
    }, 2500);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div 
      className="h-screen w-full bg-brand-navy flex flex-col cursor-pointer"
      onClick={() => navigate('/welcome')}
    >
      <StatusBar />
      
      <div className="flex-1 relative overflow-hidden">
        {/* Diagonal Hero Panel */}
        <div className="absolute inset-0 bg-brand-gold diagonal-header-gold z-10 flex flex-col items-center justify-center pb-20">
          {/* Diagonal split logo mark: gold-left / navy-right with white separator */}
          <div className="relative w-16 h-16 rounded-2xl overflow-hidden mb-4 flex-shrink-0">
            {/* Gold left half */}
            <div className="absolute inset-0 bg-brand-gold diagonal-header-gold flex items-center justify-center">
              <span className="text-brand-navy font-bold text-[18px] relative z-10">DB</span>
            </div>
            {/* Navy right half */}
            <div className="absolute inset-0 bg-brand-navy diagonal-header-navy" />
            {/* White diagonal separator strip */}
            <div
              className="absolute inset-0"
              style={{ clipPath: 'polygon(83% 0, 87% 0, 17% 100%, 13% 100%)', background: 'white' }}
            />
          </div>
          <h1 className="text-white text-[28px] font-extrabold mb-2">De-Brill Learn</h1>
          <p className="text-white/70 text-[13px] text-center px-12 leading-relaxed">
            Speak clearly. Read confidently. Learn joyfully.
          </p>
          {/* Newly Revised 2026 badge — bottom-right of gold diagonal section */}
          <div className="absolute bottom-4 right-6 bg-white/20 text-white text-[10px] px-2 py-0.5 rounded-full">
            Newly Revised 2026
          </div>
        </div>

        <div className="absolute inset-0 bg-brand-navy diagonal-header-navy z-0">
          <div className="ipa-watermark opacity-10">
            <span>/ɪ/</span><span>/iː/</span><span>/æ/</span><span>/eɪ/</span>
            <span>/ɔɪ/</span><span>/θ/</span><span>/ʃ/</span><span>/tʃ/</span>
          </div>
          {/* Floating IPA labels: low-opacity, positioned bottom-left and top-right */}
          <span className="absolute bottom-8 left-6 text-white/10 text-[48px] italic font-ipa pointer-events-none">/ɪ/</span>
          <span className="absolute top-8 right-6 text-white/10 text-[48px] italic font-ipa pointer-events-none">/uː/</span>
        </div>

        {/* Top Right Accent */}
        <div className="absolute top-0 right-0 w-20 h-20 bg-series-green corner-accent z-20" />
      </div>

      {/* Bottom Surface */}
      <div className="h-[30%] bg-white px-8 flex flex-col items-center justify-center gap-4">
        <button 
          className="w-full h-12 bg-brand-gold rounded-[20px] text-brand-navy font-bold text-[14px]"
          onClick={(e) => { e.stopPropagation(); navigate('/welcome'); }}
        >
          Get started
        </button>
        <button
          className="w-full h-12 border-2 border-brand-navy rounded-[20px] text-brand-navy font-bold text-[14px]"
          onClick={(e) => { e.stopPropagation(); navigate('/welcome'); /* TODO: replace with /login when auth flow is built */ }}
        >
          Log in
        </button>
        
        <div className="absolute bottom-6 right-6 flex items-center gap-1">
          <span className="text-[11px] text-brand-muted">🇬🇧 British English</span>
        </div>
      </div>
    </div>
  );
};
