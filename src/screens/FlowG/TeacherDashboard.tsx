import React from 'react';
import { useNavigate } from 'react-router-dom';
import { StatusBar } from '@/src/components/Layout';
import { Users, Calendar, BookOpen, TrendingUp, Plus, ChevronRight, Bell } from 'lucide-react';

export const TeacherDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="flex-1 flex flex-col bg-brand-offwhite overflow-y-auto">
      <StatusBar />
      
      {/* Professional Header */}
      <div className="bg-brand-navy p-6 pt-12 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-full -translate-y-12 translate-x-12" />
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-brand-gold flex items-center justify-center text-[24px]">
              👩‍🏫
            </div>
            <div className="flex flex-col">
              <h1 className="text-[18px] font-bold text-white leading-tight">Welcome, Mrs. Adebayo</h1>
              <p className="text-white/60 text-[12px]">St. Jude's Primary School</p>
            </div>
          </div>
          <button className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white relative">
            <Bell size={20} />
            <div className="absolute top-2.5 right-2.5 w-2 h-2 bg-brand-gold rounded-full border-2 border-brand-navy" />
          </button>
        </div>

        {/* Quick Stats Row */}
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: 'Classes', value: '3', icon: Users },
            { label: 'Students', value: '84', icon: Users },
            { label: 'Avg. Score', value: '78%', icon: TrendingUp },
          ].map((stat, i) => (
            <div key={i} className="bg-white/10 rounded-[12px] p-3 flex flex-col gap-1">
              <stat.icon size={14} className="text-brand-gold" />
              <span className="text-[16px] font-bold text-white">{stat.value}</span>
              <span className="text-[9px] text-white/60 font-bold uppercase">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="p-6 flex flex-col gap-8">
        {/* My Classes Section */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between px-1">
            <h3 className="text-[12px] font-bold text-brand-gold uppercase tracking-wider">MY CLASSES</h3>
            <button className="text-brand-navy flex items-center gap-1 text-[12px] font-bold">
              <Plus size={16} />
              <span>Add Class</span>
            </button>
          </div>

          <div className="flex flex-col gap-3">
            {[
              { id: 1, name: 'Primary 1A', students: 28, progress: 65, color: '#F5B800' },
              { id: 2, name: 'Primary 2B', students: 32, progress: 42, color: '#1E2A4A' },
              { id: 3, name: 'Primary 3C', students: 24, progress: 88, color: '#2E7D32' },
            ].map((cls) => (
              <button 
                key={cls.id}
                onClick={() => navigate(`/teacher/class/${cls.id}`)}
                className="bg-white rounded-[16px] border border-[#DDDDDD] p-5 flex items-center justify-between active:scale-[0.98] transition-transform shadow-sm"
              >
                <div className="flex items-center gap-4">
                  <div 
                    className="w-12 h-12 rounded-[12px] flex items-center justify-center text-white font-bold text-[18px]"
                    style={{ backgroundColor: cls.color }}
                  >
                    {cls.name.split(' ')[1]}
                  </div>
                  <div className="flex flex-col text-left">
                    <h4 className="text-[15px] font-bold text-brand-navy">{cls.name}</h4>
                    <p className="text-[12px] text-brand-muted">{cls.students} Students</p>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <span className="text-[12px] font-bold text-brand-navy">{cls.progress}%</span>
                  <div className="w-16 h-1.5 bg-[#EEEEEE] rounded-full overflow-hidden">
                    <div className="h-full bg-brand-gold rounded-full" style={{ width: `${cls.progress}%` }} />
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Term Calendar Card */}
        <div className="bg-white rounded-[20px] p-6 border border-[#DDDDDD] flex flex-col gap-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Calendar size={18} className="text-brand-navy" />
              <h3 className="text-[14px] font-bold text-brand-navy">Term Calendar</h3>
            </div>
            <span className="text-[11px] text-brand-gold font-bold uppercase">TERM 2 • WEEK 8</span>
          </div>
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-4 p-3 bg-brand-offwhite rounded-[12px]">
              <div className="w-10 h-10 rounded-full bg-white flex flex-col items-center justify-center shadow-sm">
                <span className="text-[12px] font-bold text-brand-navy">26</span>
                <span className="text-[8px] font-bold text-brand-muted uppercase">MAR</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[13px] font-bold text-brand-navy">Unit 4 Assessment</span>
                <span className="text-[11px] text-brand-muted">Primary 1A • 10:00 AM</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
