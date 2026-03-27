import React from 'react';
import { useNavigate } from 'react-router-dom';
import { StatusBar } from '@/src/components/Layout';
import { X, Volume2, ChevronRight } from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { getSoundPrompt, speakText, stopSpeaking } from '@/src/lib/speech';

export const LessonWarmUp = () => {
  const navigate = useNavigate();
  const [activePhoneme, setActivePhoneme] = React.useState<string | null>('bl');

  const phonemes = ['bl', 'cl', 'fl', 'sl', 'br', 'cr', 'dr', 'fr'];
  const activePrompt = activePhoneme ? `/${activePhoneme}/` : '';

  React.useEffect(() => () => stopSpeaking(), []);

  const handlePhonemeTap = (phoneme: string) => {
    setActivePhoneme(phoneme);
    void speakText(getSoundPrompt(phoneme));
  };

  return (
    <div className="min-h-screen flex flex-col bg-brand-offwhite">
      <StatusBar />
      
      {/* Lesson Header */}
      <div className="bg-white border-b border-[#DDDDDD] px-4 py-3 flex items-center justify-between">
        <button onClick={() => navigate(-1)} className="text-brand-muted">
          <X size={24} />
        </button>
        <div className="flex-1 mx-4">
          <div className="h-1.5 w-full bg-[#EEEEEE] rounded-full overflow-hidden">
            <div className="h-full w-[15%] bg-brand-gold rounded-full" />
          </div>
        </div>
        <span className="text-[11px] font-bold text-brand-muted">1 / 8</span>
      </div>

      <div className="flex-1 p-6 flex flex-col gap-8">
        <div className="flex flex-col gap-2">
          <span className="text-[10px] font-bold text-brand-gold uppercase tracking-widest">SECTION 1: SOUND WARM-UP</span>
          <h2 className="text-[20px]">Listen and Repeat</h2>
          <p className="text-[14px] text-brand-mid">Tap each sound to hear how it's pronounced.</p>
        </div>

        {/* Phoneme Grid */}
        <div className="grid grid-cols-4 gap-3">
          {phonemes.map((p) => (
            <button
              key={p}
              onClick={() => handlePhonemeTap(p)}
              className={cn(
                "aspect-square rounded-[12px] flex items-center justify-center text-[20px] font-ipa transition-all active:scale-95",
                activePhoneme === p 
                  ? "bg-brand-gold text-brand-navy shadow-md" 
                  : "bg-white border border-[#DDDDDD] text-brand-navy"
              )}
            >
              /{p}/
            </button>
          ))}
        </div>

        {/* Mouth Diagram / Animation Placeholder */}
        <div className="bg-white rounded-[16px] border border-[#DDDDDD] p-6 flex flex-col items-center gap-6 flex-1">
          <div className="w-40 h-40 bg-brand-offwhite rounded-full flex items-center justify-center relative overflow-hidden">
            {/* Mock Mouth Diagram */}
            <div className="w-24 h-24 border-4 border-brand-navy/20 rounded-full flex flex-col items-center justify-center">
              <div className="w-16 h-2 bg-brand-navy/40 rounded-full mb-2" />
              <div className="w-12 h-6 border-b-4 border-brand-gold rounded-b-full" />
            </div>
            <div className="absolute inset-0 bg-brand-gold/5 animate-pulse" />
          </div>
          
          <div className="flex flex-col items-center gap-2">
            <button
              onClick={() => activePhoneme && void speakText(getSoundPrompt(activePhoneme))}
              className="w-16 h-16 rounded-full bg-brand-gold flex items-center justify-center shadow-lg active:scale-95 transition-transform"
            >
              <Volume2 size={32} className="text-brand-navy" />
            </button>
            <span className="text-[12px] font-bold text-brand-navy uppercase tracking-wider">Tap to hear {activePrompt}</span>
          </div>
        </div>
      </div>

      <div className="p-6 bg-white border-t border-[#DDDDDD]">
        <button 
          onClick={() => navigate('/lesson/words')}
          className="w-full h-14 bg-brand-navy text-white rounded-[20px] font-bold text-[16px] flex items-center justify-center gap-2 group"
        >
          Next Section <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
};
