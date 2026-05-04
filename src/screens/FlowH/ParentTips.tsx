import React from 'react';
import { useNavigate } from 'react-router-dom';
import { StatusBar } from '@/src/components/Layout';
import { ChevronLeft, Lightbulb, BookOpen, Star, MessageCircle, Heart, ChevronRight } from 'lucide-react';

export const ParentTips = () => {
  const navigate = useNavigate();

  return (
    <div className="flex-1 flex flex-col bg-brand-offwhite overflow-y-auto">
      <StatusBar />
      
      {/* Header */}
      <div className="bg-brand-navy p-6 pt-12 relative overflow-hidden">
        <button 
          onClick={() => navigate(-1)}
          className="absolute top-12 left-4 text-white/80 hover:text-white transition-colors"
        >
          <ChevronLeft size={24} />
        </button>
        <div className="flex flex-col items-center gap-2 mt-4">
          <Lightbulb size={32} className="text-brand-gold" />
          <h1 className="text-[22px] font-bold text-white">Parenting Tips</h1>
          <p className="text-white/60 text-[13px]">Support your child's phonics journey</p>
        </div>
      </div>

      <div className="p-6 flex flex-col gap-6">
        {/* Daily Tip Card */}
        <div className="bg-white rounded-[24px] p-6 border-2 border-brand-gold/30 shadow-md relative overflow-hidden">
          <div className="absolute -top-4 -right-4 w-20 h-20 bg-brand-gold/10 rounded-full" />
          <div className="flex items-center gap-2 mb-4">
            <Star size={18} className="text-brand-gold fill-current" />
            <span className="text-[12px] font-extrabold text-brand-navy uppercase tracking-widest">TODAY'S HIGHLIGHT</span>
          </div>
          <h3 className="text-[17px] font-bold text-brand-navy mb-3">The "I Spy" Sound Game</h3>
          <p className="text-[14px] text-brand-mid leading-relaxed mb-4">
            Transform car rides into learning sessions! Say "I spy with my little eye, something starting with the /b/ sound." It helps children isolate starting phonemes in a fun way.
          </p>
          <div className="flex items-center gap-4 text-brand-navy font-bold text-[13px]">
            <span className="bg-brand-offwhite px-3 py-1 rounded-full">5 min practice</span>
            <span className="bg-brand-offwhite px-3 py-1 rounded-full">Ages 4-7</span>
          </div>
        </div>

        {/* Categories */}
        <div className="flex flex-col gap-4">
          <h3 className="text-[12px] font-bold text-brand-gold uppercase tracking-wider px-1">TIPS BY CATEGORY</h3>
          
          <div className="grid grid-cols-1 gap-3">
            {[
              { title: 'Reading Aloud', icon: BookOpen, count: 12, color: 'bg-blue-50 text-blue-600' },
              { title: 'Speech Practice', icon: MessageCircle, count: 8, color: 'bg-orange-50 text-orange-600' },
              { title: 'Emotional Support', icon: Heart, count: 15, color: 'bg-red-50 text-red-600' },
            ].map((cat, i) => (
              <button 
                key={i}
                className="bg-white rounded-[20px] p-4 border border-[#DDDDDD] flex items-center justify-between shadow-sm active:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-[16px] flex items-center justify-center ${cat.color}`}>
                    <cat.icon size={24} />
                  </div>
                  <div className="flex flex-col text-left">
                    <span className="text-[15px] font-bold text-brand-navy">{cat.title}</span>
                    <span className="text-[12px] text-brand-muted">{cat.count} articles</span>
                  </div>
                </div>
                <ChevronRight size={20} className="text-brand-muted" />
              </button>
            ))}
          </div>
        </div>

        {/* Weekly Focus */}
        <div className="bg-brand-navy rounded-[24px] p-6 text-white shadow-lg">
          <h3 className="text-[14px] font-bold text-brand-gold uppercase tracking-wider mb-3">WEEKLY FOCUS</h3>
          <div className="flex flex-col gap-4">
            <p className="text-[13px] leading-relaxed opacity-80">
              This week, we're focusing on **Long Vowel Sounds**. Try pointing out words like "Cake", "Bike", and "Home" in storybooks.
            </p>
            <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
              <div className="h-full bg-brand-gold rounded-full w-[60%]" />
            </div>
            <span className="text-[11px] font-bold opacity-60">60% of parents completed this goal</span>
          </div>
        </div>

        <div className="h-10" />
      </div>
    </div>
  );
};
