import React from 'react';
import { useNavigate } from 'react-router-dom';
import { StatusBar } from '@/src/components/Layout';
import { ArrowLeft, TrendingUp, Clock, Star, BookOpen, Mic2, ChevronRight } from 'lucide-react';

export const ChildProgressDetail = () => {
  const navigate = useNavigate();

  return (
    <div className="flex-1 flex flex-col bg-brand-offwhite overflow-y-auto">
      <StatusBar />
      
      {/* Header */}
      <div className="bg-white p-4 flex items-center justify-between border-b border-[#DDDDDD] sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="p-1">
            <ArrowLeft size={24} className="text-brand-navy" />
          </button>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-brand-navy/5 flex items-center justify-center text-[20px]">
              🦁
            </div>
            <div className="flex flex-col">
              <h1 className="text-[18px] font-bold text-brand-navy">Chidi's Progress</h1>
              <p className="text-[11px] text-brand-muted font-bold uppercase">PRIMARY 3 • MEP SERIES</p>
            </div>
          </div>
        </div>
      </div>

      <div className="p-4 flex flex-col gap-6 py-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: 'STARS', value: '1,240', icon: Star, color: '#F5B800' },
            { label: 'TIME', value: '8.2h', icon: Clock, color: '#1E2A4A' },
            { label: 'UNIT', value: '4/12', icon: BookOpen, color: '#2E7D32' },
          ].map((stat, i) => (
            <div key={i} className="bg-white rounded-[16px] p-3 border border-[#DDDDDD] flex flex-col items-center text-center gap-1 shadow-sm">
              <stat.icon size={16} style={{ color: stat.color }} className={stat.icon === Star ? 'fill-current' : ''} />
              <span className="text-[15px] font-bold text-brand-navy">{stat.value}</span>
              <span className="text-[8px] text-brand-muted font-bold uppercase">{stat.label}</span>
            </div>
          ))}
        </div>

        {/* Weekly Activity Chart Mock */}
        <div className="bg-white rounded-[20px] p-5 border border-[#DDDDDD] flex flex-col gap-4 shadow-sm">
          <div className="flex items-center justify-between">
            <h3 className="text-[14px] font-bold text-brand-navy">Weekly Activity</h3>
            <div className="flex items-center gap-1 text-green-600">
              <TrendingUp size={14} />
              <span className="text-[11px] font-bold">+15%</span>
            </div>
          </div>
          <div className="flex items-end justify-between h-24 px-2">
            {[30, 50, 20, 80, 45, 10, 60].map((h, i) => (
              <div key={i} className="w-6 bg-brand-navy/10 rounded-t-full relative overflow-hidden h-full flex items-end">
                <div className="w-full bg-brand-gold rounded-t-full" style={{ height: `${h}%` }} />
              </div>
            ))}
          </div>
          <div className="flex justify-between px-2">
            {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((d, i) => (
              <span key={i} className="text-[9px] font-bold text-brand-muted w-6 text-center">{d}</span>
            ))}
          </div>
        </div>

        {/* Skill Performance */}
        <div className="flex flex-col gap-4">
          <h3 className="text-[12px] font-bold text-brand-gold uppercase tracking-wider px-1">SKILL PERFORMANCE</h3>
          <div className="bg-white rounded-[20px] border border-[#DDDDDD] overflow-hidden shadow-sm">
            {[
              { label: 'Phonics Awareness', score: 88, icon: BookOpen },
              { label: 'Pronunciation Accuracy', score: 72, icon: Mic2 },
              { label: 'Reading Comprehension', score: 65, icon: BookOpen },
            ].map((skill, i, arr) => (
              <div 
                key={i}
                className={`p-4 flex flex-col gap-2 ${i !== arr.length - 1 ? 'border-b border-[#EEEEEE]' : ''}`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <skill.icon size={18} className="text-brand-navy" />
                    <span className="text-[14px] font-bold text-brand-navy">{skill.label}</span>
                  </div>
                  <span className="text-[14px] font-bold text-brand-navy">{skill.score}%</span>
                </div>
                <div className="w-full h-1.5 bg-[#EEEEEE] rounded-full overflow-hidden">
                  <div className="h-full bg-brand-navy rounded-full" style={{ width: `${skill.score}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Lessons */}
        <div className="flex flex-col gap-4">
          <h3 className="text-[12px] font-bold text-brand-gold uppercase tracking-wider px-1">RECENT LESSONS</h3>
          <div className="flex flex-col gap-2">
            {[
              { title: 'Consonant Blends', date: 'Today, 2:30 PM', score: '95%' },
              { title: 'Short Vowels', date: 'Yesterday, 4:15 PM', score: '82%' },
            ].map((lesson, i) => (
              <div key={i} className="bg-white rounded-[12px] border border-[#DDDDDD] p-4 flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="text-[14px] font-bold text-brand-navy">{lesson.title}</span>
                  <span className="text-[11px] text-brand-muted">{lesson.date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[14px] font-bold text-brand-navy">{lesson.score}</span>
                  <ChevronRight size={16} className="text-brand-muted" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
