import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { StatusBar, DiagonalHeader } from '@/src/components/Layout';
import { ArrowLeft, Clock3 } from 'lucide-react';

const gameDetails: Record<string, { title: string; subtitle: string }> = {
  pairs: {
    title: 'Minimal Pairs',
    subtitle: 'This game is being prepared and will be available soon.',
  },
  transcription: {
    title: 'IPA Builder',
    subtitle: 'This game is being prepared and will be available soon.',
  },
  bee: {
    title: 'Pronunciation Bee',
    subtitle: 'This game is being prepared and will be available soon.',
  },
  hop: {
    title: 'Vowel Hop',
    subtitle: 'This game is being prepared and will be available soon.',
  },
};

export const GamePlaceholder = () => {
  const navigate = useNavigate();
  const { id = '' } = useParams();
  const game = gameDetails[id] ?? {
    title: 'Practice Game',
    subtitle: 'This game is not available yet.',
  };

  return (
    <div className="flex-1 flex flex-col bg-brand-offwhite min-h-screen">
      <StatusBar />
      <DiagonalHeader title={game.title} />

      <div className="flex-1 p-6 flex flex-col items-center justify-center text-center gap-6">
        <div className="w-24 h-24 rounded-full bg-brand-gold/15 flex items-center justify-center">
          <Clock3 size={40} className="text-brand-gold" />
        </div>

        <div className="flex flex-col gap-2 max-w-[280px]">
          <h2 className="text-[22px] font-bold text-brand-navy">{game.title}</h2>
          <p className="text-[13px] leading-relaxed text-brand-muted">{game.subtitle}</p>
        </div>

        <button
          type="button"
          onClick={() => navigate('/practice')}
          className="h-12 px-5 rounded-[14px] bg-brand-navy text-white font-bold flex items-center gap-2 active:scale-95 transition-transform"
        >
          <ArrowLeft size={18} />
          Back to Practice
        </button>
      </div>
    </div>
  );
};
