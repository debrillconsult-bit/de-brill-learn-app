import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Lightbulb, Settings, Users } from 'lucide-react';
import { cn } from '@/src/lib/utils';

export const ParentBottomNav = () => {
  const tabs = [
    { id: 'dashboard', label: 'Children', icon: Users, path: '/parent/dashboard' },
    { id: 'tips', label: 'Parent Tips', icon: Lightbulb, path: '/parent/tips' },
    { id: 'settings', label: 'Settings', icon: Settings, path: '/parent/settings' },
  ];

  return (
    <div className="h-[64px] bg-white border-t border-[#DDDDDD] flex items-center justify-around px-2 z-50 sticky bottom-0">
      {tabs.map((tab) => (
        <NavLink
          key={tab.id}
          to={tab.path}
          className={({ isActive }) => cn(
            "flex flex-col items-center justify-center gap-1 w-[100px] h-full relative transition-colors",
            isActive ? "text-brand-gold" : "text-brand-navy"
          )}
        >
          {({ isActive }) => (
            <>
              <tab.icon size={20} />
              <span className="text-[10px] font-bold">{tab.label}</span>
              {isActive && (
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-[3px] bg-brand-gold rounded-t-full" />
              )}
            </>
          )}
        </NavLink>
      ))}
    </div>
  );
};
