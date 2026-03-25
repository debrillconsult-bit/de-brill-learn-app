import React from 'react';
import { useNavigate } from 'react-router-dom';
import { StatusBar } from '@/src/components/Layout';
import { Heart, TrendingUp, BookOpen, Clock, Plus, ChevronRight, Settings } from 'lucide-react';

export const ParentDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="flex-1 flex flex-col bg-brand-offwhite overflow-y-auto">
      <StatusBar />
      
      {/* Warm Header */}
      <div className="bg-brand-navy p-6 pt-12 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-full -translate-y-12 translate-x-12" />
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-brand-gold flex items-center justify-center text-[24px]">
              👨‍👩‍👧
            </div>
            <div className="flex flex-col">
              <h1 className="text-[18px] font-bold text-white leading-tight">Parent's Corner</h1>
              <p className="text-white/60 text-[12px]">Monitoring your children's growth</p>
            </div>
          </div>
          <button onClick={() => navigate('/settings')} className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white">
            <Settings size={20} />
          </button>
        </div>
      </div>

      <div className="p-6 flex flex-col gap-8">
        {/* Children Overview Section */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between px-1">
            <h3 className="text-[12px] font-bold text-brand-gold uppercase tracking-wider">MY CHILDREN</h3>
            <button className="text-brand-navy flex items-center gap-1 text-[12px] font-bold">
              <Plus size={16} />
              <span>Add Child</span>
            </button>
          </div>

          <div className="flex flex-col gap-4">
            {[
              { id: 1, name: 'Chidi', level: 'Primary 3', stars: 1240, progress: 75, avatar: '🦁' },
              { id: 2, name: 'Ada', level: 'Nursery 2', stars: 850, progress: 42, avatar: '🐘' },
            ].map((child) => (
              <button 
                key={child.id}
                onClick={() => navigate(`/parent/child/${child.id}`)}
                className="bg-white rounded-[20px] border border-[#DDDDDD] p-5 flex flex-col gap-4 active:scale-[0.98] transition-transform shadow-sm"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-full bg-brand-navy/5 flex items-center justify-center text-[28px]">
                      {child.avatar}
                    </div>
                    <div className="flex flex-col text-left">
                      <h4 className="text-[16px] font-bold text-brand-navy">{child.name}</h4>
                      <p className="text-[12px] text-brand-muted">{child.level}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 bg-brand-gold/10 px-3 py-1 rounded-full">
                    <Heart size={14} className="text-brand-gold fill-current" />
                    <span className="text-[12px] font-bold text-brand-navy">{child.stars}</span>
                  </div>
                </div>
                
                <div className="flex flex-col gap-2">
                  <div className="flex justify-between text-[11px] font-bold uppercase tracking-wider">
                    <span className="text-brand-muted">Overall Progress</span>
                    <span className="text-brand-navy">{child.progress}%</span>
                  </div>
                  <div className="w-full h-2 bg-[#EEEEEE] rounded-full overflow-hidden">
                    <div className="h-full bg-brand-gold rounded-full" style={{ width: `${child.progress}%` }} />
                  </div>
                </div>

                <div className="flex items-center justify-center gap-1 text-brand-navy text-[12px] font-bold pt-2 border-t border-[#EEEEEE]">
                  <span>View Full Report</span>
                  <ChevronRight size={16} />
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Learning Tips Card */}
        <div className="bg-brand-navy rounded-[20px] p-6 text-white relative overflow-hidden shadow-lg">
          <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-full -translate-y-8 translate-x-8" />
          <h3 className="text-[14px] font-bold text-brand-gold uppercase tracking-wider mb-2">PARENT TIP OF THE DAY</h3>
          <p className="text-[13px] leading-relaxed mb-4">
            Encourage your child to practice the /th/ sound while brushing their teeth tonight!
          </p>
          <button className="text-[12px] font-bold underline">Read More Tips</button>
        </div>
      </div>
    </div>
  );
};
