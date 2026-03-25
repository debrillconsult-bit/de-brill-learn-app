import React from 'react';
import { useNavigate } from 'react-router-dom';
import { StatusBar, DiagonalHeader } from '@/src/components/Layout';
import { WifiOff, Download, Play, CheckCircle2 } from 'lucide-react';

export const OfflineMode = () => {
  const navigate = useNavigate();

  return (
    <div className="flex-1 flex flex-col bg-brand-offwhite overflow-y-auto pb-4">
      <StatusBar />
      <DiagonalHeader title="Offline Mode" accentColor="#1A2E52" />

      <div className="p-6 flex flex-col gap-6">
        {/* Offline Status Card */}
        <div className="bg-brand-navy rounded-[16px] p-6 flex items-center gap-5 text-white shadow-lg">
          <div className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center shrink-0">
            <WifiOff size={28} className="text-brand-gold" />
          </div>
          <div className="flex flex-col gap-1">
            <h2 className="text-[18px] text-white font-bold">You're Offline</h2>
            <p className="text-white/60 text-[12px] leading-tight">
              You can still practice with your downloaded units.
            </p>
          </div>
        </div>

        {/* Downloaded Units Section */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between px-1">
            <h3 className="text-[12px] font-bold text-brand-gold uppercase tracking-wider">DOWNLOADED UNITS</h3>
            <span className="text-[11px] text-brand-muted font-bold">3 UNITS</span>
          </div>

          <div className="flex flex-col gap-3">
            {[
              { id: 1, title: 'Alphabet Sounds', book: 'MEP Primary 1', size: '12MB' },
              { id: 2, title: 'Short Vowels', book: 'MEP Primary 1', size: '15MB' },
              { id: 4, title: 'Consonant Blends', book: 'MEP Primary 1', size: '18MB' },
            ].map((unit) => (
              <button 
                key={unit.id}
                onClick={() => navigate(`/unit/${unit.id}`)}
                className="bg-white rounded-[12px] border border-[#DDDDDD] p-4 flex items-center gap-4 text-left active:bg-brand-offwhite"
              >
                <div className="w-10 h-10 rounded-full bg-brand-gold/10 flex items-center justify-center shrink-0">
                  <CheckCircle2 size={20} className="text-brand-gold" />
                </div>
                <div className="flex-1 flex flex-col gap-0.5">
                  <h4 className="text-[14px] font-bold text-brand-navy">{unit.title}</h4>
                  <p className="text-[11px] text-brand-muted">{unit.book}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold text-brand-muted">{unit.size}</span>
                  <Play size={16} className="text-brand-navy" fill="currentColor" />
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Storage Info */}
        <div className="bg-white rounded-[12px] border border-[#DDDDDD] p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Download size={18} className="text-brand-navy" />
            <span className="text-[13px] font-medium text-brand-navy">Total Offline Storage</span>
          </div>
          <span className="text-[13px] font-bold text-brand-navy">45 MB</span>
        </div>
      </div>
    </div>
  );
};
