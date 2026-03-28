import React from 'react';
import { useNavigate } from 'react-router-dom';
import { DiagonalHeader } from '@/src/components/Layout';
import { ChevronLeft, ChevronRight, HelpCircle } from 'lucide-react';

const faqs = [
  {
    q: 'How do I start a lesson?',
    a: 'From the Home screen, tap "Continue" on your current lesson card, or go to Library to browse all books and units.',
  },
  {
    q: 'How does the pronunciation coach work?',
    a: 'Tap the microphone button in any lesson practice section. Speak clearly and Coach Brill will give you feedback on your sounds.',
  },
  {
    q: 'What is the Sound Chart?',
    a: 'The Sound Chart shows all 44 English phonemes. Tap any symbol to hear how it is pronounced with a British English example word.',
  },
  {
    q: 'How do I change to American English?',
    a: 'Go to Settings from your Profile screen and tap Pronunciation Focus to switch between British and American English.',
  },
  {
    q: 'Can parents track progress?',
    a: 'Yes. Parents can access the Parent Corner from the Home screen to see daily summaries and progress reports for their children.',
  },
];

export const HelpCenterScreen = () => {
  const navigate = useNavigate();
  const [openIndex, setOpenIndex] = React.useState<number | null>(null);

  return (
    <div className="min-h-screen flex flex-col bg-[#F5F7FA]">
      <DiagonalHeader title="Help Center">
        <button onClick={() => navigate(-1)} className="ml-4 text-brand-navy">
          <ChevronLeft size={24} />
        </button>
      </DiagonalHeader>
      <div className="p-6 flex flex-col gap-4">
        <div className="flex items-center gap-3 pb-2">
          <HelpCircle size={20} className="text-brand-navy" />
          <h2 className="text-[16px] font-bold text-brand-navy">Frequently Asked Questions</h2>
        </div>
        {faqs.map((faq, i) => (
          <button
            key={i}
            onClick={() => setOpenIndex(openIndex === i ? null : i)}
            className="bg-white rounded-[12px] border border-[#DDDDDD] p-4 text-left flex flex-col gap-2 w-full active:bg-brand-offwhite"
          >
            <div className="flex items-center justify-between gap-3">
              <span className="text-[14px] font-bold text-brand-navy leading-tight flex-1">
                {faq.q}
              </span>
              <ChevronRight
                size={18}
                className={`text-brand-muted shrink-0 transition-transform ${
                  openIndex === i ? 'rotate-90' : ''
                }`}
              />
            </div>
            {openIndex === i && (
              <p className="text-[13px] text-brand-muted leading-relaxed pt-1 border-t border-[#EEEEEE]">
                {faq.a}
              </p>
            )}
          </button>
        ))}
        <div className="bg-brand-navy rounded-[16px] p-5 text-white mt-2">
          <h3 className="text-[14px] font-bold text-brand-gold mb-2">Still need help?</h3>
          <p className="text-[13px] text-white/80">Contact us at davidolufeagba@gmail.com</p>
        </div>
      </div>
    </div>
  );
};
