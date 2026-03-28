import React from 'react';
import { useNavigate } from 'react-router-dom';
import { StatusBar, DiagonalHeader } from '@/src/components/Layout';
import { Settings, LogOut, ChevronRight, Shield, Bell, HelpCircle, User } from 'lucide-react';
import { useAuth } from '@/src/lib/AuthContext';

export const StudentProfile = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  return (
    <div className="flex-1 flex flex-col bg-brand-offwhite overflow-y-auto pb-20">
      <StatusBar />
      <DiagonalHeader title="My Profile" />

      <div className="p-4 flex flex-col gap-6">
        {/* Profile Info Card */}
        <div className="bg-white rounded-[24px] p-6 border border-[#DDDDDD] flex flex-col items-center text-center gap-4 shadow-sm">
          <div className="w-24 h-24 rounded-full bg-brand-gold/20 border-4 border-brand-gold flex items-center justify-center text-[48px] overflow-hidden">
            🦁
          </div>
          <div className="flex flex-col gap-1">
            <h2 className="text-[20px] font-bold text-brand-navy">Chidi Okoro</h2>
            <p className="text-[13px] text-brand-muted font-medium">Primary 3 • MEP Series</p>
          </div>
          <button className="bg-brand-navy text-white px-6 py-2 rounded-full text-[13px] font-bold active:scale-95 transition-transform">
            Edit Profile
          </button>
        </div>

        {/* Menu Sections */}
        <div className="flex flex-col gap-4">
          <h3 className="text-[12px] font-bold text-brand-gold uppercase tracking-wider px-1">ACCOUNT</h3>
          <div className="bg-white rounded-[20px] border border-[#DDDDDD] overflow-hidden">
            {[
              { label: 'Settings', icon: Settings, route: '/settings' },
              { label: 'Notifications', icon: Bell, route: '/notifications' },
              { label: 'Privacy & Security', icon: Shield, route: '/privacy' },
            ].map((item, i, arr) => (
              <button 
                key={i}
                onClick={() => navigate(item.route)}
                className={`
                  w-full p-4 flex items-center justify-between active:bg-brand-offwhite transition-colors
                  ${i !== arr.length - 1 ? 'border-b border-[#EEEEEE]' : ''}
                `}
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-[12px] bg-brand-navy/5 flex items-center justify-center">
                    <item.icon size={20} className="text-brand-navy" />
                  </div>
                  <span className="text-[15px] font-bold text-brand-navy">{item.label}</span>
                </div>
                <ChevronRight size={18} className="text-brand-muted" />
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="text-[12px] font-bold text-brand-gold uppercase tracking-wider px-1">SUPPORT</h3>
          <div className="bg-white rounded-[20px] border border-[#DDDDDD] overflow-hidden">
            {[
              { label: 'Help Center', icon: HelpCircle, route: '/help' },
              { label: 'About De-Brill Learn', icon: User, route: '/about' },
            ].map((item, i, arr) => (
              <button 
                key={i}
                onClick={() => navigate(item.route)}
                className={`
                  w-full p-4 flex items-center justify-between active:bg-brand-offwhite transition-colors
                  ${i !== arr.length - 1 ? 'border-b border-[#EEEEEE]' : ''}
                `}
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-[12px] bg-brand-navy/5 flex items-center justify-center">
                    <item.icon size={20} className="text-brand-navy" />
                  </div>
                  <span className="text-[15px] font-bold text-brand-navy">{item.label}</span>
                </div>
                <ChevronRight size={18} className="text-brand-muted" />
              </button>
            ))}
          </div>
        </div>

        {/* Logout Button */}
        <button
          onClick={async () => {
            await logout();
            navigate('/');
          }}
          className="bg-red-50 text-red-600 rounded-[20px] p-4 flex items-center justify-center gap-3 font-bold active:bg-red-100 transition-colors"
        >
          <LogOut size={20} />
          <span>Log Out</span>
        </button>
      </div>
    </div>
  );
};
