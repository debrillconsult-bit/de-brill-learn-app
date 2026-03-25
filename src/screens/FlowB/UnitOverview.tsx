import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { StatusBar, DiagonalHeader } from '@/src/components/Layout';
import { Button } from '@/src/components/Button';
import { ChevronLeft, Play, Clock, BookOpen } from 'lucide-react';

export const UnitOverview = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <div className="flex-1 flex flex-col bg-brand-offwhite overflow-y-auto pb-12">
      <StatusBar />
      
      <DiagonalHeader accentColor="#7B1FA2">
        <button 
          onClick={() => navigate(-1)}
          className="ml-4 text-brand-navy"
        >
          <ChevronLeft size={24} />
        </button>
        <div className="flex flex-col gap-0.5 ml-2">
          <span className="text-[10px] font-bold text-brand-navy/60 uppercase tracking-widest">UNIT {id}</span>
          <h1 className="text-brand-navy text-[16px] font-bold leading-tight">Consonant Blends Part 1</h1>
        </div>
      </DiagonalHeader>

      <div className="p-6 flex flex-col gap-6">
        {/* Learning Objectives */}
        <div className="bg-white rounded-[12px] border border-[#DDDDDD] p-5 flex flex-col gap-4">
          <div className="flex items-center gap-2 text-brand-navy">
            <BookOpen size={18} />
            <h3 className="text-[14px] font-bold">Learning Objectives</h3>
          </div>
          <ul className="flex flex-col gap-3">
            {[
              'Recognise the sounds of /bl/, /cl/, /fl/, and /sl/',
              'Form these blends correctly in writing',
              'Read words containing these consonant blends',
              'Identify these sounds in short sentences'
            ].map((obj, i) => (
              <li key={i} className="flex gap-3 items-start">
                <div className="w-5 h-5 rounded-full bg-brand-gold/20 flex items-center justify-center shrink-0 mt-0.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-brand-gold" />
                </div>
                <span className="text-[13px] text-brand-mid leading-relaxed">{obj}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Lesson Sections List */}
        <div className="flex flex-col gap-3">
          <h3 className="text-[12px] font-bold text-brand-gold uppercase tracking-wider ml-1">LESSON SECTIONS</h3>
          {[
            { title: 'Sound Warm-Up', time: '3m', type: 'audio' },
            { title: 'Words to Master', time: '5m', type: 'flashcard' },
            { title: 'Story Time', time: '7m', type: 'reading' },
            { title: 'Practice Activities', time: '10m', type: 'game' },
            { title: 'Pronunciation Drill', time: '5m', type: 'mic' },
          ].map((section, i) => (
            <div key={i} className="bg-white rounded-[12px] border border-[#DDDDDD] p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-brand-offwhite flex items-center justify-center text-[12px] font-bold text-brand-navy">
                  {i + 1}
                </div>
                <span className="text-[13px] font-medium text-brand-navy">{section.title}</span>
              </div>
              <div className="flex items-center gap-1 text-brand-muted">
                <Clock size={12} />
                <span className="text-[11px] font-bold">{section.time}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="p-6 mt-auto">
        <Button fullWidth size="lg" onClick={() => navigate('/lesson/warmup')}>
          Start Lesson <Play size={18} fill="currentColor" className="ml-1" />
        </Button>
      </div>
    </div>
  );
};
