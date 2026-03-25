import React from 'react';
import { useNavigate } from 'react-router-dom';
import { StatusBar, DiagonalHeader } from '@/src/components/Layout';
import { Trophy, Star, Clock, TrendingUp, ChevronRight } from 'lucide-react';

export const ProgressDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="flex-1 flex flex-col bg-brand-offwhite overflow-y-auto pb-20">
      <StatusBar />
      <DiagonalHeader title="My Progress" />

      <div className="p-4 flex flex-col gap-6">
        {/* Stats Overview */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white rounded-[16px] p-4 border border-[#DDDDDD] flex flex-col gap-2">
            <div className="w-8 h-8 rounded-full bg-brand-gold/10 flex items-center justify-center">
              <Star size={18} className="text-brand-gold fill-current" />
            </div>
            <div className="flex flex-col">
              <span className="text-[20px] font-bold text-brand-navy">1,240</span>
              <span className="text-[11px] text-brand-muted font-bold uppercase">TOTAL STARS</span>
            </div>
          </div>
          <div className="bg-white rounded-[16px] p-4 border border-[#DDDDDD] flex flex-col gap-2">
            <div className="w-8 h-8 rounded-full bg-brand-navy/10 flex items-center justify-center">
              <Clock size={18} className="text-brand-navy" />
            </div>
            <div className="flex flex-col">
              <span className="text-[20px] font-bold text-brand-navy">12.5h</span>
              <span className="text-[11px] text-brand-muted font-bold uppercase">LEARNING TIME</span>
            </div>
          </div>
        </div>

        {/* Weekly Activity */}
        <div className="bg-white rounded-[20px] p-6 border border-[#DDDDDD] flex flex-col gap-4 shadow-sm">
          <div className="flex items-center justify-between">
            <h3 className="text-[14px] font-bold text-brand-navy">Weekly Activity</h3>
            <span className="text-[11px] text-brand-muted font-bold">MAR 19 - 25</span>
          </div>
          <div className="flex items-end justify-between h-32 px-2">
            {[
              { day: 'M', height: '40%' },
              { day: 'T', height: '60%' },
              { day: 'W', height: '30%' },
              { day: 'T', height: '80%' },
              { day: 'F', height: '50%' },
              { day: 'S', height: '20%' },
              { day: 'S', height: '90%' },
            ].map((d, i) => (
              <div key={i} className="flex flex-col items-center gap-2 flex-1">
                <div className="w-6 bg-brand-navy/10 rounded-t-full relative overflow-hidden h-full flex items-end">
                  <div 
                    className="w-full bg-brand-gold rounded-t-full" 
                    style={{ height: d.height }}
                  />
                </div>
                <span className="text-[10px] font-bold text-brand-muted">{d.day}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Skill Breakdown */}
        <div className="flex flex-col gap-4">
          <h3 className="text-[12px] font-bold text-brand-gold uppercase tracking-wider px-1">SKILL BREAKDOWN</h3>
          <div className="flex flex-col gap-3">
            {[
              { label: 'Phonemic Awareness', value: 85, color: '#F5B800' },
              { label: 'Vocabulary', value: 65, color: '#1E2A4A' },
              { label: 'Pronunciation', value: 45, color: '#B71C1C' },
            ].map((skill, i) => (
              <div key={i} className="bg-white rounded-[12px] p-4 border border-[#DDDDDD] flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <span className="text-[13px] font-bold text-brand-navy">{skill.label}</span>
                  <span className="text-[13px] font-bold text-brand-navy">{skill.value}%</span>
                </div>
                <div className="w-full h-2 bg-[#EEEEEE] rounded-full overflow-hidden">
                  <div 
                    className="h-full rounded-full" 
                    style={{ width: `${skill.value}%`, backgroundColor: skill.color }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Achievements Preview */}
        <button 
          onClick={() => navigate('/achievements')}
          className="bg-brand-navy rounded-[16px] p-5 flex items-center justify-between text-white active:scale-[0.98] transition-transform"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
              <Trophy size={24} className="text-brand-gold" />
            </div>
            <div className="flex flex-col text-left">
              <h4 className="text-[15px] font-bold">Achievements</h4>
              <p className="text-white/60 text-[11px]">8 of 24 badges earned</p>
            </div>
          </div>
          <ChevronRight size={20} className="text-white/40" />
        </button>
      </div>
    </div>
  );
};
