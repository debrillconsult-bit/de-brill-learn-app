import React from 'react';
import { useNavigate } from 'react-router-dom';
import { StatusBar, DiagonalHeader } from '@/src/components/Layout';
import { Play, Star, Trophy, Sparkles } from 'lucide-react';

export const HomeStudent = () => {
  const navigate = useNavigate();

  return (
    <div className="flex-1 flex flex-col bg-brand-offwhite overflow-y-auto pb-4">
      <StatusBar />
      <DiagonalHeader>
        <div className="flex flex-col gap-0.5 ml-4">
          <span className="text-[12px] text-brand-navy/60">Good morning,</span>
          <span className="text-[16px] font-bold text-brand-navy">Chidi Obi</span>
        </div>
        <div className="ml-auto mr-16 flex items-center gap-2 bg-brand-gold/20 border border-brand-gold/50 rounded-full px-3 py-1">
          <div className="w-2 h-2 bg-brand-gold rounded-full animate-pulse" />
          <span className="text-[10px] font-bold text-brand-gold">7 DAY STREAK</span>
        </div>
      </DiagonalHeader>

      <div className="p-4 flex flex-col gap-6">
        {/* Today's Lesson Hero */}
        <button 
          onClick={() => navigate('/lesson/warmup')} // Routes to first lesson section
          className="bg-brand-gold rounded-[12px] p-5 flex flex-col gap-4 relative overflow-hidden group active:scale-[0.98] transition-transform"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 -rotate-12 translate-x-8 -translate-y-8" />
          
          <div className="flex flex-col gap-1 z-10">
            <span className="text-[10px] font-bold text-brand-navy/70 uppercase tracking-wider">CONTINUE LESSON</span>
            <h2 className="text-[18px] text-brand-navy leading-tight">Unit 4: Consonant Blends Part 1</h2>
            <span className="text-[11px] text-brand-navy/60 italic">MEP Primary 1 • Term 1 • 15 mins left</span>
          </div>

          <div className="flex items-center gap-2 z-10">
            <div className="bg-brand-navy text-brand-gold rounded-full px-4 py-2 text-[12px] font-bold flex items-center gap-2">
              Continue <Play size={14} fill="currentColor" />
            </div>
          </div>
        </button>

        {/* Stats Row */}
        <div className="grid grid-cols-3 gap-3">
          {[
            { value: '12', label: 'Units Done', icon: Trophy },
            { value: 'Term 1', label: 'Current Term', icon: Star },
            { value: '88%', label: 'Accuracy', icon: Trophy },
          ].map((stat, i) => (
            <div key={i} className="bg-white rounded-[12px] p-3 border border-[#DDDDDD] flex flex-col items-center gap-1">
              <span className="text-[16px] font-bold text-brand-navy">{stat.value}</span>
              <span className="text-[10px] text-brand-muted text-center leading-tight">{stat.label}</span>
            </div>
          ))}
        </div>

        {/* AI Suggestion */}
        <div className="bg-[#FFFBEA] border-l-4 border-brand-gold rounded-[12px] p-4 flex gap-4 items-start">
          <div className="w-10 h-10 rounded-full bg-brand-gold flex items-center justify-center shrink-0">
            <Sparkles size={20} className="text-brand-navy" />
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-[10px] font-bold text-brand-gold uppercase">COACH BRILL SAYS</span>
            <p className="text-[13px] text-brand-mid leading-relaxed">
              "You're doing great with vowel sounds! Let's practice the /bl/ blend today to reach your weekly goal."
            </p>
          </div>
        </div>

        {/* My Books Section */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h3 className="text-[12px] font-bold text-brand-gold uppercase tracking-wider">MY BOOKS</h3>
            <button className="text-[12px] font-bold text-brand-navy" onClick={() => navigate('/library')}>View All</button>
          </div>

          <div className="flex flex-col gap-3">
            {[
              { title: 'MEP Primary 1', subtitle: 'Mastering English Pronunciation', progress: 65, color: '#7B1FA2' },
              { title: 'Blended Phonics Nursery 2', subtitle: 'Phonics Series', progress: 20, color: '#388E3C' },
            ].map((book, i) => (
              <button 
                key={i}
                onClick={() => navigate(`/book/${i}`)}
                className="bg-white rounded-[12px] border border-[#DDDDDD] p-4 flex items-center gap-4 text-left relative overflow-hidden group active:bg-brand-offwhite"
              >
                <div 
                  className="absolute left-0 top-0 bottom-0 w-1.5"
                  style={{ backgroundColor: book.color }}
                />
                <div className="w-12 h-16 bg-brand-offwhite rounded-sm border border-[#EEEEEE] shrink-0" />
                <div className="flex-1 flex flex-col gap-0.5">
                  <h4 className="text-[14px] font-bold text-brand-navy">{book.title}</h4>
                  <p className="text-[11px] text-brand-muted">{book.subtitle}</p>
                </div>
                <div className="relative w-10 h-10 flex items-center justify-center">
                  <svg className="w-full h-full -rotate-90">
                    <circle cx="20" cy="20" r="18" fill="none" stroke="#EEEEEE" strokeWidth="3" />
                    <circle 
                      cx="20" cy="20" r="18" fill="none" stroke={book.color} strokeWidth="3" 
                      strokeDasharray={113}
                      strokeDashoffset={113 - (113 * book.progress) / 100}
                      strokeLinecap="round"
                    />
                  </svg>
                  <span className="absolute text-[9px] font-bold text-brand-navy">{book.progress}%</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
