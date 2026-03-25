import React from 'react';
import { useNavigate } from 'react-router-dom';
import { StatusBar, DiagonalHeader } from '@/src/components/Layout';
import { ArrowLeft, Trophy, Star, Medal, Zap, BookOpen, Mic2 } from 'lucide-react';

const badges = [
  { id: 1, title: 'Early Bird', icon: Zap, color: '#F5B800', earned: true, date: 'Mar 12' },
  { id: 2, title: 'Bookworm', icon: BookOpen, color: '#1E2A4A', earned: true, date: 'Mar 15' },
  { id: 3, title: 'Clear Voice', icon: Mic2, color: '#B71C1C', earned: true, date: 'Mar 20' },
  { id: 4, title: 'Perfect Score', icon: Star, color: '#2E7D32', earned: false },
  { id: 5, title: '7-Day Streak', icon: Medal, color: '#7B1FA2', earned: false },
  { id: 6, title: 'IPA Master', icon: Trophy, color: '#1E6B5A', earned: false },
];

export const AchievementGallery = () => {
  const navigate = useNavigate();

  return (
    <div className="flex-1 flex flex-col bg-brand-offwhite overflow-y-auto">
      <StatusBar />
      
      {/* Custom Header */}
      <div className="bg-brand-navy p-6 pt-12 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full -translate-y-10 translate-x-10" />
        <button onClick={() => navigate(-1)} className="mb-6 text-white/60 flex items-center gap-1">
          <ArrowLeft size={18} />
          <span className="text-[13px] font-bold">Back</span>
        </button>
        <div className="flex items-center gap-5">
          <div className="w-16 h-16 rounded-full bg-brand-gold flex items-center justify-center shadow-lg">
            <Trophy size={32} className="text-brand-navy" />
          </div>
          <div className="flex flex-col">
            <h1 className="text-[24px] font-bold text-white">Achievements</h1>
            <p className="text-white/60 text-[13px]">Keep learning to unlock more!</p>
          </div>
        </div>
      </div>

      <div className="p-6 flex flex-col gap-8">
        {/* Badge Grid */}
        <div className="grid grid-cols-2 gap-6">
          {badges.map((badge) => (
            <div 
              key={badge.id}
              className={`
                bg-white rounded-[24px] p-6 border border-[#DDDDDD] flex flex-col items-center text-center gap-3 shadow-sm
                ${!badge.earned ? 'opacity-50 grayscale' : ''}
              `}
            >
              <div 
                className="w-16 h-16 rounded-full flex items-center justify-center"
                style={{ backgroundColor: `${badge.color}15` }}
              >
                <badge.icon size={32} style={{ color: badge.color }} />
              </div>
              <div className="flex flex-col gap-1">
                <h4 className="text-[14px] font-bold text-brand-navy">{badge.title}</h4>
                {badge.earned ? (
                  <span className="text-[10px] text-brand-gold font-bold uppercase">Earned {badge.date}</span>
                ) : (
                  <span className="text-[10px] text-brand-muted font-bold uppercase">Locked</span>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Milestone Card */}
        <div className="bg-white rounded-[20px] p-6 border border-[#DDDDDD] flex flex-col gap-4">
          <h3 className="text-[14px] font-bold text-brand-navy">Next Milestone</h3>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-[12px] bg-brand-gold/10 flex items-center justify-center shrink-0">
              <Medal size={24} className="text-brand-gold" />
            </div>
            <div className="flex-1 flex flex-col gap-1">
              <div className="flex justify-between">
                <span className="text-[13px] font-bold text-brand-navy">10 Lessons Completed</span>
                <span className="text-[13px] font-bold text-brand-navy">8/10</span>
              </div>
              <div className="w-full h-2 bg-[#EEEEEE] rounded-full overflow-hidden">
                <div className="w-[80%] h-full bg-brand-gold rounded-full" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
