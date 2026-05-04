import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { StatusBar } from '@/src/components/Layout';
import { X, Volume2, CheckCircle2, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { getSoundPrompt, speakText, stopSpeaking } from '@/src/lib/speech';

const animals = [
  { id: 1, name: 'Lion', sound: 'l', icon: '🦁' },
  { id: 2, name: 'Snake', sound: 's', icon: '🐍' },
  { id: 3, name: 'Monkey', sound: 'm', icon: '🐒' },
  { id: 4, name: 'Tiger', sound: 't', icon: '🐯' },
  { id: 5, name: 'Elephant', sound: 'e', icon: '🐘' },
  { id: 6, name: 'Zebra', sound: 'z', icon: '🦓' },
  { id: 7, name: 'Hippo', sound: 'h', icon: '🦛' },
  { id: 8, name: 'Bear', sound: 'b', icon: '🐻' },
];

const SHUFFLED_ANIMALS = [...animals].sort(() => Math.random() - 0.5);

export const SoundSafari = () => {
  const navigate = useNavigate();
  const [targetIndex, setTargetIndex] = useState(0);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);
  const [score, setScore] = useState(0);
  const [gameState, setGameState] = useState<'playing' | 'complete'>('playing');

  const target = SHUFFLED_ANIMALS[targetIndex];
  const targetPrompt = getSoundPrompt(target.sound);

  // Get 4 random animals including the target
  const [options, setOptions] = useState<typeof animals>([]);

  React.useEffect(() => {
    if (gameState === 'playing') {
      const otherAnimals = animals.filter(a => a.id !== target.id);
      const randomOthers = otherAnimals.sort(() => Math.random() - 0.5).slice(0, 3);
      setOptions([...randomOthers, target].sort(() => Math.random() - 0.5));
      
      const timer = setTimeout(() => {
        void speakText(`Find the animal that starts with the sound ${targetPrompt}`);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [targetIndex, gameState]);

  React.useEffect(() => () => stopSpeaking(), []);

  const handleSelect = (id: number) => {
    if (feedback || gameState === 'complete') return;
    
    setSelectedId(id);
    
    if (id === target.id) {
      setFeedback('correct');
      setScore(s => s + 10);
      void speakText("That's right! Brilliant!");
      
      setTimeout(() => {
        if (targetIndex < SHUFFLED_ANIMALS.length - 1 && targetIndex < 4) { // Play 5 rounds
          setTargetIndex(i => i + 1);
          setSelectedId(null);
          setFeedback(null);
        } else {
          setGameState('complete');
          void speakText(`Game complete! You scored ${score + 10} points!`);
        }
      }, 2000);
    } else {
      setFeedback('wrong');
      void speakText("Not quite. Listen again.");
      setTimeout(() => {
        setFeedback(null);
        setSelectedId(null);
        void speakText(targetPrompt);
      }, 1500);
    }
  };

  if (gameState === 'complete') {
    return (
      <div className="flex-1 flex flex-col bg-brand-offwhite items-center justify-center p-6 text-center">
        <StatusBar />
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white rounded-[32px] p-8 border-4 border-brand-gold shadow-2xl flex flex-col items-center gap-6 w-full max-w-[320px]"
        >
          <div className="text-[64px]">🏆</div>
          <h2 className="text-[24px] font-bold text-brand-navy">Safari Master!</h2>
          <div className="flex flex-col items-center">
            <span className="text-[14px] text-brand-muted font-bold uppercase tracking-widest">FINAL SCORE</span>
            <span className="text-[48px] font-bold text-brand-gold">{score}</span>
          </div>
          <button 
            onClick={() => navigate('/practice')}
            className="w-full h-14 bg-brand-navy text-white rounded-[20px] font-bold text-[16px] shadow-lg active:scale-95 transition-transform"
          >
            Back to Practice
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col bg-brand-offwhite">
      <StatusBar />
      
      {/* Game Header */}
      <div className="p-4 flex items-center justify-between bg-white border-b border-[#DDDDDD]">
        <button onClick={() => navigate('/practice')} className="p-2">
          <X size={24} className="text-brand-navy" />
        </button>
        <div className="flex flex-col items-center">
          <span className="text-[10px] font-bold text-brand-muted uppercase tracking-widest">SOUND SAFARI</span>
          <div className="flex gap-1">
            {[0, 1, 2, 3, 4].map((i) => (
              <div 
                key={i} 
                className={`w-6 h-1.5 rounded-full transition-colors ${i <= targetIndex ? 'bg-brand-gold' : 'bg-[#EEEEEE]'}`} 
              />
            ))}
          </div>
        </div>
        <div className="w-10 text-right font-bold text-brand-navy tabular-nums">{score}</div>
      </div>

      <div className="flex-1 p-6 flex flex-col items-center justify-center gap-8">
        {/* Target Sound */}
        <div className="flex flex-col items-center gap-4">
          <p className="text-brand-muted text-[14px] font-medium">Find the animal that starts with:</p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="button"
            onClick={() => void speakText(targetPrompt)}
            className="w-32 h-32 rounded-full bg-brand-navy flex items-center justify-center text-white shadow-xl relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-brand-gold/10 animate-pulse" />
            <div className="flex flex-col items-center gap-1 z-10">
              <span className="text-[44px] font-bold text-brand-gold font-ipa">/{target.sound}/</span>
              <Volume2 size={24} />
            </div>
          </motion.button>
        </div>

        {/* Animal Grid */}
        <div className="grid grid-cols-2 gap-4 w-full">
          {options.map((animal) => (
            <motion.button
              key={animal.id}
              layout
              onClick={() => handleSelect(animal.id)}
              disabled={!!feedback}
              className={`
                aspect-square rounded-[32px] bg-white border-4 flex flex-col items-center justify-center gap-2 transition-all shadow-sm
                ${selectedId === animal.id && feedback === 'correct' ? 'border-green-500 bg-green-50 shadow-green-100' : ''}
                ${selectedId === animal.id && feedback === 'wrong' ? 'border-red-500 bg-red-50 shadow-red-100' : 'border-transparent'}
              `}
            >
              <span className="text-[54px]">{animal.icon}</span>
              <span className="text-[14px] font-bold text-brand-navy">{animal.name}</span>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Feedback Overlay */}
      <AnimatePresence>
        {feedback && (
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5 }}
            className={`
              absolute bottom-10 left-6 right-6 p-5 rounded-[24px] flex items-center justify-center gap-3 shadow-2xl z-50
              ${feedback === 'correct' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}
            `}
          >
            {feedback === 'correct' ? <CheckCircle2 size={28} /> : <AlertCircle size={28} />}
            <span className="font-extrabold text-[18px]">
              {feedback === 'correct' ? 'AMAZING!' : 'TRY AGAIN!'}
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
