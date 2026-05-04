import React from 'react';
import { useNavigate } from 'react-router-dom';
import { StatusBar, DiagonalHeader } from '@/src/components/Layout';
import { TrendingUp, Users, BookOpen, Clock, ChevronLeft, BarChart3, PieChart, Activity } from 'lucide-react';

export const TeacherAnalytics = () => {
  const navigate = useNavigate();

  return (
    <div className="flex-1 flex flex-col bg-brand-offwhite overflow-y-auto">
      <StatusBar />
      
      {/* Header with Back Button */}
      <div className="bg-brand-navy p-6 pt-12 relative overflow-hidden">
        <button 
          onClick={() => navigate(-1)}
          className="absolute top-12 left-4 text-white/80 hover:text-white transition-colors"
        >
          <ChevronLeft size={24} />
        </button>
        <div className="flex flex-col items-center gap-2 mt-4">
          <BarChart3 size={32} className="text-brand-gold" />
          <h1 className="text-[22px] font-bold text-white">Class Analytics</h1>
          <p className="text-white/60 text-[13px]">Performance Insights • Term 2</p>
        </div>
      </div>

      <div className="p-6 flex flex-col gap-6">
        {/* Engagement Summary */}
        <div className="bg-white rounded-[20px] p-5 border border-[#DDDDDD] shadow-sm flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h3 className="text-[14px] font-bold text-brand-navy">Weekly Engagement</h3>
            <span className="text-[11px] text-brand-gold font-bold">+12% vs last week</span>
          </div>
          
          <div className="flex items-end justify-between h-24 px-2">
            {[40, 70, 45, 90, 65, 80, 50].map((height, i) => (
              <div key={i} className="flex flex-col items-center gap-2">
                <div 
                  className="w-3 bg-brand-navy/10 rounded-t-full relative" 
                  style={{ height: '60px' }}
                >
                  <div 
                    className="absolute bottom-0 left-0 w-full bg-brand-gold rounded-t-full transition-all duration-500" 
                    style={{ height: `${height}%` }}
                  />
                </div>
                <span className="text-[9px] font-bold text-brand-muted uppercase">
                  {['M', 'T', 'W', 'T', 'F', 'S', 'S'][i]}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white rounded-[20px] p-4 border border-[#DDDDDD] shadow-sm flex flex-col gap-2">
            <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-series-blue">
              <Users size={16} />
            </div>
            <span className="text-[20px] font-bold text-brand-navy">94%</span>
            <span className="text-[11px] text-brand-muted font-bold uppercase">Active Students</span>
          </div>
          <div className="bg-white rounded-[20px] p-4 border border-[#DDDDDD] shadow-sm flex flex-col gap-2">
            <div className="w-8 h-8 rounded-full bg-orange-50 flex items-center justify-center text-brand-gold">
              <Clock size={16} />
            </div>
            <span className="text-[20px] font-bold text-brand-navy">18.5h</span>
            <span className="text-[11px] text-brand-muted font-bold uppercase">Avg. Study Time</span>
          </div>
        </div>

        {/* Top Difficult Sounds */}
        <div className="bg-white rounded-[20px] p-5 border border-[#DDDDDD] shadow-sm flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <Activity size={18} className="text-brand-navy" />
            <h3 className="text-[14px] font-bold text-brand-navy">Sound Mastery Challenges</h3>
          </div>
          
          <div className="flex flex-col gap-3">
            {[
              { sound: '/θ/', label: 'th (thin)', errorRate: 65 },
              { sound: '/v/', label: 'v (van)', errorRate: 42 },
              { sound: '/æ/', label: 'a (apple)', errorRate: 38 },
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between p-3 bg-brand-offwhite rounded-[12px]">
                <div className="flex items-center gap-3">
                  <span className="text-[16px] font-bold text-brand-navy ipa-text">{item.sound}</span>
                  <span className="text-[12px] text-brand-muted">{item.label}</span>
                </div>
                <div className="flex flex-col items-end">
                  <span className="text-[11px] font-bold text-red-500">{item.errorRate}% Failure Rate</span>
                  <div className="w-20 h-1 bg-red-100 rounded-full mt-1 overflow-hidden">
                    <div className="h-full bg-red-500" style={{ width: `${item.errorRate}%` }} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Performance */}
        <div className="flex flex-col gap-3 mb-6">
          <h3 className="text-[12px] font-bold text-brand-gold uppercase tracking-wider px-1">CLASS TRENDS</h3>
          <div className="bg-white rounded-[20px] p-4 border border-[#DDDDDD] shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <PieChart size={18} className="text-brand-navy" />
              <span className="text-[14px] font-bold text-brand-navy">Unit Completion</span>
            </div>
            <div className="flex items-center justify-center py-4">
              <div className="relative w-32 h-32">
                <svg viewBox="0 0 36 36" className="w-full h-full transform -rotate-90">
                  <path
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="#EEEEEE"
                    strokeWidth="3"
                  />
                  <path
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="#F47920"
                    strokeWidth="3"
                    strokeDasharray="75, 100"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-[20px] font-bold text-brand-navy">75%</span>
                  <span className="text-[9px] text-brand-muted uppercase font-bold">Overall</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
