import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, BookOpen, Gamepad2, BarChart3, UserCircle } from 'lucide-react';
import { cn } from '@/src/lib/utils';

export const BottomNav = () => {
  const tabs = [
    { id: 'home', label: 'Home', icon: Home, path: '/home-student' },
    { id: 'library', label: 'Library', icon: BookOpen, path: '/library' },
    { id: 'practice', label: 'Practice', icon: Gamepad2, path: '/practice' },
    { id: 'progress', label: 'Progress', icon: BarChart3, path: '/progress' },
    { id: 'profile', label: 'Profile', icon: UserCircle, path: '/profile' },
  ];

  return (
    <div className="h-[64px] bg-white border-t border-[#DDDDDD] flex items-center justify-around px-2 z-50 sticky bottom-0">
      {tabs.map((tab) => (
        <NavLink
          key={tab.id}
          to={tab.path}
          className={({ isActive }) => cn(
            "flex flex-col items-center justify-center gap-1 w-[78px] h-full relative transition-colors",
            isActive ? "text-brand-gold" : "text-brand-muted"
          )}
        >
          {({ isActive }) => (
            <>
              <tab.icon size={20} />
              <span className="text-[10px] font-medium">{tab.label}</span>
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
