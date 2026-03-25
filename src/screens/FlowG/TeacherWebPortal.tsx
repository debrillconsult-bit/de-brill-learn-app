import React from 'react';
import { Users, Calendar, BookOpen, TrendingUp, Bell, Search, Settings, LogOut, LayoutDashboard, FileText, GraduationCap, Plus } from 'lucide-react';

export const TeacherWebPortal = () => {

  return (
    <div className="flex h-screen bg-[#F0F2F5] font-['DM_Sans']">
      {/* Sidebar */}
      <div className="w-64 bg-brand-navy flex flex-col text-white">
        <div className="p-8 flex items-center gap-3">
          <div className="w-10 h-10 bg-brand-gold rounded-lg flex items-center justify-center text-[24px]">
            🎓
          </div>
          <span className="text-[20px] font-bold tracking-tight">De-Brill Learn</span>
        </div>

        <nav className="flex-1 px-4 flex flex-col gap-1">
          {[
            { label: 'Dashboard', icon: LayoutDashboard, active: true },
            { label: 'Classes', icon: Users },
            { label: 'Curriculum', icon: BookOpen },
            { label: 'Reports', icon: FileText },
            { label: 'Resources', icon: GraduationCap },
          ].map((item, i) => (
            <button 
              key={i}
              className={`
                w-full p-4 flex items-center gap-4 rounded-xl transition-colors
                ${item.active ? 'bg-brand-gold text-brand-navy' : 'hover:bg-white/10'}
              `}
            >
              <item.icon size={20} />
              <span className="font-bold">{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-white/10">
          <button className="w-full p-4 flex items-center gap-4 rounded-xl hover:bg-white/10 transition-colors">
            <Settings size={20} />
            <span className="font-bold">Settings</span>
          </button>
          <button className="w-full p-4 flex items-center gap-4 rounded-xl hover:bg-red-500/20 text-red-400 transition-colors">
            <LogOut size={20} />
            <span className="font-bold">Logout</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Header */}
        <header className="h-20 bg-white border-b border-[#DDDDDD] flex items-center justify-between px-8">
          <div className="flex items-center gap-4 bg-[#F0F2F5] px-4 py-2 rounded-xl w-96">
            <Search size={20} className="text-brand-muted" />
            <input 
              type="text" 
              placeholder="Search students, classes, or resources..." 
              className="bg-transparent border-none outline-none text-[14px] w-full"
            />
          </div>
          <div className="flex items-center gap-6">
            <button className="w-10 h-10 rounded-full bg-[#F0F2F5] flex items-center justify-center relative">
              <Bell size={20} className="text-brand-navy" />
              <div className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
            </button>
            <div className="flex items-center gap-3 pl-6 border-l border-[#DDDDDD]">
              <div className="text-right">
                <p className="text-[14px] font-bold text-brand-navy">Mrs. Adebayo</p>
                <p className="text-[12px] text-brand-muted">Senior Teacher</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-brand-gold flex items-center justify-center text-[20px]">
                👩‍🏫
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="flex-1 overflow-y-auto p-8">
          <div className="max-w-6xl mx-auto flex flex-col gap-8">
            <div className="flex items-center justify-between">
              <h1 className="text-[28px] font-bold text-brand-navy">Dashboard Overview</h1>
              <button className="bg-brand-navy text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 shadow-lg hover:bg-brand-navy/90 transition-colors">
                <Plus size={20} />
                Create New Class
              </button>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-4 gap-6">
              {[
                { label: 'Total Students', value: '84', trend: '+5%', icon: Users, color: '#1E2A4A' },
                { label: 'Active Classes', value: '3', trend: '0%', icon: LayoutDashboard, color: '#F5B800' },
                { label: 'Avg. Attendance', value: '94%', trend: '+2%', icon: Calendar, color: '#2E7D32' },
                { label: 'Curriculum Progress', value: '68%', trend: '+12%', icon: BookOpen, color: '#7B1FA2' },
              ].map((stat, i) => (
                <div key={i} className="bg-white p-6 rounded-[24px] border border-[#DDDDDD] flex flex-col gap-4 shadow-sm">
                  <div className="flex items-center justify-between">
                    <div 
                      className="w-12 h-12 rounded-xl flex items-center justify-center text-white"
                      style={{ backgroundColor: stat.color }}
                    >
                      <stat.icon size={24} />
                    </div>
                    <span className="text-[12px] font-bold text-green-600 bg-green-50 px-2 py-1 rounded-lg">{stat.trend}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[28px] font-bold text-brand-navy">{stat.value}</span>
                    <span className="text-[13px] text-brand-muted font-bold uppercase tracking-wider">{stat.label}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-3 gap-8">
              {/* Class Performance Table */}
              <div className="col-span-2 bg-white rounded-[24px] border border-[#DDDDDD] p-8 shadow-sm">
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-[20px] font-bold text-brand-navy">Class Performance</h2>
                  <button className="text-brand-gold font-bold text-[14px]">View All</button>
                </div>
                <table className="w-full">
                  <thead>
                    <tr className="text-left text-brand-muted text-[12px] font-bold uppercase tracking-wider border-b border-[#EEEEEE]">
                      <th className="pb-4">Class Name</th>
                      <th className="pb-4">Students</th>
                      <th className="pb-4">Avg. Score</th>
                      <th className="pb-4">Status</th>
                    </tr>
                  </thead>
                  <tbody className="text-brand-navy text-[14px]">
                    {[
                      { name: 'Primary 1A', students: 28, score: '72%', status: 'On Track' },
                      { name: 'Primary 2B', students: 32, score: '64%', status: 'Needs Attention' },
                      { name: 'Primary 3C', students: 24, score: '88%', status: 'Excellent' },
                    ].map((row, i) => (
                      <tr key={i} className="border-b border-[#EEEEEE] last:border-none">
                        <td className="py-4 font-bold">{row.name}</td>
                        <td className="py-4">{row.students}</td>
                        <td className="py-4 font-bold">{row.score}</td>
                        <td className="py-4">
                          <span className={`
                            px-3 py-1 rounded-full text-[11px] font-bold
                            ${row.status === 'Excellent' ? 'bg-green-100 text-green-700' : ''}
                            ${row.status === 'On Track' ? 'bg-blue-100 text-blue-700' : ''}
                            ${row.status === 'Needs Attention' ? 'bg-orange-100 text-orange-700' : ''}
                          `}>
                            {row.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Recent Activity */}
              <div className="bg-white rounded-[24px] border border-[#DDDDDD] p-8 shadow-sm">
                <h2 className="text-[20px] font-bold text-brand-navy mb-8">Recent Activity</h2>
                <div className="flex flex-col gap-6">
                  {[
                    { user: 'Chidi Okoro', action: 'Completed Unit 4', time: '2 mins ago', icon: '🦁' },
                    { user: 'Ada Eze', action: 'Earned "Early Bird" badge', time: '15 mins ago', icon: '🐘' },
                    { user: 'Musa Ibrahim', action: 'Started Lesson 12', time: '1 hour ago', icon: '🦓' },
                  ].map((activity, i) => (
                    <div key={i} className="flex gap-4">
                      <div className="w-10 h-10 rounded-full bg-[#F0F2F5] flex items-center justify-center text-[20px] shrink-0">
                        {activity.icon}
                      </div>
                      <div className="flex flex-col">
                        <p className="text-[14px] text-brand-navy leading-tight">
                          <span className="font-bold">{activity.user}</span> {activity.action}
                        </p>
                        <span className="text-[12px] text-brand-muted">{activity.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};
