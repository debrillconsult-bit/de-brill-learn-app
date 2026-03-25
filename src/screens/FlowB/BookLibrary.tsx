import React from 'react';
import { useNavigate } from 'react-router-dom';
import { StatusBar, DiagonalHeader } from '@/src/components/Layout';
import { Lock, Star } from 'lucide-react';
import { cn } from '@/src/lib/utils';

const books = [
  { id: 'bp-pren', title: 'Blended Phonics Pre-Nursery', series: 'Phonics', age: '2-3', color: '#7B1FA2', locked: false },
  { id: 'bp-n1', title: 'Blended Phonics Nursery 1', series: 'Phonics', age: '3-4', color: '#F5B800', locked: false },
  { id: 'bp-n2', title: 'Blended Phonics Nursery 2', series: 'Phonics', age: '4-5', color: '#388E3C', locked: false },
  { id: 'mep-p1', title: 'MEP Primary 1', series: 'MEP', age: '5-6', color: '#7B1FA2', locked: false },
  { id: 'mep-p2', title: 'MEP Primary 2', series: 'MEP', age: '6-7', color: '#1565C0', locked: true },
  { id: 'mep-p3', title: 'MEP Primary 3', series: 'MEP', age: '7-8', color: '#2E7D32', locked: true },
  { id: 'mep-p4', title: 'MEP Primary 4', series: 'MEP', age: '8-9', color: '#1E6B5A', locked: true },
  { id: 'mep-p5', title: 'MEP Primary 5', series: 'MEP', age: '9-11', color: '#B71C1C', locked: true },
];

export const BookLibrary = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = React.useState('all');

  const filteredBooks = activeTab === 'all' ? books : books.filter(b => b.series.toLowerCase() === activeTab);

  return (
    <div className="flex-1 flex flex-col bg-brand-offwhite overflow-y-auto pb-4">
      <StatusBar />
      <DiagonalHeader title="Book Library" />

      {/* Series Filter Tabs */}
      <div className="bg-white border-b border-[#DDDDDD] flex px-4">
        {['all', 'phonics', 'mep'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={cn(
              "flex-1 py-4 text-[12px] font-bold uppercase tracking-wider relative transition-colors",
              activeTab === tab ? "text-brand-gold" : "text-brand-muted"
            )}
          >
            {tab}
            {activeTab === tab && (
              <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-brand-gold rounded-t-full" />
            )}
          </button>
        ))}
      </div>

      <div className="p-4 grid grid-cols-2 gap-4">
        {filteredBooks.map((book) => (
          <button
            key={book.id}
            onClick={() => navigate(`/book/${book.id}`)}
            className="bg-white rounded-[12px] border border-[#DDDDDD] flex flex-col overflow-hidden relative active:scale-[0.98] transition-transform"
          >
            <div 
              className="h-32 bg-brand-offwhite relative flex items-center justify-center"
              style={{ borderLeft: `6px solid ${book.color}` }}
            >
              <div className="w-16 h-20 bg-white shadow-sm rounded-sm border border-[#EEEEEE]" />
              {book.locked && (
                <div className="absolute inset-0 bg-brand-navy/40 flex items-center justify-center">
                  <div className="bg-white p-2 rounded-full">
                    <Lock size={16} className="text-brand-navy" />
                  </div>
                </div>
              )}
            </div>
            
            <div className="p-3 flex flex-col gap-1">
              <h4 className="text-[12px] font-bold text-brand-navy leading-tight line-clamp-2 h-8">
                {book.title}
              </h4>
              <div className="flex items-center justify-between mt-1">
                <span className="text-[10px] text-brand-muted">Ages {book.age}</span>
                {!book.locked && <Star size={12} className="text-brand-gold fill-current" />}
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};
