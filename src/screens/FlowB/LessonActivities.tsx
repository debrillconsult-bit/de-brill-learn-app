import React from 'react';
import { useNavigate } from 'react-router-dom';
import { StatusBar } from '@/src/components/Layout';
import { X, ChevronRight, CheckCircle2, AlertCircle } from 'lucide-react';
import { cn } from '@/src/lib/utils';

const options = [
  { id: 1, word: 'Black', sound: 'bl' },
  { id: 2, word: 'Blue', sound: 'bl' },
  { id: 3, word: 'Cat', sound: 'c' },
  { id: 4, word: 'Blade', sound: 'bl' },
];

export const LessonActivities = () => {
  const navigate = useNavigate();
  const [selectedId, setSelectedId] = React.useState<number | null>(null);
  const [isSubmitted, setIsSubmitted] = React.useState(false);

  const isCorrect = selectedId === 3;

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
            <div className="h-full w-[60%] bg-brand-gold rounded-full" />
          </div>
        </div>
        <span className="text-[11px] font-bold text-brand-muted">5 / 8</span>
      </div>

      <div className="flex-1 p-6 flex flex-col gap-8">
        <div className="flex flex-col gap-2">
          <span className="text-[10px] font-bold text-brand-gold uppercase tracking-widest">SECTION 4: ACTIVITIES</span>
          <h2 className="text-[20px]">Circle the Odd Sound</h2>
          <p className="text-[14px] text-brand-mid">Which word does NOT start with the /bl/ sound?</p>
        </div>

        {/* Activity Content */}
        <div className="grid grid-cols-2 gap-4">
          {options.map((option) => (
            <button
              key={option.id}
              disabled={isSubmitted}
              onClick={() => setSelectedId(option.id)}
              className={cn(
                "h-24 rounded-[16px] border-2 flex flex-col items-center justify-center gap-1 transition-all active:scale-95",
                selectedId === option.id 
                  ? (isSubmitted
                      ? (option.id === 3 ? "border-[#2E7D32] bg-[#2E7D32]/5" : "border-[#B71C1C] bg-[#B71C1C]/5")
                      : "border-brand-gold bg-brand-gold/5 shadow-md")
                  : "bg-white border-[#DDDDDD] text-brand-navy"
              )}
            >
              <span className="text-[18px] font-bold">{option.word}</span>
              {isSubmitted && option.id === 3 && <CheckCircle2 size={16} className="text-[#2E7D32]" />}
              {isSubmitted && selectedId === option.id && option.id !== 3 && <AlertCircle size={16} className="text-[#B71C1C]" />}
            </button>
          ))}
        </div>

        {isSubmitted && (
          <div className={cn(
            "p-4 rounded-[12px] flex gap-3 items-start animate-in fade-in slide-in-from-bottom-4",
            isCorrect ? "bg-[#2E7D32]/10 border border-[#2E7D32]/20" : "bg-[#B71C1C]/10 border border-[#B71C1C]/20"
          )}>
            {isCorrect ? (
              <>
                <CheckCircle2 className="text-[#2E7D32] shrink-0" size={20} />
                <div className="flex flex-col gap-1">
                  <span className="text-[14px] font-bold text-[#2E7D32]">Well done!</span>
                  <p className="text-[12px] text-[#2E7D32]/80">'Cat' starts with /c/, while the others start with /bl/.</p>
                </div>
              </>
            ) : (
              <>
                <AlertCircle className="text-[#B71C1C] shrink-0" size={20} />
                <div className="flex flex-col gap-1">
                  <span className="text-[14px] font-bold text-[#B71C1C]">Not quite.</span>
                  <p className="text-[12px] text-[#B71C1C]/80">Try to listen for the /bl/ sound at the start of each word.</p>
                </div>
              </>
            )}
          </div>
        )}
      </div>

      <div className="p-6 bg-white border-t border-[#DDDDDD] flex flex-col gap-3">
        {!isSubmitted ? (
          <button 
            disabled={selectedId === null}
            onClick={() => setIsSubmitted(true)}
            className="w-full h-14 bg-brand-gold text-brand-navy rounded-[20px] font-bold text-[16px] disabled:opacity-50 shadow-lg"
          >
            Check Answer
          </button>
        ) : (
          <button 
            onClick={() => navigate('/lesson/practice')}
            className="w-full h-14 bg-brand-navy text-white rounded-[20px] font-bold text-[16px] flex items-center justify-center gap-2 group"
          >
            Next Section <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </button>
        )}
      </div>
    </div>
  );
};
