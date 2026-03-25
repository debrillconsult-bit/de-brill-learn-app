import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { StatusBar, DiagonalHeader } from '@/src/components/Layout';
import { ArrowLeft, Globe, Eye, Volume2, Shield, ChevronRight } from 'lucide-react';

export const SettingsScreen = () => {
  const navigate = useNavigate();
  const [isDyslexiaMode, setIsDyslexiaMode] = useState(false);
  const [isHighContrast, setIsHighContrast] = useState(false);

  const Toggle = ({ active, onToggle }: { active: boolean, onToggle: () => void }) => (
    <button 
      onClick={onToggle}
      className={`w-12 h-6 rounded-full relative transition-colors ${active ? 'bg-brand-gold' : 'bg-[#DDDDDD]'}`}
    >
      <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${active ? 'left-7' : 'left-1'}`} />
    </button>
  );

  return (
    <div className="flex-1 flex flex-col bg-brand-offwhite overflow-y-auto">
      <StatusBar />
      
      {/* Header */}
      <div className="bg-white p-4 flex items-center gap-4 border-b border-[#DDDDDD]">
        <button onClick={() => navigate(-1)} className="p-2">
          <ArrowLeft size={24} className="text-brand-navy" />
        </button>
        <h1 className="text-[18px] font-bold text-brand-navy">Settings</h1>
      </div>

      <div className="p-4 flex flex-col gap-8 py-6">
        {/* Accessibility Section */}
        <div className="flex flex-col gap-4">
          <h3 className="text-[12px] font-bold text-brand-gold uppercase tracking-wider px-1">ACCESSIBILITY</h3>
          <div className="bg-white rounded-[20px] border border-[#DDDDDD] overflow-hidden">
            <div className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-[12px] bg-brand-navy/5 flex items-center justify-center">
                  <Eye size={20} className="text-brand-navy" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[15px] font-bold text-brand-navy">Dyslexia Font</span>
                  <span className="text-[11px] text-brand-muted">Use OpenDyslexic font</span>
                </div>
              </div>
              <Toggle active={isDyslexiaMode} onToggle={() => setIsDyslexiaMode(!isDyslexiaMode)} />
            </div>
            <div className="p-4 flex items-center justify-between border-t border-[#EEEEEE]">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-[12px] bg-brand-navy/5 flex items-center justify-center">
                  <div className="w-5 h-5 border-2 border-brand-navy rounded-full" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[15px] font-bold text-brand-navy">High Contrast</span>
                  <span className="text-[11px] text-brand-muted">Increase UI contrast</span>
                </div>
              </div>
              <Toggle active={isHighContrast} onToggle={() => setIsHighContrast(!isHighContrast)} />
            </div>
          </div>
        </div>

        {/* Learning Section */}
        <div className="flex flex-col gap-4">
          <h3 className="text-[12px] font-bold text-brand-gold uppercase tracking-wider px-1">LEARNING</h3>
          <div className="bg-white rounded-[20px] border border-[#DDDDDD] overflow-hidden">
            <button className="w-full p-4 flex items-center justify-between active:bg-brand-offwhite transition-colors">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-[12px] bg-brand-navy/5 flex items-center justify-center">
                  <Globe size={20} className="text-brand-navy" />
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-[15px] font-bold text-brand-navy">Pronunciation Focus</span>
                  <span className="text-[11px] text-brand-muted">British English (RP)</span>
                </div>
              </div>
              <ChevronRight size={18} className="text-brand-muted" />
            </button>
            <button className="w-full p-4 flex items-center justify-between border-t border-[#EEEEEE] active:bg-brand-offwhite transition-colors">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-[12px] bg-brand-navy/5 flex items-center justify-center">
                  <Volume2 size={20} className="text-brand-navy" />
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-[15px] font-bold text-brand-navy">Audio Settings</span>
                  <span className="text-[11px] text-brand-muted">Auto-play sounds enabled</span>
                </div>
              </div>
              <ChevronRight size={18} className="text-brand-muted" />
            </button>
          </div>
        </div>

        {/* Legal Section */}
        <div className="flex flex-col gap-4">
          <h3 className="text-[12px] font-bold text-brand-gold uppercase tracking-wider px-1">LEGAL</h3>
          <div className="bg-white rounded-[20px] border border-[#DDDDDD] overflow-hidden">
            <button className="w-full p-4 flex items-center justify-between active:bg-brand-offwhite transition-colors">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-[12px] bg-brand-navy/5 flex items-center justify-center">
                  <Shield size={20} className="text-brand-navy" />
                </div>
                <span className="text-[15px] font-bold text-brand-navy">Terms of Service</span>
              </div>
              <ChevronRight size={18} className="text-brand-muted" />
            </button>
            <button className="w-full p-4 flex items-center justify-between border-t border-[#EEEEEE] active:bg-brand-offwhite transition-colors">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-[12px] bg-brand-navy/5 flex items-center justify-center">
                  <Shield size={20} className="text-brand-navy" />
                </div>
                <span className="text-[15px] font-bold text-brand-navy">Privacy Policy</span>
              </div>
              <ChevronRight size={18} className="text-brand-muted" />
            </button>
          </div>
        </div>

        <div className="text-center py-4">
          <p className="text-[11px] text-brand-muted font-bold uppercase tracking-widest">DE-BRILL LEARN V1.0.0</p>
        </div>
      </div>
    </div>
  );
};
