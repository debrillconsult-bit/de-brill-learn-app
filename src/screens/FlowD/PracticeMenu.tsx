import React from 'react';
import { useNavigate } from 'react-router-dom';
import { StatusBar, DiagonalHeader } from '@/src/components/Layout';
import { Trophy, Star } from 'lucide-react';
import { cn } from '@/src/lib/utils';

const games = [
  { id: 'safari', title: 'Sound Safari', subtitle: 'Match sounds to animals', color: '#7B1FA2', icon: '🦁' },
  { id: 'bridge', title: 'Blend Bridge', subtitle: 'Build words to cross', color: '#1565C0', icon: '🌉' },
  { id: 'pairs', title: 'Minimal Pairs', subtitle: 'Spot the difference', color: '#2E7D32', icon: '👯' },
  { id: 'transcription', title: 'IPA Builder', subtitle: 'Master phoneme symbols', color: '#1E6B5A', icon: '⌨️' },
  { id: 'bee', title: 'Pronunciation Bee', subtitle: 'Timed speech challenge', color: '#F5B800', icon: '🐝' },
  { id: 'hop', title: 'Vowel Hop', subtitle: 'Sort sounds by jumping', color: '#B71C1C', icon: '🦘' },
];

export const PracticeMenu = () => {
  const navigate = useNavigate();

  return (
    <div className="flex-1 flex flex-col bg-brand-offwhite overflow-y-auto pb-20">
      <StatusBar />
      <DiagonalHeader title="Practice Zone" />

      <div className="p-4 flex flex-col gap-6">
        {/* Daily Challenge Card */}
        <button className="bg-brand-navy rounded-[16px] p-5 flex items-center gap-4 text-white shadow-lg relative overflow-hidden active:scale-[0.98] transition-transform">
          <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-full -translate-y-8 translate-x-8" />
          <div className="w-14 h-14 rounded-full bg-brand-gold flex items-center justify-center shrink-0 shadow-lg">
            <Star size={32} className="text-brand-navy fill-current" />
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-[10px] font-bold text-brand-gold uppercase tracking-widest">DAILY CHALLENGE</span>
            <h2 className="text-[18px] font-bold">The Perfect /th/</h2>
            <p className="text-white/60 text-[12px]">Complete to earn double points!</p>
          </div>
        </button>

        {/* Game Grid */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between px-1">
            <h3 className="text-[12px] font-bold text-brand-gold uppercase tracking-wider">ALL GAMES</h3>
            <div className="flex items-center gap-1 text-brand-navy">
              <Trophy size={14} />
              <span className="text-[11px] font-bold">2,450 pts</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {games.map((game) => (
              <button
                key={game.id}
                onClick={() => navigate(`/game/${game.id}`)}
                className="bg-white rounded-[16px] border border-[#DDDDDD] p-5 flex flex-col items-center text-center gap-3 active:scale-95 transition-all shadow-sm"
              >
                <div 
                  className="w-16 h-16 rounded-[20px] flex items-center justify-center text-[32px] mb-1"
                  style={{ backgroundColor: `${game.color}15` }}
                >
                  {game.icon}
                </div>
                <div className="flex flex-col gap-1">
                  <h4 className="text-[14px] font-bold text-brand-navy leading-tight">{game.title}</h4>
                  <p className="text-[10px] text-brand-muted leading-tight">{game.subtitle}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
