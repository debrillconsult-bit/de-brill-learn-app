import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { StatusBar } from '@/src/components/Layout';
import { X, Volume2, CheckCircle2, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const animals = [
  { id: 1, name: 'Lion', sound: '/l/', icon: '🦁' },
  { id: 2, name: 'Snake', sound: '/s/', icon: '🐍' },
  { id: 3, name: 'Monkey', sound: '/m/', icon: '🐒' },
  { id: 4, name: 'Tiger', sound: '/t/', icon: '🐯' },
];

export const SoundSafari = () => {
  const navigate = useNavigate();
  const [targetIndex, setTargetIndex] = useState(0);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);
  const [score, setScore] = useState(0);

  const target = animals[targetIndex];

  const handleSelect = (id: number) => {
    if (feedback) return;
    setSelectedId(id);
    if (id === target.id) {
      setFeedback('correct');
      setScore(s => s + 10);
      setTimeout(() => {
        if (targetIndex < animals.length - 1) {
          setTargetIndex(i => i + 1);
          setSelectedId(null);
          setFeedback(null);
        } else {
          // Game Complete
          navigate('/practice');
        }
      }, 1500);
    } else {
      setFeedback('wrong');
      setTimeout(() => {
        setFeedback(null);
        setSelectedId(null);
      }, 1000);
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
          <span className="text-[10px] font-bold text-brand-muted uppercase tracking-widest">SOUND SAFARI</span>
          <div className="flex gap-1">
            {animals.map((_, i) => (
              <div 
                key={i} 
                className={`w-6 h-1.5 rounded-full ${i <= targetIndex ? 'bg-brand-gold' : 'bg-[#EEEEEE]'}`} 
              />
            ))}
          </div>
        </div>
        <div className="w-10 text-right font-bold text-brand-navy">{score}</div>
      </div>

      <div className="flex-1 p-6 flex flex-col items-center justify-center gap-8">
        {/* Target Sound */}
        <div className="flex flex-col items-center gap-4">
          <p className="text-brand-muted text-[14px] font-medium">Find the animal that starts with:</p>
          <button className="w-32 h-32 rounded-full bg-brand-navy flex items-center justify-center text-white shadow-xl active:scale-95 transition-transform">
            <div className="flex flex-col items-center gap-1">
              <span className="text-[40px] font-bold text-brand-gold">{target.sound}</span>
              <Volume2 size={24} />
            </div>
          </button>
        </div>

        {/* Animal Grid */}
        <div className="grid grid-cols-2 gap-4 w-full">
          {animals.map((animal) => (
            <button
              key={animal.id}
              onClick={() => handleSelect(animal.id)}
              disabled={feedback === 'correct'}
              className={`
                aspect-square rounded-[24px] bg-white border-2 flex flex-col items-center justify-center gap-2 transition-all
                ${selectedId === animal.id && feedback === 'correct' ? 'border-green-500 bg-green-50' : ''}
                ${selectedId === animal.id && feedback === 'wrong' ? 'border-red-500 bg-red-50' : 'border-transparent shadow-sm'}
                active:scale-95
              `}
            >
              <span className="text-[48px]">{animal.icon}</span>
              <span className="text-[14px] font-bold text-brand-navy">{animal.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Feedback Overlay */}
      <AnimatePresence>
        {feedback && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className={`
              absolute bottom-10 left-6 right-6 p-4 rounded-[16px] flex items-center gap-3 shadow-xl
              ${feedback === 'correct' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}
            `}
          >
            {feedback === 'correct' ? <CheckCircle2 size={24} /> : <AlertCircle size={24} />}
            <span className="font-bold text-[16px]">
              {feedback === 'correct' ? 'Great Job!' : 'Try Again!'}
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
