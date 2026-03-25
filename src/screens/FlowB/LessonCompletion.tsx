import React from 'react';
import { useNavigate } from 'react-router-dom';
import { StatusBar } from '@/src/components/Layout';
import { Trophy, Star, ArrowRight, Share2, RotateCcw } from 'lucide-react';
import { motion } from 'motion/react';

export const LessonCompletion = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-brand-navy relative overflow-hidden">
      <StatusBar />
      
      {/* IPA Watermark */}
      <div className="ipa-watermark opacity-10">
        <span>/ɪ/</span><span>/iː/</span><span>/æ/</span><span>/eɪ/</span>
        <span>/ɔɪ/</span><span>/θ/</span><span>/ʃ/</span><span>/tʃ/</span>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center p-8 text-center gap-8 z-10">
        <motion.div
          initial={{ scale: 0, rotate: -20 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', damping: 12 }}
          className="w-40 h-40 bg-brand-gold rounded-full flex items-center justify-center shadow-2xl relative"
        >
          <Trophy size={80} className="text-brand-navy" />
          <motion.div
            animate={{ scale: [1, 1.2, 1], opacity: [1, 0.5, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="absolute -top-4 -right-4 bg-white p-3 rounded-full shadow-lg"
          >
            <Star size={24} className="text-brand-gold fill-current" />
          </motion.div>
        </motion.div>

        <div className="flex flex-col gap-2">
          <h1 className="text-[32px] text-white font-extrabold">Brilliant!</h1>
          <p className="text-white/70 text-[16px]">You've completed Unit 4</p>
        </div>

        <div className="grid grid-cols-2 gap-4 w-full max-w-[280px]">
          <div className="bg-white/10 rounded-[16px] p-4 flex flex-col items-center gap-1 border border-white/10">
            <span className="text-[24px] font-bold text-brand-gold">95%</span>
            <span className="text-[10px] text-white/60 uppercase font-bold tracking-widest">Accuracy</span>
          </div>
          <div className="bg-white/10 rounded-[16px] p-4 flex flex-col items-center gap-1 border border-white/10">
            <span className="text-[24px] font-bold text-brand-gold">+50</span>
            <span className="text-[10px] text-white/60 uppercase font-bold tracking-widest">Points</span>
          </div>
        </div>

        <div className="flex flex-col gap-4 w-full mt-4">
          <div className="flex items-center justify-between bg-white/5 rounded-[12px] p-4 border border-white/5">
            <span className="text-[13px] text-white/80 font-medium italic">Sounds practised: /bl/, /cl/, /fl/</span>
            <div className="flex -space-x-2">
              {[1, 2, 3].map(i => (
                <div key={i} className="w-6 h-6 rounded-full bg-brand-gold border-2 border-brand-navy flex items-center justify-center text-[10px] font-bold text-brand-navy">
                  ✓
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="p-8 pb-12 z-10 flex flex-col gap-4">
        <button 
          onClick={() => navigate('/home-student')}
          className="w-full h-14 bg-brand-gold text-brand-navy rounded-[20px] font-bold text-[16px] flex items-center justify-center gap-2 shadow-xl active:scale-95 transition-transform"
        >
          Next Unit <ArrowRight size={20} />
        </button>
        
        <div className="flex gap-4">
          <button className="flex-1 h-12 bg-white/10 text-white rounded-[20px] font-bold text-[14px] flex items-center justify-center gap-2 border border-white/10">
            <RotateCcw size={18} /> Review
          </button>
          <button className="flex-1 h-12 bg-white/10 text-white rounded-[20px] font-bold text-[14px] flex items-center justify-center gap-2 border border-white/10">
            <Share2 size={18} /> Share
          </button>
        </div>
      </div>
    </div>
  );
};
