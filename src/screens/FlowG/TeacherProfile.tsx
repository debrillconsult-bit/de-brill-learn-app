import React from 'react';
import { useNavigate } from 'react-router-dom';
import { StatusBar } from '@/src/components/Layout';
import { ChevronLeft, User, Mail, School, Shield, LogOut, ChevronRight, Settings, Bell, HelpCircle } from 'lucide-react';
import { useAuth } from '@/src/lib/AuthContext';

export const TeacherProfile = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
  };

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
        <div className="flex flex-col items-center gap-4 mt-4">
          <div className="relative">
            <div className="w-24 h-24 rounded-full bg-brand-gold border-4 border-white flex items-center justify-center text-[40px] shadow-lg">
              👩‍🏫
            </div>
            <button className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-brand-sky border-2 border-white flex items-center justify-center text-white shadow-md">
              <Settings size={14} />
            </button>
          </div>
          <div className="flex flex-col items-center">
            <h1 className="text-[20px] font-bold text-white">{user?.full_name || 'Mrs. Adebayo'}</h1>
            <p className="text-white/60 text-[13px]">Senior Phonics Teacher</p>
          </div>
        </div>
      </div>

      <div className="p-6 flex flex-col gap-8">
        {/* Account Info Card */}
        <div className="flex flex-col gap-3">
          <h3 className="text-[12px] font-bold text-brand-gold uppercase tracking-wider px-1">ACCOUNT INFORMATION</h3>
          <div className="bg-white rounded-[24px] border border-[#DDDDDD] overflow-hidden shadow-sm">
            <div className="p-4 flex items-center gap-4 border-b border-[#EEEEEE]">
              <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-series-blue">
                <Mail size={18} />
              </div>
              <div className="flex flex-col">
                <span className="text-[11px] text-brand-muted font-bold uppercase">Email Address</span>
                <span className="text-[14px] font-bold text-brand-navy">{user?.email || 'adebayo.j@stjudes.edu.ng'}</span>
              </div>
            </div>
            <div className="p-4 flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-orange-50 flex items-center justify-center text-brand-gold">
                <School size={18} />
              </div>
              <div className="flex flex-col">
                <span className="text-[11px] text-brand-muted font-bold uppercase">Institution</span>
                <span className="text-[14px] font-bold text-brand-navy">{user?.school_name || "St. Jude's Primary School"}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Settings Menu */}
        <div className="flex flex-col gap-3">
          <h3 className="text-[12px] font-bold text-brand-gold uppercase tracking-wider px-1">PREFERENCES</h3>
          <div className="bg-white rounded-[24px] border border-[#DDDDDD] overflow-hidden shadow-sm">
            {[
              { icon: Bell, label: 'Notifications', color: 'text-purple-500' },
              { icon: Shield, label: 'Security & Privacy', color: 'text-green-500' },
              { icon: HelpCircle, label: 'Help & Support', color: 'text-brand-sky' },
            ].map((item, i, arr) => (
              <button 
                key={item.label}
                className={`w-full p-4 flex items-center justify-between active:bg-gray-50 transition-colors ${i !== arr.length - 1 ? 'border-b border-[#EEEEEE]' : ''}`}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center ${item.color}`}>
                    <item.icon size={18} />
                  </div>
                  <span className="text-[14px] font-bold text-brand-navy">{item.label}</span>
                </div>
                <ChevronRight size={18} className="text-brand-muted" />
              </button>
            ))}
          </div>
        </div>

        {/* Logout Button */}
        <button 
          onClick={handleLogout}
          className="w-full h-14 bg-red-50 text-red-600 rounded-[20px] font-bold text-[15px] flex items-center justify-center gap-3 border border-red-100 active:bg-red-100 transition-colors"
        >
          <LogOut size={20} />
          Sign Out
        </button>

        <div className="flex flex-col items-center gap-1 opacity-40 mb-6">
          <span className="text-[11px] font-bold text-brand-navy uppercase tracking-[2px]">De-Brill Learn</span>
          <span className="text-[10px] text-brand-muted">Version 2.4.0 (2026)</span>
        </div>
      </div>
    </div>
  );
};
