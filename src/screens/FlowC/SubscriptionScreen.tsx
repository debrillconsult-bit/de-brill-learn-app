import React from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { StatusBar, DiagonalHeader } from '@/src/components/Layout';
import { Button } from '@/src/components/Button';
import { Check, Star } from 'lucide-react';
import { cn } from '@/src/lib/utils';

const bookPlans = [
  { id: 'bp-pren', title: 'Blended Phonics Pre-Nursery', series: 'Phonics', price: '₦2,500', usd: '$2', color: '#7B1FA2' },
  { id: 'bp-n1',   title: 'Blended Phonics Nursery 1',   series: 'Phonics', price: '₦2,500', usd: '$2', color: '#F5B800' },
  { id: 'bp-n2',   title: 'Blended Phonics Nursery 2',   series: 'Phonics', price: '₦2,500', usd: '$2', color: '#388E3C' },
  { id: 'mep-p1',  title: 'MEP Primary 1',               series: 'MEP',     price: '₦3,500', usd: '$3', color: '#7B1FA2' },
  { id: 'mep-p2',  title: 'MEP Primary 2',               series: 'MEP',     price: '₦3,500', usd: '$3', color: '#1565C0' },
  { id: 'mep-p3',  title: 'MEP Primary 3',               series: 'MEP',     price: '₦3,500', usd: '$3', color: '#2E7D32' },
  { id: 'mep-p4',  title: 'MEP Primary 4',               series: 'MEP',     price: '₦3,500', usd: '$3', color: '#1E6B5A' },
  { id: 'mep-p5',  title: 'MEP Primary 5',               series: 'MEP',     price: '₦3,500', usd: '$3', color: '#B71C1C' },
];

const seriesPlans = [
  {
    id: 'phonics',
    title: 'Blended Phonics Series',
    subtitle: '3 books — Pre-Nursery to Nursery 2',
    price: '₦6,500', usd: '$5', saving: 'Save ₦1,000',
    color: '#7B1FA2', books: 3,
  },
  {
    id: 'mep',
    title: 'MEP Complete Series',
    subtitle: '5 books — Primary 1 to Primary 5',
    price: '₦14,000', usd: '$11', saving: 'Save ₦3,500',
    color: '#1565C0', books: 5,
  },
];

