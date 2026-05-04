import React from 'react';
import { useNavigate } from 'react-router-dom';
import { StatusBar } from '@/src/components/Layout';
import { ChevronLeft, User, Bell, Shield, CreditCard, LogOut, ChevronRight, Moon, Globe, HelpCircle } from 'lucide-react';
import { useAuth } from '@/src/lib/AuthContext';

export const ParentSettings = () => {
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
          <div className="w-20 h-20 rounded-full bg-brand-gold border-4 border-white flex items-center justify-center text-[32px] shadow-lg">
            👨‍👩‍👧
          </div>
          <div className="flex flex-col items-center">
            <h1 className="text-[20px] font-bold text-white">{user?.full_name || 'Parent Account'}</h1>
            <p className="text-white/60 text-[13px]">Managing 2 Children</p>
          </div>
        </div>
      </div>

      <div className="p-6 flex flex-col gap-8">
        {/* Profile Settings */}
        <div className="flex flex-col gap-3">
          <h3 className="text-[12px] font-bold text-brand-gold uppercase tracking-wider px-1">PROFILE & ACCOUNT</h3>
          <div className="bg-white rounded-[24px] border border-[#DDDDDD] overflow-hidden shadow-sm">
            {[
              { icon: User, label: 'Personal Information', value: user?.email },
              { icon: CreditCard, label: 'Subscription Plan', value: 'Family Premium' },
              { icon: Bell, label: 'Push Notifications', toggle: true },
              { icon: Moon, label: 'Dark Mode', toggle: false },
            ].map((item, i, arr) => (
              <div 
                key={item.label}
                className={`p-4 flex items-center justify-between ${i !== arr.length - 1 ? 'border-b border-[#EEEEEE]' : ''}`}
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-brand-navy">
                    <item.icon size={18} />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[14px] font-bold text-brand-navy">{item.label}</span>
                    {item.value && <span className="text-[11px] text-brand-muted">{item.value}</span>}
                  </div>
                </div>
                {item.toggle !== undefined ? (
                  <div className={`w-10 h-6 rounded-full p-1 transition-colors ${item.toggle ? 'bg-brand-gold' : 'bg-gray-200'}`}>
                    <div className={`w-4 h-4 bg-white rounded-full shadow-sm transform transition-transform ${item.toggle ? 'translate-x-4' : 'translate-x-0'}`} />
                  </div>
                ) : (
                  <ChevronRight size={18} className="text-brand-muted" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Support & Legal */}
        <div className="flex flex-col gap-3">
          <h3 className="text-[12px] font-bold text-brand-gold uppercase tracking-wider px-1">SUPPORT</h3>
          <div className="bg-white rounded-[24px] border border-[#DDDDDD] overflow-hidden shadow-sm">
            {[
              { icon: Shield, label: 'Privacy Policy' },
              { icon: HelpCircle, label: 'Help Center' },
              { icon: Globe, label: 'Language', value: 'British English' },
            ].map((item, i, arr) => (
              <button 
                key={item.label}
                className={`w-full p-4 flex items-center justify-between active:bg-gray-50 transition-colors ${i !== arr.length - 1 ? 'border-b border-[#EEEEEE]' : ''}`}
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-brand-navy">
                    <item.icon size={18} />
                  </div>
                  <div className="flex flex-col text-left">
                    <span className="text-[14px] font-bold text-brand-navy">{item.label}</span>
                    {item.value && <span className="text-[11px] text-brand-muted">{item.value}</span>}
                  </div>
                </div>
                <ChevronRight size={18} className="text-brand-muted" />
              </button>
            ))}
          </div>
        </div>

        {/* Logout */}
        <button 
          onClick={handleLogout}
          className="w-full h-14 bg-red-50 text-red-600 rounded-[20px] font-bold text-[15px] flex items-center justify-center gap-3 border border-red-100 active:bg-red-100 transition-colors"
        >
          <LogOut size={20} />
          Sign Out
        </button>

        <div className="flex flex-col items-center gap-1 opacity-40 mb-6">
          <span className="text-[11px] font-bold text-brand-navy uppercase tracking-[2px]">De-Brill Learn</span>
          <span className="text-[10px] text-brand-muted">Parental Control Module v1.2</span>
        </div>
      </div>
    </div>
  );
};
