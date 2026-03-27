import React from 'react';
import { useNavigate } from 'react-router-dom';
import { StatusBar } from '@/src/components/Layout';
import { X, Volume2, ChevronRight, ChevronLeft } from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { motion, AnimatePresence } from 'motion/react';
import { speakText, stopSpeaking } from '@/src/lib/speech';

const words = [
  { word: 'Black', ipa: '/blæk/', meaning: 'The darkest colour, like coal or night.', sentence: 'The cat is black.' },
  { word: 'Blue', ipa: '/bluː/', meaning: 'The colour of the clear sky.', sentence: 'The sky is blue.' },
  { word: 'Blade', ipa: '/bleɪd/', meaning: 'The flat cutting part of a knife or tool.', sentence: 'The grass blade is green.' },
  { word: 'Blood', ipa: '/blʌd/', meaning: 'The red liquid that flows in our bodies.', sentence: 'Blood is red.' },
];

export const LessonWords = () => {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [isFlipped, setIsFlipped] = React.useState(false);
  const [isBritish, setIsBritish] = React.useState(true);

  const currentWord = words[currentIndex];
  const voiceLang = isBritish ? 'en-GB' : 'en-US';

  React.useEffect(() => () => stopSpeaking(), []);

  const speakCurrentWord = () => {
    void speakText(currentWord.word, { lang: voiceLang });
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
            <div className="h-full w-[30%] bg-brand-gold rounded-full" />
          </div>
        </div>
        <span className="text-[11px] font-bold text-brand-muted">{currentIndex + 1} / {words.length}</span>
      </div>

      <div className="flex-1 p-6 flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-1">
            <span className="text-[10px] font-bold text-brand-gold uppercase tracking-widest">SECTION 2: WORDS TO MASTER</span>
            <h2 className="text-[20px]">New Vocabulary</h2>
          </div>
          <button 
            onClick={() => setIsBritish(!isBritish)}
            className="flex items-center gap-1.5 bg-white border border-[#DDDDDD] rounded-full px-3 py-1.5"
          >
            <span className="text-[10px] font-bold text-brand-navy uppercase">{isBritish ? 'British EN' : 'American EN'}</span>
          </button>
        </div>

        {/* Flashcard Carousel */}
        <div className="flex-1 flex flex-col items-center justify-center gap-8">
          <div className="relative w-full max-w-[280px] h-[320px] perspective-1000">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex + (isFlipped ? '-back' : '-front')}
                initial={{ rotateY: isFlipped ? -90 : 90, opacity: 0 }}
                animate={{ rotateY: 0, opacity: 1 }}
                exit={{ rotateY: isFlipped ? 90 : -90, opacity: 0 }}
                transition={{ duration: 0.3 }}
                onClick={() => setIsFlipped(!isFlipped)}
                className={cn(
                  "w-full h-full rounded-[24px] border-2 border-[#DDDDDD] shadow-xl flex flex-col items-center justify-center p-8 text-center cursor-pointer transition-colors",
                  isFlipped ? "bg-brand-navy text-white" : "bg-white text-brand-navy"
                )}
              >
                {!isFlipped ? (
                  <>
                    <h3 className="text-[32px] font-bold mb-2">{currentWord.word}</h3>
                    <span className="text-[18px] font-ipa text-brand-gold mb-8">{currentWord.ipa}</span>
                    <button
                      onClick={(event) => {
                        event.stopPropagation();
                        speakCurrentWord();
                      }}
                      className="w-16 h-16 rounded-full bg-brand-gold flex items-center justify-center shadow-lg active:scale-95 transition-transform"
                    >
                      <Volume2 size={32} className="text-brand-navy" />
                    </button>
                    <span className="mt-8 text-[10px] text-brand-muted uppercase font-bold tracking-widest">Tap to flip</span>
                  </>
                ) : (
                  <>
                    <p className="text-[16px] leading-relaxed mb-6">{currentWord.meaning}</p>
                    <div className="w-full h-px bg-white/10 mb-6" />
                    <p className="text-[14px] italic text-brand-gold">"{currentWord.sentence}"</p>
                    <span className="mt-8 text-[10px] text-white/40 uppercase font-bold tracking-widest">Tap to see word</span>
                  </>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex items-center gap-6">
            <button 
              disabled={currentIndex === 0}
              onClick={() => { setCurrentIndex(currentIndex - 1); setIsFlipped(false); }}
              className="w-12 h-12 rounded-full border-2 border-brand-gold flex items-center justify-center text-brand-gold disabled:opacity-30"
            >
              <ChevronLeft size={24} />
            </button>
            <button 
              onClick={() => {
                if (currentIndex < words.length - 1) {
                  setCurrentIndex(currentIndex + 1);
                  setIsFlipped(false);
                } else {
                  navigate('/lesson/story');
                }
              }}
              className="w-12 h-12 rounded-full bg-brand-gold flex items-center justify-center text-brand-navy shadow-lg"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>
      </div>

      <div className="p-6 bg-white border-t border-[#DDDDDD]">
        <button 
          onClick={() => navigate('/lesson/story')}
          className="w-full h-14 bg-brand-navy text-white rounded-[20px] font-bold text-[16px] flex items-center justify-center gap-2 group"
        >
          Next Section <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
};
