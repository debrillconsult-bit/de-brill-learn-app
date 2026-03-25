import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { StatusBar, DiagonalHeader } from '@/src/components/Layout';
import { ChevronLeft, Lock, Clock, CheckCircle2 } from 'lucide-react';
import { cn } from '@/src/lib/utils';

const units = [
  { id: 1, title: 'Learning the Alphabet Sounds', time: '20 mins', completed: true, locked: false },
  { id: 2, title: 'Short Vowel Sounds — a, e, i, o, u', time: '25 mins', completed: true, locked: false },
  { id: 3, title: 'Consonant Sounds — b, c, d, f, g', time: '20 mins', completed: false, locked: false },
  { id: 4, title: 'Consonant Blends Part 1 — bl, cl, fl, sl', time: '30 mins', completed: false, locked: false },
  { id: 5, title: 'Consonant Digraphs Part 1 — sh, ch, th', time: '25 mins', completed: false, locked: true },
  { id: 6, title: 'Long Vowel Sounds — a-e, i-e, o-e, u-e', time: '30 mins', completed: false, locked: true },
];

export const BookDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTerm, setActiveTerm] = React.useState(1);

  return (
    <div className="flex-1 flex flex-col bg-brand-offwhite overflow-y-auto pb-20">
      <StatusBar />
      
      {/* Custom Header for Book Detail */}
      <div className="relative h-[120px] w-full overflow-hidden">
        <div className="absolute inset-0 bg-[#7B1FA2] diagonal-header-gold z-10 flex flex-col justify-center px-12">
          <button 
            onClick={() => navigate(-1)}
            className="absolute left-4 top-4 text-white/80"
          >
            <ChevronLeft size={24} />
          </button>
          <span className="text-[10px] font-bold text-white/60 uppercase tracking-widest mb-1">PRIMARY 1</span>
          <h1 className="text-white text-[18px] font-bold leading-tight">MEP Primary 1 (Blended Phonics Book 1)</h1>
        </div>
        <div className="absolute inset-0 bg-brand-navy diagonal-header-navy z-0" />
        <div className="absolute top-0 right-0 w-[60px] h-[60px] bg-brand-gold corner-accent z-20" />
      </div>

      {/* Term Tabs */}
      <div className="bg-white border-b border-[#DDDDDD] flex px-4">
        {[1, 2, 3].map((term) => (
          <button
            key={term}
            onClick={() => setActiveTerm(term)}
            className={cn(
              "flex-1 py-4 text-[13px] font-bold transition-colors relative",
              activeTerm === term ? "text-brand-gold" : "text-brand-muted"
            )}
          >
            Term {term}
            {activeTerm === term && (
              <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-brand-gold rounded-t-full" />
            )}
          </button>
        ))}
      </div>

      <div className="p-4 flex flex-col gap-3">
        {units.map((unit) => (
          <button
            key={unit.id}
            onClick={() => !unit.locked && navigate(`/unit/${unit.id}`)}
            className={cn(
              "bg-white rounded-[12px] border border-[#DDDDDD] p-4 flex items-center gap-4 text-left relative transition-all active:bg-brand-offwhite",
              unit.locked && "opacity-70"
            )}
          >
            <div
              className="absolute left-0 top-0 bottom-0 w-1.5 bg-[#7B1FA2]"
            />
            
            <div className={cn(
              "w-10 h-10 rounded-full flex items-center justify-center shrink-0 font-bold text-[14px]",
              unit.completed ? "bg-[#2E7D32]/10 text-[#2E7D32]" : "bg-[#7B1FA2]/10 text-[#7B1FA2]"
            )}>
              {unit.completed ? <CheckCircle2 size={20} /> : unit.id}
            </div>

            <div className="flex-1 flex flex-col gap-0.5">
              <h4 className="text-[13px] font-bold text-brand-navy leading-tight">
                {unit.title}
              </h4>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1 text-brand-muted">
                  <Clock size={12} />
                  <span className="text-[11px]">{unit.time}</span>
                </div>
              </div>
            </div>

            {unit.locked && <Lock size={16} className="text-brand-muted" />}
            {!unit.locked && !unit.completed && (
              <div className="w-7 h-7 rounded-full border-2 border-[#EEEEEE] relative flex items-center justify-center">
                <svg className="w-full h-full -rotate-90">
                  <circle cx="14" cy="14" r="12" fill="none" stroke="currentColor" strokeWidth="2" className="text-brand-gold/20" />
                  <circle 
                    cx="14" cy="14" r="12" fill="none" stroke="currentColor" strokeWidth="2" 
                    strokeDasharray={75}
                    strokeDashoffset={75 - (75 * 30) / 100}
                    className="text-brand-gold"
                  />
                </svg>
              </div>
            )}
          </button>
        ))}
      </div>

      {/* Term Summary */}
      <div className="px-6 py-4 flex flex-col items-center gap-2">
        <p className="text-[12px] text-brand-muted">2 of 19 units complete • 4h 20m remaining</p>
        {activeTerm === 1 && (
          <button className="w-full h-12 bg-brand-gold rounded-[20px] text-brand-navy font-bold text-[14px] mt-2 shadow-lg">
            Start Term Review
          </button>
        )}
      </div>
    </div>
  );
};
