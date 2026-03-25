import React from 'react';
import { useNavigate } from 'react-router-dom';
import { StatusBar } from '@/src/components/Layout';
import { X, ChevronRight, CheckCircle2, Circle } from 'lucide-react';
import { cn } from '@/src/lib/utils';

const questions = [
  {
    id: 1,
    text: "What did the black cat sit on?",
    options: ["A red chair", "A blue mat", "A green box", "A yellow rug"],
    correct: 1
  }
];

export const LessonComprehension = () => {
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = React.useState<number | null>(null);
  const [isSubmitted, setIsSubmitted] = React.useState(false);

  const currentQuestion = questions[0];

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
            <div className="h-full w-[90%] bg-brand-gold rounded-full" />
          </div>
        </div>
        <span className="text-[11px] font-bold text-brand-muted">7 / 8</span>
      </div>

      <div className="flex-1 p-6 flex flex-col gap-8 overflow-y-auto">
        <div className="flex flex-col gap-2">
          <span className="text-[10px] font-bold text-brand-gold uppercase tracking-widest">SECTION 6: COMPREHENSION CHECK</span>
          <h2 className="text-[20px]">Quick Quiz</h2>
          <p className="text-[14px] text-brand-mid">Let's see what you remember from the story.</p>
        </div>

        {/* Question Card */}
        <div className="bg-white rounded-[24px] border border-[#DDDDDD] p-6 flex flex-col gap-6 shadow-sm">
          <h3 className="text-[18px] font-bold text-brand-navy leading-tight">
            {currentQuestion.text}
          </h3>

          <div className="flex flex-col gap-3">
            {currentQuestion.options.map((option, i) => (
              <button
                key={i}
                disabled={isSubmitted}
                onClick={() => setSelectedOption(i)}
                className={cn(
                  "p-4 rounded-[12px] border-2 flex items-center gap-3 text-left transition-all active:scale-[0.98]",
                  selectedOption === i 
                    ? (isSubmitted 
                        ? (i === currentQuestion.correct ? "border-[#2E7D32] bg-[#2E7D32]/5" : "border-[#B71C1C] bg-[#B71C1C]/5")
                        : "border-brand-gold bg-brand-gold/5")
                    : "bg-white border-[#EEEEEE] text-brand-navy"
                )}
              >
                <div className={cn(
                  "shrink-0",
                  selectedOption === i ? "text-current" : "text-brand-muted/30"
                )}>
                  {selectedOption === i ? <CheckCircle2 size={20} /> : <Circle size={20} />}
                </div>
                <span className="text-[14px] font-medium">{option}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="p-6 bg-white border-t border-[#DDDDDD] flex flex-col gap-3">
        {!isSubmitted ? (
          <button 
            disabled={selectedOption === null}
            onClick={() => setIsSubmitted(true)}
            className="w-full h-14 bg-brand-gold text-brand-navy rounded-[20px] font-bold text-[16px] disabled:opacity-50 shadow-lg"
          >
            Submit Answer
          </button>
        ) : (
          <button 
            onClick={() => navigate('/lesson/completion')}
            className="w-full h-14 bg-brand-navy text-white rounded-[20px] font-bold text-[16px] flex items-center justify-center gap-2 group"
          >
            Finish Lesson <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </button>
        )}
      </div>
    </div>
  );
};
