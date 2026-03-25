import React from 'react';
import { useNavigate } from 'react-router-dom';
import { StatusBar, DiagonalHeader } from '@/src/components/Layout';
import { Sparkles, Play } from 'lucide-react';

export const HomeChild = () => {
  const navigate = useNavigate();

  return (
    <div className="flex-1 flex flex-col bg-brand-offwhite overflow-y-auto pb-4">
      <StatusBar />
      <DiagonalHeader accentColor="#7B1FA2">
        <div className="flex flex-col gap-0.5 ml-4">
          <span className="text-[14px] text-brand-navy/60">Hello,</span>
          <span className="text-[20px] font-bold text-brand-navy">Little Chidi!</span>
        </div>
      </DiagonalHeader>

      <div className="p-6 flex flex-col gap-8">
        {/* Large Animated Welcome */}
        <div className="flex flex-col items-center gap-4 py-4">
          <div className="w-40 h-40 rounded-full bg-brand-gold/20 flex items-center justify-center relative">
            <div className="w-32 h-32 rounded-full bg-brand-gold flex items-center justify-center">
              <svg viewBox="0 0 80 80" className="w-20 h-20">
                <circle cx="40" cy="40" r="30" fill="#1A2E52"/>
                <circle cx="30" cy="34" r="5" fill="#F5C040"/>
                <circle cx="50" cy="34" r="5" fill="#F5C040"/>
                <circle cx="31" cy="33" r="2" fill="#1A2E52"/>
                <circle cx="51" cy="33" r="2" fill="#1A2E52"/>
                <path d="M32 48 Q40 54 48 48" stroke="#F5C040" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
                <circle cx="40" cy="44" r="3" fill="#F5C040"/>
                <path d="M10 30 Q20 20 25 35" stroke="#F5C040" strokeWidth="3" fill="none"/>
                <path d="M70 30 Q60 20 55 35" stroke="#F5C040" strokeWidth="3" fill="none"/>
              </svg>
            </div>
            <div className="absolute -top-2 -right-2 bg-brand-gold p-3 rounded-full shadow-lg animate-bounce">
              <Sparkles size={24} className="text-brand-navy" />
            </div>
          </div>
          <p className="text-[18px] font-bold text-brand-navy text-center leading-tight">
            Ready to play and learn today?
          </p>
        </div>

        {/* Today's Activity - Extra Large Touch Target */}
        <button 
          onClick={() => navigate('/lesson/warmup')}
          className="bg-brand-gold rounded-[32px] p-8 flex flex-col items-center gap-6 shadow-xl active:scale-95 transition-transform"
        >
          <div className="w-20 h-20 bg-brand-navy rounded-full flex items-center justify-center">
            <Play size={40} className="text-brand-gold ml-2" fill="currentColor" />
          </div>
          <div className="flex flex-col items-center gap-1">
            <h2 className="text-[24px] text-brand-navy font-extrabold">Start Playing</h2>
            <p className="text-brand-navy/60 font-bold">Unit 2: Short Vowels</p>
          </div>
        </button>

        {/* Parent Peek Link */}
        <button 
          onClick={() => navigate('/parent/dashboard')}
          className="bg-white rounded-[20px] p-4 border-2 border-[#DDDDDD] flex items-center justify-center gap-3 active:bg-brand-offwhite"
        >
          <span className="text-[14px] font-bold text-brand-muted">Parent's Corner</span>
        </button>
      </div>
    </div>
  );
};
