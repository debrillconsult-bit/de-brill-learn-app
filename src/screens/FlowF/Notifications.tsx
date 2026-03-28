import React from 'react';
import { useNavigate } from 'react-router-dom';
import { DiagonalHeader } from '@/src/components/Layout';
import { Bell, ChevronLeft } from 'lucide-react';

export const NotificationsScreen = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex flex-col bg-[#F5F7FA]">
      <DiagonalHeader title="Notifications">
        <button onClick={() => navigate(-1)} className="ml-4 text-brand-navy">
          <ChevronLeft size={24} />
        </button>
      </DiagonalHeader>
      <div className="flex-1 p-6 flex flex-col items-center justify-center gap-4 text-center">
        <div className="w-20 h-20 rounded-full bg-brand-navy/10 flex items-center justify-center">
          <Bell size={36} className="text-brand-navy" />
        </div>
        <h2 className="text-[18px] font-bold text-brand-navy">No notifications yet</h2>
        <p className="text-[14px] text-brand-muted leading-relaxed max-w-[260px]">
          When you earn badges, complete lessons, or receive messages from your teacher, they
          will appear here.
        </p>
      </div>
    </div>
  );
};