export const SubscriptionScreen = () => {
  const navigate = useNavigate();
  const [, ] = useSearchParams();
  const [billingMode, setBillingMode] = React.useState<'book' | 'series'>('series');
  const [selectedBook, setSelectedBook] = React.useState('mep-p1');
  const [selectedSeries, setSelectedSeries] = React.useState<'phonics' | 'mep'>('mep');

  return (
    <div className="min-h-screen flex flex-col bg-brand-offwhite overflow-y-auto">
      <StatusBar />
      <DiagonalHeader title="Choose Your Plan" />

      {/* Trial banner */}
      <div className="bg-brand-navy text-white px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Star size={16} className="text-brand-gold" fill="currentColor" />
          <span className="text-[12px] font-bold text-brand-gold">Start free — 7 to 30 days trial</span>
        </div>
        <span className="text-[10px] text-white/60">No card needed</span>
      </div>

      {/* Billing mode toggle */}
      <div className="bg-white border-b border-[#DDDDDD] flex px-4">
        {(['book', 'series'] as const).map((mode) => (
          <button
            key={mode}
            onClick={() => setBillingMode(mode)}
            className={cn(
              "flex-1 py-4 text-[12px] font-bold uppercase tracking-wider relative transition-colors",
              billingMode === mode ? "text-brand-gold" : "text-brand-muted"
            )}
          >
            {mode === 'book' ? 'Per Book' : 'Full Series'}
            {billingMode === mode && (
              <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-brand-gold rounded-t-full" />
            )}
          </button>
        ))}
      </div>

      {/* Content area */}
      <div className="p-4 flex flex-col gap-4 pb-48">
        {billingMode === 'book' ? (
          <>
            <h3 className="text-[12px] font-bold text-brand-gold uppercase tracking-wider px-1">SELECT A BOOK</h3>

            <div className="flex flex-col gap-2">
              {bookPlans.map((book) => (
                <button
                  key={book.id}
                  onClick={() => setSelectedBook(book.id)}
                  className={cn(
                    "bg-white rounded-[12px] border p-4 flex items-center gap-4 text-left relative overflow-hidden active:scale-[0.98] transition-all",
                    selectedBook === book.id
                      ? "border-brand-gold bg-brand-gold/5"
                      : "border-[#DDDDDD]"
                  )}
                >
                  <div
                    className="absolute left-0 top-0 bottom-0 w-1.5"
                    style={{ backgroundColor: book.color }}
                  />
                  <div className="flex-1 flex flex-col gap-0.5 pl-2">
                    <h4 className="text-[13px] font-bold text-brand-navy leading-tight">{book.title}</h4>
                    <span className="text-[10px] text-brand-muted">{book.series} Series</span>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    {selectedBook === book.id && (
                      <Check size={16} className="text-brand-gold" />
                    )}
                    <div className="flex flex-col items-end">
                      <span className="text-[14px] font-bold text-brand-navy">{book.price}</span>
                      <span className="text-[10px] text-brand-muted">{book.usd} <span className="text-[9px]">/year</span></span>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </>
        ) : (
          <>
            <h3 className="text-[12px] font-bold text-brand-gold uppercase tracking-wider px-1">SELECT A SERIES</h3>

            <div className="flex flex-col gap-4">
              {seriesPlans.map((series) => (
                <button
                  key={series.id}
                  onClick={() => setSelectedSeries(series.id as 'phonics' | 'mep')}
                  className={cn(
                    "bg-white rounded-[16px] border-2 p-5 flex flex-col gap-4 relative overflow-hidden text-left active:scale-[0.98] transition-all pl-6",
                    selectedSeries === series.id ? "border-brand-gold" : "border-[#DDDDDD]"
                  )}
                >
                  <div
                    className="absolute left-0 top-0 bottom-0 w-1"
                    style={{ backgroundColor: series.color }}
                  />

                  <div className="flex items-start justify-between">
                    <div className="flex flex-col gap-1">
                      <h4 className="text-[16px] font-bold text-brand-navy">{series.title}</h4>
                      <p className="text-[12px] text-brand-muted">{series.subtitle}</p>
                      <span className="bg-brand-gold text-brand-navy text-[10px] font-bold px-2 py-0.5 rounded-full self-start mt-1">
                        {series.saving}
                      </span>
                    </div>
                    {selectedSeries === series.id ? (
                      <div className="w-6 h-6 rounded-full bg-brand-gold flex items-center justify-center shrink-0">
                        <Check size={14} className="text-brand-navy" />
                      </div>
                    ) : (
                      <div className="w-6 h-6 rounded-full border-2 border-[#DDDDDD] shrink-0" />
                    )}
                  </div>

                  <div className="flex items-end gap-2">
                    <span className="text-[20px] font-bold text-brand-navy">{series.price}</span>
                    <span className="text-[12px] text-brand-muted mb-0.5">{series.usd}</span>
                    <span className="text-[11px] text-brand-muted mb-0.5">/year</span>
                  </div>
                  <p className="text-[11px] text-brand-muted">{series.books} books included</p>
                </button>
              ))}
            </div>

            {/* Comparison note */}
            <div className="bg-brand-navy/5 rounded-[12px] p-4 text-center">
              <p className="text-[12px] text-brand-mid">
                Buying all 5 MEP books separately costs ₦17,500. The series saves you ₦3,500.
              </p>
            </div>
          </>
        )}
      </div>

      {/* Bottom action bar */}
      <div className="sticky bottom-0 bg-white border-t border-[#DDDDDD] p-6 pb-12 flex flex-col gap-3">
        <Button
          fullWidth
          onClick={() =>
            navigate(
              '/payment?plan=' +
                (billingMode === 'book' ? selectedBook : selectedSeries)
            )
          }
        >
          Start Free Trial
        </Button>
        <p className="text-[12px] text-brand-muted text-center font-bold">
          Already subscribed? Restore purchase
        </p>
      </div>
    </div>
  );
};
