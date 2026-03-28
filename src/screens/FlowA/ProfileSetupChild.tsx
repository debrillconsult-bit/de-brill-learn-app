import React from 'react';
import { useNavigate } from 'react-router-dom';
import { StatusBar, DiagonalHeader } from '@/src/components/Layout';
import { Button } from '@/src/components/Button';
import { cn } from '@/src/lib/utils';

const avatars = [
  { bg: '#6B35A8', label: 'A', character: 'young learner' },
  { bg: '#1565C0', label: 'B', character: 'explorer' },
  { bg: '#2E7D32', label: 'C', character: 'reader' },
  { bg: '#D85A30', label: 'D', character: 'speaker' },
  { bg: '#F5C040', label: 'E', character: 'achiever' },
  { bg: '#1A2E52', label: 'F', character: 'scholar' },
];

export const ProfileSetupChild = () => {
  const navigate = useNavigate();
  const [selectedAvatar, setSelectedAvatar] = React.useState(0);
  const [isBritish, setIsBritish] = React.useState(true);

  return (
    <div className="min-h-screen flex flex-col bg-brand-offwhite overflow-y-auto">
      <StatusBar />
      <DiagonalHeader title="Set up your profile" />
      
      <div className="flex-1 p-6 pb-8 flex flex-col gap-8">
        <div className="flex flex-col items-center gap-4">
          <div
            className="w-32 h-32 rounded-full border-4 border-brand-gold flex items-center justify-center"
            style={{ background: avatars[selectedAvatar].bg }}
          >
            <span className="text-white text-[48px] font-bold">{avatars[selectedAvatar].label}</span>
          </div>
          <p className="text-[14px] font-bold text-brand-navy">Choose your character</p>
          
          <div className="grid grid-cols-3 gap-4">
            {avatars.map((avatar, i) => (
              <button
                key={i}
                onClick={() => setSelectedAvatar(i)}
                className={cn(
                  "w-16 h-16 rounded-full flex items-center justify-center text-white text-[24px] font-bold cursor-pointer transition-all",
                  selectedAvatar === i ? "ring-2 ring-offset-2 ring-brand-gold scale-110" : "opacity-60"
                )}
                style={{ background: avatar.bg }}
                aria-label={avatar.character}
              >
                {avatar.label}
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-[12px] font-bold text-brand-navy ml-1 text-center">WHAT SHOULD WE CALL YOU?</label>
          <input 
            type="text"
            placeholder="Enter your nickname"
            className="h-12 bg-white border border-[#CCCCCC] rounded-[8px] px-4 text-[14px] text-center focus:outline-none focus:border-brand-gold"
          />
        </div>

        <div className="bg-white rounded-[12px] p-4 border border-[#DDDDDD] flex items-center justify-between">
          <div className="flex flex-col gap-0.5">
            <span className="text-[14px] font-bold text-brand-navy">English Version</span>
            <span className="text-[12px] text-brand-muted">{isBritish ? 'British English (RP)' : 'American English'}</span>
          </div>
          <button 
            onClick={() => setIsBritish(!isBritish)}
            className={cn(
              "w-12 h-6 rounded-full relative transition-colors",
              isBritish ? "bg-brand-gold" : "bg-brand-muted/30"
            )}
          >
            <div className={cn(
              "absolute top-1 w-4 h-4 bg-white rounded-full transition-all",
              isBritish ? "right-1" : "left-1"
            )} />
          </button>
        </div>
      </div>

      <div className="p-6 pb-8 flex flex-col gap-4 bg-white border-t border-[#DDDDDD]">
        <Button fullWidth onClick={() => navigate('/onboarding-tutorial')}>
          Continue
        </Button>
      </div>
    </div>
  );
};
