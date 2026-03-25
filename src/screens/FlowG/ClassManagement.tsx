import React from 'react';
import { useNavigate } from 'react-router-dom';
import { StatusBar } from '@/src/components/Layout';
import { ArrowLeft, Search, Filter, MoreVertical, TrendingUp, TrendingDown, UserPlus } from 'lucide-react';

export const ClassManagement = () => {
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
          <div className="flex flex-col">
            <h1 className="text-[18px] font-bold text-brand-navy">Primary 1A</h1>
            <p className="text-[11px] text-brand-muted font-bold uppercase">28 STUDENTS</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="p-2 bg-brand-navy/5 rounded-full">
            <Search size={20} className="text-brand-navy" />
          </button>
          <button className="p-2 bg-brand-navy/5 rounded-full">
            <UserPlus size={20} className="text-brand-navy" />
          </button>
        </div>
      </div>

      <div className="p-4 flex flex-col gap-6">
        {/* Class Performance Overview */}
        <div className="bg-white rounded-[20px] p-5 border border-[#DDDDDD] flex items-center justify-between shadow-sm">
          <div className="flex flex-col gap-1">
            <span className="text-[11px] text-brand-muted font-bold uppercase">CLASS AVERAGE</span>
            <span className="text-[24px] font-bold text-brand-navy">72.4%</span>
            <div className="flex items-center gap-1 text-green-600">
              <TrendingUp size={14} />
              <span className="text-[11px] font-bold">+4.2% this week</span>
            </div>
          </div>
          <div className="w-20 h-20 relative flex items-center justify-center">
            <svg className="w-full h-full -rotate-90">
              <circle cx="40" cy="40" r="34" fill="none" stroke="#EEEEEE" strokeWidth="8" />
              <circle cx="40" cy="40" r="34" fill="none" stroke="#F5B800" strokeWidth="8" strokeDasharray="213.6" strokeDashoffset="59.8" strokeLinecap="round" />
            </svg>
            <span className="absolute text-[14px] font-bold text-brand-navy">72%</span>
          </div>
        </div>

        {/* Student List */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between px-1">
            <h3 className="text-[12px] font-bold text-brand-gold uppercase tracking-wider">STUDENT LIST</h3>
            <button className="text-brand-navy flex items-center gap-1 text-[12px] font-bold">
              <Filter size={14} />
              <span>Sort: Name</span>
            </button>
          </div>

          <div className="flex flex-col gap-2">
            {[
              { id: 1, name: 'Adebayo, Tunde', score: 92, trend: 'up', avatar: '🦁' },
              { id: 2, name: 'Chukwuma, Ifeanyi', score: 85, trend: 'up', avatar: '🐘' },
              { id: 3, name: 'Eze, Chinelo', score: 78, trend: 'down', avatar: '🦒' },
              { id: 4, name: 'Ibrahim, Musa', score: 64, trend: 'up', avatar: '🦓' },
              { id: 5, name: 'Okonkwo, Amaka', score: 58, trend: 'down', avatar: '🦏' },
              { id: 6, name: 'Suleiman, Zainab', score: 81, trend: 'up', avatar: '🐆' },
            ].map((student) => (
              <button 
                key={student.id}
                className="bg-white rounded-[12px] border border-[#DDDDDD] p-3 flex items-center justify-between active:bg-brand-offwhite"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-brand-navy/5 flex items-center justify-center text-[20px]">
                    {student.avatar}
                  </div>
                  <div className="flex flex-col text-left">
                    <h4 className="text-[14px] font-bold text-brand-navy">{student.name}</h4>
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] text-brand-muted">Score: {student.score}%</span>
                      {student.trend === 'up' ? (
                        <TrendingUp size={10} className="text-green-600" />
                      ) : (
                        <TrendingDown size={10} className="text-red-600" />
                      )}
                    </div>
                  </div>
                </div>
                <MoreVertical size={18} className="text-brand-muted" />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
