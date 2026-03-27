import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { StatusBar } from '@/src/components/Layout';
import { X, Volume2, CheckCircle2, MoveRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { getLetterSpeech, speakText, stopSpeaking } from '@/src/lib/speech';

const wordData = {
  word: 'CAT',
  phonemes: ['C', 'A', 'T'],
  options: ['C', 'B', 'A', 'D', 'T', 'S'],
};

export const BlendBridge = () => {
  const navigate = useNavigate();
  const [selectedPhonemes, setSelectedPhonemes] = useState<string[]>([]);
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);

  React.useEffect(() => {
    return () => {
      stopSpeaking();
    };
  }, []);

  const handleOptionClick = (phoneme: string) => {
    if (selectedPhonemes.length < 3) {
      void speakText(getLetterSpeech(phoneme));
      const newPhonemes = [...selectedPhonemes, phoneme];
      setSelectedPhonemes(newPhonemes);
      
      if (newPhonemes.length === 3) {
        if (newPhonemes.join('') === wordData.word) {
          setFeedback('correct');
        } else {
          setFeedback('wrong');
          setTimeout(() => {
            setSelectedPhonemes([]);
            setFeedback(null);
          }, 1000);
        }
      }
    }
  };

  return (
    <div className="flex-1 flex flex-col bg-brand-offwhite">
      <StatusBar />
      
      {/* Game Header */}
      <div className="p-4 flex items-center justify-between bg-white border-b border-[#DDDDDD]">
        <button onClick={() => navigate('/practice')} className="p-2">
          <X size={24} className="text-brand-navy" />
        </button>
        <div className="flex flex-col items-center">
          <span className="text-[10px] font-bold text-brand-muted uppercase tracking-widest">BLEND BRIDGE</span>
          <div className="w-32 h-2 bg-[#EEEEEE] rounded-full overflow-hidden mt-1">
            <div className="w-1/3 h-full bg-brand-gold" />
          </div>
        </div>
        <div className="w-10" />
      </div>

      <div className="flex-1 p-6 flex flex-col items-center justify-between py-12">
        {/* Target Image/Sound */}
        <div className="flex flex-col items-center gap-4">
          <div className="w-40 h-40 bg-white rounded-[32px] shadow-lg flex items-center justify-center text-[80px]">
            🐱
          </div>
          <button
            type="button"
            onClick={() => void speakText(wordData.word)}
            className="flex items-center gap-2 bg-brand-navy text-white px-6 py-2 rounded-full active:scale-95 transition-transform"
          >
            <Volume2 size={20} />
            <span className="font-bold">Listen</span>
          </button>
        </div>

        {/* Bridge Slots */}
        <div className="flex gap-3">
          {[0, 1, 2].map((i) => (
            <div 
              key={i}
              className={`
                w-16 h-20 rounded-[12px] border-2 flex items-center justify-center text-[24px] font-bold
                ${selectedPhonemes[i] ? 'bg-brand-navy text-white border-brand-navy' : 'bg-white border-dashed border-[#CCCCCC] text-brand-muted'}
                ${feedback === 'correct' ? 'border-green-500 bg-green-500 text-white' : ''}
                ${feedback === 'wrong' && i === selectedPhonemes.length - 1 ? 'border-red-500' : ''}
              `}
            >
              {selectedPhonemes[i] || ''}
            </div>
          ))}
        </div>

        {/* Phoneme Options */}
        <div className="grid grid-cols-3 gap-4 w-full">
          {wordData.options.map((phoneme, i) => (
            <button
              key={i}
              onClick={() => handleOptionClick(phoneme)}
              className="h-16 bg-white rounded-[12px] border border-[#DDDDDD] shadow-sm text-[20px] font-bold text-brand-navy active:bg-brand-navy active:text-white transition-colors"
            >
              {phoneme}
            </button>
          ))}
        </div>
      </div>

      {/* Success Modal */}
      <AnimatePresence>
        {feedback === 'correct' && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 bg-brand-navy/90 flex items-center justify-center p-8 z-50"
          >
            <motion.div 
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              className="bg-white rounded-[24px] p-8 w-full flex flex-col items-center text-center gap-6"
            >
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle2 size={48} className="text-green-500" />
              </div>
              <div className="flex flex-col gap-2">
                <h2 className="text-[24px] font-bold text-brand-navy">Well Done!</h2>
                <p className="text-brand-muted">You built the word "CAT" perfectly.</p>
              </div>
              <button 
                onClick={() => navigate('/practice')}
                className="w-full bg-brand-gold text-brand-navy h-14 rounded-[16px] font-bold flex items-center justify-center gap-2"
              >
                Next Word
                <MoveRight size={20} />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
